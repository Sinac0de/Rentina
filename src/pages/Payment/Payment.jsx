import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCarById, createRental } from "src/services/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "src/components/ui/radio-group";
import { Alert, AlertDescription } from "src/components/ui/alert";
import { CheckCircle, Lock, CreditCard, Wallet, Bitcoin } from "lucide-react";

// Zod schemas for each step
const billingSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address must be at least 5 characters"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10,15}$/, "Phone number must be 10-15 digits"),
  townCity: z
    .string()
    .min(1, "Town/City is required")
    .min(2, "Town/City must be at least 2 characters"),
});

const rentalSchema = z
  .object({
    pickLocation: z.string().min(1, "Pick-up location is required"),
    pickDate: z.string().min(1, "Pick-up date is required"),
    pickTime: z.string().min(1, "Pick-up time is required"),
    dropLocation: z.string().min(1, "Drop-off location is required"),
    dropDate: z.string().min(1, "Drop-off date is required"),
    dropTime: z.string().min(1, "Drop-off time is required"),
  })
  .refine(
    (data) => {
      // Validate that drop-off date is after pick-up date
      if (data.pickDate && data.dropDate) {
        const pickDate = new Date(data.pickDate);
        const dropDate = new Date(data.dropDate);
        return dropDate >= pickDate;
      }
      return true;
    },
    {
      message: "Drop-off date must be after pick-up date",
      path: ["dropDate"],
    }
  );

const paymentSchema = z
  .object({
    paymentMethod: z.enum(["credit", "paypal", "bitcoin"]),
    cardNumber: z.string().optional(),
    expirationDate: z.string().optional(),
    cardHolder: z.string().optional(),
    cvc: z.string().optional(),
  })
  .refine(
    (data) => {
      // If payment method is credit card, validate card details
      if (data.paymentMethod === "credit") {
        return (
          data.cardNumber && data.expirationDate && data.cardHolder && data.cvc
        );
      }
      return true;
    },
    {
      message: "All card details are required for credit card payment",
      path: ["cardNumber"],
    }
  )
  .refine(
    (data) => {
      // Validate card number format if payment method is credit
      if (data.paymentMethod === "credit" && data.cardNumber) {
        return /^\d{16}$/.test(data.cardNumber.replace(/\s/g, ""));
      }
      return true;
    },
    {
      message: "Card number must be 16 digits",
      path: ["cardNumber"],
    }
  )
  .refine(
    (data) => {
      // Validate expiration date format if payment method is credit
      if (data.paymentMethod === "credit" && data.expirationDate) {
        return /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(data.expirationDate);
      }
      return true;
    },
    {
      message: "Expiration date must be in MM/YY format",
      path: ["expirationDate"],
    }
  )
  .refine(
    (data) => {
      // Validate CVC format if payment method is credit
      if (data.paymentMethod === "credit" && data.cvc) {
        return /^\d{3,4}$/.test(data.cvc);
      }
      return true;
    },
    {
      message: "CVC must be 3 or 4 digits",
      path: ["cvc"],
    }
  );

const Payment = () => {
  const [carData, setCarData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [activeStep, setActiveStep] = useState("billing");
  const { id } = useParams();
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      activeStep === "billing"
        ? billingSchema
        : activeStep === "rental"
        ? rentalSchema
        : paymentSchema
    ),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phoneNumber: "",
      townCity: "",
      pickLocation: "",
      pickDate: "",
      pickTime: "",
      dropLocation: "",
      dropDate: "",
      dropTime: "",
      paymentMethod: "credit",
      cardNumber: "",
      expirationDate: "",
      cardHolder: "",
      cvc: "",
    },
  });

  const watchedFields = watch();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const data = await getCarById(id);
        setCarData(data);
      } catch (error) {
        console.error("Error fetching car:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  // Update resolver when step changes
  useEffect(() => {
    console.log("Step changed to:", activeStep);
    // Trigger validation when step changes to ensure form state is up to date
    trigger();
  }, [activeStep, trigger]);

  const handleNextStep = async () => {
    // Get current form values for debugging
    const formData = getValues();
    console.log("Current form data:", formData);

    const isValid = await trigger();
    console.log("Form validation result:", isValid);
    console.log("Form errors:", errors);

    if (isValid) {
      if (activeStep === "billing") {
        setActiveStep("rental");
      } else if (activeStep === "rental") {
        setActiveStep("payment");
      }
    } else {
      // Log specific validation errors
      console.log("Validation failed for step:", activeStep);
      Object.keys(errors).forEach((key) => {
        console.log(`Field ${key} error:`, errors[key]?.message);
      });

      // Also show a more user-friendly error message
      setSubmitError(
        "Please correct the errors in the form before continuing."
      );
    }
  };

  const handlePrevStep = () => {
    if (activeStep === "rental") {
      setActiveStep("billing");
    } else if (activeStep === "payment") {
      setActiveStep("rental");
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Log the incoming data for debugging
      console.log("Form data received in onSubmit:", data);

      // Also get the latest form values directly
      const formData = getValues();
      console.log("Current form values from getValues():", formData);

      // Ensure we're on the payment step
      if (activeStep !== "payment") {
        console.log(
          "Form submitted but not on payment step, current step:",
          activeStep
        );
        throw new Error("Please complete all steps before submitting payment");
      }

      // Validate car data
      if (!carData || !carData._id) {
        throw new Error("Car data is not available. Please try again.");
      }

      // Simplified validation - check each field individually with better error messages
      console.log("Starting validation checks...");

      // Billing info validation
      if (!formData.name || formData.name.trim() === "") {
        throw new Error("Full Name is required");
      }

      if (!formData.address || formData.address.trim() === "") {
        throw new Error("Address is required");
      }

      if (!formData.phoneNumber || formData.phoneNumber.trim() === "") {
        throw new Error("Phone Number is required");
      }

      if (!formData.townCity || formData.townCity.trim() === "") {
        throw new Error("Town/City is required");
      }

      // Rental info validation
      if (!formData.pickLocation || formData.pickLocation.trim() === "") {
        throw new Error("Pick-up Location is required");
      }

      if (!formData.pickDate || formData.pickDate.trim() === "") {
        throw new Error("Pick-up Date is required");
      }

      if (!formData.pickTime || formData.pickTime.trim() === "") {
        throw new Error("Pick-up Time is required");
      }

      if (!formData.dropLocation || formData.dropLocation.trim() === "") {
        throw new Error("Drop-off Location is required");
      }

      if (!formData.dropDate || formData.dropDate.trim() === "") {
        throw new Error("Drop-off Date is required");
      }

      if (!formData.dropTime || formData.dropTime.trim() === "") {
        throw new Error("Drop-off Time is required");
      }

      if (!formData.paymentMethod || formData.paymentMethod.trim() === "") {
        throw new Error("Payment Method is required");
      }

      console.log("All validation checks passed!");

      // Calculate total price - handle different data structures
      // Some cars use pricePerDay, others use specs.rental_price
      const rentalPrice =
        carData.pricePerDay ||
        carData.specs?.rental_price ||
        carData.specs?.pricePerDay ||
        0;

      const discountPercent =
        carData.specs?.discount_percent || carData.discountPercent || 0;

      const totalPrice = parseFloat(
        (rentalPrice * (1 - discountPercent / 100)).toFixed(2)
      );

      // Format phone number (remove any non-digit characters)
      const formattedPhoneNumber = formData.phoneNumber.replace(/\D/g, "");

      // Combine date and time
      const pickupDateTime = new Date(
        `${formData.pickDate}T${formData.pickTime}`
      );
      const dropoffDateTime = new Date(
        `${formData.dropDate}T${formData.dropTime}`
      );

      // Validate dates
      if (isNaN(pickupDateTime.getTime()) || isNaN(dropoffDateTime.getTime())) {
        throw new Error("Invalid date or time format");
      }

      // Validate that drop-off date is after pick-up date
      if (dropoffDateTime <= pickupDateTime) {
        throw new Error("Drop-off date must be after pick-up date");
      }

      // Create rental data with proper date formatting
      const rentalData = {
        carId: carData._id,
        startDate: pickupDateTime.toISOString(),
        endDate: dropoffDateTime.toISOString(),
        pickupLocation: formData.pickLocation,
        dropoffLocation: formData.dropLocation,
        totalPrice: totalPrice,
        paymentMethod: formData.paymentMethod,
        billingInfo: {
          name: formData.name.trim(),
          address: formData.address.trim(),
          phoneNumber: formattedPhoneNumber,
          townCity: formData.townCity.trim(),
        },
      };

      // Log the data being sent for debugging
      console.log("Sending rental data to backend:", rentalData);

      // Send to backend
      const response = await createRental(rentalData);

      if (response.success) {
        // Show success message and redirect to profile
        navigate("/payment-success", {
          state: {
            rental: response.data,
            car: carData,
          },
        });
      } else {
        throw new Error(response.error || "Failed to process payment");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      // Provide more specific error messages based on the error type
      if (error.message) {
        setSubmitError(error.message);
      } else if (error.response?.data?.error) {
        setSubmitError(`Error: ${error.response.data.error}`);
      } else {
        setSubmitError("Failed to process payment. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto dark:bg-gray-700"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 h-96 dark:bg-gray-800"></div>
                <div className="bg-white rounded-xl shadow-md p-6 h-96 dark:bg-gray-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!carData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-md p-12 dark:bg-gray-800">
              <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center dark:bg-red-900/30">
                <svg
                  className="h-8 w-8 text-red-600 dark:text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                Car Not Found
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                The car you&apos;re trying to pay for could not be found.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate pricing - handle different data structures
  const rentalPrice =
    carData.pricePerDay ||
    carData.specs?.rental_price ||
    carData.specs?.pricePerDay ||
    0;

  const discountPercent =
    carData.specs?.discount_percent || carData.discountPercent || 0;

  const subtotal = rentalPrice;
  const discount = subtotal * (discountPercent / 100);
  const tax = (subtotal - discount) * 0.1;
  const total = subtotal - discount + tax;

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Complete Your Rental
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Secure checkout for your {carData.make} {carData.model} (
              {carData.specs.type})
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form Steps */}
            <div className="lg:col-span-2">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Checkout</span>
                    <Lock className="h-5 w-5 text-green-500" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Progress Steps */}
                  <div className="relative flex justify-between mb-8">
                    <div className="absolute left-4 right-4 border-t-2 border-dashed border-slate-300 top-4"></div>
                    <div className="relative z-[1] flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activeStep === "billing"
                            ? "bg-blue-500 text-white"
                            : activeStep === "rental" ||
                              activeStep === "payment"
                            ? "bg-green-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        1
                      </div>
                      <span className="mt-2 text-sm font-medium">Billing</span>
                    </div>
                    <div className="relative z-[1] flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activeStep === "rental"
                            ? "bg-blue-500 text-white"
                            : activeStep === "payment"
                            ? "bg-green-500 text-white"
                            : activeStep === "billing"
                            ? "bg-gray-200"
                            : "bg-gray-200"
                        }`}
                      >
                        2
                      </div>
                      <span className="mt-2 text-sm font-medium">
                        Rental Info
                      </span>
                    </div>
                    <div className="relative z-[1] flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activeStep === "payment"
                            ? "bg-blue-500 text-white"
                            : activeStep === "billing" ||
                              activeStep === "rental"
                            ? "bg-gray-200"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        3
                      </div>
                      <span className="mt-2 text-sm font-medium">Payment</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Error Alert */}
                    {submitError && (
                      <Alert variant="destructive" className="mb-6">
                        <AlertDescription>{submitError}</AlertDescription>
                      </Alert>
                    )}

                    {/* Billing Info Step */}
                    {activeStep === "billing" && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-semibold">
                          Billing Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              {...register("name")}
                              className={errors.name ? "border-red-500" : ""}
                              placeholder="John Doe"
                            />
                            {errors.name && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              {...register("email")}
                              className={errors.email ? "border-red-500" : ""}
                              placeholder="john@example.com"
                            />
                            {errors.email && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                              id="address"
                              {...register("address")}
                              className={errors.address ? "border-red-500" : ""}
                              placeholder="123 Main Street"
                            />
                            {errors.address && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.address.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                              id="phoneNumber"
                              {...register("phoneNumber")}
                              className={
                                errors.phoneNumber ? "border-red-500" : ""
                              }
                              placeholder="1234567890"
                            />
                            {errors.phoneNumber && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.phoneNumber.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="townCity">Town / City</Label>
                            <Input
                              id="townCity"
                              {...register("townCity")}
                              className={
                                errors.townCity ? "border-red-500" : ""
                              }
                              placeholder="New York"
                            />
                            {errors.townCity && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.townCity.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button type="button" onClick={handleNextStep}>
                            Continue to Rental Info
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Rental Info Step */}
                    {activeStep === "rental" && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-semibold">
                          Rental Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Pick-Up */}
                          <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-3 flex items-center">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                              Pick-Up
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="pickLocation">Location</Label>
                                <Input
                                  id="pickLocation"
                                  {...register("pickLocation")}
                                  className={
                                    errors.pickLocation ? "border-red-500" : ""
                                  }
                                  placeholder="Pick-up location"
                                />
                                {errors.pickLocation && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.pickLocation.message}
                                  </p>
                                )}
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="pickDate">Date</Label>
                                  <Input
                                    id="pickDate"
                                    type="date"
                                    {...register("pickDate")}
                                    className={
                                      errors.pickDate ? "border-red-500" : ""
                                    }
                                  />
                                  {errors.pickDate && (
                                    <p className="text-red-500 text-sm mt-1">
                                      {errors.pickDate.message}
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <Label htmlFor="pickTime">Time</Label>
                                  <Input
                                    id="pickTime"
                                    type="time"
                                    {...register("pickTime")}
                                    className={
                                      errors.pickTime ? "border-red-500" : ""
                                    }
                                  />
                                  {errors.pickTime && (
                                    <p className="text-red-500 text-sm mt-1">
                                      {errors.pickTime.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Drop-Off */}
                          <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-3 flex items-center">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              Drop-Off
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="dropLocation">Location</Label>
                                <Input
                                  id="dropLocation"
                                  {...register("dropLocation")}
                                  className={
                                    errors.dropLocation ? "border-red-500" : ""
                                  }
                                  placeholder="Drop-off location"
                                />
                                {errors.dropLocation && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.dropLocation.message}
                                  </p>
                                )}
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="dropDate">Date</Label>
                                  <Input
                                    id="dropDate"
                                    type="date"
                                    {...register("dropDate")}
                                    className={
                                      errors.dropDate ? "border-red-500" : ""
                                    }
                                  />
                                  {errors.dropDate && (
                                    <p className="text-red-500 text-sm mt-1">
                                      {errors.dropDate.message}
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <Label htmlFor="dropTime">Time</Label>
                                  <Input
                                    id="dropTime"
                                    type="time"
                                    {...register("dropTime")}
                                    className={
                                      errors.dropTime ? "border-red-500" : ""
                                    }
                                  />
                                  {errors.dropTime && (
                                    <p className="text-red-500 text-sm mt-1">
                                      {errors.dropTime.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handlePrevStep}
                          >
                            Back
                          </Button>
                          <Button type="button" onClick={handleNextStep}>
                            Continue to Payment
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Payment Method Step */}
                    {activeStep === "payment" && (
                      <div className="space-y-6">
                        <h2 className="text-xl font-semibold">
                          Payment Method
                        </h2>

                        <RadioGroup
                          value={watchedFields.paymentMethod}
                          onValueChange={(value) =>
                            setValue("paymentMethod", value, {
                              shouldValidate: true,
                            })
                          }
                          className="space-y-4"
                        >
                          <div className="flex items-center space-x-3 p-4 border rounded-lg">
                            <RadioGroupItem value="credit" id="credit" />
                            <Label
                              htmlFor="credit"
                              className="flex items-center w-full"
                            >
                              <CreditCard className="mr-2 h-5 w-5" />
                              Credit/Debit Card
                            </Label>
                          </div>

                          <div className="flex items-center space-x-3 p-4 border rounded-lg">
                            <RadioGroupItem value="paypal" id="paypal" />
                            <Label
                              htmlFor="paypal"
                              className="flex items-center w-full"
                            >
                              <Wallet className="mr-2 h-5 w-5" />
                              PayPal
                            </Label>
                          </div>

                          <div className="flex items-center space-x-3 p-4 border rounded-lg">
                            <RadioGroupItem value="bitcoin" id="bitcoin" />
                            <Label
                              htmlFor="bitcoin"
                              className="flex items-center w-full"
                            >
                              <Bitcoin className="mr-2 h-5 w-5" />
                              Bitcoin
                            </Label>
                          </div>
                        </RadioGroup>

                        {/* Credit Card Form */}
                        {watchedFields.paymentMethod === "credit" && (
                          <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                            <h3 className="font-medium">Card Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="md:col-span-2">
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input
                                  id="cardNumber"
                                  {...register("cardNumber")}
                                  className={
                                    errors.cardNumber ? "border-red-500" : ""
                                  }
                                  placeholder="1234 5678 9012 3456"
                                />
                                {errors.cardNumber && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.cardNumber.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <Label htmlFor="expirationDate">
                                  Expiration Date
                                </Label>
                                <Input
                                  id="expirationDate"
                                  {...register("expirationDate")}
                                  className={
                                    errors.expirationDate
                                      ? "border-red-500"
                                      : ""
                                  }
                                  placeholder="MM/YY"
                                />
                                {errors.expirationDate && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.expirationDate.message}
                                  </p>
                                )}
                              </div>
                              <div>
                                <Label htmlFor="cvc">CVC</Label>
                                <Input
                                  id="cvc"
                                  {...register("cvc")}
                                  className={errors.cvc ? "border-red-500" : ""}
                                  placeholder="123"
                                />
                                {errors.cvc && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.cvc.message}
                                  </p>
                                )}
                              </div>
                              <div className="md:col-span-2">
                                <Label htmlFor="cardHolder">
                                  Cardholder Name
                                </Label>
                                <Input
                                  id="cardHolder"
                                  {...register("cardHolder")}
                                  className={
                                    errors.cardHolder ? "border-red-500" : ""
                                  }
                                  placeholder="John Doe"
                                />
                                {errors.cardHolder && (
                                  <p className="text-red-500 text-sm mt-1">
                                    {errors.cardHolder.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handlePrevStep}
                          >
                            Back
                          </Button>
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting
                              ? "Processing..."
                              : "Complete Payment"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <Card className="w-full sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Car Info */}
                    <div className="flex items-center space-x-4">
                      {carData.thumbnail_img ? (
                        <img
                          src={carData.thumbnail_img}
                          alt={`${carData.make} ${carData.model}`}
                          className="w-24 h-w-24 object-contain rounded-md"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 border-2 border-dashed rounded-xl dark:bg-gray-700" />
                      )}
                      <div>
                        <h3 className="font-semibold">
                          {carData.make} {carData.model}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {carData.specs.type}
                        </p>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({discountPercent}%)</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold pt-2 border-t">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Security Info */}
                    <div className="pt-4 border-t">
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>Secure and encrypted payment</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
