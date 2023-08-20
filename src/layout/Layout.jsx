import { Outlet } from "react-router";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="bg-[#F6F7F9] min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
