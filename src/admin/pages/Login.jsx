import Input from "../components/input";
import InputPassword from "../components/InputPassword";
import Button from "../components/Button";

export default function Login() {
    return (
      <>
        <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-bg-login bg-center bg-cover">
          <div className="absolute inset-0 bg-white opacity-70 z-10"></div>
          <div className="z-50 w-full md:flex md:items-center md:justify-between p-5 md:p-40">
            {/* Logo dan Welcome Text */}
            <div className="w-full pb-10 md:pb-0 md:w-6/12 px-20 flex flex-col items-center">
                <p className="font-bold text-xl md:text-2xl text-center tracking-[.20em] mb-4 md:mb-0">WELCOME TO</p>
                <img src="/public/admin/logo.png" alt="Logo" className="w-3/4 md:w-fit" />
            </div>

            {/* Login Form */}  
            <div className="md:w-6/12 md:px-10">
                <div className="bg-white p-8 rounded-xl shadow-lg ">
                <p className="font-semibold mb-4 text-center text-lg md:text-xl tracking-[.40em]">LOGIN</p>
                <form>
                    <div className="mb-4">
                    <Input id={'email'} type={'email'} label={'E-Mail'} name={'email'} placeholder={'E-Mail'} />
                    </div>
                    <div className="mb-6">
                    <InputPassword disabled={false} label={'Password'} name={'password'} placeholder={'Password'} />
                    </div>
                    <div className="text-right pb-4 flex justify-center">
                    <Button label={'Login'} type={'submit'} disabled={false} className={'w-full md:w-fit py-2 px-5 bg-red text-white rounded-md hover:bg-gray'} />
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
