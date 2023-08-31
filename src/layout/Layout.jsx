import { useState } from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileNavBar from "../components/NavBar/MobileNavBar";
import FilterSidebar from "../components/FilterSideBar/FilterSideBar";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

const Layout = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // just for test
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <ScrollToTop />
      <MobileNavBar
        isNavCollapsed={isNavCollapsed}
        setIsNavCollapsed={setIsNavCollapsed}
      />
      <div
        className={`${
          !isFilterOpen && "hidden"
        } fixed top-0 left-0 w-full h-full md:hidden`}
      >
        <FilterSidebar />
      </div>
      <div
        className={`${!isNavCollapsed ? "fixed right-0 left-0 blur-lg" : ""}`}
        onClick={() => !isNavCollapsed && setIsNavCollapsed(true)}
      >
        <Header
          setIsNavCollapsed={setIsNavCollapsed}
          setIsFilterOpen={setIsFilterOpen}
        />
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
