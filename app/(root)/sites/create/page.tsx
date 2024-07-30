"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CreateTaskDescription from "@/components/CreateTaskDescription";
import CreateDescription from "@/components/CreateDescription";

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
interface SiteFormData {
  inspectionOfficer: string;
  project: string;
  startDate: string;
  deadline: string;
  address: string;
  stage: string;
  note: string;
  images: File[];
}

const NewSiteForm: React.FC = () => {
  const router = useRouter();
  const [site, setSite] = useState<SiteFormData>({
    inspectionOfficer: "",
    project: "",
    startDate: "",
    deadline: "",
    address: "",
    stage: "",
    note: "",
    images: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSite({ ...site, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSite({
        ...site,
        images: [...site.images, ...Array.from(e.target.files)],
      });
    }
  };

  const handleSave = () => {
    console.log("Site saved:", site);
    // Add save logic here
  };

  const handleDiscard = () => {
    setSite({
      inspectionOfficer: "",
      project: "",
      startDate: "",
      deadline: "",
      address: "",
      stage: "",
      note: "",
      images: [],
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Site / New</div>
      <div className="mb-4">
        <button
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
          onClick={handleDiscard}
        >
          Discard
        </button>
      </div>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Inspection Officer
          </label>
          <select
            name="inspectionOfficer"
            value={site.inspectionOfficer}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
          >
            <option value="">Select Inspection Officer</option>
            <option value="officer1">Officer 1</option>
            <option value="officer2">Officer 2</option>
            <option value="officer3">Officer 3</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Project</label>
          <select
            name="project"
            value={site.project}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
          >
            <option value="">Select Project</option>
            <option value="project1">Project 1</option>
            <option value="project2">Project 2</option>
            <option value="project3">Project 3</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={site.startDate}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={site.deadline}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Site Address
          </label>
          <input
            type="text"
            name="address"
            value={site.address}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Site Address"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Site Stage</label>
          <select
            name="stage"
            value={site.stage}
            onChange={handleInputChange}
            className="border rounded-md px-4 py-2 w-full"
          >
            <option value="">Select Stage</option>
            {stageOptions.map((stage, index) => (
              <option key={index} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Note</label>
          <CreateDescription
            value={site.note}
            onChange={(value: string) => setSite({ ...site, note: value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">
            Site Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="border rounded-md px-4 py-2 w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default NewSiteForm;
