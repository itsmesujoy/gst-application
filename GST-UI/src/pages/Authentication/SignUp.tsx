import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import axios from 'axios';

const SignUp: React.FC = () => {
  const [signupData, setSignupData] = useState<any>({})
  const navigate=useNavigate()

  const handleSignUp=async()=>{
    try{
    if(signupData.password===signupData.password2){
    let data=   await axios.post("https://GST-PORTAL.cfapps.eu10.hana.ondemand.com/users/signup",signupData)
    console.log(data);
    
      toast.success("Sign-up successfull")
      navigate("/")
    }
    else{
      toast.error("password did not match")
    }}
    catch(error:any){
      toast.error(error?.response?.data?.message);
      
    }
  }
  return (
    <>
  

      <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark"  style={{backgroundColor:"#fbfbfb"}}>
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>
             

              <span className="mt-15 inline-block">
              
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to GST Repo
              </h2>

         
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Name
                  </label>
                  <div className="relative">
                    <input
                    onChange={(e)=>{setSignupData({...signupData,username:e.target.value})}}
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                    
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                     onChange={(e)=>{setSignupData({...signupData,email:e.target.value})}}
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                     
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e)=>{setSignupData({...signupData,password:e.target.value})}}
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                   
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Re-type Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={(e)=>{setSignupData({...signupData,password2:e.target.value})}}
                      type="password"
                      placeholder="Re-enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                    
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <input
                  onClick={handleSignUp}
                    type="submit"
                    value="Create account"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>


                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{' '}
                    <Link to="/" className="text-primary" >
                      Sign in
                    </Link>
                  </p>
                </div>
       
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
