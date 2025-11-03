import { jwtDecode } from 'jwt-decode'
import { Navigate, Outlet } from 'react-router-dom'

const RequireAuth = ( ) => {
  const isAuthenticate = localStorage.getItem('access-token')

  if(!isAuthenticate){
    return <Navigate to='/login' />
  }

  return <Outlet/>
}

const RequireRole = ( {allowedRoles, redirectPath} ) => {
  const token = localStorage.getItem('access-token')
  console.log(token)

  if (!token) {
    return <Navigate to={redirectPath} />
  }
  try {

    const { ROLE } = jwtDecode(token)

    if (!allowedRoles.includes(ROLE)) {
      return <Navigate to={redirectPath} />
    }

  } catch (error) {
    console.error('Invalid token:', error)
    return <Navigate to={redirectPath} />
  }

  return <Outlet/>
}

export {RequireAuth, RequireRole}