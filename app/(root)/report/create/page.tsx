
"use client"
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { PDFDocument, rgb } from "pdf-lib";

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
  | "note"
  | "issues"
  | "status"
  | "uploads";

const Report: React.FC = () => {
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [selectedInfo, setSelectedInfo] = useState<InfoOption[]>([]);

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
    "note",
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
    note: "This is a project note.",
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

  const handleViewReport = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    const { width, height } = page.getSize();
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

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");
  };

  const handleDownloadPDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    const { width, height } = page.getSize();
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

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadExcel = () => {
    const reportData = selectedInfo.map((info) => ({
      Info: info,
      Value: dummyData[info],
    }));

    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    XLSX.writeFile(workbook, "report.xlsx");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Create Report</div>
      <div className="mb-4">
        <label className="block mb-2">Title</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Project</label>
        <select
          className="w-full px-4 py-2 border rounded-md"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        >
          <option value="">Select Project</option>
          {/* Replace with dynamic project options */}
          <option value="Project A">Project A</option>
          <option value="Project B">Project B</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Include in Report:</label>
        {infoOptions.map((info) => (
          <div key={info} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedInfo.includes(info)}
                onChange={() => handleCheckboxChange(info)}
              />
              <span className="ml-2">{info}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleViewReport}
        >
          View
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleDownloadPDF}
        >
          PDF
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleDownloadExcel}
        >
          Excel
        </button>
      </div>
    </div>
  );
};

export default Report;







