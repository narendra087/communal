import React from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

import { useSelector } from 'react-redux'

import Layout from 'layouts'

import AuthPage from 'features/Auth'
import HomePage from 'features/Home'
import ProfilePage from 'features/Profile'

function App() {
  const isAuth = Boolean(useSelector((state:any) => state?.auth?.token))
  
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={isAuth ? <Navigate to={'/home'} /> : <AuthPage />} />
          
          <Route element={<Layout />}>
            <Route path='/home' element={!isAuth ? <Navigate to={'/'} /> : <HomePage />} />
            <Route path='/profile/:id' element={!isAuth ? <Navigate to={'/'} /> : <ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
