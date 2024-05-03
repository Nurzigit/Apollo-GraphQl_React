import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation, gql } from '@apollo/client';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
}).required();

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [createUser, { loading, error, data }] = useMutation(CREATE_USER_MUTATION);

  const onSubmit = data => {
    createUser({
      variables: data
    }).then(response => {
      console.log('User created:', response.data.createUser);
    }).catch(err => {
      console.error('Error creating user:', err);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      <p>{errors.name?.message}</p>

      <input {...register('email')} placeholder="Email" />
      <p>{errors.email?.message}</p>

      <input {...register('password')} type="password" placeholder="Password" />
      <p>{errors.password?.message}</p>

      <button type="submit" disabled={loading}>Register</button>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Success! User has been created.</p>}
    </form>
  );
}

export default RegisterForm;
