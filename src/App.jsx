import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Layout from "./layout/Layout";
import RentalCars from "./pages/Cars/RentalCars";
import CarDetails from "./pages/Cars/CarDetails";
import Cars from "./pages/Cars/Cars";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Cars />}>
          <Route index element={<RentalCars />} />
          <Route path="/shop/:id" element={<CarDetails />} />
        </Route>
        <Route path="*" element={<h1>Page not found!</h1>} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
