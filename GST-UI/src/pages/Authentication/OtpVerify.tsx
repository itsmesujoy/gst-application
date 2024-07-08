
import React, { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import { VerifyOtp } from '../../services/loginservice';
import axios from 'axios';


const OtpVerify: React.FC = () => {
  const [otp, setOtp] = useState<any>()

  const location = useLocation();
  const email = location.state?.data;

  const handleResendOtp = async () => {

    let data = await axios.post("https://GST-PORTAL.cfapps.eu10.hana.ondemand.com/users/resend-otp", { email: email })
    console.log(data);

    toast.success(data?.data?.message)
  }

  const handleVerifyOtp = async () => {
    let data: any = await VerifyOtp({
      email: email,
      otp: otp
    })
    console.log(data);

    if (data?.message) {
      toast.error(data?.message)
    }
    else {
      localStorage.setItem("token", data.data.token);

      window.location.replace('/')
    }
  }


  return (
    <>


      <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark" style={{ backgroundColor: "#fbfbfb" }}>
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" style={{ width: "10%" }} src={Logo} alt="Logo" />
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
                Sign In to GST Req
              </h2>




              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  OTP
                </label>
                <div className="relative">
                  <input
                    onChange={(e) => {
                      setOtp(e.target.value)
                    }}
                    type="password"

                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <span className="absolute right-4 top-4">

                  </span>
                </div>
              </div>

              <div className="mb-5">
                <input
                  onClick={handleVerifyOtp}
                  type="submit"
                  value="Submit OTP"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>

              <div className="mt-6 text-center">
                <p>
                  Do you want to resend
                  <span className="text-primary" onClick={handleResendOtp} style={{ cursor: "pointer", marginLeft: "5px" }}>
                    OTP?
                  </span>
                </p>
                <p>
                or Back to

                  <Link to="/" className="text-primary"  style={{  marginLeft: "5px" }} >
                    Log in
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

export default OtpVerify;
