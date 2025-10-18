import { Link } from "react-router";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { ArrowLeft } from "lucide-react";

const AuthNavbar = () => {
  return (
    <>
      <Link
        to="/"
        className="absolute top-10 left-10 flex gap-1 items-center text-sm text-primary-600 dark:text-primary-400"
      >
        <ArrowLeft size={20} />
        Back to Website
      </Link>
      <AnimatedThemeToggler className="text-primary-600 absolute top-10 right-10" />
    </>
  );
};

export default AuthNavbar;
