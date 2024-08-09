"use client";

import React from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiGlobe,
  FiBriefcase,
  FiFileText,
  FiAward,
  FiTool,
} from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SubContractorData {
  id: string;
  logo: string;
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
  completedProjects: number;
  ongoingProjects: number;
  rating: number;
  services: string[];
  keyPersonnel: {
    name: string;
    position: string;
  }[];
}

const dummySubContractor: SubContractorData = {
  id: "SC001",
  logo: "https://placehold.co/200x200?text=Logo",
  subContractorName: "TechBuild Solutions Ltd.",
  specialization: "Electrical and HVAC Systems",
  contactAddress: "123 Construction Avenue, Builder's District",
  email: "info@techbuildsolutions.com",
  phoneNumber: "+234 987 654 3210",
  country: "Nigeria",
  state: "Lagos",
  city: "Lagos",
  zipCode: "100001",
  projectContract: "Standard terms for electrical and HVAC installations...",
  completedProjects: 47,
  ongoingProjects: 5,
  rating: 4.8,
  services: [
    "Electrical System Design",
    "HVAC Installation",
    "Energy Efficiency Consulting",
    "Building Automation Systems",
  ],
  keyPersonnel: [
    { name: "John Doe", position: "Managing Director" },
    { name: "Jane Smith", position: "Head of Operations" },
    { name: "Mike Johnson", position: "Lead Engineer" },
  ],
};

const SubContractorDisplayDetails: React.FC = () => {
  const subContractor = dummySubContractor;

  const InfoCard: React.FC<{
    title: string;
    value: string;
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
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-12 text-white">
            <div className="flex items-center space-x-6">
              <img
                src={subContractor.logo}
                alt={subContractor.subContractorName}
                className="w-32 h-32 rounded-lg border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  {subContractor.subContractorName}
                </h1>
                <p className="text-xl text-blue-100 mb-4">
                  {subContractor.specialization}
                </p>
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {subContractor.rating} / 5 Rating
                  </span>
                  <span className="flex items-center text-blue-200">
                    <FiAward className="mr-2" />
                    {subContractor.completedProjects} Projects Completed
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <InfoCard
                title="Email"
                value={subContractor.email}
                icon={<FiMail className="text-blue-600 text-2xl" />}
              />
              <InfoCard
                title="Phone"
                value={subContractor.phoneNumber}
                icon={<FiPhone className="text-blue-600 text-2xl" />}
              />
              <InfoCard
                title="Location"
                value={`${subContractor.city}, ${subContractor.state}`}
                icon={<FiMapPin className="text-blue-600 text-2xl" />}
              />
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Project Overview
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">
                    {subContractor.completedProjects}
                  </p>
                  <p className="text-gray-600">Completed Projects</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {subContractor.ongoingProjects}
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
                  value="services"
                >
                  Services
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="personnel"
                >
                  Key Personnel
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
                        Full Address
                      </p>
                      <p className="text-gray-800">
                        {subContractor.contactAddress}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Country
                      </p>
                      <p className="text-gray-800">{subContractor.country}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">State</p>
                      <p className="text-gray-800">{subContractor.state}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">City</p>
                      <p className="text-gray-800">{subContractor.city}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Zip Code
                      </p>
                      <p className="text-gray-800">{subContractor.zipCode}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="services">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Services Offered
                  </h3>
                  <ul className="space-y-2">
                    {subContractor.services.map((service, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <FiTool className="text-blue-600 text-xl flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="personnel">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Key Personnel
                  </h3>
                  <ul className="space-y-4">
                    {subContractor.keyPersonnel.map((person, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <FiUser className="text-blue-600 text-xl flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {person.name}
                          </p>
                          <p className="text-gray-600">{person.position}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Project Contract
              </h3>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-gray-700">{subContractor.projectContract}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubContractorDisplayDetails;
