"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/authSlice";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  FiUser,
  FiLock,
  FiMail,
  FiPhone,
  FiMapPin,
  FiImage,
} from "react-icons/fi";

// Validation schemas for sign-in and sign-up
const signInSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  company_name: z
    .string()
    .min(2, "Company name must be at least 2 characters long"),
  company_address: z.string().min(5, "Please enter a valid address"),
  company_phone: z.string().regex(/^\+?[0-9]{10,14}$/, "Invalid phone number"),
  country: z.string().min(2, "Please enter a valid country"),
  state: z.string().min(2, "Please enter a valid state"),
  city: z.string().min(2, "Please enter a valid city"),
 zip_code: z.string().regex(/^[0-9]{6}$/, "Invalid ZIP code"),
  logo: z.string().url().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;

type SignUpFormData = z.infer<typeof signUpSchema>;

const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const initialFormData: SignInFormData | SignUpFormData =
    type === "sign-up"
      ? {
          email: "",
          password: "",
          username: "",
          company_name: "",
          company_address: "",
          company_phone: "",
          country: "",
          state: "",
          city: "",
          zip_code: "",
          logo: "",
        }
      : {
          username: "",
          password: "",
        };

  const [formData, setFormData] = useState<SignInFormData | SignUpFormData>(
    initialFormData
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setIsLoading(true);
   setErrors({});

   try {
     let validatedData;
     let url;
     let body;

     if (type === "sign-up") {
       validatedData = signUpSchema.parse(formData as SignUpFormData);
       url =
         "https://erp-backend-nv09.onrender.com/api/auths/register/company/";
       body = JSON.stringify({
         user: {
           email: validatedData.email,
           password: validatedData.password,
           username: validatedData.username,
           is_company: true,
         },
         company_name: validatedData.company_name,
         company_address: validatedData.company_address,
         company_phone: validatedData.company_phone,
         country: validatedData.country,
         state: validatedData.state,
         city: validatedData.city,
         zip_code: validatedData.zip_code,
         logo: validatedData.logo,
       });
     } else {
       validatedData = signInSchema.parse(formData as SignInFormData);
       url = "https://erp-backend-nv09.onrender.com/api/auths/login/";
       body = JSON.stringify({
         username: validatedData.username,
         password: validatedData.password,
       });
     }

     const response = await fetch(url, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: body,
     });

     if (!response.ok) {
       throw new Error(
         `Failed to ${type === "sign-in" ? "sign in" : "register"}`
       );
     }

     const responseData = await response.json();

     // Store tokens in localStorage
     localStorage.setItem("accessToken", responseData.access);
     localStorage.setItem("refreshToken", responseData.refresh);

     // Update the state in your Redux store if needed
     dispatch(setAuth(responseData));

     router.push("/");
   } catch (error) {
     if (error instanceof z.ZodError) {
       const fieldErrors: Record<string, string> = {};
       error.errors.forEach((err) => {
         if (err.path) {
           fieldErrors[err.path[0]] = err.message;
         }
       });
       setErrors(fieldErrors);
     } else {
       setErrors({ general: "Authentication failed. Please try again." });
     }
   } finally {
     setIsLoading(false);
   }
 };

  const inputFields = [
    {
      name: "username",
      placeholder: "Username",
      icon: <FiUser />,
      type: "text",
    },
    {
      name: "email",
      placeholder: "Email",
      icon: <FiMail />,
      type: "email",
      showOnSignUp: true,
    },
    {
      name: "password",
      placeholder: "Password",
      icon: <FiLock />,
      type: "password",
    },
    {
      name: "company_name",
      placeholder: "Company Name",
      icon: <FiUser />,
      type: "text",
      showOnSignUp: true,
    },
    {
      name: "company_address",
      placeholder: "Company Address",
      icon: <FiMapPin />,
      type: "text",
      showOnSignUp: true,
    },
    {
      name: "company_phone",
      placeholder: "Company Phone",
      icon: <FiPhone />,
      type: "tel",
      showOnSignUp: true,
    },
    {
      name: "country",
      placeholder: "Country",
      icon: <FiMapPin />,
      type: "text",
      showOnSignUp: true,
    },
    {
      name: "state",
      placeholder: "State",
      icon: <FiMapPin />,
      type: "text",
      showOnSignUp: true,
    },
    {
      name: "city",
      placeholder: "City",
      icon: <FiMapPin />,
      type: "text",
      showOnSignUp: true,
    },
    {
      name: "zip_code",
      placeholder: "ZIP Code",
      icon: <FiMapPin />,
      type: "text",
      showOnSignUp: true,
    },
    {
      name: "logo",
      placeholder: "Company Logo URL",
      icon: <FiImage />,
      type: "url",
      showOnSignUp: true,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="auth-form bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto mt-10"
    >
      <header className="flex flex-col items-center gap-5 mb-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/erp.jpeg"
            width={60}
            height={60}
            alt="Logo"
            className="rounded-full"
          />
          <h1 className="text-3xl font-bold text-gray-800">ENTERPRISE</h1>
        </Link>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            {type === "sign-in" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-500">
            {type === "sign-in"
              ? "Sign in to your account"
              : "Sign up for a new account"}
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        {inputFields.map(
          (field) =>
            (type === "sign-up" || !field.showOnSignUp) && (
              <div key={field.name} className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {field.icon}
                </span>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            )
        )}

        {errors.general && (
          <p className="text-red-500 text-sm text-center">{errors.general}</p>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50"
        >
          {isLoading
            ? "Processing..."
            : type === "sign-in"
            ? "Sign In"
            : "Sign Up"}
        </motion.button>
      </form>

      <div className="mt-6 text-center">
        {type === "sign-in" ? (
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 font-semibold">
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-500 font-semibold">
              Sign In
            </Link>
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default AuthForm;
