import React from 'react';
import imgSucessRegister from '../assets/imageRegisterSucess.png';
import { useNavigate } from 'react-router';

export function RegisterSucess() {
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100 px-4'>
      <div className='bg-white p-8 rounded-2xl shadow-md w-96 text-center'>
        <img
          src={imgSucessRegister}
          alt='Sucesso'
          className='w-48 mx-auto mb-6'
        />

        <h1 className='text-xl font-bold text-green-600 mb-2'>
          Cadastro realizado com sucesso!
        </h1>
        <button
          className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer'
          onClick={() => navigate('/login')}
        >
          {' '}
          Efetuar Login
        </button>
      </div>
    </div>
  );
}
