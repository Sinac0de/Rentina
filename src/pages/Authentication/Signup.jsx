import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthNavbar from "src/components/NavBar/AuthNavbar";
import TextInput from "../../components/common/TextInput";
import { registerUser } from "../../services/api";
import { signupValidationRules } from "./validation";

const Signup = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: formIsSubmitting },
    getValues,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    setApiError("");

    try {
      await registerUser(data);

      // On success, redirect to signin
      navigate("/signin", {
        state: {
          message: "Account created successfully! Please sign in.",
        },
      });
    } catch (err) {
      // Handle API errors
      setApiError(err.message || "Failed to create account. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <AuthNavbar />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign in
            </Link>
          </p>
        </div>

        {apiError && (
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400 dark:text-red-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  {apiError}
                </h3>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <TextInput
              label="Full Name"
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              register={register("name", signupValidationRules.name)}
              error={errors.name?.message}
              placeholder="John Doe"
              validationRules={{ name: signupValidationRules.name }}
            />

            <TextInput
              label="Email address"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              register={register("email", signupValidationRules.email)}
              error={errors.email?.message}
              placeholder="john@example.com"
              validationRules={{ email: signupValidationRules.email }}
            />

            <TextInput
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              register={register("password", signupValidationRules.password)}
              error={errors.password?.message}
              placeholder="At least 8 characters"
              showPasswordToggle={true}
              validationRules={{ password: signupValidationRules.password }}
            />

            <TextInput
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              register={register("confirmPassword", {
                ...signupValidationRules.confirmPassword,
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              error={errors.confirmPassword?.message}
              placeholder="Repeat your password"
              showPasswordToggle={true}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={formIsSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900"
            >
              {formIsSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
