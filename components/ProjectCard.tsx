// "use client";

// import React from "react";
// import {
//   FaShoppingCart,
//   FaMoneyBillWave,
//   FaMapMarkerAlt,
//   FaEnvelope,
// } from "react-icons/fa";
// import Image from "next/image";

// const ProjectCard: React.FC<{ onClick: () => void }> = ({ onClick }) => {
//   // Dummy data
//   const imageUrl =
//     "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_760/https://dutumgroup.com/wp-content/uploads/2024/03/image-4-760x507.png";
//   const name = "Contractor Company";
//   const location = "123 Main St, City, Country";
//   const email = "contact@contractor.com";
//   const numberOfProjects = 2;
//   const amount = 50000;

//   return (
//     <div
//       onClick={onClick}
//       className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
//     >
//       <div className="relative h-48 w-full">
//         <Image
//           src={imageUrl}
//           alt={name}
//           layout="fill"
//           objectFit="cover"
//           className="transition-opacity duration-300 hover:opacity-90"
//         />
//       </div>
//       <div className="p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
//         <div className="space-y-2 mb-4">
//           <div className="flex items-center text-gray-600">
//             <FaMapMarkerAlt className="mr-2 text-blue-500" />
//             <span>{location}</span>
//           </div>
//           <div className="flex items-center text-gray-600">
//             <FaEnvelope className="mr-2 text-blue-500" />
//             <a
//               href={`mailto:${email}`}
//               className="hover:text-blue-500 transition-colors"
//             >
//               {email}
//             </a>
//           </div>
//         </div>
//         <div className="flex justify-between items-center pt-4 border-t border-gray-200">
//           <div className="flex items-center">
//             <FaShoppingCart className="text-green-500 mr-2" />
//             <span className="font-semibold text-gray-700">
//               {numberOfProjects}
//             </span>
//             <span className="ml-1 text-gray-600">Projects</span>
//           </div>
//           <div className="flex items-center">
//             <FaMoneyBillWave className="text-green-500 mr-2" />
//             <span className="font-semibold text-gray-700">
//               &#8358;{amount.toLocaleString()}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;





// import React from "react";
// import { FiCalendar, FiUser } from "react-icons/fi";
// import { FaBuilding } from "react-icons/fa";

// interface Project {
//   id: number;
//   name: string;
//   contractor: string;
//   client: string;
//   working_time: string;
//   document: string;
// }

// interface ProjectCardProps {
//   project: Project;
//   onClick: () => void;
// }

// const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
//   return (
//     <div
//       className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
//       onClick={onClick}
//     >
//       <h3 className="text-xl font-semibold text-gray-800 mb-2">
//         {project.name}
//       </h3>
//       <div className="flex items-center text-gray-600 mb-2">
//         <FaBuilding className="mr-2" />
//         <span>{project.contractor}</span>
//       </div>
//       <div className="flex items-center text-gray-600 mb-2">
//         <FiUser className="mr-2" />
//         <span>{project.client}</span>
//       </div>
//       <div className="flex items-center text-gray-600">
//         <FiCalendar className="mr-2" />
//         <span>{new Date(project.working_time).toLocaleDateString()}</span>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;























// import React from "react";
// import { FiCalendar, FiUser } from "react-icons/fi";
// import { FaBuilding, FaShoppingCart } from "react-icons/fa";
// import Image from "next/image";

// interface Project {
//   id: number;
//   name: string;
//   contractor: string;
//   client: string;
//   working_time: string;
//   document: string;
//   imageUrl: string;
//   numberOfProjects: number;
// }

// interface ProjectCardProps {
//   project: Project;
//   onClick: () => void;
// }

// const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
//   return (
//     <div
//       className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
//       onClick={onClick}
//     >
//       <div className="relative h-48 w-full">
//         <Image
//           src={project.imageUrl}
//           alt={project.name}
//           layout="fill"
//           objectFit="cover"
//           className="transition-opacity duration-300 hover:opacity-90"
//         />
//         <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg">
//           <div className="flex items-center">
//             <FaShoppingCart className="mr-2" />
//             <span>{project.numberOfProjects} Projects</span>
//           </div>
//         </div>
//       </div>
//       <div className="p-6">
//         <h3 className="text-xl font-semibold text-gray-800 mb-3">
//           {project.name}
//         </h3>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex items-center text-gray-600">
//             <FaBuilding className="mr-2 text-blue-500" />
//             <span className="truncate">{project.contractor}</span>
//           </div>
//           <div className="flex items-center text-gray-600">
//             <FiUser className="mr-2 text-blue-500" />
//             <span className="truncate">{project.client}</span>
//           </div>
//         </div>
//         <div className="mt-4 pt-4 border-t border-gray-200">
//           <div className="flex items-center text-gray-600">
//             <FiCalendar className="mr-2 text-blue-500" />
//             <span>{new Date(project.working_time).toLocaleDateString()}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;









import React from "react";
import { FiCalendar, FiUser } from "react-icons/fi";
import { FaBuilding, FaShoppingCart } from "react-icons/fa";
import Image from "next/image";

interface Project {
  id: number;
  name: string;
  contractor: string;
  client: string;
  working_time: string;
  document: string;
  imageUrl: string;
  numberOfProjects: number;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
      onClick={onClick}
    >
      <div className="relative h-48 w-full">
        <Image
          src={
            project.imageUrl ||
            "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_760/https://dutumgroup.com/wp-content/uploads/2024/03/image-4-760x507.png"
          }
          alt={project.name}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-300 hover:opacity-90"
        />
        <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-bl-lg">
          <div className="flex items-center">
            <FaShoppingCart className="mr-2" />
            <span>{project.numberOfProjects || 1} Projects</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          {project.name}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-gray-600">
            <FaBuilding className="mr-2 text-blue-500" />
            <span className="truncate">{project.contractor || 1}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FiUser className="mr-2 text-blue-500" />
            <span className="truncate">{project.client || 2}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center text-gray-600">
            <FiCalendar className="mr-2 text-blue-500" />
            <span>{new Date(project.working_time).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;