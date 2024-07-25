"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateSupplier: React.FC = () => {
  const router = useRouter();
  const [supplier, setSupplier] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Supplier saved:", supplier);
    // Redirect or reset the form as needed
  };

  const handleDiscard = () => {
    // Handle discard logic here
    setSupplier({
      name: "",
      address: "",
      phone: "",
      email: "",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col justify-between items-start mb-4">
        <div className="text-3xl font-bold mb-4">Create Supplier</div>
        <div className="flex items-center justify-between space-x-2 w-full">
          <div className="flex items-center justify-center space-x-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={handleDiscard}
            >
              Discard
            </button>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Supplier Name</label>
        <input
          type="text"
          name="name"
          value={supplier.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Address</label>
        <input
          type="text"
          name="address"
          value={supplier.address}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={supplier.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Email Address</label>
        <input
          type="email"
          name="email"
          value={supplier.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
    </div>
  );
};

export default CreateSupplier;
