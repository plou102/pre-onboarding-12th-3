import { getSearchData } from 'api/http';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { debounce } from 'lodash';
import RecommendedWord from 'components/RecommendedWord';

const Main = () => {
  const focusRef = useRef(null);
  const listRef = useRef(null);
  const [isAutoWord, setIsAutoWord] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [autoSearchWord, setAutoSearchWord] = useState('');
  const [focusIndex, setFocusIndex] = useState(-1);
  const [searchList, setSearchList] = useState([]);

  const Debounce = useCallback(
    debounce(value => getData(value), 1000),
    [],
  );

  const getData = async value => {
    const savedWord = sessionStorage.getItem(`${value}`);
    const isDelete = JSON.parse(savedWord) ? DeleteSession(value) : null;

    if (JSON.parse(savedWord) && !isDelete) {
      !isDelete && setSearchList(JSON.parse(savedWord).list);
    } else if (isDelete || !JSON.parse(savedWord)) {
      const list = await getSearchData(value);
      setSearchList(list);
    }
  };

  const DeleteSession = value => {
    const sessionData = sessionStorage.getItem(`${value}`);

    const item = JSON.parse(sessionData);
    const now = new Date().getTime();

    if (now > item.time) {
      sessionStorage.removeItem(`${value}`);
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (isAutoWord | (searchWord === '')) return;

    Debounce(searchWord);
  }, [searchWord]);

  const InputChange = e => {
    if (isAutoWord) {
      const enteredValue =
        e.nativeEvent.inputType === 'deleteContentBackward' ? '' : e.nativeEvent.data;

      focusIndex >= 0 && setSearchWord(autoSearchWord + enteredValue);
      setIsAutoWord(false);
      setFocusIndex(-1);
      return;
    }

    setSearchWord(e.target.value);
  };

  const InputKeyUp = e => {
    if (KeyEvent[e.key]) KeyEvent[e.key]();
  };

  const KeyEvent = {
    ArrowDown: () => {
      if (searchList.length === 0) {
        return;
      }
      if (listRef.current.childElementCount === focusIndex + 1) {
        setFocusIndex(() => 0);
        return;
      }
      if (focusIndex === -1) {
        setIsAutoWord(true);
      }
      setFocusIndex(index => index + 1);
      setAutoSearchWord(searchList[focusIndex + 1]?.sickNm);
    },
    ArrowUp: () => {
      if (focusIndex === -1) {
        return;
      }
      if (focusIndex === 0) {
        setAutoSearchWord('');
        setFocusIndex(index => index - 1);
        setIsAutoWord(false);
        return;
      }

      setFocusIndex(index => index - 1);
      setAutoSearchWord(searchList[focusIndex - 1].sickNm);
    },
    Escape: () => {
      setAutoSearchWord('');
      setFocusIndex(-1);
      setIsAutoWord(false);
    },
  };

  return (
    <MainContent>
      <Title>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </Title>

      <SearchContent>
        <DiseaseInput
          type="text"
          placeholder="질환명을 입력해 주세요"
          ref={focusRef}
          onChange={InputChange}
          onKeyUp={InputKeyUp}
          value={isAutoWord ? autoSearchWord : searchWord}
        />

        <SearchBtn>검색</SearchBtn>
      </SearchContent>

      <SearchResultList ref={listRef} display={`${searchWord === ''}`}>
        <p>추천검색어</p>
        {searchList.length > 0 ? (
          searchList.map((item, idx) => {
            return (
              <RecommendedWord key={item.sickCd} item={item} idx={idx} focusIndex={focusIndex} />
            );
          })
        ) : (
          <p>검색어가 존재하지 않습니다.</p>
        )}
      </SearchResultList>
    </MainContent>
  );
};

export default Main;

const MainContent = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  line-height: 3rem;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 3rem;
`;

const SearchContent = styled.div`
  position: relative;
  height: 2rem;
`;

const DiseaseInput = styled.input`
  position: absolute;
  width: 30rem;
  height: 3rem;
  border: none;
  border-radius: 50px;
  padding: 0 1rem;
  font-size: 1.3rem;
  transform: translate(-50%, -50%);

  ::placeholder {
    color: #a7afb7;
  }
`;

const SearchBtn = styled.button`
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background-color: #007be9;
  color: #fff;
  transform: translate(530%, -50%);
  z-index: 1;
`;

const SearchResultList = styled.div`
  margin: 0 auto;
  background-color: #fff;
  width: 30rem;
  padding: 1rem;
  border-radius: 20px;
  text-align: left;
  display: ${props => props.display === 'true' && 'none'};

  p {
    font-size: 0.9rem;
    color: #a7afb7;
    margin: 0.6rem;
  }
`;
