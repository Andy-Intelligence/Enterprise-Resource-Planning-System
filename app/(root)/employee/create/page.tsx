"use client";
import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

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
  };

  const handleDiscard = () => {
    setProfile({
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
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Employee Profile</div>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Passport</label>
          <input
            type="file"
            onChange={handlePassportUpload}
            className="border rounded-md px-4 py-2 w-full"
            accept="image/*"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Employee Full Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Position</label>
          <select
            name="position"
            value={profile.position}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
          >
            <option value="">Select Position</option>
            {/* Add position options here */}
          </select>
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
          <label className="block text-sm font-semibold mb-2">Department</label>
          <select
            name="department"
            value={profile.department}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
          >
            <option value="">Select Department</option>
            {/* Add department options here */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Employee Email"
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
            placeholder="Employee Phone Number"
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
          <label className="block text-sm font-semibold mb-2">Hire Date</label>
          <input
            type="date"
            name="hireDate"
            value={profile.hireDate}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
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

export default EmployeeProfileForm;
