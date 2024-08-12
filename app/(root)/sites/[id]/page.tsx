"use client";

import React from "react";
import {
  FiUser,
  FiCalendar,
  FiMapPin,
  FiLayers,
  FiImage,
  FiFileText,
} from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const dummySiteData = {
  inspectionOfficer: "John Doe",
  project: "Skyline Tower",
  startDate: "2024-08-01",
  deadline: "2025-12-31",
  address: "123 Construction Ave, Builder City, BC 12345",
  stage: "Superstructure Construction",
  note: "The site is progressing well. We've completed the foundation work and are now moving onto the superstructure. Some minor delays due to material delivery, but overall on track.",
  images: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/New_building_construction_site._%2811741874173%29.jpg/1280px-New_building_construction_site._%2811741874173%29.jpg",
  ],
  progress: 35,
};

const DisplaySiteDetails: React.FC = () => {
  const site = dummySiteData;

  const getStageProgress = (stage:any) => {
    const stageIndex = stageOptions.indexOf(stage);
    return ((stageIndex + 1) / stageOptions.length) * 100;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-800 px-8 py-12 text-white">
            <h1 className="text-4xl font-bold mb-2">{site.project} Site</h1>
            <p className="text-blue-100 mb-6">{site.address}</p>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-500">
                {site.stage}
              </span>
              <div className="flex items-center space-x-2">
                <FiLayers className="text-blue-200" />
                <span className="font-semibold">
                  Progress: {site.progress}%
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Inspection Officer"
                value={site.inspectionOfficer}
                icon={<FiUser className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Start Date"
                value={site.startDate}
                icon={<FiCalendar className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Deadline"
                value={site.deadline}
                icon={<FiCalendar className="text-blue-600 text-2xl" />}
              />
              <StatCard
                title="Images"
                value={`${site.images.length} uploaded`}
                icon={<FiImage className="text-blue-600 text-2xl" />}
              />
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="details"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                >
                  Site Details
                </TabsTrigger>
                <TabsTrigger
                  value="progress"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                >
                  Progress
                </TabsTrigger>
                <TabsTrigger
                  value="images"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                >
                  Images
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Site Information
                    </h3>
                    <dl className="space-y-2">
                      <DetailItem label="Project" value={site.project} />
                      <DetailItem
                        label="Inspection Officer"
                        value={site.inspectionOfficer}
                      />
                      <DetailItem label="Start Date" value={site.startDate} />
                      <DetailItem label="Deadline" value={site.deadline} />
                      <DetailItem label="Address" value={site.address} />
                      <DetailItem label="Current Stage" value={site.stage} />
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Site Note
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-gray-600 whitespace-pre-wrap">
                        {site.note}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="progress">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Construction Progress
                  </h3>
                  <div className="space-y-4">
                    <ProgressBar
                      label="Overall Progress"
                      value={site.progress}
                     
                    />
                    <ProgressBar
                      label="Stage Progress"
                      value={getStageProgress(site.stage)}
                    />
                    <h4 className="text-md font-semibold text-gray-700 mt-6 mb-2">
                      Construction Stages
                    </h4>
                    {stageOptions.map((stage, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            site.stage === stage ? "bg-blue-500" : "bg-gray-300"
                          }`}
                        ></div>
                        <span
                          className={`text-sm ${
                            site.stage === stage
                              ? "font-semibold text-blue-600"
                              : "text-gray-600"
                          }`}
                        >
                          {stage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="images">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Site Images
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {site.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`Site image ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
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

const StatCard = ({ title, value, icon }:any) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
    <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const DetailItem = ({ label, value }:any) => (
  <div className="flex items-center">
    <dt className="w-1/3 text-sm font-medium text-gray-600">{label}:</dt>
    <dd className="w-2/3 text-sm text-gray-800">{value}</dd>
  </div>
);

const ProgressBar = ({ label, value }:any) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm font-medium text-blue-600">
        {Math.round(value)}%
      </span>
    </div>
    <Progress value={value} className="h-2 bg-blue-600" />
  </div>
);

const stageOptions = [
  "Planning and Design",
  "Site Preparation",
  "Foundation Construction",
  "Superstructure Construction",
  "Roofing",
  "Exterior Walls and Cladding",
  "Interior Walls and Partitions",
  "Installation of Doors and Windows",
  "Electrical and Plumbing Rough-in",
  "HVAC Installation",
  "Insulation and Drywall",
  "Interior Finishes (flooring, painting, etc.)",
  "Exterior Finishes (siding, landscaping, etc.)",
  "Fixture and Appliance Installation",
  "Final Inspections and Punch List",
  "Project Handover and Occupancy",
];

export default DisplaySiteDetails;
