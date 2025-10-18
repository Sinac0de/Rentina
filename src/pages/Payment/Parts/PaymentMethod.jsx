import TextInput from "src/components/common/TextInput";
import BulletIcon from "src/assets/Icons/BulletIcon";
import visaImg from "src/assets/images/Visa.png";
import paypalImg from "src/assets/images/PayPal.png";
import bitcoinImg from "src/assets/images/Bitcoin.png";
import { Form } from "react-router";

const PaymentMethod = () => {
  return (
    <div className="dark:bg-slate-600 bg-white w-full overflow-hidden p-5 rounded-[10px] flex flex-col gap-5">
      {/* header */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <h3 className="dark:text-slate-300 font-bold text-secondary-500 lg:text-xl">
            Payment Method
          </h3>
          <h4 className="text-secondary-300 text-xs font-medium lg:text-sm">
            Step 3 of 4
          </h4>
        </div>
        <h5 className="text-secondary-300 text-xs font-medium lg:text-sm">
          Please enter your payment method
        </h5>
      </div>
      {/* body */}
      <Form className="flex flex-col gap-5">
        <div className="dark:bg-slate-700 bg-[#F6F7F9] p-5 rounded-[10px]">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3 mb-4">
              <BulletIcon />
              <h3 className="dark:text-slate-300 font-semibold">Credit Card</h3>
            </div>
            <img src={visaImg} className="object-contain" />
          </div>
          <div className="lg:grid lg:grid-cols-2 gap-x-5">
            <TextInput
              name="cardnumber"
              title="Card Number"
              label="Card Number"
              placeHolder="Card number"
              bgWhite
            />
            <TextInput
              name="exprationdate"
              title="Expration Date"
              label="Expration Date"
              placeHolder="DD/MM/YY"
              bgWhite
            />
            <TextInput
              name="cardholder"
              title="Card Holder"
              label="Card Holder"
              placeHolder="Card holder"
              bgWhite
            />
            <TextInput
              name="towncity"
              title="CVC"
              label="CVC"
              placeHolder="CVC"
              bgWhite
            />
          </div>
        </div>
        {/* radio buttons */}
        <div className="flex relative p-4 items-center">
          <input
            id="paypal"
            type="radio"
            name="paymentMethod"
            className="relative z-10"
          />
          <label
            htmlFor="paypal"
            className="dark:bg-slate-700 p-5 pl-9 pr-8 order-2 flex justify-between items-center cursor-pointer absolute top-0 left-0 w-full h-full bg-[#F6F7F9] rounded-[10px]"
          >
            <h4 className="dark:text-slate-300 text-secondary-500 text-sm font-semibold lg:text-base">
              PayPal
            </h4>
            <img src={paypalImg} className="object-contain" />
          </label>
        </div>
        <div className="flex relative p-4 items-center">
          <input
            id="bitcoin"
            type="radio"
            name="paymentMethod"
            className="relative z-10"
          />
          <label
            htmlFor="bitcoin"
            className="dark:bg-slate-700 p-5 pl-9 pr-8 order-2 flex justify-between items-center cursor-pointer absolute top-0 left-0 w-full h-full bg-[#F6F7F9] rounded-[10px]"
          >
            <h4 className="dark:text-slate-300 text-secondary-500 text-sm font-semibold lg:text-base">
              Bitcoin
            </h4>
            <img src={bitcoinImg} className="object-contain" />
          </label>
        </div>
      </Form>
    </div>
  );
};

export default PaymentMethod;
