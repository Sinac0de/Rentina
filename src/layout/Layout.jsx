import { useState } from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileNavBar from "../components/NavBar/MobileNavBar";

const Layout = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  return (
    <>
      <MobileNavBar
        isNavCollapsed={isNavCollapsed}
        setIsNavCollapsed={setIsNavCollapsed}
      />
      <div
        className={`${!isNavCollapsed ? "fixed right-0 left-0 blur-lg" : ""}`}
        onClick={() => !isNavCollapsed && setIsNavCollapsed(true)}
      >
        <Header setIsNavCollapsed={setIsNavCollapsed} />
        <main className="min-h-screen md:p-10 px-7">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
