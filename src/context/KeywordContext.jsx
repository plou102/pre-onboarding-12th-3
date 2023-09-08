import React, { createContext, useState } from 'react';

const KeywordContext = createContext();

export const KeywordProvider = ({ children }) => {
  const [searchWord, setSearchWord] = useState('');
  const [autoSearchWord, setAutoSearchWord] = useState('');
  const [focusIndex, setFocusIndex] = useState(-1);

  return (
    <KeywordContext.Provider
      value={{
        searchWord,
        setSearchWord,
        autoSearchWord,
        setAutoSearchWord,
        focusIndex,
        setFocusIndex,
      }}
    >
      {children}
    </KeywordContext.Provider>
  );
};

export default KeywordContext;
