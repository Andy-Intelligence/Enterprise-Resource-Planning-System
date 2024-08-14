// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FiSave, FiX } from "react-icons/fi";

// interface SupplierData {
//   name: string;
//   address: string;
//   phone: string;
//   email: string;
// }

// const CreateSupplier: React.FC = () => {
//   const router = useRouter();
//   const [supplier, setSupplier] = useState<SupplierData>({
//     name: "",
//     address: "",
//     phone: "",
//     email: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setSupplier((prevSupplier) => ({ ...prevSupplier, [name]: value }));
//   };

//   const handleSave = () => {
//     console.log("Supplier saved:", supplier);
//     // Add save logic here
//     router.push("/suppliers");
//   };

//   const handleDiscard = () => {
//     router.push("/suppliers");
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">
//           Create Supplier
//         </h1>

//         <div className="flex flex-wrap items-center justify-start gap-3 mb-8">
//           <button
//             className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
//             onClick={handleSave}
//           >
//             <FiSave /> Save
//           </button>
//           <button
//             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
//             onClick={handleDiscard}
//           >
//             <FiX /> Discard
//           </button>
//         </div>

//         <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FormField
//             label="Supplier Name"
//             name="name"
//             value={supplier.name}
//             onChange={handleInputChange}
//             placeholder="Enter supplier name"
//           />
//           <FormField
//             label="Address"
//             name="address"
//             value={supplier.address}
//             onChange={handleInputChange}
//             placeholder="Enter supplier address"
//           />
//           <FormField
//             label="Phone Number"
//             name="phone"
//             value={supplier.phone}
//             onChange={handleInputChange}
//             placeholder="Enter phone number"
//           />
//           <FormField
//             label="Email Address"
//             name="email"
//             type="email"
//             value={supplier.email}
//             onChange={handleInputChange}
//             placeholder="Enter email address"
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// interface FormFieldProps {
//   label: string;
//   name: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   type?: string;
//   placeholder?: string;
// }

// const FormField: React.FC<FormFieldProps> = ({
//   label,
//   name,
//   value,
//   onChange,
//   type = "text",
//   placeholder,
// }) => (
//   <div>
//     <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
//       {label}
//     </label>
//     <input
//       type={type}
//       id={name}
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   </div>
// );

// export default CreateSupplier;



"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiX } from "react-icons/fi";
import axios from "axios";
import { getAccessToken } from "@/lib/utils";

interface SupplierData {
  name: string;
  address: string;
  phone: string;
  email: string;
}

const CreateSupplier: React.FC = () => {
  const router = useRouter();
  const [supplier, setSupplier] = useState<SupplierData>({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSupplier((prevSupplier) => ({ ...prevSupplier, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.post(
        "https://erp-backend-nv09.onrender.com/api/suppliers/create/",
        supplier,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Supplier saved:", response.data);
      router.push("/suppliers");
    } catch (error) {
      console.error("Error saving supplier:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleDiscard = () => {
    router.push("/suppliers");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create Supplier
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
          <FormField
            label="Supplier Name"
            name="name"
            value={supplier.name}
            onChange={handleInputChange}
            placeholder="Enter supplier name"
          />
          <FormField
            label="Address"
            name="address"
            value={supplier.address}
            onChange={handleInputChange}
            placeholder="Enter supplier address"
          />
          <FormField
            label="Phone Number"
            name="phone"
            value={supplier.phone}
            onChange={handleInputChange}
            placeholder="Enter phone number"
          />
          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={supplier.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
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
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default CreateSupplier;