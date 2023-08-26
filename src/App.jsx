import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Layout from "./layout/Layout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
