"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiPlus, FiFilter } from "react-icons/fi";
import axios from "axios";

interface Employee {
  id: string;
  image: string;
  name: string;
  designation: string;
  department: string;
}

interface Appraisal {
  id: string;
  // employee: Employee;
  employee: any;
  employeeCode: string;
  appraisedBy: any;
  // appraisedBy: {
  //   id: string;
  //   name: string;
  // };
  appraisalDate: string;
  score: number;
  comments: string;
  department: string;
}

const AppraisalPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [appraisals, setAppraisals] = useState<Appraisal[]>([]);

  useEffect(() => {
    fetchAppraisals();
  }, []);

  const fetchAppraisals = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get<Appraisal[]>(
        "https://erp-backend-nv09.onrender.com/api/payrolls/appraisals/list/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setAppraisals(response.data);
    } catch (error) {
      console.error("Error fetching appraisals:", error);
      handleTokenRefresh(error);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          "https://erp-backend-nv09.onrender.com/api/auth/token/refresh/",
          {
            refresh: refreshToken,
          }
        );
        localStorage.setItem("accessToken", response.data.access);
        fetchAppraisals();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        router.push("/sign-in");
      }
    }
  };

  const departmentTypes = ["Mechanical", "Electrical", "Civil"];

  const filteredAppraisals = appraisals.filter(
    (appraisal) =>
      (filterType === "" || appraisal.department === filterType) &&
      (searchQuery === "" ||
        appraisal.employee.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        appraisal.employeeCode
          .toLowerCase()
          .includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Appraisal</h1>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/appraisal/create")}
        >
          <FiPlus /> Create Appraisal
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-1/2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search employees..."
              className="bg-transparent w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <FiFilter className="text-gray-400 mr-2" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-100 rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="">All Departments</option>
              {departmentTypes.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Employee</th>
                <th className="py-3 px-4 text-left">Employee Code</th>
                <th className="py-3 px-4 text-left">Designation</th>
                <th className="py-3 px-4 text-left">Department</th>
                <th className="py-3 px-4 text-left">Appraisal Score</th>
                <th className="py-3 px-4 text-left">Appraisal Date</th>
                <th className="py-3 px-4 text-left">Appraised By</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppraisals.map((appraisal) => (
                <tr
                  key={appraisal.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => router.push(`/appraisal/${appraisal.id}`)}
                >
                  <td className="py-4 px-4 border-b">
                    <div className="flex items-center">
                      <img
                        src={
                          appraisal.employee.image ||
                          "https://i.pravatar.cc/300" 
                        }
                        alt={appraisal.employee.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <span>{appraisal.employee.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 border-b">
                    {/* {appraisal.employeeCode} */}
                    {appraisal.employee}
                  </td>
                  <td className="py-4 px-4 border-b">
                    {appraisal.employee.designation}
                  </td>
                  <td className="py-4 px-4 border-b">{appraisal.department}</td>
                  <td className="py-4 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        appraisal.score >= 50
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {appraisal.score}
                    </span>
                  </td>
                  <td className="py-4 px-4 border-b">
                    {new Date(appraisal.appraisalDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 border-b">
                    {/* {appraisal.appraisedBy.name} */}
                    {appraisal.appraisedBy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredAppraisals.length} of {appraisals.length} appraisals
        </p>
        <div className="flex gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                page === 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppraisalPage;
