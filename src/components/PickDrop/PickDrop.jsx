import PickDropIcon from "../../assets/Icons/PickDropIcon";
import SmSelectInput from "../common/SmSelectInput";
import DatePickerInput from "../common/DatePickerInput";
import TimeInput from "../common/TimeInput";
import PickUpIcon from "src/assets/Icons/PickUpIcon";
import DropOffIcon from "src/assets/Icons/DropOffIcon";
import { useState } from "react";

const PickDrop = () => {
  // Mock location options - in a real app, these would come from an API
  const locations = [
    { id: 1, name: "Tehran", value: "tehran" },
    { id: 2, name: "Kermanshah", value: "kermanshah" },
    { id: 3, name: "Hamedan", value: "hamedan" },
    { id: 4, name: "Shiraz", value: "shiraz" },
    { id: 5, name: "Mashhad", value: "mashhad" },
    { id: 6, name: "Isfahan", value: "isfahan" },
  ];

  const [formData, setFormData] = useState({
    pickLocation: "",
    dropLocation: "",
    pickDate: "",
    dropDate: "",
    pickTime: "",
    dropTime: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.pickLocation)
      newErrors.pickLocation = "Pick-up location is required";
    if (!formData.dropLocation)
      newErrors.dropLocation = "Drop-off location is required";
    if (!formData.pickDate) newErrors.pickDate = "Pick-up date is required";
    if (!formData.dropDate) newErrors.dropDate = "Drop-off date is required";
    if (!formData.pickTime) newErrors.pickTime = "Pick-up time is required";
    if (!formData.dropTime) newErrors.dropTime = "Drop-off time is required";

    // Date validation - drop-off date should be after pick-up date
    if (
      formData.pickDate &&
      formData.dropDate &&
      formData.dropDate < formData.pickDate
    ) {
      newErrors.dropDate = "Drop-off date must be after pick-up date";
    }

    // Same day time validation
    if (formData.pickDate === formData.dropDate) {
      if (formData.dropTime <= formData.pickTime) {
        newErrors.dropTime = "Drop-off time must be after pick-up time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, this would submit to an API
      console.log("Form submitted:", formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row md:items-center md:justify-between gap-6 items-center my-8 relative lg:max-w-6xl lg:mx-auto"
    >
      {/* Pick Up Section */}
      <div className="dark:bg-slate-700 flex flex-col justify-between w-full bg-white rounded-xl p-4 gap-4 lg:max-w-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="dark:text-slate-300 flex items-center gap-3">
          <PickUpIcon color="#3563E9" />
          <h3 className="font-semibold text-lg">Pick-Up</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SmSelectInput
            label="Location"
            id="pick-location"
            options={locations}
            value={formData.pickLocation}
            onChange={(value) => handleInputChange("pickLocation", value)}
            error={errors.pickLocation}
          />
          <DatePickerInput
            id="pick-date"
            label="Date"
            value={formData.pickDate}
            onChange={(value) => handleInputChange("pickDate", value)}
            error={errors.pickDate}
          />
          <TimeInput
            label="Time"
            id="pick-time"
            value={formData.pickTime}
            onChange={(value) => handleInputChange("pickTime", value)}
            error={errors.pickTime}
          />
        </div>
        {errors.pickLocation && (
          <p className="text-red-500 text-sm mt-1">{errors.pickLocation}</p>
        )}
      </div>

      {/* Swap Button */}
      <button
        type="button"
        className="dark:text-slate-500 bg-primary-500 rounded-xl w-fit p-4 relative z-10 hover:bg-primary-600 transition-colors duration-300 shadow-md"
        onClick={() => {
          setFormData((prev) => ({
            ...prev,
            pickLocation: prev.dropLocation,
            dropLocation: prev.pickLocation,
          }));
        }}
        aria-label="Swap pick-up and drop-off locations"
      >
        <PickDropIcon color="white" />
        <div className="bg-primary-500/40 w-full h-full rounded-xl p-4 absolute z-[-1] right-0 bottom-0 blur-md"></div>
      </button>

      {/* Drop Off Section */}
      <div className="dark:bg-slate-700 flex flex-col justify-between w-full bg-white rounded-xl p-4 gap-4 lg:max-w-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="dark:text-slate-300 flex items-center gap-3">
          <DropOffIcon color="#3563E9" />
          <h3 className="font-semibold text-lg">Drop-Off</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SmSelectInput
            label="Location"
            id="drop-location"
            options={locations}
            value={formData.dropLocation}
            onChange={(value) => handleInputChange("dropLocation", value)}
            error={errors.dropLocation}
          />
          <DatePickerInput
            id="drop-date"
            label="Date"
            value={formData.dropDate}
            onChange={(value) => handleInputChange("dropDate", value)}
            error={errors.dropDate}
          />
          <TimeInput
            label="Time"
            id="drop-time"
            value={formData.dropTime}
            onChange={(value) => handleInputChange("dropTime", value)}
            error={errors.dropTime}
          />
        </div>
        {errors.dropLocation && (
          <p className="text-red-500 text-sm mt-1">{errors.dropLocation}</p>
        )}
      </div>

      {/* Submit Button - Mobile view */}
      <button
        type="submit"
        className="lg:hidden w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-colors duration-300"
      >
        Find Cars
      </button>
    </form>
  );
};

export default PickDrop;
