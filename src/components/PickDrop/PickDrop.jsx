import { motion } from "framer-motion";
import { useEffect, useState } from "react";
// Using existing components
import { Button } from "src/components/ui/button";
import { Switch } from "@radix-ui/react-switch";
import DropOffIcon from "src/assets/Icons/DropOffIcon";
import PickUpIcon from "src/assets/Icons/PickUpIcon";
import PickDropIcon from "../../assets/Icons/PickDropIcon";
// Using existing toast library
import toast from "react-hot-toast";

// date helpers
import { addDays, isBefore, isEqual, startOfDay } from "date-fns";
import { ArrowLeftRight, ArrowUpDown } from "lucide-react";

// --- Types ---
const LocationOption = { id: Number, name: String, value: String };

// --- Mock locations (replace with API) ---
const MOCK_LOCATIONS = [
  { id: 1, name: "Tehran", value: "tehran" },
  { id: 2, name: "Kermanshah", value: "kermanshah" },
  { id: 3, name: "Hamedan", value: "hamedan" },
  { id: 4, name: "Shiraz", value: "shiraz" },
  { id: 5, name: "Mashhad", value: "mashhad" },
  { id: 6, name: "Isfahan", value: "isfahan" },
];

// --- Smart defaults ---
const getDefaultPickDate = () => {
  const tomorrow = addDays(new Date(), 1);
  return startOfDay(tomorrow);
};
const getDefaultPickTime = () => {
  // default to 10:00 next day
  const date = getDefaultPickDate();
  date.setHours(10, 0, 0, 0);
  return date;
};
const getDefaultDropDate = () => addDays(getDefaultPickDate(), 3);
const getDefaultDropTime = () => {
  const date = getDefaultDropDate();
  date.setHours(10, 0, 0, 0);
  return date;
};

// Try to get user location (GPS) - will fallback gracefully
async function getUserLocationName() {
  try {
    if (!navigator.geolocation) return null;
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async () => {
          // NOTE: You should call a reverse-geocoding API here. We mock.
          // For privacy & simplicity, we'll return null which lets the UI fallback.
          resolve(null);
        },
        () => resolve(null),
        { timeout: 5000 }
      );
    });
  } catch (e) {
    return null;
  }
}

// --- Main Component ---
const PickDrop = () => {
  const [locations] = useState(MOCK_LOCATIONS);

  // form data
  const [pickLocation, setPickLocation] = useState(locations[0]?.value || "");
  const [dropLocation, setDropLocation] = useState(locations[0]?.value || "");

  const [pickDate, setPickDate] = useState(getDefaultPickDate());
  const [dropDate, setDropDate] = useState(getDefaultDropDate());
  const [pickTime, setPickTime] = useState(getDefaultPickTime());
  const [dropTime, setDropTime] = useState(getDefaultDropTime());

  // advanced toggles
  const [sameLocation, setSameLocation] = useState(true); // Drop-off = Pick-up by default
  const [useGps, setUseGps] = useState(true);

  // Validation state
  const [errors, setErrors] = useState({});

  // --- Effects ---
  // If sameLocation toggled on, keep drop location synced
  useEffect(() => {
    if (sameLocation) setDropLocation(pickLocation);
  }, [sameLocation, pickLocation]);

  // If pick date/time changes, ensure drop >= pick + minimal duration (1 hour)
  useEffect(() => {
    const pickDateTime = new Date(pickDate);
    pickDateTime.setHours(pickTime.getHours(), pickTime.getMinutes(), 0, 0);

    const dropDateTime = new Date(dropDate);
    dropDateTime.setHours(dropTime.getHours(), dropTime.getMinutes(), 0, 0);

    if (
      isBefore(dropDateTime, pickDateTime) ||
      isEqual(dropDateTime, pickDateTime)
    ) {
      // auto-correct drop to be +3 days or +3 hours whichever keeps UX sensible
      const autoDrop = addDays(pickDateTime, 3);
      setDropDate(startOfDay(autoDrop));
      const newTime = new Date(startOfDay(autoDrop));
      newTime.setHours(pickTime.getHours(), pickTime.getMinutes(), 0, 0);
      setDropTime(newTime);
    }
  }, [pickDate, pickTime, dropDate, dropTime]);

  // Try autofill from GPS once
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!useGps) return;
      const name = await getUserLocationName();
      if (!mounted) return;
      if (name) {
        // try to match name to known locations
        const match = locations.find((l) =>
          name.toLowerCase().includes(l.name.toLowerCase())
        );
        if (match) {
          setPickLocation(match.value);
          if (sameLocation) setDropLocation(match.value);
          toast.success(`مکان از GPS پر شد: ${match.name}`);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [useGps, locations, sameLocation]);

  // --- Actions ---
  const swapLocations = () => {
    // animated swap
    const prevPick = pickLocation;
    const prevDrop = dropLocation;
    setPickLocation(prevDrop);
    setDropLocation(prevPick);
    toast.success("جاها جابجا شدند");
  };

  const validate = () => {
    const newErrors = {};

    if (!pickLocation)
      newErrors.pickLocation = "لطفاً محل تحویل را انتخاب کنید.";
    if (!dropLocation)
      newErrors.dropLocation = "لطفاً محل بازپس‌گیری را انتخاب کنید.";

    // build pick and drop DateTimes for validation
    const pickDateTime = new Date(pickDate);
    pickDateTime.setHours(pickTime.getHours(), pickTime.getMinutes(), 0, 0);

    const dropDateTime = new Date(dropDate);
    dropDateTime.setHours(dropTime.getHours(), dropTime.getMinutes(), 0, 0);

    if (
      isBefore(dropDateTime, pickDateTime) ||
      isEqual(dropDateTime, pickDateTime)
    ) {
      newErrors.dropDate =
        "تاریخ/زمان بازگشت باید بعد از تاریخ/زمان تحویل باشد.";
    }

    // minimal rental duration (e.g., 1 hour)
    const minimalDurationMs = 1000 * 60 * 60;
    if (dropDateTime.getTime() - pickDateTime.getTime() < minimalDurationMs) {
      newErrors.dropTime = "حداقل طول دوره باید 1 ساعت باشد.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0]);
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const pickDateTime = new Date(pickDate);
    pickDateTime.setHours(pickTime.getHours(), pickTime.getMinutes(), 0, 0);

    const dropDateTime = new Date(dropDate);
    dropDateTime.setHours(dropTime.getHours(), dropTime.getMinutes(), 0, 0);

    // final payload
    const payload = {
      pickLocation,
      dropLocation,
      pickDate: pickDateTime.toISOString(),
      dropDate: dropDateTime.toISOString(),
    };

    // In real app: call API
    console.log("Search payload:", payload);
    toast.success("در حال جستجو...");
  };

  // Format date for date picker
  const formatDateForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle date change
  const handleDateChange = (setter) => (value) => {
    if (value) {
      const date = new Date(value);
      setter(date);
    }
  };

  // Handle time change
  const handleTimeChange = (setter) => (value) => {
    if (value) {
      const [hours, minutes] = value.split(":").map(Number);
      const newTime = new Date();
      newTime.setHours(hours, minutes, 0, 0);
      setter(newTime);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row gap-4 items-start lg:items-end lg:justify-center max-w-6xl mx-auto p-4"
    >
      {/* Pick-up Card */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="w-full lg:w-[48%] bg-white dark:bg-slate-800 rounded-xl p-5 shadow-md"
      >
        <div className="flex items-center gap-3 mb-3">
          <PickUpIcon color="#3563E9" />
          <h3 className="text-lg font-semibold">Pick-Up</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="col-span-1 sm:col-span-1">
            <label
              htmlFor="pick-location"
              className="block text-sm font-medium mb-1"
            >
              Location
            </label>
            <select
              id="pick-location"
              value={pickLocation}
              onChange={(e) => setPickLocation(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-slate-700 dark:text-white"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.value}>
                  {loc.name}
                </option>
              ))}
            </select>
            {errors.pickLocation && (
              <p className="text-red-500 text-sm mt-1">{errors.pickLocation}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="pick-date"
              className="block text-sm font-medium mb-1"
            >
              Date
            </label>
            <input
              type="date"
              id="pick-date"
              value={formatDateForInput(pickDate)}
              onChange={(e) => handleDateChange(setPickDate)(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-slate-700 dark:text-white"
              min={formatDateForInput(new Date())}
            />
            {errors.pickDate && (
              <p className="text-red-500 text-sm mt-1">{errors.pickDate}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="pick-time"
              className="block text-sm font-medium mb-1"
            >
              Time
            </label>
            <input
              type="time"
              id="pick-time"
              value={`${String(pickTime.getHours()).padStart(2, "0")}:${String(
                pickTime.getMinutes()
              ).padStart(2, "0")}`}
              onChange={(e) => handleTimeChange(setPickTime)(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-slate-700 dark:text-white"
            />
            {errors.pickTime && (
              <p className="text-red-500 text-sm mt-1">{errors.pickTime}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Swap & Options */}
      <div className="w-full lg:w-fit flex flex-col justify-center items-center gap-3">
        <motion.button
          type="button"
          onClick={swapLocations}
          whileTap={{ scale: 0.96 }}
          className="bg-primary-500 text-white p-3 rounded-xl shadow-md hover:bg-primary-600 transition-colors"
          aria-label="Swap pick-up and drop-off locations"
        >
          <ArrowLeftRight size={35} color="white" className="hidden lg:block" />
          <ArrowUpDown size={35} color="white" className="lg:hidden block" />
        </motion.button>

        <Button type="submit" className="w-full lg:w-44 h-12 mt-2 lg:mt-0">
          Find Cars
        </Button>
      </div>

      {/* Drop-off Card */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: 0.02 }}
        className="w-full lg:w-[48%] bg-white dark:bg-slate-800 rounded-xl p-5 shadow-md"
      >
        <div className="flex items-center gap-3 mb-3">
          <DropOffIcon color="#3563E9" />
          <h3 className="text-lg font-semibold">Drop-Off</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="drop-location"
              className="block text-sm font-medium mb-1"
            >
              Location
            </label>
            <select
              id="drop-location"
              value={dropLocation}
              onChange={(e) => setDropLocation(e.target.value)}
              disabled={sameLocation}
              className={`w-full p-2 border rounded-md dark:bg-slate-700 dark:text-white ${
                sameLocation ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.value}>
                  {loc.name}
                </option>
              ))}
            </select>
            {errors.dropLocation && (
              <p className="text-red-500 text-sm mt-1">{errors.dropLocation}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="drop-date"
              className="block text-sm font-medium mb-1"
            >
              Date
            </label>
            <input
              type="date"
              id="drop-date"
              value={formatDateForInput(dropDate)}
              onChange={(e) => handleDateChange(setDropDate)(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-slate-700 dark:text-white"
              min={formatDateForInput(pickDate)}
            />
            {errors.dropDate && (
              <p className="text-red-500 text-sm mt-1">{errors.dropDate}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="drop-time"
              className="block text-sm font-medium mb-1"
            >
              Time
            </label>
            <input
              type="time"
              id="drop-time"
              value={`${String(dropTime.getHours()).padStart(2, "0")}:${String(
                dropTime.getMinutes()
              ).padStart(2, "0")}`}
              onChange={(e) => handleTimeChange(setDropTime)(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-slate-700 dark:text-white"
            />
            {errors.dropTime && (
              <p className="text-red-500 text-sm mt-1">{errors.dropTime}</p>
            )}
          </div>
        </div>
      </motion.div>
    </form>
  );
};

export default PickDrop;
