import React from 'react';
import imgSucessLogin from '../assets/imageLoginSucess.png';
import { Link } from 'react-router';

export function LoginSucess() {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100 px-4'>
      <div className='bg-white p-8 rounded-2xl shadow-md w-96 text-center'>
        <img src={imgSucessLogin} alt='Sucesso' className='w-48 mx-auto mb-6' />

        <h1 className='text-xl font-bold text-green-600 mb-2'>
          Login realizado com sucesso!
        </h1>

        <p className='text-gray-600 text-lg'>Bem-vindo ao sistema 🚀</p>

        <p className='text-gray-600 text-xs'>
          Para voltar a tela inicial{' '}
          <Link
            to='/login'
            className='text-blue-600 hover:underline cursor-pointer'
          >
            Click aqui!
          </Link>{' '}
        </p>
      </div>
    </div>
  );
}
