"use client";
import React from "react";
import { useRouter } from "next/navigation";
import MaterialRequisitionRow from "@/components/MaterialRequisitionRow";


const MaterialRequisitionComponent = () => {
  const router = useRouter();

  const handleCardClick = (id: number) => {
    router.push(`/issue/${id}`);
  };

  // Dummy data for table rows
  const requisitionData = [
    {
      id: 1,
      reference: "REF123",
      destination: "Zone 1",
      partner: "Partner A",
      scheduledDate: "2024-05-20",
      sourceDocument: "DOC123",
      backOrderOf: "BO123",
      status: "Pending",
    },
    {
      id: 2,
      reference: "REF456",
      destination: "Zone 2",
      partner: "Partner B",
      scheduledDate: "2024-05-21",
      sourceDocument: "DOC456",
      backOrderOf: "BO456",
      status: "Completed",
    },
    // Add more rows as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4"> Requisition</div>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 border rounded-md"
        />
      </div>
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => router.push("/material-requisition/create/")}
        >
          Create
        </button>
        <div className="pagination">Pagination</div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">
                <input type="checkbox" />
              </th>
              <th className="py-2 px-4 border-b">S/N</th>
              <th className="py-2 px-4 border-b">Reference</th>
              <th className="py-2 px-4 border-b">Destination Location Zone</th>
              <th className="py-2 px-4 border-b">Partner</th>
              <th className="py-2 px-4 border-b">Scheduled Date</th>
              <th className="py-2 px-4 border-b">Source Document</th>
              <th className="py-2 px-4 border-b">Back Order Of</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {requisitionData.map((item, index) => (
              <MaterialRequisitionRow
                key={item.id}
                index={index + 1}
                data={item}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaterialRequisitionComponent;
