import { getSearchData } from 'api/http';
import React, { createContext, useState } from 'react';
import { DeleteSession } from 'utils/RemoveSession';

const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [searchList, setSearchList] = useState([]);

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

  return (
    <ListContext.Provider value={{ searchList, setSearchList, getData }}>
      {children}
    </ListContext.Provider>
  );
};

export default ListContext;
