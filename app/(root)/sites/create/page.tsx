"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CreateDescription from "@/components/CreateDescription";
import { FiSave, FiX, FiUpload } from "react-icons/fi";

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
    setSite((prevSite) => ({ ...prevSite, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSite((prevSite) => ({
        ...prevSite,
        images: [...prevSite.images, ...Array.from(e.target.files!)],
      }));
    }
  };

  const handleSave = () => {
    console.log("Site saved:", site);
    // Add save logic here
    router.push("/sites");
  };

  const handleDiscard = () => {
    router.push("/sites");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">New Site</h1>

        <div className="flex flex-wrap items-center justify-start gap-3 mb-8">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            onClick={handleSave}
          >
            <FiSave /> Save
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
            onClick={handleDiscard}
          >
            <FiX /> Discard
          </button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Inspection Officer"
            name="inspectionOfficer"
            value={site.inspectionOfficer}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select Inspection Officer" },
              { value: "officer1", label: "Officer 1" },
              { value: "officer2", label: "Officer 2" },
              { value: "officer3", label: "Officer 3" },
            ]}
          />
          <FormField
            label="Project"
            name="project"
            value={site.project}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select Project" },
              { value: "project1", label: "Project 1" },
              { value: "project2", label: "Project 2" },
              { value: "project3", label: "Project 3" },
            ]}
          />
          <FormField
            label="Start Date"
            name="startDate"
            type="date"
            value={site.startDate}
            onChange={handleInputChange}
          />
          <FormField
            label="Deadline"
            name="deadline"
            type="date"
            value={site.deadline}
            onChange={handleInputChange}
          />
          <FormField
            label="Site Address"
            name="address"
            value={site.address}
            onChange={handleInputChange}
            placeholder="Enter site address"
          />
          <FormField
            label="Site Stage"
            name="stage"
            value={site.stage}
            onChange={handleInputChange}
            options={[
              { value: "", label: "Select Stage" },
              ...stageOptions.map((stage) => ({ value: stage, label: stage })),
            ]}
          />
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Note</label>
            <CreateDescription
              value={site.note}
              onChange={(value: string) =>
                setSite((prevSite) => ({ ...prevSite, note: value }))
              }
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Site Images
            </label>
            <div className="flex items-center gap-2">
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="site-images"
              />
              <label
                htmlFor="site-images"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <FiUpload /> Upload Images
              </label>
              <span className="text-gray-600">
                {site.images.length} file(s) selected
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  options,
}) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
      {label}
    </label>
    {options ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}
  </div>
);

export default NewSiteForm;
