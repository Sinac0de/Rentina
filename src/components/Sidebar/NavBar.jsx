const NavBar = ({ isNavCollapsed, setIsNavCollapsed }) => {
  return (
    <div
      className={`${
        isNavCollapsed ? "w-0" : "w-4/5"
      } absolute right-0 bg-primary-400 rounded-l-3xl h-full z-[999] transition-all flex justify-center overflow-hidden text-white pt-10`}
    >
      <button
        onClick={() => setIsNavCollapsed(true)}
        className="absolute top-5 left-5 text-2xl"
      >
        X
      </button>
      <h3 className="text-2xl">NAV BAR</h3>
    </div>
  );
};

export default NavBar;
