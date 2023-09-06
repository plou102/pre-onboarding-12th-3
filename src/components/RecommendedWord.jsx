import React from 'react';
import { styled } from 'styled-components';

const RecommendedWord = ({ item, idx, focusIndex }) => {
  return <Recommeded bgcolor={`${idx === focusIndex}`}>{item.sickNm}</Recommeded>;
};

export default RecommendedWord;

const Recommeded = styled.div`
  padding: 0.8rem;
  background-color: ${props => props.bgcolor === 'true' && '#E6E6E6'};
`;
