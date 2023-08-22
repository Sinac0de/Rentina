import PickDropIcon from "../Icons/PickDropIcon";

const PickDrop = () => {
  return (
    <section className="flex flex-col items-center">
      {/* Pick Up */}
      <div>Pick Up</div>

      <button className="bg-primary-500 rounded-lg w-fit">
        <PickDropIcon />
      </button>

      {/* Drop off*/}
      <div>Drop off</div>
    </section>
  );
};

export default PickDrop;
