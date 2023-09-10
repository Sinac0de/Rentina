import { Form } from "react-router-dom";
import TextInput from "src/components/common/TextInput";

const BillingInfo = () => {
  return (
    <div className="bg-white w-full overflow-hidden p-5 rounded-[10px] flex flex-col gap-5">
      {/* header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-secondary-500">Billing Info</h3>
          <h5 className="text-secondary-300 text-xs font-medium">
            Please enter your billing info
          </h5>
        </div>
        <h4 className="text-secondary-300 text-xs font-medium mt-1">
          Step 1 of 4
        </h4>
      </div>
      {/* body */}
      <div>
        <Form>
          <TextInput
            name="name"
            title="Name"
            label="Name"
            placeHolder="Your name"
          />
          <TextInput
            name="address"
            title="Address"
            label="Address"
            placeHolder="Address"
          />
          <TextInput
            name="phonenumber"
            title="Phone Number"
            label="Phone Number"
            placeHolder="Phone number"
          />
          <TextInput
            name="towncity"
            title="Town / City"
            label="Town / City"
            placeHolder="Town or City"
          />
        </Form>
      </div>
    </div>
  );
};

export default BillingInfo;
