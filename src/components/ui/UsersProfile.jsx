'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, notFound } from 'next/navigation';
import Image from 'next/image';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';
import { isEmpty } from 'lodash';

import {
  DEFAULT_IMAGES,
  PROFILE_IMAGE_FILE_SIZE,
  PROFILE_IMAGE_FILE_TYPE,
  PROFILE_TEXT_MAX_LENGTH,
} from '@/config/constants';
import { EndpointManager, ENDPOINTS } from '@/config/endpoints';
import { isValidFileSize, isValidFileType } from '@/utils/validation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useUserMe } from '@/hooks/useUserMe';
import { useUserUpdate } from '@/hooks/useUserUpdate';
import { useValidateNickname } from '@/hooks/useValidateNickname';
import { showSuccessToast, showErrorToast } from '@/components/ui/Toast';

import ImageIcon from '@/resources/icons/outline-image.svg';
import styles from '@/styles/pages/UsersProfile.module.scss';

/**
 * TODO:
 * 이메일 인증 여부 표시
 * 이메일 인증 기능 추가
 */

// 이 파일에서만 아래 속성들의 eslint-disable를 적용
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */

const UsersProfile = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [profile, setProfile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { mutate: userMe, isPending: isUserPending, isError: isUserError } = useUserMe();
  const { mutateAsync: validateNickname, isPending: isValidatePending } = useValidateNickname();
  const { mutate: userUpdate, isPending: isUpdatePending } = useUserUpdate();

  // 유효성 검사 스키마
  const EditSchema = Yup.object().shape({
    nickname: Yup.string()
      .min(2, '닉네임은 최소 2글자 이상입니다.')
      .max(20, '닉네임은 최대 20글자입니다.')
      .matches(/^[a-zA-Z가-힣0-9]*$/, '닉네임은 한글, 영문, 숫자만 입력 가능합니다.')
      .required('닉네임을 입력해주세요.'),
    profile_text: Yup.string()
      .max(PROFILE_TEXT_MAX_LENGTH, `소개는 최대 ${PROFILE_TEXT_MAX_LENGTH}자까지 입력 가능합니다.`)
      .nullable(),
    is_marketing_agree: Yup.boolean().nullable(),
  });

  // 폼 초기값
  const defaultValues = {
    profile_image: DEFAULT_IMAGES.noActor,
    nickname: '',
    profile_text: '',
    is_marketing_agree: false,
  };

  // 폼 메소드
  const methods = useForm({
    resolver: yupResolver(EditSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  // 폼 메소드 분해
  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    clearErrors,
    formState: { errors, isDirty, isValid },
    trigger,
  } = methods;

  const watchNickname = useWatch({ control, name: 'nickname' });
  const watchIntroduction = useWatch({
    control,
    name: 'profile_text',
    defaultValue: '',
  });

  // 유저 정보 수정 요청
  // TODO: 프로필 소개 길이 확인 필요
  const onSubmit = handleSubmit(async (data) => {
    // API 호출 중일 경우 리턴
    if (isValidatePending || isUpdatePending) return;

    const nicknameValid = await trigger('nickname');
    if (nicknameValid && profile.nickname !== data.nickname) {
      const nicknameRes = await validateNickname({ nickname: data.nickname });

      if (nicknameRes.status === 200) {
        if (nicknameRes.data) {
          clearErrors('nickname');
        } else {
          setError('nickname', {
            type: 'manual',
            message: '이미 사용중인 닉네임입니다.',
          });
          return;
        }
      } else {
        return;
      }
    }

    const updateData = {};
    const fieldsCheck = ['profile_image', 'nickname', 'profile_text', 'is_marketing_agree'];

    fieldsCheck.forEach((field) => {
      if (data[field] !== profile[field]) {
        if (field === 'profile_image' && data[field] === DEFAULT_IMAGES.noActor) return;
        if (field === 'profile_text' && !data[field] && profile[field] === null) return;
        updateData[field] = data[field];
      }
    });
    if (isEmpty(updateData)) {
      const pathname = EndpointManager.generateUrl(ENDPOINTS.USER, { userId: profile.id });
      router.push(pathname);
      showSuccessToast('프로필이 수정되었습니다.');
      return;
    }

    userUpdate(
      { userId: profile.id, updateData },
      {
        onSuccess: (res) => {
          if (res.status === 204) {
            const pathname = EndpointManager.generateUrl(ENDPOINTS.USER, { userId: profile.id });
            router.push(pathname);
            showSuccessToast('프로필이 수정되었습니다.');
          } else {
            showErrorToast('프로필을 수정하지 못했습니다.');
          }
        },
        onError: () => {
          showErrorToast('프로필을 수정하지 못했습니다.');
        },
      }
    );
  });

  // 프로필 이미지 교체
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 크기와 형식 유효성 검사
    const validFileType = isValidFileType(file, PROFILE_IMAGE_FILE_TYPE);
    const validFileSize = isValidFileSize(file, PROFILE_IMAGE_FILE_SIZE);
    if (!validFileType) {
      setError('profile_image', {
        type: 'manual',
        message: `이미지 파일 형식만 가능합니다.`,
      });
      return;
    }
    if (!validFileSize) {
      setError('profile_image', {
        type: 'manual',
        message: `이미지 파일은 ${PROFILE_IMAGE_FILE_SIZE}MB 이하만 가능합니다.`,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
    setValue('profile_image', file, {
      shouldValidate: true,
      shouldDirty: true,
    });
    clearErrors('profile_image');
  };

  // 유저 정보 가져오기
  useEffect(() => {
    userMe(
      {},
      {
        onSuccess: (res) => {
          if (res.status === 200) {
            const me = res.data.user;
            // 로그인한 유저와 조회한 유저가 다르다면 404페이지로 이동
            if (me.id !== user.id) notFound();

            setProfile(me);
            setPreviewImage(me.profile_image || DEFAULT_IMAGES.noActor);
          }
        },
      }
    );
  }, [userMe, user.id]);

  // 유저 정보 세팅
  useEffect(() => {
    if (!profile) return;

    setValue('profile_image', profile.profile_image);
    setValue('nickname', profile.nickname);
    setValue('profile_text', profile.profile_text || '');
    setValue('is_marketing_agree', profile.is_marketing_agree);
  }, [profile, setValue]);

  // 유저 닉네임 변경 시 유효성 검사
  useEffect(() => {
    if (watchNickname) {
      trigger('nickname');
    }
  }, [watchNickname, trigger]);

  // 유저 소개글 길이 제한
  useEffect(() => {
    if (watchIntroduction.length > PROFILE_TEXT_MAX_LENGTH) {
      setValue('profile_text', watchIntroduction.slice(0, PROFILE_TEXT_MAX_LENGTH));
    }
  }, [watchIntroduction, setValue]);

  // 로그인한 유저가 없다면 로그인 페이지로 이동
  if (isEmpty(user)) {
    router.push(ENDPOINTS.USER_LOGIN);
    return null;
  }

  // 유저 정보 조회 중이라면 null 반환
  if (isUserPending) return null;

  // 유저 정보 조회 실패 시 에러 페이지로 이동
  if (isUserError) {
    router.push(ENDPOINTS.ERROR);
    return null;
  }

  // 유저 정보가 없다면 null 반환
  if (isEmpty(profile) || isUserPending) return null;

  return (
    <section className={styles.edit__section}>
      <form method={methods} onSubmit={onSubmit} className={styles.edit__form} encType="multipart/form-data">
        <div className={`${styles.edit__input__wrapper} ${styles.image}`}>
          <div className={styles.edit__profile__image}>
            <Image src={previewImage} alt="프로필 이미지" width={100} height={100} priority />
            <input
              type="file"
              id="profile_image"
              name="profile_image"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="profile_image">
              <ImageIcon width={32} height={32} />
            </label>
          </div>
          {errors.profile_image && <p className={styles.edit__error}>{errors.profile_image.message}</p>}
        </div>
        <div className={`${styles.edit__input__wrapper} ${styles.email}`}>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" value={profile.email} readOnly />
        </div>
        <div className={`${styles.edit__input__wrapper} ${styles.nickname}`}>
          <label htmlFor="nickname">닉네임</label>
          <input type="text" id="nickname" spellCheck="false" {...register('nickname')} />
          {errors.nickname && <p className={styles.edit__error}>{errors.nickname.message}</p>}
        </div>
        <div className={`${styles.edit__input__wrapper} ${styles.introduction}`}>
          <label htmlFor="profile_text">
            <span>소개</span>
            <span>
              {watchIntroduction.length} / {PROFILE_TEXT_MAX_LENGTH}
            </span>
          </label>
          <textarea
            id="profile_text"
            className={styles.edit__introduction}
            placeholder="소개글을 입력하세요."
            spellCheck="false"
            {...register('profile_text')}
          />
          {errors.profile_text && <p className={styles.edit__error}>{errors.profile_text.message}</p>}
        </div>
        <div className={`${styles.edit__input__wrapper} ${styles.marketing}`}>
          <input type="checkbox" id="is_marketing_agree" {...register('is_marketing_agree')} />
          <label htmlFor="is_marketing_agree">마케팅 정보 수신 동의</label>
        </div>
        <button
          className={styles.edit__submit__button}
          type="submit"
          disabled={!isDirty || !isValid || isValidatePending || isUpdatePending}
        >
          수정하기
        </button>
      </form>
    </section>
  );
};

export default UsersProfile;
