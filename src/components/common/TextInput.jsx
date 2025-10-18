import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const TextInput = ({
  name,
  label,
  placeholder,
  bgWhite,
  onChange,
  type = "text",
  id,
  autoComplete,
  required,
  value,
  error,
  register,
  showPasswordToggle = false,
  validationRules,
  onValidate,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  const getValidationRules = () => {
    if (!validationRules) return null;

    return Object.entries(validationRules)
      .map(([, rule]) => {
        if (typeof rule === "object" && rule._def) {
          // This is a Zod schema
          const checks = [];

          // Extract min length
          if (rule._def.checks?.some((check) => check.kind === "min")) {
            const minCheck = rule._def.checks.find(
              (check) => check.kind === "min"
            );
            checks.push(`At least ${minCheck.value} characters`);
          }

          // Extract max length
          if (rule._def.checks?.some((check) => check.kind === "max")) {
            const maxCheck = rule._def.checks.find(
              (check) => check.kind === "max"
            );
            checks.push(`No more than ${maxCheck.value} characters`);
          }

          // Extract email validation
          if (rule._def.typeName === "ZodEmail") {
            checks.push("Valid email format");
          }

          // Extract regex patterns for password
          if (rule._def.checks?.some((check) => check.kind === "regex")) {
            const regexCheck = rule._def.checks.find(
              (check) => check.kind === "regex"
            );
            if (regexCheck.regex.toString().includes("(?=.*[a-z])")) {
              checks.push("Lowercase letter (a-z)");
            }
            if (regexCheck.regex.toString().includes("(?=.*[A-Z])")) {
              checks.push("Uppercase letter (A-Z)");
            }
            if (regexCheck.regex.toString().includes("(?=.*\\d)")) {
              checks.push("Number (0-9)");
            }
            if (regexCheck.regex.toString().includes("(?=.*[@$!%*?&])")) {
              checks.push("Special character (@, $, !, %, *, ?, &)");
            }
          }

          return checks;
        }
        return [];
      })
      .flat();
  };

  const validationChecks = getValidationRules();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (register?.onBlur) {
      register.onBlur(e);
    }
  };

  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }

    if (register?.onChange) {
      register.onChange(e);
    }

    if (onValidate && e.target.value) {
      onValidate(name, e.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-2 my-2">
      {label && (
        <label
          htmlFor={id || name}
          className="dark:text-slate-300 font-semibold text-secondary-500 text-sm lg:text-base"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative flex w-full">
        <input
          type={inputType}
          id={id || name}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          value={value}
          {...(register && { ...register })}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full p-4 ${
            bgWhite
              ? "dark:bg-slate-400 dark:focus:ring-slate-200 dark:placeholder:text-slate-900 dark:text-slate-900 bg-white"
              : "border dark:text-slate-400 dark:placeholder:text-slate-400 dark:focus:ring-slate-400  dark:bg-slate-800 bg-[#F6F7F9]"
          } ${
            error
              ? "border-red-500 border-2"
              : isFocused && !error
              ? "border-blue-500 dark:border-blue-400 border-2"
              : ""
          } dark:focus:ring-2 rounded-[10px] text-xs placeholder:text-secondary-300 text-secondary-500 focus:ring-1 focus:ring-secondary-300 outline-none lg:text-sm pr-10`}
        />

        {/* Password visibility toggle */}
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {/* Validation rules display for password fields when focused */}
      {type === "password" && isFocused && validationChecks && (
        <ul className="mt-2 space-y-1">
          {validationChecks.map((rule, index) => {
            const isValid = value
              ? // Simple validation checks based on rule text
                (rule.includes("characters") &&
                  value.length >= parseInt(rule)) ||
                (rule.includes("Lowercase") && /[a-z]/.test(value)) ||
                (rule.includes("Uppercase") && /[A-Z]/.test(value)) ||
                (rule.includes("Number") && /\d/.test(value)) ||
                (rule.includes("Special") && /[@$!%*?&]/.test(value)) ||
                (rule.includes("Valid email") &&
                  /^[^@]+@[^@]+\.[^@]+$/.test(value))
              : false;

            return (
              <li key={index} className="flex items-center text-xs">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    isValid ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                ></span>
                <span
                  className={
                    isValid
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-600 dark:text-gray-400"
                  }
                >
                  {rule}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TextInput;
