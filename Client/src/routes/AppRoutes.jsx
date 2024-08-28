import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Auth/Register/Register";
import { Login } from "../pages/Auth/Login/Login";
import { MsgVerifyEmail } from "../pages/msg-verify-email/MsgVerifyEmail";
import { MsgToken } from "../pages/msg-token/MsgToken";
import { GetReservations } from "../pages/Getreservations/GetReservations";
import { Rutas } from "../pages/rutas/Rutas";
import { About } from "../pages/about/About";
import { Faqs } from "../pages/faqs/Faqs";
import { ResetPassword } from "../pages/Auth/ResetPassword/ResetPassword";
import { RecoverPassword } from "../pages/Auth/RecoverPassword/RecoverPassword";
import { MsgRecoverPassword } from "../pages/msg-recoverPassword/MsgRecoverPassword";
import { SelectDate } from "../pages/SelectDate/SelectDate";
import { DetailReservation } from "../pages/detailReservation/DetailReservation";
import { Historical } from "../pages/historical/Historical";
import { UserReservations } from "../pages/userReservations/UserReservations";
import { Profile } from "../pages/profile/Profile";
import { ErrorPage } from "../pages/errorPage/ErrorPage";
import { EditUser } from "../pages/editUser/EditUser";
import { useContext } from "react";
import { AppContext } from "../context/TranbolicoContextProvider";
import Layout from "../layout/Layout";
import { Admin } from "../pages/Admin/Admin/Admin";
import { ViewUserAdmin } from "../pages/Admin/ViewUserAdmin/ViewUserAdmin";
import { ViewEditRoute } from "../pages/Admin/ViewEditRoute/ViewEditRoute";
import { ViewAddPlanning } from "../pages/Admin/ViewAddPlanning/ViewAddPlanning";
import { PrivacyPolicy } from "../pages/PrivacyPolicy/PrivacyPolicy";
import { LegalNotice } from "../pages/legalNotice/LegalNotice";
import { ConfirmReservation } from "../pages/ConfirmReservation/ConfirmReservation";
import { Statistics } from "../pages/Admin/Statistics/Statistics";

export const AppRoutes = () => {
  const { globalState, loading } = useContext(AppContext);
  return (
    <>
      {!loading && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
              <Route path="/legalNotice" element={<LegalNotice />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/recoverPassword" element={<RecoverPassword />} />
              <Route
                path="/MsgRecoverPassword"
                element={<MsgRecoverPassword />}
              />
              <Route
                path="/resetPassword/:hashtoken"
                element={<ResetPassword />}
              />
              <Route path="/MsgVerifyEmail" element={<MsgVerifyEmail />} />
              <Route path="/MsgVerifyEmail/:hashtoken" element={<MsgToken />} />
              <Route path="/routes" element={<Rutas />} />

              {globalState?.user && (
                <>
                  <Route path="/reservations" element={<GetReservations />}>
                    <Route index element={<SelectDate />} />
                    <Route path="returnDate" element={<SelectDate />} />
                    <Route
                      path="detailReservation"
                      element={<DetailReservation />}
                    />
                  </Route>
                  <Route
                    path="/confirmReservation"
                    element={<ConfirmReservation />}
                  />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/editUser" element={<EditUser />} />
                  <Route path="/resetPassword" element={<ResetPassword />} />

                  <Route path="/myReservations" element={<Historical />}>
                    <Route index element={<UserReservations />} />
                    <Route path="historical" element={<UserReservations />} />
                  </Route>
                </>
              )}

              {globalState?.user?.user_type === 1 && (
                <>
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin/routes" element={<ViewEditRoute />} />
                  <Route path="/admin/planning" element={<ViewAddPlanning />} />
                  <Route path="/admin/viewUser" element={<ViewUserAdmin />} />
                  <Route path="/admin/statistics" element={<Statistics />} />
                </>
              )}

              <Route path="*" element={<ErrorPage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};
