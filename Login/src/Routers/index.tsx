import { Navigate, Route, Routes } from 'react-router-dom'
import { publicRoutes } from './publicRoutes'
import { privateRoutes } from './privateRoutes'
import ProtectedRoute from '../Middlewares/ProtectedRoute'


export default function AppRoute() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<ProtectedRoute>{route.element}</ProtectedRoute>}
        />
      ))}
    </Routes>
  )
}
