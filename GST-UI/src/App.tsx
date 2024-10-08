import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import InvMatchedDataPage from './components/Charts/InvMatchedData';
import InvUNMatchedDataPage from './components/Charts/InvUnMatchedData';
import MatchedDataPage from './components/Charts/MatchedData';
import InwardEwb from './components/Charts/inwardEwb';
import InwardInv from './components/Charts/inwardInv';
import UNMatchedDataPage from './components/Charts/unMatchedData';
import PageTitle from './components/PageTitle';
import MatchedReportPage from './components/Reports/MatchedReport';
import DefaultLayout from './layout/DefaultLayout';
import LinkExpired from './pages/Authentication/LinkExpired';
import OtpVerify from './pages/Authentication/OtpVerify';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ForgotPassword from './pages/Authentication/forgotPassword';
import ResetPassword from './pages/Authentication/resetPassword';
import Calendar from './pages/Calendar';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';

function App() {
  const [loading, setLoading] = useState<boolean>();
  const { pathname } = useLocation();
  const [token, setToken] = useState<any>(localStorage.getItem("token")||"")

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  // useEffect(() => {
   
  //   setTimeout(() => setLoading(false), 1000);
  //  let data=localStorage.getItem("token")
  //  if(data){
  //   setToken(false)}
   
  // }, []);

  return loading ? (
    <Loader />
  ) : (token==""?
   
    <Routes>
        <Route
         path="/"
          element={
            <>
             
              <SignIn />
            </>
          }
        />
        <Route
         path="/forgot-password"
          element={
            <>
             
              <ForgotPassword />
            </>
          }
        />
         <Route
         path="/reset-password"
          element={
            <>
             
              <ResetPassword />
            </>
          }
        />
         <Route
         path="/link-expired"
          element={
            <>
             
              <LinkExpired />
            </>
          }
        />
        <Route
         path="/signup"
          element={
            <>
             
              <SignUp />
            </>
          }
        />
          <Route
         path="/otp"
          element={
            <>
             
              <OtpVerify />
            </>
          }
        />
        </Routes>
    :<>
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/InwardEWB"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <InwardEwb />
            </>
          }
        />
          <Route
          path="/InwardInv/matched-data"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <InvMatchedDataPage />
            </>
          }
        />
           <Route
          path="/InwardEWB/matched-data"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <MatchedDataPage />
            </>
          }
        />
          <Route
          path="/report/exact-match"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <MatchedReportPage />
            </>
          }
        />
           <Route
          path="/InwardEWB/unmatched-data"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <UNMatchedDataPage />
            </>
          }
        />
          <Route
          path="/InwardInv/unmatched-data"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <InvUNMatchedDataPage />
            </>
          }
        />
        <Route
        
          path="/InwardINV"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <InwardInv />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
    </>
  );
}

export default App;
