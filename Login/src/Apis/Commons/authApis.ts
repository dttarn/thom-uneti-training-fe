import { instance } from '../../Configs/axios'
import type { LoginRequest } from '../../Types/auth'

export const loginApi = async (payload: LoginRequest) => {
  const response = await instance.post('/auth/login', payload)

  return response.data
}

export const getProfileApi = async (token: string) => {
  const response = await instance.get('/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}