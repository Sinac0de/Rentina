import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import CloseIcon from "src/assets/Icons/CloseIcon";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import MobileNavBar from "src/components/NavBar/MobileNavBar";
import ScrollToTop from "src/components/ScrollToTop/ScrollToTop";

const Layout = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

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
    <div className="dark:bg-slate-800">
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
      </div>
      <div onClick={() => !isNavCollapsed && setIsNavCollapsed(true)}>
        <Header
          setIsNavCollapsed={setIsNavCollapsed}
          setIsFilterOpen={setIsFilterOpen}
        />
        <main className="dark:bg-slate-800 min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
