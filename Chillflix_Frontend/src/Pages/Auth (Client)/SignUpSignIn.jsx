import { useForm } from "react-hook-form"
import SmallSpinner from "./SmallSpinner";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PasswordComponent from "./PasswordComponent"
import SpinningLoader from "../../Loaders/SpinningLoader"
import NetflixSignIn from "./SignIn";
function SignUpSignIn() {
  const [initialLoading, setInitialLoading] = useState(true);

  const [openSignIn, setOpenSignIn] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showPasswordComponent, setShowPasswordComponent] = useState(false)

  const {
    register, 
    handleSubmit, 
    watch,
    formState:{errors}
  } = useForm();

useEffect(() => {
  const timer = setTimeout(() => {
    setInitialLoading(false);
  }, 2000);

  return () => clearTimeout(timer);

}, []);


if(initialLoading){
   return <SpinningLoader />
}

  

  const Auth = localStorage.getItem("isAuth")

  if(Auth === "true"){
    return <Navigate to="/Home" replace />
  }
  const onSubmit = async (data) => {
   setLoading(true)
    await new Promise((resolve) => {
      setTimeout(resolve,2000)
    })

    console.log(data);
    setLoading(false)
    setShowPasswordComponent(true)
  };


  const emailValue = watch("email");
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(emailValue);

  if(showPasswordComponent){
      return <PasswordComponent />
  }
  
  return (
    <>
    {openSignIn ? <NetflixSignIn setOpenSignIn={setOpenSignIn} /> :
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      
     

       {/* Background Banner */}
      <div className="absolute inset-0 bg-zinc-900 overflow-hidden">
        <img
          src="/images/SignInbg.webp"
          alt=""
          className="w-full h-full object-cover"
        />
      </div> 

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6 md:px-16">
        <h1>
         <img src="/images/NetflixLogoSvg.svg" alt="Netflix logo" className="w-32 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)] md:w-35 lg:w-40"/>
        </h1>

        <button className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded font-semibold cursor-pointer"
        onClick={() => {setOpenSignIn(true)}}
        >
          Sign In
        </button>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
        
        <div className="w-full max-w-3xl text-center">
          
          {/* Heading */}
          <h1 className="text-4xl md:text-7xl font-extrabold leading-tight">
            Endless Worlds,
            <br />
            One Chill.
          </h1>


          {/* Small Text */}
          <p className="mt-10 text-lg text-zinc-300">
            Ready to watch? Enter your email to create or restart your membership.
          </p>

          {/* Form UI */}
          <form onSubmit={handleSubmit(onSubmit)}  noValidate>
            <div className="mt-8  flex flex-col  md:flex-row gap-4 items-center justify-center">
              
              <input
                type="email"
                placeholder="Email address"
                className={`w-full md:w-[450px] h-16 px-5 rounded bg-zinc-900/80 border outline-none text-lg

                ${
                  !emailValue
                    ? "border-gray-300 focus:border-white"
                    : isValidEmail
                      ? "border-green-600 focus:border-green-600"
                      : "border-red-500 focus:border-red-500"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                    message: "Only Gmail addresses are allowed"
                  }
                })}
              />


              <button className=" w-full md:w-65 bg-red-500 hover:bg-red-700 transition h-16 px-10 rounded text-2xl font-semibold cursor-pointer">
                {
                  (loading && (!errors.email))
                    ? (<div className="flex justify-center items-center">
                        <SmallSpinner />
                      </div>
                    )
                    : "Get Started →"
                }
                
              </button>
            </div>
            <div className="flex pl-5 text-red-500">

              {errors.email && <p>{errors.email.message}</p> }
            </div>
          </form>
        </div>
      </div>
    </div>
  }
  </>
  );
}

export default SignUpSignIn;