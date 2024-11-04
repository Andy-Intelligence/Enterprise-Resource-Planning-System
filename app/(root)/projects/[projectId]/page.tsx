// "use client";

// import React from "react";
// import {
//   FiCalendar,
//   FiClock,
//   FiUsers,
//   FiBarChart2,
//   FiPieChart,
//   FiTrendingUp,
// } from "react-icons/fi";
// import { FaNairaSign } from "react-icons/fa6";
// import { TbCurrencyNaira } from "react-icons/tb";
// import { IoDocumentsSharp, IoStatsChartSharp } from "react-icons/io5";
// import {
//   FaTasks,
//   FaRegCalendarAlt,
//   FaBuilding,
//   FaUserTie,
// } from "react-icons/fa";
// import { AiOutlineIssuesClose } from "react-icons/ai";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Progress } from "@/components/ui/progress";

// interface ProjectData {
//   name: string;
//   manager: string;
//   subContractor: string;
//   client: string;
//   startDate: string;
//   endDate: string;
//   budget: string;
//   timeScheduling: string;
//   description: string;
//   status: "On Track" | "At Risk" | "Behind Schedule";
//   progress: number;
//   tasks: { completed: number; total: number };
//   issues: { open: number; closed: number };
//   documents: number;
//   teamMembers: number;
// }

// const dummyProject: ProjectData = {
//   name: "Skyline Tower Construction",
//   manager: "John Doe",
//   subContractor: "ABC Contractors Ltd.",
//   client: "Metropolis Real Estate",
//   startDate: "2023-06-01",
//   endDate: "2024-12-31",
//   budget: "₦75,000,000",
//   timeScheduling: "Standard 5-day work week",
//   description:
//     "Construction of a 50-story mixed-use skyscraper in downtown area, featuring office spaces, luxury apartments, and a rooftop restaurant.",
//   status: "On Track",
//   progress: 35,
//   tasks: { completed: 87, total: 250 },
//   issues: { open: 12, closed: 45 },
//   documents: 134,
//   teamMembers: 78,
// };

// const ProjectDetailsDisplay: React.FC = () => {
//   const project = dummyProject;

//   const StatusBadge: React.FC<{ status: ProjectData["status"] }> = ({
//     status,
//   }) => {
//     const colorClass =
//       status === "On Track"
//         ? "bg-green-100 text-green-800"
//         : status === "At Risk"
//         ? "bg-yellow-100 text-yellow-800"
//         : "bg-red-100 text-red-800";
//     return (
//       <span
//         className={`px-3 py-1 rounded-full text-sm font-semibold ${colorClass}`}
//       >
//         {status}
//       </span>
//     );
//   };

//   const StatCard: React.FC<{
//     title: string;
//     value: string | number;
//     icon: React.ReactNode;
//   }> = ({ title, value, icon }) => (
//     <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
//       <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
//       <div>
//         <p className="text-sm font-medium text-gray-600">{title}</p>
//         <p className="text-2xl font-bold text-gray-800">{value}</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-white">
//             <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
//             <p className="text-blue-100 mb-6">{project.description}</p>
//             <div className="flex items-center space-x-4">
//               <StatusBadge status={project.status} />
//               <div className="flex items-center space-x-2">
//                 <FiBarChart2 className="text-blue-200" />
//                 <span className="font-semibold">
//                   {project.progress}% Complete
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="p-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               <StatCard
//                 title="Budget"
//                 value={project.budget}
//                 icon={<TbCurrencyNaira className="text-blue-600 text-2xl" />}
//               />
//               <StatCard
//                 title="Timeline"
//                 value={`${project.startDate} - ${project.endDate}`}
//                 icon={<FiCalendar className="text-blue-600 text-2xl" />}
//               />
//               <StatCard
//                 title="Team Members"
//                 value={project.teamMembers}
//                 icon={<FiUsers className="text-blue-600 text-2xl" />}
//               />
//               <StatCard
//                 title="Documents"
//                 value={project.documents}
//                 icon={<IoDocumentsSharp className="text-blue-600 text-2xl" />}
//               />
//             </div>

//             <div className="bg-gray-50 rounded-xl p-6 mb-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                 Project Progress
//               </h2>
//               <Progress value={project.progress} className="h-4 mb-4 bg-blue-500" />
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Tasks</p>
//                   <p className="text-2xl font-bold text-gray-800">
//                     {project.tasks.completed}/{project.tasks.total}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">
//                     Open Issues
//                   </p>
//                   <p className="text-2xl font-bold text-gray-800">
//                     {project.issues.open}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">
//                     Closed Issues
//                   </p>
//                   <p className="text-2xl font-bold text-gray-800">
//                     {project.issues.closed}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <Tabs defaultValue="details" className="w-full">
//               <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
//                 <TabsTrigger
//                   className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
//                   value="details"
//                 >
//                   Project Details
//                 </TabsTrigger>
//                 <TabsTrigger
//                   className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
//                   value="team"
//                 >
//                   Team
//                 </TabsTrigger>
//                 <TabsTrigger
//                   className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
//                   value="tasks"
//                 >
//                   Tasks & Issues
//                 </TabsTrigger>
//               </TabsList>
//               <TabsContent value="details">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                       Project Information
//                     </h3>
//                     <dl className="space-y-2">
//                       <div className="flex items-center">
//                         <dt className="w-1/3 text-sm font-medium text-gray-600">
//                           Manager:
//                         </dt>
//                         <dd className="w-2/3 text-sm text-gray-800">
//                           {project.manager}
//                         </dd>
//                       </div>
//                       <div className="flex items-center">
//                         <dt className="w-1/3 text-sm font-medium text-gray-600">
//                           Sub Contractor:
//                         </dt>
//                         <dd className="w-2/3 text-sm text-gray-800">
//                           {project.subContractor}
//                         </dd>
//                       </div>
//                       <div className="flex items-center">
//                         <dt className="w-1/3 text-sm font-medium text-gray-600">
//                           Client:
//                         </dt>
//                         <dd className="w-2/3 text-sm text-gray-800">
//                           {project.client}
//                         </dd>
//                       </div>
//                     </dl>
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                       Schedule & Budget
//                     </h3>
//                     <dl className="space-y-2">
//                       <div className="flex items-center">
//                         <dt className="w-1/3 text-sm font-medium text-gray-600">
//                           Start Date:
//                         </dt>
//                         <dd className="w-2/3 text-sm text-gray-800">
//                           {project.startDate}
//                         </dd>
//                       </div>
//                       <div className="flex items-center">
//                         <dt className="w-1/3 text-sm font-medium text-gray-600">
//                           End Date:
//                         </dt>
//                         <dd className="w-2/3 text-sm text-gray-800">
//                           {project.endDate}
//                         </dd>
//                       </div>
//                       <div className="flex items-center">
//                         <dt className="w-1/3 text-sm font-medium text-gray-600">
//                           Budget:
//                         </dt>
//                         <dd className="w-2/3 text-sm text-gray-800">
//                           {project.budget}
//                         </dd>
//                       </div>
//                       <div className="flex items-center">
//                         <dt className="w-1/3 text-sm font-medium text-gray-600">
//                           Time Scheduling:
//                         </dt>
//                         <dd className="w-2/3 text-sm text-gray-800">
//                           {project.timeScheduling}
//                         </dd>
//                       </div>
//                     </dl>
//                   </div>
//                 </div>
//               </TabsContent>
//               <TabsContent value="team">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                   Team Members
//                 </h3>
//                 {/* Add team members list or grid here */}
//                 <p className="text-gray-600">
//                   Team members information will be displayed here.
//                 </p>
//               </TabsContent>
//               <TabsContent value="tasks">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                   Tasks & Issues
//                 </h3>
//                 {/* Add tasks and issues list or grid here */}
//                 <p className="text-gray-600">
//                   Tasks and issues information will be displayed here.
//                 </p>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetailsDisplay;
















"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  FiEdit,
  FiTrash2,
  FiCalendar,
  FiUser,
  FiClipboard,
  FiClock,
  FiFileText,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import axios from "axios";
import { getAccessToken, refreshAccessToken } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectDetails {
  id: number;
  name: string;
  status: string;
  document: string | null;
  working_time: string;
  created: string;
  client: number;
  contractor: number;
  parent_project: number | null;
  work_schedules: any[];
  details: any[];
  project: any[];
  timesheets: any[];
}

const ProjectDetailsDisplay: React.FC = () => {
  const router = useRouter();
  const { projectId } = useParams();
  const [project, setProject] = useState<ProjectDetails | null>(null);

  useEffect(() => {
    if (projectId) {
      fetchProjectDetails();
    }
  }, [projectId]);

  const fetchProjectDetails = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        `https://erp-backend-nv09.onrender.com/api/projects/detailed/${projectId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("res data",response)
      setProject(response.data);
    } catch (error) {
      console.error("Error fetching project details:", error);
      handleTokenRefresh(error);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken();
        fetchProjectDetails();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }
  };

  const handleEdit = () => {
    router.push(`/project/edit/${projectId}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const accessToken = await getAccessToken();
        await axios.delete(
          `https://erp-backend-nv09.onrender.com/api/projects/${projectId}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        router.push("/projects");
      } catch (error) {
        console.error("Error deleting project:", error);
        handleTokenRefresh(error);
      }
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

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
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-400 to-green-500 px-8 py-12 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
                <p className="text-xl text-blue-100 mb-4">
                  Status: {project.status}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-white text-green-600 rounded-md hover:bg-blue-100 transition-colors flex items-center"
                >
                  <FiEdit className="mr-2" /> Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center"
                >
                  <FiTrash2 className="mr-2" /> Delete
                </button>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <InfoCard
                title="Client ID"
                value={project.client}
                icon={<FiUser className="text-green-600 text-2xl" />}
              />
              <InfoCard
                title="Contractor ID"
                value={project.contractor}
                icon={<FaBuilding className="text-green-600 text-2xl" />}
              />
              <InfoCard
                title="Working Time"
                value={new Date(project.working_time).toLocaleString()}
                icon={<FiClock className="text-green-600 text-2xl" />}
              />
              <InfoCard
                title="Created"
                value={new Date(project.created).toLocaleString()}
                icon={<FiCalendar className="text-green-600 text-2xl" />}
              />
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="details"
                >
                  Project Details
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="schedules"
                >
                  Work Schedules
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="timesheets"
                >
                  Timesheets
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Project Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">ID</p>
                      <p className="text-gray-800">{project.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="text-gray-800">{project.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Status
                      </p>
                      <p className="text-gray-800">{project.status}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Document
                      </p>
                      <p className="text-gray-800">
                        {project.document || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Parent Project
                      </p>
                      <p className="text-gray-800">
                        {project.parent_project || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="schedules">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Work Schedules
                  </h3>
                  {project?.work_schedules?.length > 0 ? (
                    <ul className="space-y-2">
                      {project?.work_schedules?.map((schedule, index) => (
                        <li key={index} className="flex items-center">
                          <FiClipboard className="mr-2 text-green-500" />
                          <span>{JSON.stringify(schedule)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">
                      No work schedules available.
                    </p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="timesheets">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Timesheets
                  </h3>
                  {project?.timesheets?.length > 0 ? (
                    <ul className="space-y-2">
                      {project?.timesheets.map((timesheet, index) => (
                        <li key={index} className="flex items-center">
                          <FiFileText className="mr-2 text-green-500" />
                          <span>{JSON.stringify(timesheet)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No timesheets available.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsDisplay;
