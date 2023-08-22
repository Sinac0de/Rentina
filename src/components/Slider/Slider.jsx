import { Link } from "react-router-dom";

const Slider = ({ title }) => {
  return (
    <section>
      <header className="flex justify-between">
        <h3>{title}</h3>
        <Link to=".">View all</Link>
      </header>
      {/* slides */}
      <div>{}</div>
    </section>
  );
};

export default Slider;
