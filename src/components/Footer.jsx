import { Link } from "react-router-dom";

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
    <footer className="bg-[#F6F7F9] p-5">
      {/* topper section (Logo + Links) */}
      <div className="flex flex-col gap-10 mb-10">
        <div className="w-[220px]">
          <h2 className="font-bold text-primary-500 text-[24px]">MORENT</h2>
          <p className="font-medium text-secondary-300 text-[12px]">
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-10 flex-wrap">
          {/*---ABOUT---*/}
          <div className="flex flex-col gap-3">
            <h2 className="mb-2 text-secondary-500 font-semibold">About</h2>
            {about.map((item) => {
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className="text-secondary-300 text-[16px]"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          {/*---Socials---*/}
          <div className="flex flex-col gap-3">
            <h2 className="mb-2 text-secondary-500 font-semibold">Socials</h2>
            {socials.map((item) => {
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className="text-secondary-300 text-[16px]"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          {/*---Community---*/}
          <div className="flex flex-col gap-3">
            <h2 className="mb-2 text-secondary-500 font-semibold">Community</h2>
            {community.map((item) => {
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className="text-secondary-300 text-[16px]"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* bottom section */}
      <div className="flex flex-col gap-5 text-[12px] font-semibold">
        <div className="flex justify-between">
          <Link to={"."}>Privacy & Policy</Link>
          <Link to={"."}>Terms & Condition</Link>
        </div>
        <p>©2022 MORENT. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
