import { useNavigate } from "react-router-dom"
import SweetAlertService from "../../helper/sweetalertService"
import { useState } from "react"
import { IMAGES } from "../../assets";
import ServiceUser from "../../api/service/User.service"
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      if(username === '' || password === '') {
        return SweetAlertService.showError('Error', "lengkapi data login")
      }
      const data = {
        USERNAME: username,
        PASSWORD: password
      }
      const response = await ServiceUser.loginUser(data)
      if (response.status === false) {
        return SweetAlertService.showError(`${response.message}`, response.message)
      }
      if (response.status === false) {
        return SweetAlertService.showError(`${response.message}`, response.message)
      }

      const decode = jwtDecode(response.accessToken)
      localStorage.setItem('access-token', response.accessToken)
      // console.log(response)

      if(decode.ROLE === '2'){
        navigate('/dashboard-user')
        return window.location.reload();
      }
      navigate('/')
      return window.location.reload();
    } catch (error) {
      SweetAlertService.showError('Error !!', error)
    }
  }
  // const toRegister = () => {
  //   navigate('/sign-up')
  // }
  return(
    <div className="flex justify-center bg-gray-200 items-center px-2 w-screen h-screen">
      <div className="bg-white flex justify-center items-center flex-col sm:flex-row p-5 rounded shadow-lg gap-4 border-blue-700">
        <img 
          src={IMAGES.image2} 
          alt="Illustrasi" 
          style={{
            width: '100px'
          }}
          className="hidden md:flex"
        />
        <div className="flex flex-col gap-2">
          <div>
            <h2>Selamat Datang di </h2>
            <p><b>Pengarsipan Surat</b></p>
          </div>
          <div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 text-sm">
                <p>Username</p>
                <input 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="bg-white border border-blue-700 rounded px-2 py-1"
                />
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <p>Password</p>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="bg-white border border-blue-700 rounded px-2 py-1"
                />
              </div>
              <div className="flex flex-col gap-3 mt-1">
                <button 
                onClick={handleLogin}
                className="bg-blue-700 w-full hover:bg-blue-300 px-3 py-1 rounded text-white text-sm" 
                >
                  Login
                </button>
                {/* <div className="flex flex-row gap-2 text-xs">
                  <span>Belum punya Akun ?</span>
                  <button 
                  className="text-blue-700 hover:text-blue-300"
                  onClick={toRegister}
                  >
                    Daftar disini
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm