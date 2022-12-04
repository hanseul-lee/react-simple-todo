# react-simple-todo
> CRUD를 사용해 react와 react-query를 이용한 간단한 todo를 만들고 리팩토링한 과정을 담았습니다.

## 💻 Preview
### 1) 로그인, 회원가입

<img width="600" src="https://user-images.githubusercontent.com/69497936/200132522-f9982884-4cf3-4255-9963-2749ccf6400e.mov" />

### 2) Todo 




<img width="600" src="https://user-images.githubusercontent.com/69497936/205487503-39f0a3d4-bd48-43c5-ac99-83d1623d736f.mov" />

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

## 📦 폴더 구조

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

<br />

## 🙌 기억에 남는 트러블슈팅 및 리팩토링
- 모든 트러블슈팅 및 리팩토링 과정은 [Issue](https://github.com/hanseul-lee/react-todo-boilerplate/issues)를 참고해주시면 감사하겠습니다.

<br />

### 1. router 코드 구현 ([코드1](https://github.com/hanseul-lee/react-todo-boilerplate/pull/3/commits/a352bbba3cebe383ef599b4a2b11712d98abb20a), [코드2](https://github.com/hanseul-lee/react-todo-boilerplate/pull/3/commits/c4faa41eca7389545540ff09d8a8fccbabf8236a))

**문제**
- 기존 redirect 처리를 하면서 redirect 시 todo 페이지가 살짝 보이고 login페이지로 이동하는 이슈
- 코드
  ```js
  // pages/Auth/Login.tsx
  const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/');
      }
    }, [navigate]);
  ```

**해결 과정**

위 문제는 useEffect가 render 이후 실행되므로 발생하는 이슈였고
이를 해결하기 위해 react-router 공식문서를 찾아보니 [redirect](https://reactrouter.com/en/main/fetch/redirect#redirect) 페이지에서 비슷한 코드를 찾을 수 있었다.
```js
import { redirect } from "react-router-dom";

const loader = async () => {
  const user = await getUser();
  if (!user) {
    return redirect("/login");
  }
};
```
해당 코드에서는 인증에 대한 redirect 코드를 `loader`로 만들어 처리해주고 있었는데 [loader](https://reactrouter.com/en/main/route/loader) 는 react-router v6.4.0에서 새로 도입된 기능으로 아래와 같이 정의하고 있다.
```
 Each route can define a "loader" function to provide data to the route element before it renders.
```
기존 `useEffect`내 redirect 처리가 `after render` 과정에서 처리되어 생기는 이슈였기에 `before render`에 동작하는 `loader`는 딱 맞는 해결책이라 생각했다.

이를 적용하기 위해 기존 route 를 모두 수정해야 했는데 `RouterProvider, createBrowserRouter, loader, errorElement` 등은 모두 [v6.4.0](https://github.com/remix-run/react-router/releases/tag/react-router%406.4.0)에서 도입된 기능들이며 실제  react-query 공식문서 [React Example: React Router](https://tanstack.com/query/v4/docs/examples/react/react-router) 에도 사용하고 있었다.
<img width="690" alt="react-router v6.4.0" src="https://user-images.githubusercontent.com/69497936/201528550-8cd91478-26ee-4def-ac12-6a29d2ae83cf.png">

따라서 기존 router 코드를 아래와 같이 리팩토링했다.
- AS-IS
```js
// src/index.tsx

// ...
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);


// src/App.tsx
import { Route, Routes } from 'react-router-dom';

import { TodoList, Login, SignUp } from '@/pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
```

- TO-BE
```js
// src/index.tsx
import { router } from './router';

// ...
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools position="bottom-right" />
    </QueryClientProvider>
  </React.StrictMode>,
);

// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';

import { ErrorPage, Login, SignUp, TodoList } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoList />,
    loader: TodoListLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'todo/:todoId',
        element: <TodoList />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signUp',
    element: <SignUp />,
  },
]);

// src/pages/Auth/Login.tsx

// ...
export const loader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return redirect('/');
  }
};
```

이를 통해 기존 redirect에 대한 이슈 해결은 물론 에러 페이지까지 함께 구현할 수 있었다. 처음 react-query 공식문서에서 React Router Example을 봤을 땐, 기존에 익숙했던 라우팅 코드에 비해 너무 복잡해서 굳이 바꾸지 않고 해결해보려 했었다. (심지어 react-router 공식문서에 auth에 대한 example이 그대로 남아있기도 했다. [링크](https://github.com/remix-run/react-router/tree/dev/examples/auth)) 

하지만 react-router 공식문서를 계속해서 찾아보니 오히려 redirect, error처리, 라우팅까지 한번에 해결 가능한 방법이었고 머리를 싸매고 최대한 내 코드에 적용시켜 보려 노력했다. 저 기능들은 심지어 2달 전(2022.09)에 릴리즈된 버전이었기에 완전 따끈따끈한 기능이었고 어쩐지 공식문서에도 'new' 태그와 함께 `tutorial` 파트에도 모두 도입되어 있었다. 프론트엔드 기술 스택은 자주 변화한다는 말을 익히 들어왔지만, 이번 리팩토링에서 제대로 그 말을 느낄 수 있었다. 이런 해결 과정 덕분에 스터디원들에게도 이 업데이트에 대해 피드백해 줄 수 있었고, 매번 익숙한 코드에 의존하기보다 새로운 기술, 변화에 더 유연하게 받아들이는 자세의 중요성에 대해서도 확실하게 배울 수 있었던 시간이었다.


### 2. query에 staleTime 적용해 todo api 요청 최적화 ([코드](https://github.com/hanseul-lee/react-todo-boilerplate/commit/81330424a282ae8d0176df03e678ad7ccd9e23fd))

**문제**
기존 각 todo에 대해서 클릭할때마다 api요청으로 동일한 데이터를 불필요하게 불러옴

https://user-images.githubusercontent.com/69497936/205484782-05f600b0-4ad4-40bd-87ef-f5260889fad3.mov

**해결 과정**
todo는 URL param 정보를 통해 todo id를 가져오고 변경될 때마다 매번 새로운 요청을 보내고 있었음.
하지만 동일한 URL param에 중복해 호출될 경우 굳이 다시 요청할 이유가 없으므로 staleTime 적용해 동일한 요청에 대해서는 캐싱되도록 하여 네트워크 요청 최적화함.

```js
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 20,
    },
  },
});
```

https://user-images.githubusercontent.com/69497936/205484721-f0b8edef-7572-4c0c-9900-1037c55007ed.mov


### Reference.
- [react-router 공식문서](https://reactrouter.com/en/main)
- [react-query 공식문서 - React Example: React Router](https://tanstack.com/query/v4/docs/examples/react/react-router)

### 3. dependencies와 devDependencies 구분 

- dependencies
- devDependencies

 packge.json 내에서 제대로 사용하는지 확인하는 첫번째 사항임!
    
- 왜 CRA에서는 구분되지 않고 dependencies로 들어가는 거지?
   - 초기 셋팅 이후 내 packge.json을 봤는데 @type과 관련된 것들이 모두 dependencies에 들어가 있었다. 난 CRA 이후 package.json을 건드린  적이 없는데…?
- 이후 이를 구분해 나눠놓았지만 포스팅을 하며 궁금증이 생겨 찾아보니 다음과 같은 Dan Abramov의 친절한 코멘트를 찾을 수 있었다👍 
 ⇒ Node app들은 런타임에 배포되기 때문에 이 둘의 구분이 의미있다. 
반면, CRA에서는 결과적으로 모두 정적 번들이다. 따라서 이를 구분하는 것이 의미 없다.

  - 추가로 이 둘의 차이를 익히기 위해 구분하여 작성해도 된다는 Dan의 코멘트를 보고 구분하는 것을 유지하기로 했다.
    - https://github.com/facebook/create-react-app/issues/6180 
       ![image](https://user-images.githubusercontent.com/69497936/201474647-9ae61274-be7e-4b57-8f27-bc41969ba393.png)
    - https://github.com/facebook/create-react-app/issues/1764
      ![image](https://user-images.githubusercontent.com/69497936/201474819-67256b16-9085-4283-a1c9-8059da768967.png)


## 👉 아쉬웠던 점
- 에러 핸들링에 대해 좀 더 고민해보고 리팩토링하지 못한 것

## Reference.
- [wanted-pre-onboarding-challenge-fe-1-api](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api)

