import { Link } from "react-router";

const Footer = () => {
  const about = [
    { id: 1, name: "How it works", path: "." },
    { id: 2, name: "Featured", path: "." },
    { id: 3, name: "Partnership", path: "." },
    { id: 4, name: "Bussiness Relation", path: "." },
  ];

  const socials = [
    { id: 1, name: "Discord", path: "." },
    { id: 2, name: "Instagram", path: "." },
    { id: 3, name: "Twitter", path: "." },
    { id: 4, name: "Facebook", path: "." },
  ];

  const community = [
    { id: 1, name: "Events", path: "." },
    { id: 2, name: "Blog", path: "." },
    { id: 3, name: "Podcast", path: "." },
    { id: 4, name: "Invite a friend", path: "." },
  ];

  return (
    <footer className="dark:!bg-slate-900 p-5 md:px-10 md:bg-white">
      {/* topper section (Logo + Links) */}
      <div className="flex flex-col md:flex-row md:justify-between md:border-b-[1px] md:border-[#13131329] gap-10 mb-10 py-10">
        <div className="w-[220px] md:min-w-[292px] h-fit flex flex-col gap-4">
          <h2 className="dark:font-bold text-primary-500 text-2xl md:text-[32px]">
            Rentina
          </h2>
          <p className="font-medium text-secondary-300 text-xs md:text-base">
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-10 flex-wrap justify-between">
          {/*---ABOUT---*/}
          <div className="flex flex-col gap-3 md:gap-5 md:w-40">
            <h2 className="dark:text-slate-500 mb-2 text-secondary-500 font-semibold md:text-xl">
              About
            </h2>
            {about.map((item) => {
              return (
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
          <div className="flex flex-col gap-3 md:gap-5 order-2 md:w-40">
            <h2 className="dark:text-slate-500 mb-2 text-secondary-500 font-semibold md:text-xl">
              Socials
            </h2>
            {socials.map((item) => {
              return (
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
          {/*---Community---*/}
          <div className="flex flex-col gap-3 md:gap-5 order-1 md:w-40">
            <h2 className="dark:text-slate-500 mb-2 text-secondary-500 font-semibold md:text-xl">
              Community
            </h2>
            {community.map((item) => {
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className="text-secondary-300 text-base text-base"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* bottom section */}
      <div className="dark:text-slate-500 flex flex-col md:flex-row md:justify-between gap-5 text-xs md:text-base font-semibold pb-10">
        <div className="flex justify-between md:order-2 md:gap-12">
          <Link to={"."}>Privacy & Policy</Link>
          <Link to={"."}>Terms & Condition</Link>
        </div>
        <p className="md:order-1">©2025 Rentina. All rights reserved</p>
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
