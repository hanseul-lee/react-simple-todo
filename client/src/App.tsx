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
