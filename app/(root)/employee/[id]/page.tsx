"use client";

import React from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiBriefcase,
  FiUsers,
  FiFlag,
} from "react-icons/fi";
import { IoSchool, IoRibbon } from "react-icons/io5";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface EmployeeData {
  id: string;
  passport: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phoneNumber: string;
  contactAddress: string;
  country: string;
  state: string;
  city: string;
  hireDate: string;
  performance: number;
  skills: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  certifications: string[];
  projects: {
    name: string;
    role: string;
    status: "Completed" | "In Progress" | "Planned";
  }[];
}

const dummyEmployee: EmployeeData = {
  id: "EMP001",
  passport: "https://i.pravatar.cc/300",
  name: "Jane Smith",
  position: "Senior Software Engineer",
  department: "Engineering",
  email: "jane.smith@company.com",
  phoneNumber: "+234 123 456 7890",
  contactAddress: "123 Tech Street, Silicon Valley",
  country: "Nigeria",
  state: "Lagos",
  city: "Lagos",
  hireDate: "2020-03-15",
  performance: 92,
  skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
  education: [
    {
      degree: "M.Sc. Computer Science",
      institution: "University of Lagos",
      year: "2018",
    },
    {
      degree: "B.Sc. Software Engineering",
      institution: "Covenant University",
      year: "2016",
    },
  ],
  certifications: [
    "AWS Certified Developer",
    "Certified Scrum Master",
    "Google Cloud Professional",
  ],
  projects: [
    {
      name: "E-commerce Platform Revamp",
      role: "Tech Lead",
      status: "Completed",
    },
    {
      name: "AI-powered Chatbot",
      role: "Senior Developer",
      status: "In Progress",
    },
    {
      name: "Mobile App for FinTech Startup",
      role: "Backend Developer",
      status: "Planned",
    },
  ],
};

const EmployeeDisplayDetails: React.FC = () => {
  const employee = dummyEmployee;

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
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 px-8 py-12 text-white">
            <div className="flex items-center space-x-6">
              <img
                src={employee.passport}
                alt={employee.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-4xl font-bold mb-2">{employee.name}</h1>
                <p className="text-xl text-blue-100 mb-4">
                  {employee.position}
                </p>
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {employee.department}
                  </span>
                  <span className="flex items-center text-blue-200">
                    <FiCalendar className="mr-2" />
                    Joined {new Date(employee.hireDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <InfoCard
                title="Email"
                value={employee.email}
                icon={<FiMail className="text-blue-600 text-2xl" />}
              />
              <InfoCard
                title="Phone"
                value={employee.phoneNumber}
                icon={<FiPhone className="text-blue-600 text-2xl" />}
              />
              <InfoCard
                title="Location"
                value={`${employee.city}, ${employee.state}`}
                icon={<FiMapPin className="text-blue-600 text-2xl" />}
              />
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Performance Overview
              </h2>
              <Progress value={employee.performance} className="h-4 mb-4" />
              <p className="text-center text-lg font-semibold text-blue-600">
                {employee.performance}% Overall Performance
              </p>
            </div>

            <Tabs defaultValue="skills" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="skills"
                >
                  Skills & Expertise
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="education"
                >
                  Education & Certifications
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="projects"
                >
                  Projects
                </TabsTrigger>
              </TabsList>
              <TabsContent value="skills">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {employee.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="education">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Education
                  </h3>
                  <ul className="space-y-4">
                    {employee.education.map((edu, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <IoSchool className="text-blue-600 text-xl flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {edu.degree}
                          </p>
                          <p className="text-gray-600">{edu.institution}</p>
                          <p className="text-sm text-gray-500">{edu.year}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                    Certifications
                  </h3>
                  <ul className="space-y-2">
                    {employee.certifications.map((cert, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <IoRibbon className="text-blue-600 text-xl flex-shrink-0" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="projects">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Projects
                  </h3>
                  <ul className="space-y-4">
                    {employee.projects.map((project, index) => (
                      <li
                        key={index}
                        className="border-b pb-4 last:border-b-0 last:pb-0"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-gray-800">
                              {project.name}
                            </p>
                            <p className="text-gray-600">{project.role}</p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-sm font-semibold ${
                              project.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : project.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDisplayDetails;
