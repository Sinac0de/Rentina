import { Link } from "react-router";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const product = [
    { id: 1, name: "Cars", path: "/cars" },
    { id: 2, name: "Blog", path: "/blog" },
  ];

  const about = [
    { id: 1, name: "About Us", path: "/about" },
    { id: 2, name: "Privacy", path: "/privacy-policy" },
    { id: 3, name: "Terms", path: "/terms-conditions" },
  ];

  const socials = [
    {
      id: 1,
      name: "GitHub",
      href: "https://github.com/Sinac0de",
      icon: FaGithub,
    },
    {
      id: 2,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/sina-moradian-198836223/",
      icon: FaLinkedin,
    },
    {
      id: 3,
      name: "Email",
      href: "mailto:sinacodes@gmail.com",
      icon: FaEnvelope,
    },
  ];

  return (
    <footer className="dark:!bg-slate-900 p-5 lg:px-10 lg:bg-white">
      {/* topper section (Logo + Links) */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:border-b-[1px] lg:border-[#13131329] gap-10 mb-10 py-10">
        <div className="w-[220px] lg:min-w-[292px] h-fit flex flex-col gap-4">
          <h2 className="dark:font-bold text-primary-500 text-2xl lg:text-[32px]">
            Rentina
          </h2>
          <p className="font-medium text-secondary-300 text-xs lg:text-base">
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
        </div>
        {/* Links */}
        <div className="flex gap-10 flex-wrap justify-between">
          {/*---Product---*/}
          <div className="flex flex-col gap-3 lg:gap-5 lg:w-40">
            <h2 className="dark:text-slate-500 mb-2 text-secondary-500 font-semibold lg:text-xl">
              Product
            </h2>
            {product.map((item) => {
              return item.path === "." ? (
                <span
                  key={item.id}
                  className="text-secondary-300 text-base cursor-default opacity-50"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  key={item.id}
                  to={item.path}
                  className="text-secondary-300 text-base"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          {/*---ABOUT---*/}
          <div className="flex flex-col gap-3 lg:gap-5 lg:w-40">
            <h2 className="dark:text-slate-500 mb-2 text-secondary-500 font-semibold lg:text-xl">
              About
            </h2>
            {about.map((item) => {
              return item.path === "." ? (
                <span
                  key={item.id}
                  className="text-secondary-300 text-base cursor-default opacity-50"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  key={item.id}
                  to={item.path}
                  className="text-secondary-300 text-base"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          {/*---Socials---*/}
          <div className="flex flex-col gap-3 lg:gap-5 order-2 lg:w-40">
            <h2 className="dark:text-slate-500 mb-2 text-secondary-500 font-semibold lg:text-xl">
              Connect
            </h2>
            {socials.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 text-base flex items-center"
                >
                  <IconComponent className="mr-2" />
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
      {/* bottom section */}
      <div className="dark:text-slate-500 flex flex-col lg:flex-row lg:justify-between gap-5 text-xs lg:text-base font-semibold pb-10">
        <div className="flex justify-between lg:order-2 lg:gap-12">
          <Link to={"/privacy-policy"}>Privacy Policy</Link>
          <Link to={"/terms-conditions"}>Terms & Conditions</Link>
        </div>
        <p className="lg:order-1">©2025 Rentina. All rights reserved</p>
      </div>
      <div className="dark:text-slate-500 flex justify-center items-center">
        <h4>
          Made with <span className="text-xl">♥</span> by{" "}
          <a
            href="https://github.com/Sinac0de"
            target="_blank"
            rel="noreferrer"
          >
            Sina Moradian
          </a>
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
