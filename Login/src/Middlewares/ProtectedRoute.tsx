import { Navigate } from 'react-router-dom'

type Props = {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const token = localStorage.getItem('access_token') //lay access token da lưu sau  khi dang nhap

  if (!token) {
    return <Navigate to='/login' />
  }

  return children
}
