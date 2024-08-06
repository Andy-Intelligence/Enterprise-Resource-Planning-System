"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { PDFDocument, rgb } from "pdf-lib";
import { FiEye, FiFilePlus, FiFileText, FiCheck } from "react-icons/fi";

type InfoOption =
  | "contractor"
  | "sub-contractor"
  | "head of project"
  | "client"
  | "site address"
  | "budget"
  | "planned amount"
  | "start date"
  | "end date"
  | "duration"
  | "site stage"
  | "site image"
  | "issues"
  | "status"
  | "uploads";

const Report: React.FC = () => {
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [selectedInfo, setSelectedInfo] = useState<InfoOption[]>([]);
  const [notes, setNotes] = useState("");

  const infoOptions: InfoOption[] = [
    "contractor",
    "sub-contractor",
    "head of project",
    "client",
    "site address",
    "budget",
    "planned amount",
    "start date",
    "end date",
    "duration",
    "site stage",
    "site image",
    "issues",
    "status",
    "uploads",
  ];

  const dummyData: Record<InfoOption, string> = {
    contractor: "ABC Corp",
    "sub-contractor": "XYZ Ltd",
    "head of project": "John Doe",
    client: "Client Name",
    "site address": "123 Street, City",
    budget: "$100,000",
    "planned amount": "$90,000",
    "start date": "2024-01-01",
    "end date": "2024-12-31",
    duration: "12 months",
    "site stage": "Foundation",
    "site image": "site_image.jpg",
    issues: "No issues reported.",
    status: "On track",
    uploads: "Document.pdf",
  };

  const handleCheckboxChange = (info: InfoOption) => {
    setSelectedInfo((prev) =>
      prev.includes(info)
        ? prev.filter((item) => item !== info)
        : [...prev, info]
    );
  };

  const generatePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { height } = page.getSize();
    const fontSize = 12;

    page.drawText(`Report Title: ${title}`, {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Project: ${project}`, {
      x: 50,
      y: height - 8 * fontSize,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    selectedInfo.forEach((info, index) => {
      page.drawText(`${info}: ${dummyData[info]}`, {
        x: 50,
        y: height - (12 + index * 4) * fontSize,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
    });

    page.drawText(`Notes: ${notes}`, {
      x: 50,
      y: 50,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    return pdfDoc.save();
  };

  const handleViewReport = async () => {
    const pdfBytes = await generatePDF();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const handleDownloadPDF = async () => {
    const pdfBytes = await generatePDF();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadExcel = () => {
    const reportData = [
      { Info: "Title", Value: title },
      { Info: "Project", Value: project },
      ...selectedInfo.map((info) => ({ Info: info, Value: dummyData[info] })),
      { Info: "Notes", Value: notes },
    ];

    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "report.xlsx");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white py-6 px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Create Report</h1>
          </div>
          <div className="p-8">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Report Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  icon={<FiFileText className="text-gray-400" />}
                />
                <FormField
                  label="Project"
                  name="project"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  options={[
                    { value: "", label: "Select Project" },
                    { value: "Project A", label: "Project A" },
                    { value: "Project B", label: "Project B" },
                  ]}
                  icon={<FiFilePlus className="text-gray-400" />}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Include in Report:
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {infoOptions.map((info) => (
                    <div key={info} className="flex items-center">
                      <input
                        type="checkbox"
                        id={info}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={selectedInfo.includes(info)}
                        onChange={() => handleCheckboxChange(info)}
                      />
                      <label
                        htmlFor={info}
                        className="ml-2 block text-sm text-gray-900"
                      >
                        {info}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
            </form>
          </div>
          <div className="bg-gray-50 px-8 py-6 flex justify-end space-x-4">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              onClick={handleViewReport}
            >
              <FiEye className="mr-2" /> View
            </button>
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
              onClick={handleDownloadPDF}
            >
              <FiFileText className="mr-2" /> PDF
            </button>
            <button
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
              onClick={handleDownloadExcel}
            >
              <FiCheck className="mr-2" /> Excel
            </button>
          </div>
        </div>
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
  options?: { value: string; label: string }[];
  icon?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  icon,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      {options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full ${
            icon ? "pl-10" : "pl-3"
          } pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full ${
            icon ? "pl-10" : "pl-3"
          } pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
        />
      )}
    </div>
  </div>
);

export default Report;
