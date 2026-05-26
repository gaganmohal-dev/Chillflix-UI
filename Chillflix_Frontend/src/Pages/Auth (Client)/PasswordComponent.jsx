import { CloudCog } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import SmallSpinner from "./SmallSpinner";

function PasswordComponent() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState:{errors, dirtyFields, isSubmitted}
  } = useForm();

  const [loading, setLoading] = useState(false);

  const OnSubmit = async (data) => {
    setLoading(true);

    await new Promise((resolve) => {
      setTimeout(resolve,2000)
    })
    console.log(data);
    localStorage.setItem("isAuth", "true")
    setLoading(false)
    navigate("/Home")
  }

  const passwordValue = watch("password");

  const isValidPassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/.test(passwordValue)
  && passwordValue.length >= 8;

 
  return (
    <>
      
      <div className="min-h-screen bg-gradient-to-b from-[#4b0000] via-black to-black text-white">
      
      {/* Navbar */}
      <nav className="border-b border-white/10 px-6 md:px-16 py-5">
        <img
          src="/images/NetflixLogoSvg.svg"
          alt="Netflix Logo"
          className="w-32 md:w-40"
        />
      </nav>

      {/* Main Content */}
      <div className="flex justify-center px-6 py-20">
        
        <div className="w-full max-w-xl">
          
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Create Password
          </h1>

          {/* Small Text */}
          <p className="mt-5 text-zinc-300 text-lg leading-relaxed">
            Your account is almost ready. Create a strong password to
            secure your Chillflix experience and continue watching your
            favorite movies and shows anytime.
          </p>

      {/* Password Box */}
        <form onSubmit={handleSubmit(OnSubmit)}>
          <div className="mt-10 bg-white/15 border border-white/10 rounded-md p-5">
            
            <label className="block text-sm text-zinc-300 mb-2">
              Password
            </label>

            <input
              {...register("password", {
                required: "Password is Required",
                minLength:{
                  value:8,
                  message: "Password must be at least 8 characters"
                },
                validate: {
                    hasLetterAndNumber: (value) =>
                      /^(?=.*[A-Za-z])(?=.*\d).+$/.test(value)
                      || "Must contain letters and numbers",

                    hasSpecialSymbol: (value) =>
                      /(?=.*[@$!%*?&]).+$/.test(value)
                      || "Must contain at least one special symbol"
                  }

              })}
              type="password"
              placeholder="Enter your password"
              className={`w-full h-14 px-4 rounded bg-zinc-900/80 border
                outline-none text-white text-lg

                ${
                  !isSubmitted
                    ? "border-gray-300 focus:border-white"

                    : errors.password
                      ? "border-red-500 focus:border-red-500"

                      : "border-green-600 focus:border-green-600"
                }
                `}
            />

            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
          </div>
           
          {/* Tips */}
          <div className="mt-5 text-zinc-400 text-sm leading-6">
            <p>• Use at least 8 characters</p>
            <p>• Include letters and numbers</p>
            <p>• At least one special Symbol too</p>
          </div>

          {/* Continue Button */}
          <button
            className="mt-8 w-full h-14 bg-red-600 hover:bg-red-700 
            transition rounded font-semibold text-lg cursor-pointer"
                
          >
            {loading ?  <div className="flex justify-center"><SmallSpinner /></div>  : "Continue"}
          </button>
      </form>  
          {/* Footer Small Help */}
          <div className="mt-10">
            <button className="text-white text-lg hover:underline">
              Need Help?
            </button>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}

export default PasswordComponent;