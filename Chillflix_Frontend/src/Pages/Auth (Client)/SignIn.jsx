import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallSpinner from "./SmallSpinner";
export default function NetflixSignIn({setOpenSignIn}) {
 
    const [loading, setLoading] = useState()
    const navigate = useNavigate()
  const {
    register, 
    handleSubmit, 
    watch,
    formState:{errors , isSubmitted}
  } = useForm({
  mode: "onChange"
});
  

  const emailValue = watch("email");
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailValue);

   const passwordValue = watch("password");

  const isValidPassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/.test(passwordValue)
  && passwordValue.length >= 8;

  const onSubmit = async (data) => {
    setLoading(true);

    await new Promise((resolve) => {
      setTimeout(resolve,2000)
    })
    console.log(data);
    localStorage.setItem("isAuth", "true")
    setLoading(false)
    navigate("/Home" ,{replace: true})
  }

  

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/SignInbg.png"
          alt="Netflix Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-16 py-6">
        <img
          src="/images/NetflixLogoSvg.svg"
          alt="Netflix Logo"
          className="w-32 md:w-40"
        />
      </nav>

      {/* Sign In Card */}
      <div className="relative z-10 flex items-center justify-center min-h-[85vh] px-6">
        <div
          className="
          w-full max-w-md
          bg-black/75 backdrop-blur-sm
          rounded-md
          px-8 md:px-12 py-10
          shadow-2xl
          "
        >
          <h1 className="text-3xl font-bold mb-8">Sign In</h1>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}  noValidate>
            {/* Email */}
            <div>
             <input
                type="email"
                autoFocus
                placeholder="Email address"
                className={`w-full md:w-full h-14 px-5 rounded bg-zinc-900/80 border outline-none text-lg`}

                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                    message: "Only Gmail addresses are allowed"
                  }
                })}
              />
             {errors.email && <p className="text-red-600">{errors.email.message}</p> }
            </div>

            {/* Password */}
            <div>
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
                outline-none text-white text-lg`}
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="
              w-full h-12
              bg-red-600 hover:bg-red-700
              rounded-md
              font-semibold
              text-lg
              transition
              cursor-pointer
              "
           
            >
                {
                  (loading && (!errors.email))
                    ? (<div className="flex justify-center items-center">
                        <SmallSpinner />
                      </div>
                    )
                    : "Sign In"
                }
            </button>
          </form>

          {/* Extra Options */}
          <div className="mt-6 flex items-center justify-between text-sm text-zinc-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" className="accent-zinc-500" />
              Remember me
            </label>

            <button className="hover:underline cursor-pointer">
              Need help?
            </button>
          </div>

          {/* Footer Text */}
          <div className="mt-12 text-zinc-400 text-sm">
            <p>
              New to Chillflix?
              <button
                    type="button"
                    className="text-white hover:underline cursor-pointer ml-1"
                    onClick={() => setOpenSignIn(false)}
                    >
                    Sign up now
                    </button>
            </p>

            <p className="mt-4 text-xs leading-5 text-zinc-500">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

