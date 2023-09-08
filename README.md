# 프리온보딩 검색창 만들기

검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현

<br />

## 목차

- [🐼 만든 사람](#-만든-사람)
- [🛠️ 기술 스택](#-기술-스택)
- [💻 실행 방법](#-실행-방법)
- [📂 폴더 구조](#-폴더-구조)
- [📚 과제 수행 내용](#-과제-수행-내용)
  - [질환명 검색시 API 호출 통해서 검색어 추천 기능 구현](#질환명-검색시-api-호출-통해서-검색어-추천-기능-구현)
  - [API 호출별로 로컬 캐싱 구현](#api-호출별로-로컬-캐싱-구현)
  - [API 호출 횟수를 줄이는 전략 수립 및 실행](#api-호출-횟수를-줄이는-전략-수립-및-실행)
  - [키보드만으로 추천 검색어들로 이동 가능하도록 구현](#키보드만으로-추천-검색어들로-이동-가능하도록-구현)

## 🐼 만든 사람

- 박정민

<br />

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/Styled Components-DB7093?style=flat&logo=styled-components&logoColor=white"> <img src="https://img.shields.io/badge/React Router-CA4245?style=flat&logo=react router&logoColor=white">

<img src="https://img.shields.io/badge/ESlint-4B32C3?style=flat&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black">

<br />

## 💻 실행 방법

[api repo](https://github.com/walking-sunset/assignment-api)

```zsh
$ npm install
$ npm start
```

- api repo와 해당 repo 모두 git clone후, 위의 명령어를 순서대로 실행하면 프로젝트를 이용하실 수 있습니다.

<br />

## 📂 폴더 구조

```
📦pre-onboarding-12th-3
 ┃
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📜http.js
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜RecommendedWord.jsx
 ┃ ┃ ┗ 📜SearchInput.jsx
 ┃ ┣ 📂constants
 ┃ ┃ ┗ 📜cache.js
 ┃ ┣ 📂context
 ┃ ┃ ┣ 📜KeywordContext.jsx
 ┃ ┃ ┗ 📜ListContext.jsx
 ┃ ┣ 📂hooks
 ┃ ┃ ┗ 📜useKeyEvent.js
 ┃ ┣ 📂pages
 ┃ ┃ ┗ 📜Main.jsx
 ┃ ┣ 📂utils
 ┃ ┃ ┗ 📜RemoveSession.js
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.js
 ┃ ┣ 📜index.css
 ┃ ┗ 📜index.js
 ┣ 📜.eslintrc.js
 ┣ 📜.gitignore
 ┣ 📜.prettierrc.js
 ┣ 📜README.md
 ┣ 📜jsconfig.json
 ┣ 📜package-lock.json
 ┗ 📜package.json
```

<br />

## 📚 과제 수행 내용

### 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

- 검색어가 없을 시 "검색어 없음" 표출

<img src="https://github.com/plou102/pre-onboarding-12th-2/assets/107393773/6f32c0db-b40f-4fc2-8a6b-9ae68b6527a3" width="600" height="400" />

<br /><br />

- `input`에 입력되는 텍스트에 따라 API를 호출하도록 구현하였습니다.
- API 호출을 통해 받아온 데이터는 `state`에 저장한 후 보여주도록 구현하였습니다.

```js
// src/context/ListContext.jsx

const [searchList, setSearchList] = useState([]);

const getData = async value => {

      (...)

      const list = await getSearchData(value);
      setSearchList(list);
    }
  };
```
```js
// src/pages/Main.jsx

return (

  (...)

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
);
```

<br />

### API 호출별로 로컬 캐싱 구현

- 캐싱 기능을 제공하는 라이브러리 사용 금지
- expire time을 구현할 경우 가산점

<img src="https://github.com/plou102/pre-onboarding-12th-2/assets/107393773/76db15c0-b63d-4b15-8c97-dd91df6e192f" width="700" height="400" />
<img src="https://github.com/plou102/pre-onboarding-12th-2/assets/107393773/0ad846a4-4434-48dc-b867-2a6ccc17128f" width="700" height="400" />

<br /><br />

- 로컬 캐싱을 구현하기 위해 `SessionStorage`를 사용하였습니다.
- 캐시 `Expire time`을 구현하였습니다.

```js
// src/constants/cache.js

export const EXPIRE_TIME = 1000 * 60 * 5; // 5분
```

```js
// src/api/http.js

import { EXPIRE_TIME } from 'constants/cache';

const now = new Date();
const expiry = now.getTime() + EXPIRE_TIME;

export const getSearchData = async keyword => {
  return await axios
    (...)
    .then(res => {
      const sessionData = {
        list: res.data,
        time: expiry,
      }; // 리스트 데이터와 시간을 객체로 담아 SessionStorage에 저장
      sessionStorage.setItem(`${keyword}`, JSON.stringify(sessionData));

    (...)

    .finally(console.info('calling api')); // api가 호출될 때마다 console.info 출력
};
```

```js
// src/utils/RemoveSession.js

export const DeleteSession = value => {
  const sessionData = sessionStorage.getItem(`${value}`); // 검색하는 키워드가 Storage에 있는지 확인

  const item = JSON.parse(sessionData);
  const now = new Date().getTime();

  if (now > item.time) {
    // 현재 시간이 Storage의 value-time 보다 크다면 데이터 삭제 실행 후 api 호출
    sessionStorage.removeItem(`${value}`);
    return true;
  }

  return false; // if문이 실행되지 않았다면 false 반환
};
```

<br />

### API 호출 횟수를 줄이는 전략 수립 및 실행

<img src="https://github.com/plou102/pre-onboarding-12th-2/assets/107393773/2d25763c-aa9e-404d-a04a-95476b7dca15" width="700" height="400" />

<br /><br />

- `lodash`라이브러리의 `debounce`를 사용하여 1초마다 api를 호출할 수 있도록 구현하였습니다.

```js
// src/pages/Main.jsx

import { debounce } from 'lodash';

const Debounce = useCallback(
  debounce(value => getData(value), 1000), // debounce는 1초동안 누적된 이벤트를 한번에 실행하기 때문에 useCallback을 사용
  [],
);

useEffect(() => {

  (...)

  Debounce(searchWord);
  }, [searchWord]);
```

<br />
  
### 키보드만으로 추천 검색어들로 이동 가능하도록 구현

<img src="https://github.com/plou102/pre-onboarding-12th-2/assets/107393773/a9ec047e-4f5d-4f5d-862e-d57231a67319" width="700" height="400" />

<br /><br />

- 위, 아래 방향키로 이동하여 추천 검색어들로 이동이 가능하도록 키보드 네비게이션을 구현하였습니다.
- 이동할 때마다 `input`에 자동완성이 되도록 구현하였습니다.

```js
// src/components/SearchInput.jsx

  const KeyHandler = useKeyEvent({ listRef, setIsAutoWord });
  const InputKeyUp = e => {
    const handler = KeyHandler[e.key];

    if (handler) handler();
  };

return (

  (...)

  <DiseaseInput
    type="text"
    placeholder="질환명을 입력해 주세요"
    ref={focusRef}
    onChange={InputChange}
    onKeyUp={InputKeyUp}
    value={isAutoWord ? autoSearchWord : searchWord}
  />
)
```
```js
// src/hooks/useKeyEvent.js

  const KeyEvent = {
    ArrowDown: () => {
      if (searchList.length === 0) {
        return; // 리스트의 길이가 0인 경우 return
      }
      if (listRef.current.childElementCount === focusIndex + 1) {
        setFocusIndex(() => 0);
        return;
      }
      if (focusIndex === -1) {
        setIsAutoWord(true); // 검색창에서 키보드를 움직이기 전 자동완성 state를 true로 변경
      }
      setFocusIndex(index => index + 1); // 리스트가 배열로 되어 있어 아래 방향키를 누르면 focusIndex가 -1부터 1씩 증가
      setAutoSearchWord(searchList[focusIndex + 1]?.sickNm); // 자동완성을 위해 state에 focus되어 있는 질환명으로 변경
    },
    ArrowUp: () => {
      if (focusIndex === -1) {
        return; // focus가 입력창에 머물고 있다면 return
      }
      if (focusIndex === 0) { // 리스트의 첫번째 질환명에 focus가 되어 있는 경우 위 방향키를 누르면 자동완성 off -> 입력창에는 입력한 키워드가 보여집니다.
        setAutoSearchWord('');
        setFocusIndex(index => index - 1);
        setIsAutoWord(false);
        return;
      }

      setFocusIndex(index => index - 1); // 리스트가 배열로 되어 있어 위 방향키를 누르면 focusIndex가 1씩 감소
      setAutoSearchWord(searchList[focusIndex - 1].sickNm);
    },
    Escape: () => { // esc를 누르면 focus off
      setAutoSearchWord('');
      setFocusIndex(-1);
      setIsAutoWord(false);
    },
  };

```
