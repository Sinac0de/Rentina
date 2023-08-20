import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="bg-[#F6F7F9] min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
