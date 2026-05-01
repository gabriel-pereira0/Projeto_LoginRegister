import React, { useEffect, useState } from 'react';
import { InputField } from '../components/InputField';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup
    .string()
    .required('Senha é Obrigatória')
    .min(6, 'Mínimo 6 caracteres'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não conferem')
    .required('Confirmação é obrigatória'),
});

export function Register() {
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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Recupera os usuários salvos no localstorge
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Verifica se o email já foi registrado
    const exists = users.find((user) => user.email === data.email);
    if (exists) {
      // Se já existir, exibe mensagem de erro e interrompe o cadastro
      setMessage('Email já cadastrado');
      return;
    }
    // Adiciona novo usuário
    users.push({ name: data.name, email: data.email, password: data.password });
    // Salva a lista Atualizada
    localStorage.setItem('users', JSON.stringify(users));

    // Exibe mensagem de cadastro efetuado e direciona para login
    navigate('/sucessregister');
  };
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100 px-4'>
      <form
        className='bg-white p-8 rounded-2xl shadow-md w-96'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className='text-2xl font-bold mb-6 text-center'>
          Vamos criar sua conta
        </h2>
        {message && <p className='text-red-500'>{message}</p>}

        <InputField
          label='Nome'
          id='name'
          type='text'
          name='name'
          autoComplete='username'
          register={register}
          error={errors.name}
        />
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
          autoComplete='new-password'
          register={register}
          error={errors.password}
        />
        <InputField
          label='Confirmar Senha'
          id='confirmPassword'
          type='password'
          name='confirmPassword'
          autoComplete='new-password'
          register={register}
          error={errors.confirmPassword}
        />

        <button
          type='submit'
          className='w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition cursor-pointer'
        >
          Criar Conta
        </button>
        <p className='mt-4 text-center text-sm'>
          Já possui conta?{' '}
          <Link to='/' className='text-blue-600 hover:underline cursor-pointer'>
            Fazer Login
          </Link>
        </p>
      </form>
    </div>
  );
}
