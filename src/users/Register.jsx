import AccountForm from "./components/register/AccountForm";
import CompanyForm from "./components/register/CompanyForm";
import ClassificationForm from "./components/register/ClassificationForm";
import ScheduleForm from "./components/register/ScheduleForm";
import StepProgress from "./components/register/StepProgress";
import { useState } from "react";
import useFormStore from "./context/useFormStore";
import Swal from "sweetalert2";

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const submitForm = useFormStore((state) => state.submitForm);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    try {
      const res = await submitForm(); 
      
      if (res.success) {
        Swal.fire({
          text: res.message || "Registration successful!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          window.location.href = "/login"; 
        }, 2000);
      } else {
        Swal.fire({
          text: res.message || "Registration failed. Please try again.",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Failed to register:", error);

      Swal.fire({
        text: "Failed to register. Please try again.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-bg-login bg-center bg-cover">
        <div className="absolute inset-0 bg-white opacity-70 z-10"></div>
        <div className="z-50 w-full md:flex md:items-center md:justify-between p-5 ">
          <div className="w-full pb-10 md:pb-0 md:w-6/12 px-20 flex flex-col items-center">
            <img src="/public/admin/logo.png" alt="Logo" className="w-3/4 md:w-fit" />
          </div>

          <div className="md:w-6/12 md:px-10 ">
            <div className="bg-white p-8 md:h-[42rem] h-[36rem] hide-scrollbar overflow-y-scroll rounded-xl shadow-lg">
              <p className="font-semibold mb-4 text-center text-lg md:text-xl tracking-[.40em]">REGISTRATION</p>

              <StepProgress currentStep={currentStep} />

              {currentStep === 1 && <AccountForm onNext={handleNext} />}
              {currentStep === 2 && <CompanyForm onNext={handleNext} />}
              {currentStep === 3 && <ClassificationForm onNext={handleNext} />}
              {currentStep === 4 && <ScheduleForm onSubmit={handleSubmit} />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
