"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  FiSave,
  FiX,
  FiUpload,
  FiUser,
  FiBriefcase,
  FiMapPin,
  FiMail,
  FiPhone,
  FiGlobe,
  FiMap,
  FiFileText,
} from "react-icons/fi";
import CreateDescription from "@/components/CreateDescription";

interface SubContractorData {
  logo: File | null;
  subContractorName: string;
  specialization: string;
  contactAddress: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  projectContract: string;
}

const SubContractorForm: React.FC = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<SubContractorData>({
    logo: null,
    subContractorName: "",
    specialization: "",
    contactAddress: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    projectContract: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfile({ ...profile, logo: e.target.files[0] });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sub Contractor Profile saved:", profile);
    // Add save logic here
    router.push("/subcontractors");
  };

  const handleDiscard = () => {
    router.push("/subcontractors");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white py-6 px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Create Subcontractor</h1>
          </div>
          <div className="p-8">
            <form onSubmit={handleSave} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                      accept="image/*"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <FiUpload /> Upload Logo
                    </label>
                    <span className="text-gray-600">
                      {profile.logo ? profile.logo.name : "No file selected"}
                    </span>
                  </div>
                </div>
                <FormField
                  label="Sub Contractor Name"
                  name="subContractorName"
                  value={profile.subContractorName}
                  onChange={handleInputChange}
                  placeholder="Enter sub contractor name"
                  icon={<FiUser className="text-gray-400" />}
                />
                <FormField
                  label="Specialization"
                  name="specialization"
                  value={profile.specialization}
                  onChange={handleInputChange}
                  placeholder="Enter specialization"
                  icon={<FiBriefcase className="text-gray-400" />}
                />
                <FormField
                  label="Contact Address"
                  name="contactAddress"
                  value={profile.contactAddress}
                  onChange={handleInputChange}
                  placeholder="Enter contact address"
                  icon={<FiMapPin className="text-gray-400" />}
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  icon={<FiMail className="text-gray-400" />}
                />
                <FormField
                  label="Phone Number"
                  name="phoneNumber"
                  type="tel"
                  value={profile.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  icon={<FiPhone className="text-gray-400" />}
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
                  icon={<FiGlobe className="text-gray-400" />}
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
                  icon={<FiMap className="text-gray-400" />}
                />
                <FormField
                  label="City"
                  name="city"
                  value={profile.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  icon={<FiMapPin className="text-gray-400" />}
                />
                <FormField
                  label="Zip Code"
                  name="zipCode"
                  value={profile.zipCode}
                  onChange={handleInputChange}
                  placeholder="Enter zip code"
                  icon={<FiMapPin className="text-gray-400" />}
                />
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Contract
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiFileText className="text-gray-400" />
                    </div>
                    <CreateDescription
                      value={profile.projectContract}
                      onChange={(value: string) =>
                        setProfile({ ...profile, projectContract: value })
                      }
                    />
                  </div>
                </div>
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
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
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

export default SubContractorForm;
