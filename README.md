# react-todo-boilerplate
> CRUD를 사용해 react와 react-query를 이용한 간단한 todo를 만들고 리팩토링한 과정을 담았습니다.

<br />

## 💻 Preview
### 1) 로그인, 회원가입

<img width="600" src="https://user-images.githubusercontent.com/69497936/200132522-f9982884-4cf3-4255-9963-2749ccf6400e.mov" />

### 2) Todo 

<img width="600" src="https://user-images.githubusercontent.com/69497936/205450419-ad31d242-f7df-4291-9974-731175b2facd.mov" />

<br />

## 📝 WorkList
### 1) Auth
- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
    - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
    - [x]  최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- 이메일과 비밀번호의 유효성을 확인합니다
    - [x]  이메일 조건 : 최소 `@`, `.` 포함
    - [x]  비밀번호 조건 : 8자 이상 입력
    - [x]  이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
    - [x]  응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
    - [x]  다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
    - [x]  어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

### 2) Todo
- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
    - [x]  목록 / 상세 영역으로 나누어 구현해주세요
    - [x]  Todo 목록을 볼 수 있습니다.
    - [x]  Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
    - [x]  Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
    - [x]  Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
    - [x]  새로고침을 했을 때 현재 상태가 유지되어야 합니다.
    - [x]  개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요
    - [x]  수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다


<br />

## 🚀 Getting Started
```sh
$ yarn
$ yarn start
```

<br />

## 폴더 구조

```
📦 react-todo-boilerplate

client
  ├─ public
  ├─ src
  │  ├─ apis
  │  ├─ components
  │  ├─ consts
  │  ├─ hooks
  │  ├─ pages
  │  ├─ store
  │  ├─ styles
  │  ├─ types
  │  └─ router.tsx
  ├─ .eslintrc.json
  ├─ .gitignore
  ├─ .prettierrc.json
  ├─ README.md
  ├─ craco.config.js
  ├─ package.json
  └─ tsconfig.json
```

| 폴더           | 용도                                                                                 |
| -------------- | ----------------------------------------------------------------------------------- |
| **apis**    | server와 통신을 통해 데이터를 받아오는 코드 관리                                                      |
| **components**  | auth, common, toods로 각 페이지에서 사용하는 컴포넌트 코드 관리            |
| **consts**     | 프로젝트내에서 공용으로 사용하는 전역 변수 정의                       |
| **pages** | 라우트별 페이지 정의                                                      |
| **store** | 전역 상태로 todo를 담아 관리                        |
| **styles**     | global style 및 color code 정의                                      |
| **types**      | 프로젝트내에서 전역으로 사용하는 type 정의                                                                 |


## 🙌 기억에 남는 트러블슈팅 및 리팩토링
- 모든 트러블슈팅 및 리팩토링 과정은 [Issue](https://github.com/hanseul-lee/react-todo-boilerplate/issues)를 참고하세요.

1.



## 👉 좋았던 점
- 


## 👉 아쉬웠던 점
- 에러 핸들링에 대해 좀 더 고민해보고 리팩토링하지 못한 것

<br />
