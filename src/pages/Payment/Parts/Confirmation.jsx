import { Link } from "react-router-dom";
import securityIconImg from "src/assets/images/security.png";

const Confirmation = () => {
  return (
    <div className="bg-white w-full overflow-hidden p-5 rounded-[10px] flex flex-col gap-5">
      {/* header */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-secondary-500 lg:text-xl">
            Confirmation
          </h3>
          <h4 className="text-secondary-300 text-xs font-medium lg:text-sm">
            Step 4 of 4
          </h4>
        </div>
        <h5 className="text-secondary-300 text-xs font-medium lg:text-sm">
          We are getting to the end. Just few clicks and your rental is ready!
        </h5>
      </div>
      {/* body */}
      <div className="flex p-4 bg-[#F6F7F9] rounded-[10px] gap-3">
        <input type="checkbox" id="newsletter" />
        <label
          htmlFor="newsletter"
          className="text-xs text-[#1F2544] lg:text-base lg:font-semibold"
        >
          I agree with sending an Marketing and newsletter emails. No spam,
          promissed!
        </label>
      </div>

      <div className="flex p-4 bg-[#F6F7F9] rounded-[10px] gap-3">
        <input type="checkbox" id="terms&conditions" />
        <label
          htmlFor="terms&conditions"
          className="text-xs text-[#1F2544] lg:text-base lg:font-semibold"
        >
          I agree with our{" "}
          <span className="underline">terms and conditions</span> and{" "}
          <span className="underline">privacy policy</span>!
        </label>
      </div>

      <Link
        to="/payment/1"
        className="text-white bg-primary-500 py-2 px-[20px] h-full rounded text-base lg:py-4 font-medium flex justify-center items-center"
      >
        Rent now
      </Link>

      {/* footer */}
      <div>
        <img src={securityIconImg} className="object-contain mb-2" />
        <div>
          <h3 className="font-bold text-base text-secondary-500">
            All your data are safe
          </h3>
          <p className="font-medium text-xs text-secondary-300 lg:text-sm">
            We are using the most advanced security to provide you the best
            experience ever.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
