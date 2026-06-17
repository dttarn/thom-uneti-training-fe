import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { loginApi, getProfileApi } from '../../Apis/Commons/authApis'

export const useLogin = () => {
  const navigate = useNavigate() ///ham chuyen trang
  
  //xu ly POST, PUT, PATH, DELETE
  return useMutation({
    mutationFn: loginApi,

    onSuccess: async (data) => {
      localStorage.setItem('access_token', data.access_token)

      localStorage.setItem('refresh_token', data.refresh_token)

      const profile = await getProfileApi(data.access_token)

      localStorage.setItem('role', profile.role)

      if (profile.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/home')
      }
    },

    onError: (error) => {
      console.log(error)
    },
  })
}
