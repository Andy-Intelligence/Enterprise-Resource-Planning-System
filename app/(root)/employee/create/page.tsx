
// "use client";

// import React, { useState, useEffect, ChangeEvent } from "react";
// import { useRouter } from "next/navigation";
// import { FiSave, FiX, FiUpload, FiUser, FiPlus } from "react-icons/fi";
// import axios from "axios";

// interface EmployeeProfileData {
//   user: {
//     username: string;
//     password: string;
//     email: string;
//     is_employee: boolean;
//   };
//   name: string;
//   email: string;
//   address: string;
//   state: string;
//   hired_date: string;
//   department_id: number;
//   position: number;
//   company: number;
//   passport: File | null;
// }

// interface Department {
//   id: number;
//   name: string;
// }

// interface Position {
//   id: number;
//   title: string;
//   department: number;
// }

// const EmployeeProfileForm: React.FC = () => {
//   const router = useRouter();
//   const [profile, setProfile] = useState<EmployeeProfileData>({
//     user: {
//       username: "",
//       password: "",
//       email: "",
//       is_employee: true,
//     },
//     name: "",
//     email: "",
//     address: "",
//     state: "",
//     hired_date: "",
//     department_id: 0,
//     position: 0,
//     company: 1, // Assuming a default company ID
//     passport: null,
//   });

//   const [departments, setDepartments] = useState<Department[]>([]);
//   const [positions, setPositions] = useState<Position[]>([]);
//   const [newDepartment, setNewDepartment] = useState("");
//   const [newPosition, setNewPosition] = useState("");
//   const [searchDepartment, setSearchDepartment] = useState("");
//   const [searchPosition, setSearchPosition] = useState("");

//   useEffect(() => {
//     fetchDepartments();
//     fetchPositions();
//   }, []);

//   const fetchDepartments = async () => {
//     try {
//       const response = await axios.get(
//         "https://erp-backend-nv09.onrender.com/api/departments/"
//       );
//       setDepartments(response.data);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//     }
//   };

//   const fetchPositions = async () => {
//     try {
//       const response = await axios.get(
//         "https://erp-backend-nv09.onrender.com/api/departments/positions/"
//       );
//       setPositions(response.data);
//     } catch (error) {
//       console.error("Error fetching positions:", error);
//     }
//   };

//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     if (name.includes("user.")) {
//       const userField = name.split(".")[1];
//       setProfile({
//         ...profile,
//         user: { ...profile.user, [userField]: value },
//       });
//     } else {
//       setProfile({ ...profile, [name]: value });
//     }
//   };

//   const handlePassportUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setProfile({ ...profile, passport: e.target.files[0] });
//     }
//   };

//   const handleCreateDepartment = async () => {
//     try {
//       const response = await axios.post(
//         "https://erp-backend-nv09.onrender.com/api/departments/create/",
//         {
//           name: newDepartment,
//         }
//       );
//       setDepartments([...departments, response.data]);
//       setNewDepartment("");
//     } catch (error) {
//       console.error("Error creating department:", error);
//     }
//   };

//   const handleCreatePosition = async () => {
//     try {
//       const response = await axios.post(
//         "https://erp-backend-nv09.onrender.com/api/departments/positions/",
//         {
//           title: newPosition,
//           department: profile.department_id,
//         }
//       );
//       setPositions([...positions, response.data]);
//       setNewPosition("");
//     } catch (error) {
//       console.error("Error creating position:", error);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const response = await axios.post(
//         "https://erp-backend-nv09.onrender.com/api/auths/register/employee/",
//         profile
//       );
//       console.log("Employee registered:", response.data);
//       router.push("/employees");
//     } catch (error) {
//       console.error("Error registering employee:", error);
//     }
//   };

//   const handleDiscard = () => {
//     router.push("/employees");
//   };

//   const filteredDepartments = departments.filter((dept) =>
//     dept.name.toLowerCase().includes(searchDepartment.toLowerCase())
//   );

//   const filteredPositions = positions.filter((pos) =>
//     pos.title.toLowerCase().includes(searchPosition.toLowerCase())
//   );

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//           <div className="bg-blue-600 text-white py-6 px-8">
//             <h1 className="text-3xl font-bold">Employee Profile</h1>
//           </div>
//           <div className="p-8">
//             <form className="space-y-8">
//               <div className="flex flex-col sm:flex-row gap-8">
//                 <div className="w-full sm:w-1/3">
//                   <div className="bg-gray-100 rounded-lg p-6 text-center">
//                     {profile.passport ? (
//                       <img
//                         src={URL.createObjectURL(profile.passport)}
//                         alt="Passport"
//                         className="w-48 h-48 object-cover mx-auto rounded-full"
//                       />
//                     ) : (
//                       <div className="w-48 h-48 bg-gray-300 mx-auto rounded-full flex items-center justify-center">
//                         <FiUser className="text-gray-500 text-6xl" />
//                       </div>
//                     )}
//                     <input
//                       type="file"
//                       onChange={handlePassportUpload}
//                       className="hidden"
//                       id="passport-upload"
//                       accept="image/*"
//                     />
//                     <label
//                       htmlFor="passport-upload"
//                       className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
//                     >
//                       <FiUpload className="mr-2" /> Upload Passport
//                     </label>
//                   </div>
//                 </div>
//                 <div className="w-full sm:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <FormField
//                     label="Name"
//                     name="name"
//                     value={profile.name}
//                     onChange={handleInputChange}
//                     placeholder="Employee Full Name"
//                   />
//                   <FormField
//                     label="Email"
//                     name="user.email"
//                     value={profile.user.email}
//                     onChange={handleInputChange}
//                     type="email"
//                     placeholder="Employee Email"
//                   />
//                   <FormField
//                     label="Username"
//                     name="user.username"
//                     value={profile.user.username}
//                     onChange={handleInputChange}
//                     placeholder="Employee Username"
//                   />
//                   <FormField
//                     label="Password"
//                     name="user.password"
//                     value={profile.user.password}
//                     onChange={handleInputChange}
//                     type="password"
//                     placeholder="Employee Password"
//                   />
//                   <FormField
//                     label="Address"
//                     name="address"
//                     value={profile.address}
//                     onChange={handleInputChange}
//                     placeholder="Employee Address"
//                   />
//                   <FormField
//                     label="State"
//                     name="state"
//                     value={profile.state}
//                     onChange={handleInputChange}
//                     placeholder="Employee State"
//                   />
//                   <FormField
//                     label="Hire Date"
//                     name="hired_date"
//                     value={profile.hired_date}
//                     onChange={handleInputChange}
//                     type="datetime-local"
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Department
//                   </label>
//                   <div className="flex items-center">
//                     <input
//                       type="text"
//                       value={searchDepartment}
//                       onChange={(e) => setSearchDepartment(e.target.value)}
//                       placeholder="Search department"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setSearchDepartment("")}
//                       className="ml-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
//                     >
//                       Clear
//                     </button>
//                   </div>
//                   <select
//                     name="department_id"
//                     value={profile.department_id}
//                     onChange={handleInputChange}
//                     className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                   >
//                     <option value="">Select Department</option>
//                     {filteredDepartments.map((dept) => (
//                       <option key={dept.id} value={dept.id}>
//                         {dept.name}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="mt-2 flex items-center">
//                     <input
//                       type="text"
//                       value={newDepartment}
//                       onChange={(e) => setNewDepartment(e.target.value)}
//                       placeholder="New department name"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleCreateDepartment}
//                       className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                     >
//                       <FiPlus />
//                     </button>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Position
//                   </label>
//                   <div className="flex items-center">
//                     <input
//                       type="text"
//                       value={searchPosition}
//                       onChange={(e) => setSearchPosition(e.target.value)}
//                       placeholder="Search position"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setSearchPosition("")}
//                       className="ml-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
//                     >
//                       Clear
//                     </button>
//                   </div>
//                   <select
//                     name="position"
//                     value={profile.position}
//                     onChange={handleInputChange}
//                     className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                   >
//                     <option value="">Select Position</option>
//                     {filteredPositions.map((pos) => (
//                       <option key={pos.id} value={pos.id}>
//                         {pos.title}
//                       </option>
//                     ))}
//                   </select>
//                   <div className="mt-2 flex items-center">
//                     <input
//                       type="text"
//                       value={newPosition}
//                       onChange={(e) => setNewPosition(e.target.value)}
//                       placeholder="New position title"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleCreatePosition}
//                       className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                     >
//                       <FiPlus />
//                     </button>
//                   </div>
//                 </div>
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
//   onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
//   type?: string;
//   placeholder?: string;
//   options?: { value: string; label: string }[];
// }

// const FormField: React.FC<FormFieldProps> = ({
//   label,
//   name,
//   value,
//   onChange,
//   type = "text",
//   placeholder,
//   options,
// }) => (
//   <div>
//     <label
//       htmlFor={name}
//       className="block text-sm font-medium text-gray-700 mb-1"
//     >
//       {label}
//     </label>
//     {options ? (
//       <select
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//       >
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     ) : (
//       <input
//         type={type}
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//       />
//     )}
//   </div>
// );

// export default EmployeeProfileForm;























"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiX, FiUpload, FiUser, FiPlus } from "react-icons/fi";
import axios from "axios";
import { getAccessToken, refreshAccessToken } from "@/lib/utils"; // Adjust the import path as needed

interface EmployeeProfileData {
  user: {
    username: string;
    password: string;
    email: string;
    is_employee: boolean;
  };
  name: string;
  email: string;
  address: string;
  state: string;
  hired_date: string;
  department_id: number;
  position: number;
  company: number;
  passport: File | null;
}

interface Department {
  id: number;
  name: string;
}

interface Position {
  id: number;
  title: string;
  department: number;
}

const EmployeeProfileForm: React.FC = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<EmployeeProfileData>({
    user: {
      username: "",
      password: "",
      email: "",
      is_employee: true,
    },
    name: "",
    email: "",
    address: "",
    state: "",
    hired_date: "",
    department_id: 0,
    position: 0,
    company: 1, // Assuming a default company ID
    passport: null,
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [newDepartment, setNewDepartment] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [searchPosition, setSearchPosition] = useState("");

  useEffect(() => {
    fetchDepartments();
    fetchPositions();
  }, []);

  const fetchDepartments = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        "https://erp-backend-nv09.onrender.com/api/departments/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      handleTokenRefresh(error);
    }
  };

  const fetchPositions = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        "https://erp-backend-nv09.onrender.com/api/departments/positions/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPositions(response.data);
    } catch (error) {
      console.error("Error fetching positions:", error);
      handleTokenRefresh(error);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken();
        // Retry the failed request after refreshing the token
        fetchDepartments();
        fetchPositions();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes("user.")) {
      const userField = name.split(".")[1];
      setProfile({
        ...profile,
        user: { ...profile.user, [userField]: value },
      });
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handlePassportUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfile({ ...profile, passport: e.target.files[0] });
    }
  };

  const handleCreateDepartment = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.post(
        "https://erp-backend-nv09.onrender.com/api/departments/create/",
        {
          name: newDepartment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setDepartments([...departments, response.data]);
      setNewDepartment("");
    } catch (error) {
      console.error("Error creating department:", error);
      handleTokenRefresh(error);
    }
  };

  const handleCreatePosition = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.post(
        "https://erp-backend-nv09.onrender.com/api/departments/positions/",
        {
          title: newPosition,
          department: profile.department_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPositions([...positions, response.data]);
      setNewPosition("");
    } catch (error) {
      console.error("Error creating position:", error);
      handleTokenRefresh(error);
    }
  };

const handleSave = async () => {
  try {
    const accessToken = await getAccessToken();
    const formData = new FormData();

    // Map the user object
    formData.append("user.username", profile.user.username);
    formData.append("user.password", profile.user.password);
    formData.append("user.email", profile.user.email);
    formData.append("user.is_employee", String(profile.user.is_employee));
    

    // Map other fields
    for (const key in profile) {
      if (key !== "user" && key !== "passport") {
        formData.append(key, profile[key as keyof EmployeeProfileData] as string);
      }
    }



    if (profile.passport) {
      formData.append("passport", profile.passport);
    }

    const response = await axios.post(
      "https://erp-backend-nv09.onrender.com/api/auths/register/employee/",
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Employee registered:", response.data);
    router.push("/employees");
  } catch (error) {
    console.error("Error registering employee:", error);
    handleTokenRefresh(error);
  }
};


  const handleDiscard = () => {
    router.push("/employees");
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchDepartment.toLowerCase())
  );

  const filteredPositions = positions.filter((pos) =>
    pos.title.toLowerCase().includes(searchPosition.toLowerCase())
  );

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
                    label="Email"
                    name="user.email"
                    value={profile.user.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Employee Email"
                  />
                  <FormField
                    label="Work Email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Company Email"
                  />
                  <FormField
                    label="Username"
                    name="user.username"
                    value={profile.user.username}
                    onChange={handleInputChange}
                    placeholder="Employee Username"
                  />
                  <FormField
                    label="Password"
                    name="user.password"
                    value={profile.user.password}
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Employee Password"
                  />
                  <FormField
                    label="Address"
                    name="address"
                    value={profile.address}
                    onChange={handleInputChange}
                    placeholder="Employee Address"
                  />
                  <FormField
                    label="State"
                    name="state"
                    value={profile.state}
                    onChange={handleInputChange}
                    placeholder="State of Residence"
                  />
                  <FormField
                    label="Hired Date"
                    name="hired_date"
                    value={profile.hired_date}
                    onChange={handleInputChange}
                    type="date"
                    placeholder="Date Hired"
                  />
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="department_id"
                      className="text-sm font-medium text-gray-700"
                    >
                      Department
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={searchDepartment}
                        onChange={(e) => setSearchDepartment(e.target.value)}
                        placeholder="Search Departments"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => setSearchDepartment("")}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                      >
                        <FiX />
                      </button>
                    </div>
                    <select
                      name="department_id"
                      value={profile.department_id}
                      onChange={handleInputChange}
                      className="mt-2 px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value={0}>Select Department</option>
                      {filteredDepartments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        value={newDepartment}
                        onChange={(e) => setNewDepartment(e.target.value)}
                        placeholder="New Department Name"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={handleCreateDepartment}
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="position"
                      className="text-sm font-medium text-gray-700"
                    >
                      Position
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={searchPosition}
                        onChange={(e) => setSearchPosition(e.target.value)}
                        placeholder="Search Positions"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => setSearchPosition("")}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                      >
                        <FiX />
                      </button>
                    </div>
                    <select
                      name="position"
                      value={profile.position}
                      onChange={handleInputChange}
                      className="mt-2 px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value={0}>Select Position</option>
                      {filteredPositions.map((pos) => (
                        <option key={pos.id} value={pos.id}>
                          {pos.title}
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        value={newPosition}
                        onChange={(e) => setNewPosition(e.target.value)}
                        placeholder="New Position Title"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={handleCreatePosition}
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleDiscard}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300"
                >
                  <FiX className="mr-2" />
                  Discard
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <FiSave className="mr-2" />
                  Save
                </button>
              </div>
            </form>
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
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={name} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="px-3 py-2 border border-gray-300 rounded-md"
    />
  </div>
);

export default EmployeeProfileForm;
