"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiHome,
  FiLayers,
  FiCalendar,
  FiFolder,
  FiBell,
  FiMessageSquare,
} from "react-icons/fi";

// Define the type for project data
interface ProjectData {
  name: string;
  contractor: string;
  client: string;
  working_time: string;
  document: File | null;
  description: string;
  project_manager: string;
  deadline: string;
  status: string;
  team_lead: string;
  team_members: string;
  budget: number;
}

// Define the type for client data
interface ClientData {
  id: string;
  name: string;
  projects: ProjectData[];
}

const ClientPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
   const [selectedImage, setSelectedImage] = useState(0);

   // Mock project images (replace with actual image URLs)
   const projectImages = [
     "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
     "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
 
   ];


  // Mock data for client and their projects (as a single client view)
  const client: ClientData = {
    id: "client1",
    name: "ABC Corporation",
    projects: [
      {
        name: "Project Alpha",
        contractor: "XYZ Constructions",
        client: "ABC Corporation",
        working_time: "9:00 AM - 5:00 PM",
        document: null,
        description: "This is a major infrastructure project.",
        project_manager: "John Doe",
        deadline: "2024-12-31",
        status: "active",
        team_lead: "Jane Smith",
        team_members: "Alice, Bob, Charlie",
        budget: 1000000,
      },
    ],
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const tabIcons = {
    dashboard: FiHome,
    projects: FiLayers,

    documents: FiFolder,
    notices: FiBell,
    feedback: FiMessageSquare,
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <nav className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg py-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-green-700 text-2xl font-extrabold">
            {client.name} <span className="text-green-500">Portal</span>
          </div>
          <div className="flex space-x-2">
            {Object.entries(tabIcons).map(([tab, Icon]) => (
              <motion.button
                key={tab}
                className={`text-gray-600 hover:text-green-600 transition p-2 rounded-full ${
                  activeTab === tab ? "bg-indigo-100 text-green-600" : ""
                }`}
                onClick={() => handleTabChange(tab)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === "dashboard" && (
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div className="relative w-full h-80 rounded-xl overflow-hidden">
                    <Image
                      src={projectImages[selectedImage]}
                      alt={`Project image ${selectedImage + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {projectImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                          selectedImage === index
                            ? "ring-2 ring-green-500"
                            : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-700">
                    Project Details
                  </h3>
                  {Object.entries(client.projects[0]).map(([key, value]) => (
                    <p key={key} className="mb-2">
                      <span className="font-semibold text-gray-600 capitalize">
                        {key.replace("_", " ")}:
                      </span>{" "}
                      <span className="text-gray-800">{value?.toString()}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
           
          )}

          {activeTab === "projects" && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Projects
              </h2>
              <div className="space-y-6">
                {client.projects.map((project, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 shadow">
                    <h3 className="text-2xl font-bold mb-4 text-green-600">
                      {project.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(project).map(([key, value]) => (
                        <p key={key} className="mb-2">
                          <span className="font-semibold text-gray-600 capitalize">
                            {key.replace("_", " ")}:
                          </span>{" "}
                          <span className="text-gray-800">
                            {value?.toString()}
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        

          {activeTab === "documents" && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Documents
              </h2>
              <div className="space-y-4">
                {/* Replace with dynamic document list */}
                {["Contract.pdf", "ProjectPlan.pdf"].map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-xl p-4 shadow"
                  >
                    <p className="text-gray-800 font-medium">{doc}</p>
                    <motion.button
                      className="text-green-600 hover:text-green-800 font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Download
                    </motion.button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notices" && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Notices</h2>
              <div className="space-y-6">
                {/* Replace with dynamic notice list */}
                {[
                  {
                    title: "Notice Title 1",
                    description: "This is the description of the first notice.",
                  },
                  {
                    title: "Notice Title 2",
                    description:
                      "This is the description of the second notice.",
                  },
                ].map((notice, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 shadow">
                    <h3 className="text-xl font-bold mb-2 text-green-600">
                      {notice.title}
                    </h3>
                    <p className="text-gray-700">{notice.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Feedback
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Feedback
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows={6}
                    required
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Feedback
                </motion.button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ClientPortal;
