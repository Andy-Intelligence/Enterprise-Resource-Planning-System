"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SiteCard from "@/components/SiteCard";
import {
  FiSearch,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const SitesComponent = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const sites = [
    {
      id: 1,
      title: "Project Title",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
      address: "No.6 ekanem street",
      deadline: "12/17/2030",
    },
    {
      id: 2,
      title: "Project Title",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
      address: "No.6 ekanem street",
      deadline: "12/17/2030",
    },
    {
      id: 3,
      title: "Project Title",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
      address: "No.6 ekanem street",
      deadline: "12/17/2030",
    },
    {
      id: 4,
      title: "Project Title",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
      address: "No.6 ekanem street",
      deadline: "12/17/2030",
    },
    {
      id: 5,
      title: "Project Title",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
      address: "No.6 ekanem street",
      deadline: "12/17/2030",
    },
    {
      id: 6,
      title: "Project Title",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
      address: "No.6 ekanem street",
      deadline: "12/17/2030",
    },
  ];

  // Dummy data for pagination
  const totalSites = 50;
  const sitesPerPage = 9;
  const totalPages = Math.ceil(totalSites / sitesPerPage);

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Sites</h1>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            onClick={() => router.push("/sites/create")}
          >
            <FiPlus /> Create Site
          </button>
        </div>

        <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mb-6">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search sites..."
            className="bg-transparent w-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {sites.map((site) => (
            <SiteCard
              key={site.id}
              id={site.id} // Pass the id to the SiteCard component
              title={site.title}
              imageUrl={site.imageUrl}
              address={site.address}
              deadline={site.deadline}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            Showing {sitesPerPage} of {totalSites} sites
          </p>
          <div className="flex gap-2">
            <button className="p-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors">
              <FiChevronLeft />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-md ${
                  index === 0
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-colors`}
              >
                {index + 1}
              </button>
            ))}
            <button className="p-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitesComponent;
