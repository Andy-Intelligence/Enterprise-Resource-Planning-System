




"use client";
import { motion } from "framer-motion";
import { FiHome, FiRefreshCw, FiMessageSquare, FiFileText, FiCalendar, FiFolder, FiBell, FiLayers } from "react-icons/fi";
import Image from "next/image";
import React,{ useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiX } from "react-icons/fi";



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

const AdminClientPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [selectedClientId, setSelectedClientId] = useState<string>("");
   const [projectImages, setProjectImages] = useState<string[]>([]);
   const [selectedImage, setSelectedImage] = useState(0);

   const onDrop = useCallback((acceptedFiles: File[]) => {
     acceptedFiles.forEach((file) => {
       const reader = new FileReader();
       reader.onload = () => {
         setProjectImages((prev) => [...prev, reader.result as string]);
       };
       reader.readAsDataURL(file);
     });
   }, []);

 const { getRootProps, getInputProps, isDragActive } = useDropzone({
   onDrop,
   accept: {
     "image/*": [],
   },
 });

   const removeImage = (index: number) => {
     setProjectImages((prev) => prev.filter((_, i) => i !== index));
     if (selectedImage >= index) {
       setSelectedImage((prev) => Math.max(0, prev - 1));
     }
   };

    //  const projectImages = [
    //    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
    //    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
    //    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
    //    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
    //  ];


  // Mock data for clients and their projects
  const clients: ClientData[] = [
    {
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
    },
    {
      id: "client2",
      name: "XYZ Industries",
      projects: [
        {
          name: "Project Beta",
          contractor: "ABC Builders",
          client: "XYZ Industries",
          working_time: "8:00 AM - 4:00 PM",
          document: null,
          description: "This project is focused on renewable energy.",
          project_manager: "Mary Johnson",
          deadline: "2024-06-30",
          status: "completed",
          team_lead: "Michael Lee",
          team_members: "David, Emma, Frank",
          budget: 2000000,
        },
      ],
    },
  ];

  // Get the selected client's data
  const selectedClient = clients.find(
    (client) => client.id === selectedClientId
  );

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClientId(e.target.value);
  };

  const tabIcons = {
    dashboard: FiHome,
    "project-updates": FiRefreshCw,
    feedback: FiMessageSquare,
    documents: FiFolder,
    notices: FiBell,
    projects: FiLayers,
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <nav className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg py-4 shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-indigo-700 text-3xl font-extrabold">
            AdminClient<span className="text-blue-500">Portal</span>
          </div>
          <div className="flex space-x-2">
            {Object.entries(tabIcons).map(([tab, Icon]) => (
              <motion.button
                key={tab}
                className={`text-gray-600 hover:text-indigo-600 transition p-2 rounded-full ${
                  activeTab === tab ? "bg-indigo-100 text-indigo-600" : ""
                }`}
                onClick={() => handleTabChange(tab)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-6 h-6" />
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
          className="bg-white rounded-2xl shadow-xl p-6 mb-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Select Client
          </h2>
          <select
            className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedClientId}
            onChange={handleClientChange}
          >
            <option value="">Select a client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </motion.div>

        {selectedClient && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {activeTab === "dashboard" && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  Dashboard
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    {projectImages.length > 0 ? (
                      <>
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
                            <div key={index} className="relative">
                              <button
                                onClick={() => setSelectedImage(index)}
                                className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                                  selectedImage === index
                                    ? "ring-2 ring-indigo-500"
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
                              <button
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                              >
                                <FiX />
                              </button>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div
                        {...getRootProps()}
                        className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl h-80 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
                      >
                        <input {...getInputProps()} />
                        <div className="text-center">
                          <FiUpload className="mx-auto text-4xl text-gray-400 mb-2" />
                          <p className="text-gray-500">
                            {isDragActive
                              ? "Drop the files here"
                              : "Drag 'n' drop project images, or click to select"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-700">
                      Project Details
                    </h3>
                    {Object.entries(selectedClient.projects[0]).map(
                      ([key, value]) => (
                        <p key={key} className="mb-2">
                          <span className="font-semibold text-gray-600 capitalize">
                            {key.replace("_", " ")}:
                          </span>{" "}
                          <span className="text-gray-800">
                            {value?.toString()}
                          </span>
                        </p>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "project-updates" && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  Update Project
                </h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Update Description
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      rows={4}
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg shadow-sm p-3 bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="on-schedule">On Schedule</option>
                      <option value="behind-schedule">Behind Schedule</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <motion.button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Submit Update
                  </motion.button>
                </form>
              </div>
            )}

            {activeTab === "feedback" && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  Client Feedback
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl shadow">
                    <p className="font-semibold text-gray-700">
                      Client: {selectedClient.name}
                    </p>
                    <p className="text-gray-600">
                      Comments: Great work on the project! Keep up the good
                      progress.
                    </p>
                    <p className="text-gray-600">Satisfaction: 5/5</p>
                  </div>
                </div>
              </div>
            )}

     


            {activeTab === "documents" && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  Upload Document
                </h2>
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Title
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attach Document
                    </label>
                    <input
                      type="file"
                      className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Submit Document
                  </motion.button>
                </form>
              </div>
            )}

            {activeTab === "notices" && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Post Notice</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Notice Title
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Notice Description
                    </label>
                    <textarea
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      rows={4}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Post Notice
                  </button>
                </form>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>
                <div className="space-y-4">
                  {selectedClient.projects.map((project) => (
                    <div
                      key={project.name}
                      className="p-4 bg-gray-100 rounded-lg shadow"
                    >
                      <h3 className="text-xl font-bold text-gray-800">
                        {project.name}
                      </h3>
                      <p className="text-gray-600">
                        Contractor: {project.contractor}
                      </p>
                      <p className="text-gray-600">Status: {project.status}</p>
                      <p className="text-gray-600">
                        Deadline: {project.deadline}
                      </p>
                      <p className="text-gray-600">
                        Budget: ${project.budget.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminClientPortal;
