import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Register } from "../pages/Auth/Register/Register";
import { Login } from "../pages/Auth/Login/Login";
import { MsgVerifyEmail } from "../pages/msg-verify-email/MsgVerifyEmail";
import { MsgToken } from "../pages/msg-token/MsgToken";
import { Reservations } from "../pages/reservations/Reservations";
import { Rutas } from "../pages/rutas/Rutas";
import { About } from "../pages/about/About";
import { Faqs } from "../pages/faqs/Faqs";
import { ResetPassword } from "../pages/Auth/ResetPassword/ResetPassword";
import { RecoverPassword } from "../pages/Auth/RecoverPassword/RecoverPassword";
import { MsgRecoverPassword } from "../pages/msg-recoverPassword/MsgRecoverPassword";
import { OneWayDate } from "../pages/oneWayDate/OneWayDate";
import { ReturnDate } from "../pages/returnDate/ReturnDate";
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
import { CreateRouteAdmin } from "../pages/Admin/CreateRouteAdmin/CreateRouteAdmin";
import { EditRouteAdmin } from "../pages/Admin/EditRouteAdmin/EditRouteAdmin";
import { ViewUserAdmin } from "../pages/Admin/ViewUserAdmin/ViewUserAdmin";

export const AppRoutes = () => {
  const { loading } = useContext(AppContext);
  return (
    <>
      {!loading && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/reservations" element={<Reservations />}>
                <Route index element={<OneWayDate />} />
                <Route path="returnDate" element={<ReturnDate />} />
                <Route
                  path="detailReservation"
                  element={<DetailReservation />}
                />
              </Route>
              <Route path="/profile" element={<Profile />} />
              <Route path="/routes" element={<Rutas />} />
              <Route path="/about" element={<About />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/editUser" element={<EditUser />} />
              <Route path="/recoverPassword" element={<RecoverPassword />} />
              <Route
                path="/MsgRecoverPassword"
                element={<MsgRecoverPassword />}
              />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route
                path="/resetPassword/:hashtoken"
                element={<ResetPassword />}
              />
              <Route path="/MsgVerifyEmail" element={<MsgVerifyEmail />} />
              <Route path="/MsgVerifyEmail/:hashtoken" element={<MsgToken />} />
              <Route path="/historical" element={<Historical />}>
                <Route index element={<UserReservations />} />
                <Route path="nextReservations" element={<UserReservations />} />
              </Route>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/createRoute" element={<CreateRouteAdmin />} />
              <Route path="/admin/editRoute" element={<EditRouteAdmin />} />
              <Route path="/admin/viewUser" element={<ViewUserAdmin />} />

              <Route path="*" element={<ErrorPage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};
