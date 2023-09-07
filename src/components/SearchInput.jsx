import React, { useRef, useState } from 'react';
import { styled } from 'styled-components';

const SearchInput = ({
  focusIndex,
  setFocusIndex,
  searchWord,
  setSearchWord,
  listRef,
  searchList,
}) => {
  const focusRef = useRef(null);
  const [isAutoWord, setIsAutoWord] = useState(false);
  const [autoSearchWord, setAutoSearchWord] = useState('');

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
  );
};

export default SearchInput;

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
