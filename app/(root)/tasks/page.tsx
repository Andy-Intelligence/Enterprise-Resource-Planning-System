// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import TaskCard from "@/components/TaskCard";
// import { FiSearch, FiPlus } from "react-icons/fi";

// const TasksComponent = () => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");

//   // Dummy data for pagination
//   const totalTasks = 50;
//   const tasksPerPage = 9;
//   const totalPages = Math.ceil(totalTasks / tasksPerPage);

//   return (
//     <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//           onClick={() => router.push("/tasks/create")}
//         >
//           <FiPlus /> Create Task
//         </button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg p-6 mb-8">
//         <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mb-6">
//           <FiSearch className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="Search tasks..."
//             className="bg-transparent w-full focus:outline-none"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(9)].map((_, index) => (
//             <TaskCard key={index} />
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-between items-center">
//         <p className="text-gray-600">
//           Showing {tasksPerPage} of {totalTasks} tasks
//         </p>
//         <div className="flex gap-2">
//           {[...Array(totalPages)].map((_, index) => (
//             <button
//               key={index}
//               className={`px-3 py-1 rounded ${
//                 index === 0
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TasksComponent;










"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TaskCard from "@/components/TaskCard";
import { FiSearch, FiPlus } from "react-icons/fi";

// Dummy data for tasks
const tasks = [
  { id: 1, title: "Design New Website" },
  { id: 2, title: "Develop API" },
  { id: 3, title: "Database Migration" },
  // Add more tasks as needed
];

const TasksComponent = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy data for pagination
  const totalTasks = tasks.length;
  const tasksPerPage = 9;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/tasks/create")}
        >
          <FiPlus /> Create Task
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mb-6">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="bg-transparent w-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks
            .filter((task) =>
              task.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((task) => (
              <TaskCard key={task.id} taskId={task.id} title={task.title} />
            ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {tasksPerPage} of {totalTasks} tasks
        </p>
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${
                index === 0
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksComponent;

