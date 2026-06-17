import { useState } from 'react'
import { useLogin } from '../../Services/Queries/authQuery'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginMutation = useLogin()

  const handleLogin = () => {
    loginMutation.mutate({ email, password })
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-white'>
      <div className='w-full max-w-md rounded-xl bg-white p-8 shadow-2xl'>
        <h1 className='mb-6 text-center text-3xl font-bold text-gray-800'>
          Login
        </h1>

        <TextField
          fullWidth
          type='email'
          label='Email'
          margin='normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
        />

        <TextField
          fullWidth
          label='Password'
          margin='normal'
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full rounded-lg border border-gray-300 p-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
        />

        <Button
          variant='contained'
          type='button'
          onClick={handleLogin}
          disabled={loginMutation.isPending}
          className='w-full rounded-lg bg-blue-600 p-3 font-semibold text-white shadow-md transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50'
        >
          {loginMutation.isPending ? 'Loading...' : 'Login'}
        </Button>
      </div>
    </div>
  )

}
