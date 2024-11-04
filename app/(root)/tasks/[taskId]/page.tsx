
 

"use client";

 import React, { useState, useEffect } from "react";
 import { useRouter, useParams } from "next/navigation";
 import {
   FiClock,
   FiCalendar,
   FiUser,
   FiBarChart2,
   FiCheckSquare,
   FiAlertCircle,
   FiEdit,
   FiTrash2,
 } from "react-icons/fi";
 import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
 } from "@/components/ui/tabs";
 import { Progress } from "@/components/ui/progress";
 import axios from "axios";
 import { getAccessToken, refreshAccessToken } from "@/lib/utils";

 interface Task {
   id: number;
   name: string;
   description: string;
   material_requisition: string;
   material_consumed: string;
   material_planning: string;
   hours_planned: string;
   stage: string;
   deadline: string;
   created: string;
   project: number;
   assigned_to: number;
 }

 interface StatCardProps {
   title: string;
   value: string | number;
   icon: React.ReactNode;
 }

 interface DetailItemProps {
   label: string;
   value: string | number;
 }

 interface TimelineItemProps {
   icon: React.ReactNode;
   title: string;
   date: string;
 }

 interface ProgressBarProps {
   label: string;
   value: number;
 }

 const TaskDetailsDisplay: React.FC = () => {
   const router = useRouter();
   const { taskId } = useParams();
   const [task, setTask] = useState<Task | null>(null);

   useEffect(() => {
     if (taskId) {
       fetchTaskDetails();
     }
   }, [taskId]);

   const fetchTaskDetails = async () => {
     try {
       const accessToken = await getAccessToken();
       const response = await axios.get(
         `https://erp-backend-nv09.onrender.com/api/projects/tasks/${taskId}/`,
         {
           headers: {
             Authorization: `Bearer ${accessToken}`,
           },
         }
       );
       setTask(response.data);
     } catch (error) {
       console.error("Error fetching task details:", error);
       handleTokenRefresh(error);
     }
   };

   const handleTokenRefresh = async (error: any) => {
     if (error.response && error.response.status === 401) {
       try {
         await refreshAccessToken();
         fetchTaskDetails();
       } catch (refreshError) {
         console.error("Error refreshing token:", refreshError);
       }
     }
   };

   const handleEdit = () => {
     router.push(`/tasks/edit/${taskId}`);
   };

   const handleDelete = async () => {
     if (window.confirm("Are you sure you want to delete this task?")) {
       try {
         const accessToken = await getAccessToken();
         await axios.delete(
           `https://erp-backend-nv09.onrender.com/api/projects/tasks/delete/${taskId}/`,
           {
             headers: {
               Authorization: `Bearer ${accessToken}`,
             },
           }
         );
         router.push("/tasks");
       } catch (error) {
         console.error("Error deleting task:", error);
         handleTokenRefresh(error);
       }
     }
   };

   if (!task) {
     return <div>Loading...</div>;
   }

   const getStatusColor = (stage: string) => {
     switch (stage) {
       case "Planning":
         return "bg-yellow-500";
       case "In Progress":
         return "bg-blue-500";
       case "Completed":
         return "bg-green-500";
       default:
         return "bg-gray-500";
     }
   };

   return (
     <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
       <div className="max-w-7xl mx-auto">
         <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
           <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-white">
             <h1 className="text-4xl font-bold mb-2">{task.name}</h1>
             <p className="text-blue-100 mb-6">Project ID: {task.project}</p>
             <div className="flex items-center space-x-4">
               <span
                 className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                   task.stage
                 )}`}
               >
                 {task.stage}
               </span>
               <div className="flex items-center space-x-2">
                 <FiBarChart2 className="text-blue-200" />
                 <span className="font-semibold">Progress: 45%</span>
               </div>
             </div>
             <div className="mt-6 flex items-center space-x-4">
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

           <div className="p-8">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               <StatCard
                 title="Hours Planned"
                 value={new Date(task.hours_planned).toLocaleTimeString()}
                 icon={<FiClock className="text-green-600 text-2xl" />}
               />
               <StatCard
                 title="Deadline"
                 value={new Date(task.deadline).toLocaleDateString()}
                 icon={<FiCalendar className="text-green-600 text-2xl" />}
               />
               <StatCard
                 title="Assigned To"
                 value={`User ID: ${task.assigned_to}`}
                 icon={<FiUser className="text-green-600 text-2xl" />}
               />
               <StatCard
                 title="Task Status"
                 value={task.stage}
                 icon={<FiCheckSquare className="text-green-600 text-2xl" />}
               />
             </div>

             <Tabs defaultValue="details" className="w-full">
               <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                 <TabsTrigger
                   value="details"
                   className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                 >
                   Task Details
                 </TabsTrigger>
                 <TabsTrigger
                   value="description"
                   className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                 >
                   Description
                 </TabsTrigger>
                 <TabsTrigger
                   value="materials"
                   className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                 >
                   Materials
                 </TabsTrigger>
               </TabsList>

               <TabsContent value="details">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <h3 className="text-lg font-semibold text-gray-800 mb-4">
                       Task Information
                     </h3>
                     <dl className="space-y-2">
                       <DetailItem label="Project ID" value={task.project} />
                       <DetailItem
                         label="Assigned To"
                         value={task.assigned_to}
                       />
                       <DetailItem label="Stage" value={task.stage} />
                       <DetailItem
                         label="Hours Planned"
                         value={new Date(
                           task.hours_planned
                         ).toLocaleTimeString()}
                       />
                       <DetailItem
                         label="Deadline"
                         value={new Date(task.deadline).toLocaleDateString()}
                       />
                     </dl>
                   </div>
                   <div>
                     <h3 className="text-lg font-semibold text-gray-800 mb-4">
                       Task Timeline
                     </h3>
                     <div className="space-y-4">
                       <TimelineItem
                         icon={<FiCheckSquare className="text-green-500" />}
                         title="Task Created"
                         date={new Date(task.created).toLocaleDateString()}
                       />
                       <TimelineItem
                         icon={<FiUser className="text-green-500" />}
                         title="Assigned to Team"
                         date={new Date(task.created).toLocaleDateString()}
                       />
                       <TimelineItem
                         icon={<FiAlertCircle className="text-yellow-500" />}
                         title={task.stage}
                         date={new Date().toLocaleDateString()}
                       />
                     </div>
                   </div>
                 </div>
               </TabsContent>

               <TabsContent value="description">
                 <div className="bg-gray-50 rounded-xl p-6">
                   <h3 className="text-lg font-semibold text-gray-800 mb-4">
                     Task Description
                   </h3>
                   <p className="text-gray-600 whitespace-pre-wrap">
                     {task.description}
                   </p>
                 </div>
               </TabsContent>

               <TabsContent value="materials">
                 <div className="bg-gray-50 rounded-xl p-6">
                   <h3 className="text-lg font-semibold text-gray-800 mb-4">
                     Materials
                   </h3>
                   <div className="space-y-4">
                     <div>
                       <h4 className="text-md font-semibold text-gray-700">
                         Requisition
                       </h4>
                       <p className="text-gray-600">
                         {task.material_requisition}
                       </p>
                     </div>
                     <div>
                       <h4 className="text-md font-semibold text-gray-700">
                         Consumed
                       </h4>
                       <p className="text-gray-600">{task.material_consumed}</p>
                     </div>
                     <div>
                       <h4 className="text-md font-semibold text-gray-700">
                         Planning
                       </h4>
                       <p className="text-gray-600">{task.material_planning}</p>
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

 // Subcomponents
 const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
   <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
     <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
     <div>
       <p className="text-sm font-medium text-gray-600">{title}</p>
       <p className="text-2xl font-bold text-gray-800">{value}</p>
     </div>
   </div>
 );

 const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
   <div className="flex items-center">
     <dt className="w-1/3 text-sm font-medium text-gray-600">{label}:</dt>
     <dd className="w-2/3 text-sm text-gray-800">{value}</dd>
   </div>
 );

 const TimelineItem: React.FC<TimelineItemProps> = ({ icon, title, date }) => (
   <div className="flex items-center space-x-3">
     <div className="bg-white p-2 rounded-full shadow">{icon}</div>
     <div>
       <p className="text-sm font-medium text-gray-800">{title}</p>
       <p className="text-xs text-gray-500">{date}</p>
     </div>
   </div>
 );

 export default TaskDetailsDisplay;
