# 프리온보딩 검색창 만들기

검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현

<br />

## 목차

- [🐼 만든 사람](#만든-사람)
- [🛠️ 기술 스택](#기술-스택)
- [💻 실행 방법](#실행-방법)
- [📂 폴더 구조](#폴더-구조)
- [📚 과제 수행 내용](#📚-과제-수행-내용)
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
 ┃ ┣ 📂pages
 ┃ ┃ ┗ 📜Main.jsx
 ┃ ┣ 📂utils
 ┃ ┃ ┗ 📜RemoveSession.js
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.js
 ┃ ┣ 📜App.test.js
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.js
 ┃ ┣ 📜reportWebVitals.js
 ┃ ┗ 📜setupTests.js
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

<img src="https://github.com/plou102/pre-onboarding-12th-2/assets/107393773/6f32c0db-b40f-4fc2-8a6b-9ae68b6527a3" width="500" height="300" />

<br />

- `input`에 입력되는 텍스트에 따라 API를 호출하도록 구현하였습니다.
- API 호출을 통해 받아온 데이터는 `state`에 저장한 후 보여주도록 구현하였습니다.

### API 호출별로 로컬 캐싱 구현

### API 호출 횟수를 줄이는 전략 수립 및 실행

### 키보드만으로 추천 검색어들로 이동 가능하도록 구현
