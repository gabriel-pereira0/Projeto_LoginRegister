import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { InputField } from '../components/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatorio'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Mínimo 6 caracteres'),
});

export function Login() {
  const [message, setMessage] = useState('');

  // Hook de navegação entre paginas
  const navigate = useNavigate();

  // Hook para acessar dados de rotas anteriores
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Recupera usuário salvo no localstorge
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifica se existe o usuário - email e senha
    const user = users.find(
      (user) => user.email === data.email && user.password === data.password,
    );

    if (user) {
      // Caso usuário já exista realiza o direcionamento para tela de sucess
      setMessage('');
      navigate('/sucesslogin');
    } else {
      // Caso não exista, redirecionar para tela de register
      navigate('/register', {
        state: { message: 'Crie uma conta para continuar' },
      });
    }
  };
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100 px-4'>
      <form
        className='bg-white p-8 rounded-2xl shadow-md w-96'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className='text-2xl font-bold mb-6 text-center'>
          Acesse sua conta
        </h2>
        {message && <p className='text-red-500'>{message}</p>}

        <InputField
          label='Email'
          id='email'
          type='email'
          name='email'
          autoComplete='email'
          register={register}
          error={errors.email}
        />
        <InputField
          label='Senha'
          id='password'
          type='password'
          name='password'
          autoComplete='current-password'
          register={register}
          error={errors.password}
        />

        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer'
        >
          Entrar
        </button>
        <p className='mt-4 text-center text-sm'>
          Não tem uma conta?{' '}
          <Link
            to='/register'
            className='text-blue-600 hover:underline cursor-pointer'
          >
            Registre-se
          </Link>
        </p>
      </form>
    </div>
  );
}
