import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ServiceUser from "../../api/service/User.service"
import SweetAlertService from "../../helper/sweetalertService"
import { IMAGES } from "../../assets"

const LoginForm = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')

  const handleRegister = async () => {
    try {
      if(name === '' || username === '' || password === '' || confPassword === '') {
        return SweetAlertService.showError('Error', "lengkapi data registrasi")
      }

      const data = {
        NAME: name,
        USERNAME: username,
        PASSWORD: password,
        CONFPASSWORD: confPassword
      }
      console.log(data)

      // console.log(name, username, password, confPassword)

      const response = await ServiceUser.addUser(data)
      console.log(response)
      if (response.status === false) {
        return SweetAlertService.showError(`${response.message}`, response.message)
      }
      SweetAlertService.showSuccess(`Success`, response.message)
      navigate('/login')
    } catch (error) {
      SweetAlertService.showError("Error !", error.response.data.message)
    }
  }

  const toLogin = () => {
    navigate('/login')
  }
  return(
    <div className="flex justify-center bg-gray-50 items-center px-2 w-screen h-screen">
      <div className="bg-white flex justify-center items-center flex-col sm:flex-row p-5 rounded shadow-lg gap-5 border-blue-700">
        <img 
          src={IMAGES.image} 
          alt="Illustrasi" 
          style={{
            width: '200px'
          }}
        />
        <div className="flex flex-col gap-2">
        <div>
            <h2>DAFTAR AKUN </h2>
            <p><b>SPK - Penerimaan Pegawai</b></p>
          </div>
          <div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 text-sm">
                <p>Nama</p>
                <input 
                  type="text"
                  placeholder="Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white border border-blue-700 rounded px-2 py-1"
                />
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <p>Username</p>
                <input 
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white border border-blue-700 rounded px-2 py-1"
                />
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <p>Password</p>
                <input 
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white border border-blue-700 rounded px-2 py-1"
                />
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <p>Confirm Password</p>
                <input 
                  type="password"
                  placeholder="********"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  className="bg-white border border-blue-700 rounded px-2 py-1"
                />
              </div>
              <div className="flex flex-col gap-3 mt-1">
                <button 
                onClick={handleRegister}
                className="bg-blue-700 w-full hover:bg-blue-300 px-3 py-1 rounded text-white text-sm" 
                >
                  Sign Up
                </button>
                <div className="flex flex-row gap-2 text-xs">
                  <span>Sudah punya akun?</span>
                  <button 
                  className="text-blue-700 hover:text-blue-300"
                  onClick={toLogin}
                  >
                    Masuk disini
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm