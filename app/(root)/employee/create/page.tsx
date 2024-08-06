"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiX, FiUpload, FiUser } from "react-icons/fi";

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
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white py-6 px-8">
            <h1 className="text-3xl font-bold">Employee Profile</h1>
          </div>
          <div className="p-8">
            <form className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="w-full sm:w-1/3">
                  <div className="bg-gray-100 rounded-lg p-6 text-center">
                    {profile.passport ? (
                      <img
                        src={URL.createObjectURL(profile.passport)}
                        alt="Passport"
                        className="w-48 h-48 object-cover mx-auto rounded-full"
                      />
                    ) : (
                      <div className="w-48 h-48 bg-gray-300 mx-auto rounded-full flex items-center justify-center">
                        <FiUser className="text-gray-500 text-6xl" />
                      </div>
                    )}
                    <input
                      type="file"
                      onChange={handlePassportUpload}
                      className="hidden"
                      id="passport-upload"
                      accept="image/*"
                    />
                    <label
                      htmlFor="passport-upload"
                      className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      <FiUpload className="mr-2" /> Upload Passport
                    </label>
                  </div>
                </div>
                <div className="w-full sm:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    label="Hire Date"
                    name="hireDate"
                    value={profile.hireDate}
                    onChange={handleInputChange}
                    type="date"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <FormField
                  label="Contact Address"
                  name="contactAddress"
                  value={profile.contactAddress}
                  onChange={handleInputChange}
                  placeholder="Contact Address"
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
              </div>
            </form>
          </div>
          <div className="bg-gray-50 px-8 py-6 flex justify-end space-x-4">
            <button
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
              onClick={handleDiscard}
            >
              <FiX className="mr-2" /> Discard
            </button>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              onClick={handleSave}
            >
              <FiSave className="mr-2" /> Save
            </button>
          </div>
        </div>
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
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    {options ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
    )}
  </div>
);

export default EmployeeProfileForm;






            // <div className="flex space-x-4">
            //   <button
            //     className="px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors flex items-center"
            //     onClick={handleDiscard}
            //   >
            //     <FiX className="mr-2" /> Discard
            //   </button>
            //   <button
            //     className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center"
            //     onClick={handleSave}
            //   >
            //     <FiSave className="mr-2" /> Save
            //   </button>
            // </div>;