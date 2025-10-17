import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Layout from "./layout/Layout";
import RentalCars from "./pages/Cars/RentalCars";
import CarDetails from "./pages/Cars/CarDetails/CarDetails";
import Cars from "./pages/Cars/Cars";
import Payment from "./pages/Payment/Payment";
import Signup from "./pages/Authentication/Signup";
import Signin from "./pages/Authentication/Signin";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Cars />}>
            <Route index element={<RentalCars />} />
            <Route path=":id" element={<CarDetails />} />
          </Route>
          <Route path="payment/:id" element={<Payment />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<h1>Page not found!</h1>} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
