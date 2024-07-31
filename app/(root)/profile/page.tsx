"use client";
import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface CompanyProfileData {
  logo: File | null;
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
    console.log("Company Profile saved:", profile);
    // Add save logic here
  };

  const handleDiscard = () => {
    setProfile({
      logo: null,
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
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Company Profile</div>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Logo</label>
          <input
            type="file"
            onChange={handleLogoUpload}
            className="border rounded-md px-4 py-2 w-full"
            accept="image/*"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Specialization
          </label>
          <input
            type="text"
            name="specialization"
            value={profile.specialization}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Company Specialization"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Contact Address
          </label>
          <input
            type="text"
            name="contactAddress"
            value={profile.contactAddress}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Contact Address"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Website</label>
          <input
            type="url"
            name="website"
            value={profile.website}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Company Website"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Company Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Company Phone Number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Country</label>
          <select
            name="country"
            value={profile.country}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
          >
            <option value="">Select Country</option>
            {/* Add country options here */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">State</label>
          <select
            name="state"
            value={profile.state}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
          >
            <option value="">Select State</option>
            {/* Add state options here */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">City</label>
          <input
            type="text"
            name="city"
            value={profile.city}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="City"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={profile.zipCode}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Zip Code"
          />
        </div>
        <div className="mb-4">
          <button
            type="button"
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
            onClick={handleDiscard}
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProfileForm;
