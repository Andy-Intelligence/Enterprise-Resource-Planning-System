"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiX, FiUpload } from "react-icons/fi";

interface EmployeeProfileData {
  passport: File | null;
  name: string;
  position: string;
  contactAddress: string;
  department: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  hireDate: string;
}

const EmployeeProfileForm: React.FC = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<EmployeeProfileData>({
    passport: null,
    name: "",
    position: "",
    contactAddress: "",
    department: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    hireDate: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePassportUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfile({ ...profile, passport: e.target.files[0] });
    }
  };

  const handleSave = () => {
    console.log("Employee Profile saved:", profile);
    // Add save logic here
    router.push("/employees");
  };

  const handleDiscard = () => {
    router.push("/employees");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Employee Profile
        </h1>

        <div className="flex flex-wrap items-center justify-start gap-3 mb-8">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            onClick={handleSave}
          >
            <FiSave /> Save
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
            onClick={handleDiscard}
          >
            <FiX /> Discard
          </button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Passport
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                onChange={handlePassportUpload}
                className="hidden"
                id="passport-upload"
                accept="image/*"
              />
              <label
                htmlFor="passport-upload"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <FiUpload /> Upload Passport
              </label>
              <span className="text-gray-600">
                {profile.passport ? profile.passport.name : "No file selected"}
              </span>
            </div>
          </div>
          <FormField
            label="Name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            placeholder="Employee Full Name"
          />
          <FormField
            label="Position"
            name="position"
            value={profile.position}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select Position" },
              // Add position options here
            ]}
          />
          <FormField
            label="Contact Address"
            name="contactAddress"
            value={profile.contactAddress}
            onChange={handleInputChange}
            placeholder="Contact Address"
          />
          <FormField
            label="Department"
            name="department"
            value={profile.department}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select Department" },
              // Add department options here
            ]}
          />
          <FormField
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            type="email"
            placeholder="Employee Email"
          />
          <FormField
            label="Phone Number"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleInputChange}
            type="tel"
            placeholder="Employee Phone Number"
          />
          <FormField
            label="Country"
            name="country"
            value={profile.country}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select Country" },
              // Add country options here
            ]}
          />
          <FormField
            label="State"
            name="state"
            value={profile.state}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select State" },
              // Add state options here
            ]}
          />
          <FormField
            label="City"
            name="city"
            value={profile.city}
            onChange={handleInputChange}
            placeholder="City"
          />
          <FormField
            label="Hire Date"
            name="hireDate"
            value={profile.hireDate}
            onChange={handleInputChange}
            type="date"
          />
        </form>
      </div>
    </div>
  );
};

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  options,
}) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
      {label}
    </label>
    {options ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}
  </div>
);

export default EmployeeProfileForm;
