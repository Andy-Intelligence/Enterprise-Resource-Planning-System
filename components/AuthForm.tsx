



"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/authSlice";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiLock,
  FiMail,
  FiPhone,
  FiMapPin,
  FiImage,
  FiBarChart2,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";

// Validation schemas remain the same
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

const LandingPage = () => {
  const [authType, setAuthType] = useState<"sign-in" | "sign-up">("sign-in");
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const initialFormData: SignInFormData | SignUpFormData =
    authType === "sign-up"
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

      if (authType === "sign-up") {
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
          `Failed to ${authType === "sign-in" ? "sign in" : "register"}`
        );
      }

      const responseData = await response.json();

      localStorage.setItem("accessToken", responseData.access);
      localStorage.setItem("refreshToken", responseData.refresh);

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
  // from-blue-100 to-indigo-200

  return (
    <div className="min-h-screen bg-gradient-to-br  flex flex-col justify-center items-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Landing content */}
          <div className="w-full md:w-1/2 p-8 bg-gradient-to-br from-green-600 to-green-700 text-white flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-4">Welcome to ENTERPRISE</h1>
              <p className="text-xl mb-8">
                Your all-in-one ERP solution for modern businesses
              </p>
              <div className="space-y-4">
                <Feature
                  icon={<FiBarChart2 className="w-6 h-6" />}
                  title="Comprehensive Analytics"
                  description="Get insights into your business with powerful analytics tools"
                />
                <Feature
                  icon={<FiDollarSign className="w-6 h-6" />}
                  title="Financial Management"
                  description="Streamline your finances with our robust accounting features"
                />
                <Feature
                  icon={<FiTrendingUp className="w-6 h-6" />}
                  title="Performance Tracking"
                  description="Monitor and improve your business performance in real-time"
                />
              </div>
            </motion.div>
          </div>

          {/* Right side - Auth form */}
          <div className="w-full md:w-1/2 p-8">
            <div className="max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-center mb-8">
                  <Image
                    src="/icons/erp.jpeg"
                    width={80}
                    height={80}
                    alt="Logo"
                    className="mx-auto rounded-full"
                  />
                  <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
                    {authType === "sign-in" ? "Welcome Back" : "Get Started"}
                  </h2>
                  <p className="text-gray-600">
                    {authType === "sign-in"
                      ? "Sign in to your account"
                      : "Create your account"}
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  <motion.form
                    key={authType}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {inputFields.map(
                      (field) =>
                        (authType === "sign-up" || !field.showOnSignUp) && (
                          <div key={field.name} className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              {field.icon}
                            </span>
                            <input
                              type={field.type}
                              name={field.name}
                              placeholder={field.placeholder}
                              value={
                                formData[field.name as keyof typeof formData]
                              }
                              onChange={handleChange}
                              className={`w-full pl-10 pr-3 py-2 rounded-lg border ${
                                errors[field.name]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200`}
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
                      <p className="text-red-500 text-sm text-center">
                        {errors.general}
                      </p>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold text-lg hover:bg-green-700 transition duration-200 disabled:opacity-50"
                    >
                      {isLoading
                        ? "Processing..."
                        : authType === "sign-in"
                        ? "Sign In"
                        : "Sign Up"}
                    </motion.button>
                  </motion.form>
                </AnimatePresence>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    {authType === "sign-in"
                      ? "Don't have an account?"
                      : "Already have an account?"}
                    <button
                      onClick={() =>
                        setAuthType(
                          authType === "sign-in" ? "sign-up" : "sign-in"
                        )
                      }
                      className="text-green-600 font-semibold ml-1 hover:underline"
                    >
                      {authType === "sign-in" ? "Sign Up" : "Sign In"}
                    </button>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex items-center space-x-3">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-blue-100">{description}</p>
    </div>
  </div>
);

export default LandingPage;