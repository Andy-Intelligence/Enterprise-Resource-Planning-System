// "use client";

// import React, { useState, ChangeEvent } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FiSave,
//   FiX,
//   FiUpload,
//   FiUser,
//   FiMapPin,
//   FiMail,
//   FiPhone,
//   FiBriefcase,
// } from "react-icons/fi";
// import axios from "axios";
// import { getAccessToken, refreshAccessToken } from "@/lib/utils";

// interface ClientProfileData {
//   name: string;
//   company_name: string;
//   email: string;
//   position: string;
//   address: string;
//   phone: string;
//   zipcode: string;
//   state: string;
//   site_address: string;
//   image: File | null;
// }

// const ClientProfileForm: React.FC = () => {
//   const router = useRouter();
//   const [profile, setProfile] = useState<ClientProfileData>({
//     name: "",
//     company_name: "",
//     email: "",
//     position: "",
//     address: "",
//     phone: "",
//     zipcode: "",
//     state: "",
//     site_address: "",
//     image: null,
//   });

//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setProfile({ ...profile, [name]: value });
//   };

//   const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setProfile({ ...profile, image: e.target.files[0] });
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const accessToken = await getAccessToken();
//       const formData = new FormData();

//       for (const key in profile) {
//         if (key !== "image") {
//           formData.append(
//             key,
//             profile[key as keyof ClientProfileData] as string
//           );
//         }
//       }

//       if (profile.image) {
//         formData.append("image", profile.image);
//       }

//       const response = await axios.post(
//         "https://erp-backend-nv09.onrender.com/api/clients/",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Client created:", response.data);
//       router.push("/clients");
//     } catch (error) {
//       console.error("Error creating client:", error);
//       handleTokenRefresh(error);
//     }
//   };

//   const handleTokenRefresh = async (error: any) => {
//     if (error.response && error.response.status === 401) {
//       try {
//         await refreshAccessToken();
//         handleSave();
//       } catch (refreshError) {
//         console.error("Error refreshing token:", refreshError);
//       }
//     }
//   };

//   const handleDiscard = () => {
//     router.push("/clients");
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//           <div className="bg-blue-600 text-white py-6 px-8">
//             <h1 className="text-3xl font-bold">Client Profile</h1>
//           </div>
//           <div className="p-8">
//             <form className="space-y-8">
//               <div className="flex flex-col sm:flex-row gap-8">
//                 <div className="w-full sm:w-1/3">
//                   <div className="bg-gray-100 rounded-lg p-6 text-center">
//                     {profile.image ? (
//                       <img
//                         src={URL.createObjectURL(profile.image)}
//                         alt="Client"
//                         className="w-48 h-48 object-cover mx-auto rounded-full"
//                       />
//                     ) : (
//                       <div className="w-48 h-48 bg-gray-300 mx-auto rounded-full flex items-center justify-center">
//                         <FiUser className="text-gray-500 text-6xl" />
//                       </div>
//                     )}
//                     <input
//                       type="file"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       id="image-upload"
//                       accept="image/*"
//                     />
//                     <label
//                       htmlFor="image-upload"
//                       className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
//                     >
//                       <FiUpload className="mr-2" /> Upload Image
//                     </label>
//                   </div>
//                 </div>
//                 <div className="w-full sm:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <FormField
//                     label="Name"
//                     name="name"
//                     value={profile.name}
//                     onChange={handleInputChange}
//                     placeholder="Client Name"
//                     icon={<FiUser className="text-gray-400" />}
//                   />
//                   <FormField
//                     label="Company Name"
//                     name="company_name"
//                     value={profile.company_name}
//                     onChange={handleInputChange}
//                     placeholder="Company Name"
//                     icon={<FiBriefcase className="text-gray-400" />}
//                   />
//                   <FormField
//                     label="Email"
//                     name="email"
//                     value={profile.email}
//                     onChange={handleInputChange}
//                     type="email"
//                     placeholder="client@example.com"
//                     icon={<FiMail className="text-gray-400" />}
//                   />
//                   <FormField
//                     label="Position"
//                     name="position"
//                     value={profile.position}
//                     onChange={handleInputChange}
//                     placeholder="Client Position"
//                     icon={<FiBriefcase className="text-gray-400" />}
//                   />
//                   <FormField
//                     label="Phone"
//                     name="phone"
//                     value={profile.phone}
//                     onChange={handleInputChange}
//                     placeholder="+1 (123) 456-7890"
//                     icon={<FiPhone className="text-gray-400" />}
//                   />
//                   <FormField
//                     label="Zip Code"
//                     name="zipcode"
//                     value={profile.zipcode}
//                     onChange={handleInputChange}
//                     placeholder="12345"
//                     icon={<FiMapPin className="text-gray-400" />}
//                   />
//                   <FormField
//                     label="State"
//                     name="state"
//                     value={profile.state}
//                     onChange={handleInputChange}
//                     placeholder="State"
//                     icon={<FiMapPin className="text-gray-400" />}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label
//                   htmlFor="address"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Address
//                 </label>
//                 <textarea
//                   id="address"
//                   name="address"
//                   value={profile.address}
//                   onChange={handleInputChange}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                   placeholder="Enter full address"
//                 ></textarea>
//               </div>
//               <div>
//                 <label
//                   htmlFor="site_address"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Site Address
//                 </label>
//                 <textarea
//                   id="site_address"
//                   name="site_address"
//                   value={profile.site_address}
//                   onChange={handleInputChange}
//                   rows={3}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                   placeholder="Enter site address"
//                 ></textarea>
//               </div>
//             </form>
//           </div>
//           <div className="bg-gray-50 px-8 py-6 flex justify-end space-x-4">
//             <button
//               className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
//               onClick={handleDiscard}
//             >
//               <FiX className="mr-2" /> Discard
//             </button>
//             <button
//               className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
//               onClick={handleSave}
//             >
//               <FiSave className="mr-2" /> Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// interface FormFieldProps {
//   label: string;
//   name: string;
//   value: string;
//   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//   type?: string;
//   placeholder?: string;
//   icon?: React.ReactNode;
// }

// const FormField: React.FC<FormFieldProps> = ({
//   label,
//   name,
//   value,
//   onChange,
//   type = "text",
//   placeholder,
//   icon,
// }) => (
//   <div>
//     <label
//       htmlFor={name}
//       className="block text-sm font-medium text-gray-700 mb-1"
//     >
//       {label}
//     </label>
//     <div className="relative">
//       {icon && (
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           {icon}
//         </div>
//       )}
//       <input
//         type={type}
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className={`w-full ${
//           icon ? "pl-10" : "pl-3"
//         } pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
//       />
//     </div>
//   </div>
// );

// export default ClientProfileForm;















"use client"

import React, { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiSave,
  FiX,
  FiUpload,
  FiUser,
  FiMapPin,
  FiMail,
  FiPhone,
  FiBriefcase,
} from "react-icons/fi";
import axios from "axios";
import { getAccessToken, refreshAccessToken } from "@/lib/utils";

interface ClientProfileData {
  name: string;
  company_name: string;
  email: string;
  position: string;
  address: string;
  phone: string;
  zipcode: string;
  state: string;
  site_address: string;
  image: File | null;
}

const API_BASE_URL = "https://erp-backend-nv09.onrender.com/api";

const ClientProfileForm: React.FC = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ClientProfileData>({
    name: "",
    company_name: "",
    email: "",
    position: "",
    address: "",
    phone: "",
    zipcode: "",
    state: "",
    site_address: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfile({ ...profile, image: e.target.files[0] });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = await getAccessToken();
      const formData = new FormData();

      for (const key in profile) {
        if (key !== "image") {
          formData.append(
            key,
            profile[key as keyof ClientProfileData] as string
          );
        }
      }

      if (profile.image) {
        formData.append("image", profile.image);
      }

      const response = await axios.post(`${API_BASE_URL}/clients/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Client created:", response.data);
      router.push("/clients");
    } catch (error: any) {
      console.error("Error creating client:", error);
      setError("Failed to create client. Please try again.");
      handleTokenRefresh(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken();
        handleSave();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        setError("Session expired. Please log in again.");
      }
    }
  };

  const handleDiscard = () => {
    router.push("/clients");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white py-6 px-8">
            <h1 className="text-3xl font-bold">Client Profile</h1>
          </div>
          <div className="p-8">
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <form className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="w-full sm:w-1/3">
                  <div className="bg-gray-100 rounded-lg p-6 text-center">
                    {profile.image ? (
                      <img
                        src={URL.createObjectURL(profile.image)}
                        alt="Client"
                        className="w-48 h-48 object-cover mx-auto rounded-full"
                      />
                    ) : (
                      <div className="w-48 h-48 bg-gray-300 mx-auto rounded-full flex items-center justify-center">
                        <FiUser className="text-gray-500 text-6xl" />
                      </div>
                    )}
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      accept="image/*"
                    />
                    <label
                      htmlFor="image-upload"
                      className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      <FiUpload className="mr-2" /> Upload Image
                    </label>
                  </div>
                </div>
                <div className="w-full sm:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    label="Name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    placeholder="Client Name"
                    icon={<FiUser className="text-gray-400" />}
                  />
                  <FormField
                    label="Company Name"
                    name="company_name"
                    value={profile.company_name}
                    onChange={handleInputChange}
                    placeholder="Company Name"
                    icon={<FiBriefcase className="text-gray-400" />}
                  />
                  <FormField
                    label="Email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="client@example.com"
                    icon={<FiMail className="text-gray-400" />}
                  />
                  <FormField
                    label="Position"
                    name="position"
                    value={profile.position}
                    onChange={handleInputChange}
                    placeholder="Client Position"
                    icon={<FiBriefcase className="text-gray-400" />}
                  />
                  <FormField
                    label="Phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (123) 456-7890"
                    icon={<FiPhone className="text-gray-400" />}
                  />
                  <FormField
                    label="Zip Code"
                    name="zipcode"
                    value={profile.zipcode}
                    onChange={handleInputChange}
                    placeholder="12345"
                    icon={<FiMapPin className="text-gray-400" />}
                  />
                  <FormField
                    label="State"
                    name="state"
                    value={profile.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    icon={<FiMapPin className="text-gray-400" />}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter full address"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="site_address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Site Address
                </label>
                <textarea
                  id="site_address"
                  name="site_address"
                  value={profile.site_address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter site address"
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
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              onClick={handleSave}
              disabled={isLoading}
            >
              <FiSave className="mr-2" /> {isLoading ? "Saving..." : "Save"}
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
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
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
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${
          icon ? "pl-10" : "pl-3"
        } pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
      />
    </div>
  </div>
);

export default ClientProfileForm;