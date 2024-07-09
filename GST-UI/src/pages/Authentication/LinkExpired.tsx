
import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';
import Expired from '../../images/logo/Expired.svg';





const LinkExpired: React.FC = () => {




 



  return (
    <>

      <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark" style={{ backgroundColor: "#fbfbfb" }}>
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img className="hidden dark:block" style={{ width: "10%" }} src={Expired} alt="Logo" />
                <img className="dark:hidden" src={Expired} alt="Logo" />
              </Link>



            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
               This Link was Expired
              </h2>


          



          

              <div  className="mt-6 text-center">
              <p>
                 Back to

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

export default LinkExpired;
