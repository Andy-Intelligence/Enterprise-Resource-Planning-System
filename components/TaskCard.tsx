// "use client";
// import React from "react";
// import { FaStar, FaRegClock, FaRegFolder } from "react-icons/fa";
// import { HiOutlineStatusOnline } from "react-icons/hi";
// import { useRouter } from "next/navigation";

// interface TaskCardProps {
//   taskId: number;
//   title: string;
// }

// const TaskCard: React.FC<TaskCardProps> = ({ taskId, title }) => {
//     const router = useRouter();

//     const handleCardClick = () => {
//       router.push(`/tasks/${taskId}`);
//     };
//   return (
//     <div
//       onClick={handleCardClick}
//       className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col"
//     >
//       <div className="flex justify-between items-start mb-4">
//         <h3 className="text-xl font-semibold text-gray-800 leading-tight">
//           Task Title
//         </h3>
//         <button className="text-yellow-400 hover:text-yellow-500 transition-colors">
//           <FaStar />
//         </button>
//       </div>

//       <div className="space-y-2 mb-6">
//         <div className="flex items-center text-gray-600">
//           <FaRegFolder className="mr-2 text-blue-500" />
//           <span className="text-sm">Green Homes</span>
//         </div>
//         <div className="flex items-center text-gray-600">
//           <FaRegClock className="mr-2 text-red-500" />
//           <span className="text-sm">Deadline: Dec 17, 2030</span>
//         </div>
//       </div>

//       <div className="mt-auto flex items-center justify-between">
//         <div className="flex items-center">
//           <img
//             src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg"
//             alt="Avatar"
//             className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
//           />
//           <span className="ml-2 text-sm text-gray-600">John Doe</span>
//         </div>
//         <div className="flex items-center text-green-500">
//           <HiOutlineStatusOnline className="mr-1" />
//           <span className="text-sm font-medium">Active</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskCard;





"use client";

import React from "react";
import { FaStar, FaRegClock, FaRegFolder } from "react-icons/fa";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { useRouter } from "next/navigation";

interface TaskCardProps {
  taskId: number;
  title: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ taskId, title }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/tasks/${taskId}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 leading-tight">
          {title}
        </h3>
        <button className="text-yellow-400 hover:text-yellow-500 transition-colors">
          <FaStar />
        </button>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center text-gray-600">
          <FaRegFolder className="mr-2 text-blue-500" />
          <span className="text-sm">Project Name</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FaRegClock className="mr-2 text-red-500" />
          <span className="text-sm">Deadline: Coming soon</span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/03/GettyImages-1092658864_hero-1024x575.jpg"
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow"
          />
          <span className="ml-2 text-sm text-gray-600">Assigned User</span>
        </div>
        <div className="flex items-center text-green-500">
          <HiOutlineStatusOnline className="mr-1" />
          <span className="text-sm font-medium">Active</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;