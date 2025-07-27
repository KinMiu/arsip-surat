import { useEffect } from "react"
import LoginForm from "./access/LoginForm"

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <LoginForm/>
}

export default Login