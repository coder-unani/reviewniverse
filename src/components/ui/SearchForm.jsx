// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Link,
//   useLocation,
//   useNavigate,
//   useSearchParams,
// } from 'react-router-dom';
// import ClearButton from '/src/components/Button/Clear';
// import { useThemeContext } from '/src/context/ThemeContext';
// import { ENDPOINTS } from '/src/config/endpoints';
// import {
//   getStorageKeyword,
//   setStorageKeyword,
//   sliceStorageKeyword,
//   clearStorageKeyword,
//   removeStorageKeyword,
//   setStorageSaveKeyword,
//   getStorageSaveKeyword,
// } from '/src/utils/formatStorage';
// import { isEmpty } from 'lodash';
import SearchIcon from '@/resources/icons/search.svg';
import CloseIcon from '@/resources/icons/close.svg';
import styles from '@/styles/SearchForm.module.scss';

/**
 * TODO:
 * - 연관 검색어 기능
 */

const SearchForm = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const { isMobile } = useThemeContext();
  // const [isDropDown, setIsDropDown] = useState(false);
  // const [recentKeywords, setRecentKeywords] = useState([]);
  // const [isSaveKeyword, setIsSaveKeyword] = useState(getStorageSaveKeyword());
  // const [searchParams, setSearchParams] = useSearchParams();
  // const query = searchParams.get('query');
  // const searchInputRef = useRef(null);
  // const searchDropdownRef = useRef(null);
  // const [inputValue, setInputValue] = useState('');

  // useEffect(() => {
  //   const handleDropDownClose = (e) => {
  //     if (
  //       searchDropdownRef.current &&
  //       !searchDropdownRef.current.contains(e.target) &&
  //       searchInputRef.current &&
  //       !searchInputRef.current.contains(e.target)
  //     ) {
  //       handleSearchClose();
  //     }
  //   };

  //   document.addEventListener('mousedown', handleDropDownClose);
  //   return () => {
  //     document.removeEventListener('mousedown', handleDropDownClose);
  //   };
  // }, []);

  // useEffect(() => {
  //   handleSearchClose();

  //   // 최근 검색어 로컬 스토리지에서 불러오기
  //   const recent = getStorageKeyword();
  //   setRecentKeywords(recent);

  //   const path = location.pathname;
  //   if (!searchInputRef.current) return;
  //   if (path !== ENDPOINTS.SEARCH) {
  //     // 검색 페이지가 아닌 경우 검색어 초기화
  //     setInputValue('');
  //   } else {
  //     if (isMobile && isEmpty(query)) handleSearchOpen();
  //     // 검색 쿼리가 있음에도 검색어 입력란에 값이 없는 경우
  //     if (query && inputValue !== query) {
  //       setInputValue(query);
  //       saveRecentKeywords(query);
  //     }
  //   }
  // }, [location, query]);

  // // 검색어 입력란 focus
  // const handleSearchFocus = () => {
  //   if (isDropDown) return;
  //   handleSearchOpen();
  // };

  // // 검색어 입력란 click
  // const handleSearchClick = () => {
  //   if (isDropDown) return;
  //   handleSearchOpen();
  // };

  // // 검색어 입력란 change
  // const handleSearchChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  // // 검색어 입력란 clear
  // const handleSearchClear = () => {
  //   if (searchInputRef.current) {
  //     setInputValue('');
  //   }
  // };

  // // 드롭다운 열기
  // const handleSearchOpen = () => {
  //   setIsDropDown(true);
  // };

  // // 드롭다운 닫기
  // const handleSearchClose = () => {
  //   setIsDropDown(false);
  // };

  // // 검색어 입력란 submit
  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   if (!inputValue || !inputValue.trim()) return;
  //   handleSearchClose();
  //   saveRecentKeywords(inputValue);
  //   const path = `${ENDPOINTS.SEARCH}?query=${inputValue}`;
  //   navigate(path);
  // };

  // // 최근 검색어 저장 (최대 5개)
  // const saveRecentKeywords = (keyword) => {
  //   if (!keyword || !isSaveKeyword) return;
  //   setStorageKeyword(keyword);
  //   sliceStorageKeyword(5);
  // };

  // // 최근 검색어 전체 삭제
  // const handleRecentClear = () => {
  //   clearStorageKeyword();
  //   setRecentKeywords([]);
  // };

  // // 최근 검색어 개별 삭제
  // const handleRecentRemove = (keyword) => {
  //   const result = removeStorageKeyword(keyword);
  //   setRecentKeywords(result);
  // };

  // // 자동저장 on/off
  // const handleSearchSave = () => {
  //   setIsSaveKeyword((prev) => {
  //     setStorageSaveKeyword(!prev);
  //     return !prev;
  //   });
  // };

  // // 최근 검색 없을 때 렌더링
  // const renderNoRecent = () => {
  //   return <div className="search-empty">최근 검색이 없습니다.</div>;
  // };

  // // 자동저장 꺼져있을 때 렌더링
  // const renderNoSave = () => {
  //   return (
  //     <div className="search-empty">검색어 자동 저장 기능이 꺼져있습니다.</div>
  //   );
  // };

  // const renderSearchContent = () => {
  //   const path = `${ENDPOINTS.SEARCH}?query=`;

  //   return (
  //     <>
  //       <div className="search-header">
  //         <p className="search-title">최근 검색어</p>
  //         <button
  //           type="button"
  //           className="search-clear"
  //           onClick={handleRecentClear}
  //         >
  //           전체 삭제
  //         </button>
  //       </div>
  //       <ul className="search-list">
  //         {recentKeywords.map((keyword, index) => (
  //           <li className="search-item" key={index}>
  //             <Link to={`${path}${keyword}`} className="search-link">
  //               <SearchIcon />
  //               <p className="search-keyword">{keyword}</p>
  //             </Link>
  //             <button
  //               type="button"
  //               className="search-remove"
  //               onClick={() => handleRecentRemove(keyword)}
  //             >
  //               <CloseIcon />
  //             </button>
  //           </li>
  //         ))}
  //       </ul>
  //     </>
  //   );
  // };

  // const renderSearchDropdown = () => {
  //   if (!isDropDown) return null;

  //   let content = null;
  //   if (isEmpty(recentKeywords) || !isSaveKeyword) {
  //     if (isEmpty(recentKeywords)) content = renderNoRecent();
  //     if (!isSaveKeyword) content = renderNoSave();
  //   } else {
  //     content = renderSearchContent();
  //   }

  //   return (
  //     <div className="search-dropdown" tabIndex="0" ref={searchDropdownRef}>
  //       {content}
  //       <div className="search-footer">
  //         <button
  //           type="button"
  //           className="search-save"
  //           onClick={handleSearchSave}
  //         >
  //           {isSaveKeyword ? '자동저장 끄기' : '자동저장 켜기'}
  //         </button>
  //         <button
  //           type="button"
  //           className="search-close"
  //           onClick={handleSearchClose}
  //         >
  //           닫기
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <>
      <form
        className={styles.search__form}
        // onFocus={handleSearchFocus}
        // onClick={handleSearchClick}
        // onSubmit={handleSearchSubmit}
      >
        <input
          className={styles.search__input}
          type="text"
          placeholder="작품, 배우, 장르 등으로 검색해보세요."
          // ref={searchInputRef}
          // value={inputValue}
          // onChange={handleSearchChange}
        />
        {/* {inputValue && (
          <ClearButton
            onClear={handleSearchClear}
          />
        )} */}
        <button type="submit" className={styles.search__form__button}>
          <SearchIcon className={styles.search__icon} width={18} height={18} />
        </button>
      </form>
      {/* {renderSearchDropdown()} */}
    </>
  );
};

export default SearchForm;
