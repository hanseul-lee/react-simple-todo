import { Route, Routes } from 'react-router-dom';

import { Todo, Login, SignUp } from '@/pages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
