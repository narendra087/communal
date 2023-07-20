import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

import AuthPage from 'features/Auth'
import HomePage from 'features/Home'
import ProfilePage from 'features/Profile'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
