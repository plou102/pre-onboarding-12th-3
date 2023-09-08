import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { debounce } from 'lodash';
import RecommendedWord from 'components/RecommendedWord';
import SearchInput from 'components/SearchInput';
import KeywordContext from 'context/KeywordContext';
import ListContext from 'context/ListContext';

const Main = () => {
  const listRef = useRef(null);
  const { searchWord, focusIndex } = useContext(KeywordContext);
  const { searchList, getData } = useContext(ListContext);

  const Debounce = useCallback(
    debounce(value => getData(value), 1000),
    [],
  );

  useEffect(() => {
    if (searchWord === '') return;

    Debounce(searchWord);
  }, [searchWord]);

  return (
    <MainContent>
      <Title>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </Title>

      <SearchInput listRef={listRef} searchList={searchList} />

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
