import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import { RouterProvider } from "react-router/dom";

import Home from "./pages/Home/Home";
import Layout from "./layout/Layout";
import RentalCars from "./pages/Cars/RentalCars";
import CarDetails from "./pages/Cars/CarDetails/CarDetails";
import Cars from "./pages/Cars/Cars";
import Payment from "./pages/Payment/Payment";
import Signup from "./pages/Authentication/Signup";
import Signin from "./pages/Authentication/Signin";
import Profile from "./pages/Authentication/Profile";
import NotFoundPage from "./pages/Error/NotFoundPage";
import ErrorPage from "./pages/Error/ErrorPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path="cars" element={<Cars />}>
            <Route index element={<RentalCars />} />
            <Route path=":id" element={<CarDetails />} />
          </Route>
          <Route path="payment/:id" element={<Payment />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<NotFoundPage />} />
      </>
    ),
    {
      future: {
        v7_relativeSplatPath: true,
        v7_startTransition: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );
  return (
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  );
}

export default App;
