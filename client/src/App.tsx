import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

import HomePage from 'features/Home'
import LoginPage from 'features/Login'
import ProfilePage from 'features/Profile'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
