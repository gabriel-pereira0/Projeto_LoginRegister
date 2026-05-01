import React from 'react';
import { Routes, Route } from 'react-router';

import { Login } from '../pages/login';
import { Register } from '../pages/Register';
import { LoginSucess } from '../pages/LoginSucess';
import { RegisterSucess } from '../pages/RegisterSucess';

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/sucesslogin' element={<LoginSucess />} />
      <Route path='/sucessregister' element={<RegisterSucess />} />
    </Routes>
  );
}
