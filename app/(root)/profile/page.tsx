"use client";

import React from "react";
import {
  FiEdit,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiBriefcase,
  FiUsers,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CompanyProfileData {
  logo: string;
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
  employeeCount: number;
  yearFounded: number;
  projects: { completed: number; ongoing: number };
}

const dummyCompanyProfile: CompanyProfileData = {
  logo: "https://placehold.co/200x200?text=Logo",
  companyName: "TechBuild Innovations",
  specialization: "Sustainable Construction Solutions",
  contactAddress: "123 Green Building Avenue, Eco District",
  website: "https://www.techbuildinnovations.com",
  email: "info@techbuildinnovations.com",
  phoneNumber: "+234 123 456 7890",
  country: "Nigeria",
  state: "Lagos",
  city: "Lagos",
  zipCode: "100001",
  employeeCount: 250,
  yearFounded: 2005,
  projects: { completed: 150, ongoing: 12 },
};

const CompanyProfileDisplay: React.FC = () => {
  const router = useRouter();
  const company = dummyCompanyProfile;

  const handleEdit = () => {
    router.push("/profile/create");
  };

  const InfoCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
  }> = ({ title, value, icon }) => (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
      <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-lg font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-600 px-8 py-12 text-white relative">
            <button
              onClick={handleEdit}
              className="absolute top-4 right-4 bg-white text-green-600 px-4 py-2 rounded-full font-semibold flex items-center transition-colors hover:bg-blue-100"
            >
              <FiEdit className="mr-2" /> Edit Profile
            </button>
            <div className="flex items-center space-x-6">
              <img
                src={company.logo}
                alt={company.companyName}
                className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
              />
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {company.companyName}
                </h1>
                <p className="text-xl text-blue-100 mb-4">
                  {company.specialization}
                </p>
                <div className="flex items-center space-x-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Est. {company.yearFounded}
                  </span>
                  <span className="flex items-center text-blue-200">
                    <FiUsers className="mr-2" />
                    {company.employeeCount} Employees
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <InfoCard
                title="Email"
                value={company.email}
                icon={<FiMail className="text-green-600 text-2xl" />}
              />
              <InfoCard
                title="Phone"
                value={company.phoneNumber}
                icon={<FiPhone className="text-green-600 text-2xl" />}
              />
              <InfoCard
                title="Website"
                value={company.website}
                icon={<FiGlobe className="text-green-600 text-2xl" />}
              />
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Project Overview
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {company.projects.completed}
                  </p>
                  <p className="text-gray-600">Completed Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {company.projects.ongoing}
                  </p>
                  <p className="text-gray-600">Ongoing Projects</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="details"
                >
                  Company Details
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="location"
                >
                  Location
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Company Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Specialization
                      </p>
                      <p className="text-gray-800">{company.specialization}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Year Founded
                      </p>
                      <p className="text-gray-800">{company.yearFounded}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Employee Count
                      </p>
                      <p className="text-gray-800">{company.employeeCount}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Website
                      </p>
                      <p className="text-gray-800">{company.website}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="location">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Location Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Full Address
                      </p>
                      <p className="text-gray-800">{company.contactAddress}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Country
                      </p>
                      <p className="text-gray-800">{company.country}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">State</p>
                      <p className="text-gray-800">{company.state}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">City</p>
                      <p className="text-gray-800">{company.city}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Zip Code
                      </p>
                      <p className="text-gray-800">{company.zipCode}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileDisplay;
