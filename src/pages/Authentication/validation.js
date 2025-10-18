import { z } from "zod";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(5, "Email must be at least 5 characters")
      .max(100, "Email must not exceed 100 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must not exceed 100 characters")
      .regex(
        passwordRegex,
        "Password requires uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const signinSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must not exceed 100 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters"),
});

export const signupValidationRules = {
  name: {
    required: "Name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters",
    },
    maxLength: {
      value: 50,
      message: "Name must not exceed 50 characters",
    },
    pattern: {
      value: /^[a-zA-Z\s]+$/,
      message: "Name can only contain letters and spaces",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^@]+@[^@]+\.[^@]+$/,
      message: "Please enter a valid email address",
    },
    minLength: {
      value: 5,
      message: "Email must be at least 5 characters",
    },
    maxLength: {
      value: 100,
      message: "Email must not exceed 100 characters",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    maxLength: {
      value: 100,
      message: "Password must not exceed 100 characters",
    },
    pattern: {
      value: passwordRegex,
      message:
        "Password requires uppercase, lowercase, number, and special character",
    },
  },
  confirmPassword: {
    required: "Please confirm your password",
    validate: (value, formValues) =>
      value === formValues.password || "Passwords do not match",
  },
};

export const signinValidationRules = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^@]+@[^@]+\.[^@]+$/,
      message: "Please enter a valid email address",
    },
    minLength: {
      value: 5,
      message: "Email must be at least 5 characters",
    },
    maxLength: {
      value: 100,
      message: "Email must not exceed 100 characters",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
    maxLength: {
      value: 100,
      message: "Password must not exceed 100 characters",
    },
  },
};
