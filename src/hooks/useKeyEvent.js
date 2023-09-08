import KeywordContext from 'context/KeywordContext';
import ListContext from 'context/ListContext';
import { useContext } from 'react';

const useKeyEvent = ({ listRef, setIsAutoWord }) => {
  const { setAutoSearchWord, focusIndex, setFocusIndex } = useContext(KeywordContext);
  const { searchList } = useContext(ListContext);

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

  return KeyEvent;
};

export default useKeyEvent;
