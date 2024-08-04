"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiX, FiUpload } from "react-icons/fi";
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

  const handleSave = () => {
    console.log("Sub Contractor Profile saved:", profile);
    // Add save logic here
    router.push("/subcontractors");
  };

  const handleDiscard = () => {
    setProfile({
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
    router.push("/subcontractors");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create Subcontractor
        </h1>

        <div className="flex flex-wrap items-center justify-start gap-3 mb-8">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            onClick={handleSave}
          >
            <FiSave /> Save Subcontractor
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
            <label className="block text-gray-700 font-medium mb-2">Logo</label>
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
          />
          <FormField
            label="Specialization"
            name="specialization"
            value={profile.specialization}
            onChange={handleInputChange}
            placeholder="Enter specialization"
          />
          <FormField
            label="Contact Address"
            name="contactAddress"
            value={profile.contactAddress}
            onChange={handleInputChange}
            placeholder="Enter contact address"
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
          />
          <FormField
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={profile.phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter phone number"
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
            placeholder="Enter city"
          />
          <FormField
            label="Zip Code"
            name="zipCode"
            value={profile.zipCode}
            onChange={handleInputChange}
            placeholder="Enter zip code"
          />
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Project Contract
            </label>
            <CreateDescription
              value={profile.projectContract}
              onChange={(value: string) =>
                setProfile({ ...profile, projectContract: value })
              }
            />
          </div>
        </form>
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

export default SubContractorForm;
