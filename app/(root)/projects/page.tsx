// "use client";

// import ProjectCard from "@/components/ProjectCard";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FiSearch, FiPlus } from "react-icons/fi";

// const ProjectsComponent = () => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");

//   // Dummy data for pagination
//   const totalProjects = 50;
//   const projectsPerPage = 9;
//   const totalPages = Math.ceil(totalProjects / projectsPerPage);

//   return (
//     <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//           onClick={() => router.push("/projects/create")}
//         >
//           <FiPlus /> Create Project
//         </button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg p-6 mb-8">
//         <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mb-6">
//           <FiSearch className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="Search projects..."
//             className="bg-transparent w-full focus:outline-none"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(9)].map((_, index) => (
//             <ProjectCard key={index} />
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-between items-center">
//         <p className="text-gray-600">
//           Showing {projectsPerPage} of {totalProjects} projects
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

// export default ProjectsComponent;




// "use client";

// import ProjectCard from "@/components/ProjectCard";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FiSearch, FiPlus } from "react-icons/fi";

// const ProjectsComponent = () => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");

//   // Dummy data for pagination
//   const totalProjects = 50;
//   const projectsPerPage = 9;
//   const totalPages = Math.ceil(totalProjects / projectsPerPage);

//   // Function to handle card click
//   const handleCardClick = (projectId: string) => {
//     router.push(`/projects/${projectId}`);
//   };

//   return (
//     <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
//         <button
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//           onClick={() => router.push("/projects/create")}
//         >
//           <FiPlus /> Create Project
//         </button>
//       </div>

//       <div className="bg-white shadow-md rounded-lg p-6 mb-8">
//         <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mb-6">
//           <FiSearch className="text-gray-400 mr-2" />
//           <input
//             type="text"
//             placeholder="Search projects..."
//             className="bg-transparent w-full focus:outline-none"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(9)].map((_, index) => (
//             <ProjectCard
//               key={index}
//               onClick={() => handleCardClick(`project-${index + 1}`)} // Pass project ID
//             />
//           ))}
//         </div>
//       </div>

//       <div className="flex justify-between items-center">
//         <p className="text-gray-600">
//           Showing {projectsPerPage} of {totalProjects} projects
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

// export default ProjectsComponent;





"use client";

import ProjectCard from "@/components/ProjectCard";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiPlus } from "react-icons/fi";
import axios from "axios";
import { getAccessToken, refreshAccessToken } from "@/lib/utils";

interface Project {
  id: number;
  name: string;
  contractor: string;
  client: string;
  working_time: string;
  document: string;
  imageUrl:string;
  numberOfProjects:number;
}

const ProjectsComponent = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;

  useEffect(() => {
    fetchProjects();
  }, [currentPage]);

  const fetchProjects = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        "https://erp-backend-nv09.onrender.com/api/projects/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            page: currentPage,
            page_size: projectsPerPage,
          },
        }
      );
      console.log(response)
      setProjects(response.data);
      setTotalProjects(response.data.length);
    } catch (error) {
      console.error("Error fetching projects:", error);
      handleTokenRefresh(error);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken();
        fetchProjects();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }
  };

  const handleCardClick = (projectId: number) => {
    router.push(`/projects/${projectId}`);
  };

  const totalPages = Math.ceil(totalProjects / projectsPerPage);

  const filteredProjects = projects?.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/projects/create")}
        >
          <FiPlus /> Create Project
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mb-6">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search projects..."
            className="bg-transparent w-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects?.map((project) => (
            
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleCardClick(project.id)}
            />
          ))}
        </div>
      </div>

      {/* <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredProjects?.length} of {totalProjects} projects
        </p>
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${
                index + 1 === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ProjectsComponent;