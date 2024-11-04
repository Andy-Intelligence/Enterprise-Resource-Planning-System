"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  FiSave,
  FiX,
  FiUpload,
  
  FiMapPin,
  FiGlobe,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import { PiBuildingOfficeDuotone } from "react-icons/pi";

interface CompanyProfileData {
  logo: File | null;
  companyName: string;
  specialization: string;
  contactAddress: string;
  website: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
}

const CompanyProfileForm: React.FC = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<CompanyProfileData>({
    logo: null,
    companyName: "",
    specialization: "",
    contactAddress: "",
    website: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfile({ ...profile, logo: e.target.files[0] });
    }
  };

  const handleSave = () => {
    console.log("Company Profile saved:", profile);
    // Add save logic here
    router.push("/companies");
  };

  const handleDiscard = () => {
    router.push("/companies");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="bg-blue-600  text-white py-6 px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Company Profile</h1>
          </div>
          <div className="p-8">
            <form className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="w-full sm:w-1/3">
                  <div className="bg-gray-100 rounded-lg p-6 text-center">
                    {profile.logo ? (
                      <img
                        src={URL.createObjectURL(profile.logo)}
                        alt="Company Logo"
                        className="w-48 h-48 object-contain mx-auto"
                      />
                    ) : (
                      <div className="w-48 h-48 bg-gray-300 mx-auto rounded-lg flex items-center justify-center">
                        <PiBuildingOfficeDuotone className="text-gray-500 text-6xl" />
                      </div>
                    )}
                    <input
                      type="file"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                      accept="image/*"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      <FiUpload className="mr-2" /> Upload Logo
                    </label>
                  </div>
                </div>
                <div className="w-full sm:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    label="Company Name"
                    name="companyName"
                    value={profile.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    icon={<PiBuildingOfficeDuotone className="text-gray-400" />}
                  />
                  <FormField
                    label="Specialization"
                    name="specialization"
                    value={profile.specialization}
                    onChange={handleInputChange}
                    placeholder="Enter company specialization"
                  />
                  <FormField
                    label="Website"
                    name="website"
                    value={profile.website}
                    onChange={handleInputChange}
                    type="url"
                    placeholder="https://www.example.com"
                    icon={<FiGlobe className="text-gray-400" />}
                  />
                  <FormField
                    label="Email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="company@example.com"
                    icon={<FiMail className="text-gray-400" />}
                  />
                  <FormField
                    label="Phone Number"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleInputChange}
                    type="tel"
                    placeholder="+1 (123) 456-7890"
                    icon={<FiPhone className="text-gray-400" />}
                  />
                </div>
              </div>
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-xl font-semibold mb-4">Location Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <FormField
                    label="Country"
                    name="country"
                    value={profile.country}
                    onChange={handleInputChange}
                    options={[
                      { value: "", label: "Select Country" },
                      // Add country options here
                    ]}
                    icon={<FiMapPin className="text-gray-400" />}
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
                    placeholder="Enter city"
                  />
                  <FormField
                    label="Zip Code"
                    name="zipCode"
                    value={profile.zipCode}
                    onChange={handleInputChange}
                    placeholder="Enter zip code"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contactAddress"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Address
                </label>
                <textarea
                  id="contactAddress"
                  name="contactAddress"
                  value={profile.contactAddress}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter full address"
                ></textarea>
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
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
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
  icon?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  options,
  icon,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      {options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full ${
            icon ? "pl-10" : "pl-3"
          } pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors`}
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
          className={`w-full ${
            icon ? "pl-10" : "pl-3"
          } pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors`}
        />
      )}
    </div>
  </div>
);

export default CompanyProfileForm;
