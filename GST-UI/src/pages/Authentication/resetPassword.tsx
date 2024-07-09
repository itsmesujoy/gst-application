
import React, { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';


import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../utility/Loader';



const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState<any>({})
  const navigate = useNavigate()
  const location = useLocation();
  const [loader, setLoader] = useState(false)

  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const email = query.get('email');
  useEffect(() => {
    handleCheckExpired()
  }, [])
  const handleCheckExpired = async () => {
    setLoader(true)
    let data: any = await axios.post("https://GST-PORTAL.cfapps.eu10.hana.ondemand.com/users/expired-link", { email: email })
    console.log(data.data);
    
    if (data?.data?.message === "Invalid or expired token") {
      navigate("/link-expired")
      setLoader(false)
    }
  }
  const handleResetPassword = async () => {
    try {
      if (password.password1 === password.password2) {
        let data: any = await axios.post("https://GST-PORTAL.cfapps.eu10.hana.ondemand.com/users/reset-password", {
          password: password.password1,
          email: email,
          token: token
        })
        toast.success(data?.data?.message)
        navigate("/")
      }
      else {
        toast.error("Password does not match")
      }
    }
    catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  }



  return (
    <>
{loader?<Loader/>:
      <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark" style={{ backgroundColor: "#fbfbfb" }}>
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" style={{ width: "10%" }} src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>




            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Reset Password
              </h2>


              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    onChange={(e) => {
                      setPassword({ ...password, password1: e.target.value })
                    }}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />


                </div>
              </div>

              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Re enter Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    onChange={(e) => {
                      setPassword({ ...password, password2: e.target.value })
                    }}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />


                </div>
              </div>


              <div className="mb-5">
                <input
                  onClick={handleResetPassword}
                  type="submit"
                  value="Reset Password"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>

              <div className="mt-6 text-center">

                <p>
                  Back to

                  <Link to="/" className="text-primary" style={{ marginLeft: "5px" }} >
                    Log in
                  </Link>

                </p>
              </div>






            </div>
          </div>
        </div>
      </div>}

    </>
  );
};

export default ResetPassword;
