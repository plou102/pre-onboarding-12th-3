import KeywordContext from 'context/KeywordContext';
import useKeyEvent from 'hooks/useKeyEvent';
import React, { useContext, useRef, useState } from 'react';
import { styled } from 'styled-components';

const SearchInput = ({ listRef }) => {
  const focusRef = useRef(null);
  const [isAutoWord, setIsAutoWord] = useState(false);
  const { searchWord, setSearchWord, autoSearchWord, focusIndex, setFocusIndex } =
    useContext(KeywordContext);

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

  const KeyHandler = useKeyEvent({ listRef, setIsAutoWord });
  const InputKeyUp = e => {
    const handler = KeyHandler[e.key];

    if (handler) handler();
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
