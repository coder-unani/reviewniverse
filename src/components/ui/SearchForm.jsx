'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { isEmpty } from 'lodash';

import { ENDPOINTS } from '@/config/endpoints';
import {
  getStorageKeyword,
  setStorageKeyword,
  sliceStorageKeyword,
  clearStorageKeyword,
  removeStorageKeyword,
  setStorageSaveKeyword,
  getStorageSaveKeyword,
} from '@/utils/formatStorage';
import { useThemeContext } from '@/contexts/ThemeContext';
import ClearButton from '@/components/ui/Button/Clear';

import SearchIcon from '@/resources/icons/search.svg';
import CloseIcon from '@/resources/icons/close.svg';
import styles from '@/styles/components/SearchForm.module.scss';

/**
 * TODO:
 * - 연관 검색어 기능
 * - 모바일 검색 모달 따로 구현
 */

const SearchForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile } = useThemeContext();
  const [isDropDown, setIsDropDown] = useState(false);
  const [recentKeywords, setRecentKeywords] = useState([]);
  const [isSaveKeyword, setIsSaveKeyword] = useState(getStorageSaveKeyword());
  const { query } = useParams();
  const searchInputRef = useRef(null);
  const searchDropdownRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // 드롭다운 외부 클릭 시 닫기
    const handleDropDownClose = (e) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(e.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target)
      ) {
        handleSearchClose();
      }
    };

    document.addEventListener('mousedown', handleDropDownClose);
    return () => {
      document.removeEventListener('mousedown', handleDropDownClose);
    };
  }, []);

  useEffect(() => {
    // 페이지 이동 시 드롭다운 닫기
    handleSearchClose();

    // 최근 검색어 로컬 스토리지에서 불러오기
    const recent = getStorageKeyword();
    setRecentKeywords(recent);

    if (!searchInputRef.current) {
      return;
    }

    if (pathname.includes(ENDPOINTS.SEARCH)) {
      // 모바일이고 검색 쿼리가 없는 경우
      if (isMobile && isEmpty(query)) {
        handleSearchOpen();
      }
      // 검색 쿼리가 있음에도 검색어 입력란에 값이 없는 경우
      if (query && inputValue !== query) {
        const decodeQuery = decodeURIComponent(query);
        setInputValue(decodeQuery);
        saveRecentKeywords(decodeQuery);
      }
    } else {
      // 검색 페이지가 아닌 경우 검색어 초기화
      setInputValue('');
    }
  }, [pathname, query]);

  // 검색어 입력란 focus
  const handleSearchFocus = () => {
    if (isDropDown) {
      return;
    }
    handleSearchOpen();
  };

  // 검색어 입력란 click
  const handleSearchClick = () => {
    if (isDropDown) {
      return;
    }
    handleSearchOpen();
  };

  // 검색어 입력란 change
  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
  };

  // 검색어 입력란 clear
  const handleSearchClear = () => {
    if (searchInputRef.current) {
      setInputValue('');
    }
  };

  // 드롭다운 열기
  const handleSearchOpen = () => {
    setIsDropDown(true);
  };

  // 드롭다운 닫기
  const handleSearchClose = () => {
    setIsDropDown(false);
  };

  // 검색어 입력란 submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!inputValue || !inputValue.trim()) return;
    handleSearchClose();
    saveRecentKeywords(inputValue);
    const path = `${ENDPOINTS.SEARCH}/${encodeURIComponent(inputValue)}`;
    router.push(path);
  };

  // 최근 검색어 저장 (최대 5개)
  const saveRecentKeywords = (keyword) => {
    if (!keyword || !isSaveKeyword) return;
    setStorageKeyword(keyword);
    sliceStorageKeyword(5);
  };

  // 최근 검색어 전체 삭제
  const handleRecentClear = () => {
    clearStorageKeyword();
    setRecentKeywords([]);
  };

  // 최근 검색어 개별 삭제
  const handleRecentRemove = (keyword) => {
    const result = removeStorageKeyword(keyword);
    setRecentKeywords(result);
  };

  // 자동저장켜기/끄기
  const handleSearchSave = () => {
    setIsSaveKeyword((prev) => {
      setStorageSaveKeyword(!prev);
      return !prev;
    });
  };

  // 최근 검색 없을 때 or 자동저장 꺼져있을 때 렌더링
  const RenderSearchEmpty = ({ message }) => <div className={styles.search__empty}>{message}</div>;

  // 최근 검색어 렌더링
  const RenderSearchContent = () => (
    <>
      <div className={styles.search__header}>
        <p className={styles.search__title}>최근 검색어</p>
        <button type="button" className={styles.search__clear} onClick={handleRecentClear}>
          전체 삭제
        </button>
      </div>
      <ul className={styles.search__list}>
        {recentKeywords.map((keyword, index) => (
          <li className={styles.search__item} key={index}>
            <Link href={`${ENDPOINTS.SEARCH}/${keyword}`} className={styles.search__link}>
              <SearchIcon className={styles.search__icon} width={24} height={24} />
              <p className={styles.search__keyword}>{keyword}</p>
            </Link>
            <button type="button" className={styles.search__remove} onClick={() => handleRecentRemove(keyword)}>
              <CloseIcon className={styles.close__icon} width={24} height={24} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );

  // 검색 드롭다운 렌더링
  const RenderSearchDropdown = () => {
    if (!isDropDown) return null;

    let content = null;
    // 최근 검색어가 없거나 자동저장이 꺼져있는 경우
    if (isEmpty(recentKeywords) || !isSaveKeyword) {
      let message = '';
      // 최근 검색어가 없는 경우
      if (isEmpty(recentKeywords)) {
        message = '최근 검색이 없습니다.';
      }
      // 자동저장이 꺼져있는 경우
      if (!isSaveKeyword) {
        message = '검색어 자동 저장 기능이 꺼져있습니다.';
      }
      content = <RenderSearchEmpty message={message} />;
    } else {
      content = <RenderSearchContent />;
    }

    return (
      <div className={styles.search__dropdown} tabIndex="0" ref={searchDropdownRef}>
        {content}
        <div className={styles.search__footer}>
          <button type="button" className={styles.search__save} onClick={handleSearchSave}>
            {isSaveKeyword ? '자동저장 끄기' : '자동저장 켜기'}
          </button>
          <button type="button" className={styles.search__close} onClick={handleSearchClose}>
            닫기
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <form
        className={styles.search__form}
        onFocus={handleSearchFocus}
        onClick={handleSearchClick}
        onSubmit={handleSearchSubmit}
      >
        <input
          className={styles.search__input}
          type="text"
          placeholder="작품, 배우, 장르 등으로 검색해보세요."
          ref={searchInputRef}
          value={inputValue}
          onChange={handleSearchChange}
        />
        {inputValue && <ClearButton onClear={handleSearchClear} />}
        <button type="submit" className={styles.search__form__button}>
          <SearchIcon className={styles.search__icon} width={18} height={18} />
        </button>
      </form>
      <RenderSearchDropdown />
    </>
  );
};

export default SearchForm;
