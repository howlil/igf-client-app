import Input from "../components/input";
import InputPassword from "../components/InputPassword";
import Button from "../components/Button";
import { useState } from "react";
import api from '../../utils/api'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log('berhasil')
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await api.post('/login', formData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token)
        localStorage.setItem('username', response.data.data.username)
        api.defaults.headers['Authorization'] = `Bearer ${response.data.data.token}`;
        Swal.fire({
          text: response.data.message,
          icon: "success",
          timer: 1000,
          showConfirmButton: false, 
        });
  
        setTimeout(() => {
          if (response.data.data.username == 'admin') {
            navigate('/dashboard-table');
          } else if (response.data.data.username != 'admin') {
            navigate('/u/companies');
          } else {
            console.error("Unexpected username in response: ", response.data.username);
          }
        }, 1000);
      } else {
        Swal.fire({
          text: response.data.message,
          icon: "error",
          timer: 1000,
          showConfirmButton: false, 
        });
      }

    } catch (error) {
      console.error(error)
    } finally{
      setLoading(false)
    }
  }
    return (
      <>
        <section className="flex flex-col md:flex-row items-center justify-center h-screen bg-bg-login bg-center bg-cover">
          <div className="absolute inset-0 bg-white h-screen opacity-70 z-10"></div>
          <div className="z-50 w-full md:flex md:items-center md:justify-between p-5 md:p-40">
            {/* Logo dan Welcome Text */}
            <div className="w-full pb-10 md:pb-0 md:w-6/12 px-20 flex flex-col items-center">
                <p className="font-bold text-xl md:text-2xl text-center tracking-[.20em] mb-4 md:mb-0">WELCOME TO</p>
                <img src="/admin/logo.png" alt="Logo" className="w-3/4 md:w-fit" />
            </div>

            {/* Login Form */}  
            <div className="md:w-6/12 md:px-10">
                <div className="bg-white p-8 rounded-xl shadow-lg ">
                <p className="font-semibold mb-4 text-center text-lg md:text-xl tracking-[.40em]">LOGIN</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <Input id={'email'} type={'email'} label={'E-Mail'} name={'email'} placeholder={'E-Mail'} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-6">
                    <InputPassword disabled={false} label={'Password'} name={'password'} placeholder={'Password'} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="text-right pb-4 flex justify-center">
                    <Button label={isLoading ? 'Loading...' : 'Login'} type={'submit'} disabled={false} className={'w-full md:w-fit py-2 px-5 bg-red text-white rounded-md hover:bg-gray'} />
                    </div>
                    <p className="text-gray-600 text-sm text-center">Don't have any account? <span className="text-red underline underline-offset-1"><a href="">Register Here</a></span></p>
                </form>
                </div>
            </div>
          </div>
        </section>
      </>
    );
}
