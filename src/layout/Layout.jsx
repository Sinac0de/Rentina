import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import MobileNavBar from "src/components/NavBar/MobileNavBar";
import FilterSidebar from "src/components/FilterSideBar/FilterSideBar";
import ScrollToTop from "src/components/ScrollToTop/ScrollToTop";
import CloseIcon from "src/components/Icons/CloseIcon";

const Layout = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // just for test
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Add a useEffect to set body overflow when the navbar opens
  useEffect(() => {
    if (!isNavCollapsed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup: Reset the body overflow when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isNavCollapsed]);

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
        } fixed top-0 left-0 w-full h-full overflow-y-auto p-10 bg-white z-30 md:hidden`}
      >
        <div
          className="absolute top-5 right-5"
          onClick={() => setIsFilterOpen(false)}
        >
          <CloseIcon />
        </div>
        <FilterSidebar />
      </div>
      <div onClick={() => !isNavCollapsed && setIsNavCollapsed(true)}>
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
