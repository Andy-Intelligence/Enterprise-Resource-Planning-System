
// "use client"
// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import { PDFDocument, rgb } from "pdf-lib";

// type InfoOption =
//   | "contractor"
//   | "sub-contractor"
//   | "head of project"
//   | "client"
//   | "site address"
//   | "budget"
//   | "planned amount"
//   | "start date"
//   | "end date"
//   | "duration"
//   | "note"
//   | "issues"
//   | "status"
//   | "uploads";

// const Report: React.FC = () => {
//   const [title, setTitle] = useState("");
//   const [project, setProject] = useState("");
//   const [selectedInfo, setSelectedInfo] = useState<InfoOption[]>([]);

//   const infoOptions: InfoOption[] = [
//     "contractor",
//     "sub-contractor",
//     "head of project",
//     "client",
//     "site address",
//     "budget",
//     "planned amount",
//     "start date",
//     "end date",
//     "duration",
//     "note",
//     "issues",
//     "status",
//     "uploads",
//   ];

//   const dummyData: Record<InfoOption, string> = {
//     contractor: "ABC Corp",
//     "sub-contractor": "XYZ Ltd",
//     "head of project": "John Doe",
//     client: "Client Name",
//     "site address": "123 Street, City",
//     budget: "$100,000",
//     "planned amount": "$90,000",
//     "start date": "2024-01-01",
//     "end date": "2024-12-31",
//     duration: "12 months",
//     note: "This is a project note.",
//     issues: "No issues reported.",
//     status: "On track",
//     uploads: "Document.pdf",
//   };

//   const handleCheckboxChange = (info: InfoOption) => {
//     setSelectedInfo((prev) =>
//       prev.includes(info)
//         ? prev.filter((item) => item !== info)
//         : [...prev, info]
//     );
//   };

//   const handleViewReport = async () => {
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([600, 400]);

//     const { width, height } = page.getSize();
//     const fontSize = 12;

//     page.drawText(`Report Title: ${title}`, {
//       x: 50,
//       y: height - 4 * fontSize,
//       size: fontSize,
//       color: rgb(0, 0, 0),
//     });

//     page.drawText(`Project: ${project}`, {
//       x: 50,
//       y: height - 8 * fontSize,
//       size: fontSize,
//       color: rgb(0, 0, 0),
//     });

//     selectedInfo.forEach((info, index) => {
//       page.drawText(`${info}: ${dummyData[info]}`, {
//         x: 50,
//         y: height - (12 + index * 4) * fontSize,
//         size: fontSize,
//         color: rgb(0, 0, 0),
//       });
//     });

//     const pdfBytes = await pdfDoc.save();
//     const blob = new Blob([pdfBytes], { type: "application/pdf" });
//     const url = URL.createObjectURL(blob);

//     window.open(url, "_blank");
//   };

//   const handleDownloadPDF = async () => {
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([600, 400]);

//     const { width, height } = page.getSize();
//     const fontSize = 12;

//     page.drawText(`Report Title: ${title}`, {
//       x: 50,
//       y: height - 4 * fontSize,
//       size: fontSize,
//       color: rgb(0, 0, 0),
//     });

//     page.drawText(`Project: ${project}`, {
//       x: 50,
//       y: height - 8 * fontSize,
//       size: fontSize,
//       color: rgb(0, 0, 0),
//     });

//     selectedInfo.forEach((info, index) => {
//       page.drawText(`${info}: ${dummyData[info]}`, {
//         x: 50,
//         y: height - (12 + index * 4) * fontSize,
//         size: fontSize,
//         color: rgb(0, 0, 0),
//       });
//     });

//     const pdfBytes = await pdfDoc.save();
//     const blob = new Blob([pdfBytes], { type: "application/pdf" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "report.pdf";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleDownloadExcel = () => {
//     const reportData = selectedInfo.map((info) => ({
//       Info: info,
//       Value: dummyData[info],
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(reportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

//     XLSX.writeFile(workbook, "report.xlsx");
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="text-3xl font-bold mb-4">Create Report</div>
//       <div className="mb-4">
//         <label className="block mb-2">Title</label>
//         <input
//           type="text"
//           className="w-full px-4 py-2 border rounded-md"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Project</label>
//         <select
//           className="w-full px-4 py-2 border rounded-md"
//           value={project}
//           onChange={(e) => setProject(e.target.value)}
//         >
//           <option value="">Select Project</option>
//           {/* Replace with dynamic project options */}
//           <option value="Project A">Project A</option>
//           <option value="Project B">Project B</option>
//         </select>
//       </div>
//       <div className="mb-4">
//         <label className="block mb-2">Include in Report:</label>
//         {infoOptions.map((info) => (
//           <div key={info} className="mb-2">
//             <label className="inline-flex items-center">
//               <input
//                 type="checkbox"
//                 className="form-checkbox"
//                 checked={selectedInfo.includes(info)}
//                 onChange={() => handleCheckboxChange(info)}
//               />
//               <span className="ml-2">{info}</span>
//             </label>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-end space-x-4">
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded-md"
//           onClick={handleViewReport}
//         >
//           View
//         </button>
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded-md"
//           onClick={handleDownloadPDF}
//         >
//           PDF
//         </button>
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded-md"
//           onClick={handleDownloadExcel}
//         >
//           Excel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Report;


"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { PDFDocument, rgb } from "pdf-lib";
import { FaEye, FaFilePdf, FaFileExcel } from "react-icons/fa";

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
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Report</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            >
              <option value="">Select Project</option>
              <option value="Project A">Project A</option>
              <option value="Project B">Project B</option>
            </select>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            onClick={handleViewReport}
          >
            <FaEye className="mr-2" /> View
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
            onClick={handleDownloadPDF}
          >
            <FaFilePdf className="mr-2" /> PDF
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
            onClick={handleDownloadExcel}
          >
            <FaFileExcel className="mr-2" /> Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;




