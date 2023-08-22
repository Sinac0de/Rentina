import { Link } from "react-router-dom";

const Slider = ({ title }) => {
  return (
    <section>
      <header className="flex justify-between">
        <h3>{title}</h3>
        <Link to="." className="text-primary-500 font-semibold">
          <p>View all</p>
        </Link>
      </header>
      {/* slides */}
      <div>{}</div>
    </section>
  );
};

export default Slider;
