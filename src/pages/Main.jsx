import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

const Main = () => {
  const focusRef = useRef(null);
  const listRef = useRef(null);
  const [isAutoWord, setIsAutoWord] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [autoSearchWord, setAutoSearchWord] = useState('');
  const [focusIndex, setFocusIndex] = useState(-1);

  const InputChange = e => {
    if (isAutoWord) {
      const enteredValue = e.nativeEvent.inputType === 'deleteContent' ? '' : e.nativeEvent.data;

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
    Arrowdown: () => {
      if (autoSearchWord.length === 0) {
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
      setAutoSearchWord(autoSearchWord.results[focusIndex + 1].title);
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
      setAutoSearchWord(autoSearchWord.results[focusIndex - 1].title);
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
  margin-bottom: 2rem;
`;

const SearchContent = styled.div`
  position: relative;
`;

const DiseaseInput = styled.input`
  width: 60%;
  height: 3rem;
  border: none;
  border-radius: 50px;
  padding: 0 1rem;
  font-size: 1.3rem;

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
  right: 130px;
  top: 4px;
  z-index: 1;
`;
