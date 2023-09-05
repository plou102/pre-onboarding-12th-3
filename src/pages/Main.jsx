import React, { useLayoutEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';

const Main = () => {
  const focusRef = useRef(null);
  const [searchWord, setSearchWord] = useState('');

  useLayoutEffect(() => {
    if (focusRef.current !== null) focusRef.current.focus();
    console.log(focusRef);
  });

  const InputChange = e => {
    setSearchWord(e.target.value);
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
          value={searchWord}
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
