import { useEffect } from "react"
import Signup from "./access/SignupForm"

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <Signup/>
}

export default Login