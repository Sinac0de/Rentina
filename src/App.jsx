import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import { RouterProvider } from "react-router/dom";

import Layout from "./layout/Layout";
import EditProfile from "./pages/Authentication/EditProfile";
import Profile from "./pages/Authentication/Profile";
import Signin from "./pages/Authentication/Signin";
import Signup from "./pages/Authentication/Signup";
import BlogDetails from "./pages/Blog/BlogDetails";
import Blog from "./pages/Blog/Blog";
import CarDetails from "./pages/Cars/CarDetails/CarDetails";
import Cars from "./pages/Cars/Cars";
import RentalCars from "./pages/Cars/RentalCars";
import RentedCarsPage from "./pages/Cars/RentedCarsPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ErrorPage from "./pages/Error/ErrorPage";
import NotFoundPage from "./pages/Error/NotFoundPage";
import Favorites from "./pages/Favorites/Favorites";
import Home from "./pages/Home/Parts/Home";
import Payment from "./pages/Payment/Payment";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import SearchResults from "./pages/Search/SearchResults";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
          <Route index element={<Home />} />
          <Route path="cars" element={<Cars />}>
            <Route index element={<RentalCars />} />
          </Route>
          <Route path="cars/:id" element={<CarDetails />} />
          <Route path="payment/:id" element={<Payment />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="rented-cars" element={<RentedCarsPage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogDetails />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="dashboard" element={<Dashboard />} />
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
