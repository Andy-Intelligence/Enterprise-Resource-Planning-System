"use client";
import React from "react";
import { useRouter } from "next/navigation";

const RequestQuotationRow = ({ index, data }:any) => {
  return (
    <tr>
      <td className="py-2 px-4 border-b">
        <input type="checkbox" />
      </td>
      <td className="py-2 px-4 border-b">{index}</td>
      <td className="py-2 px-4 border-b">{data.reference}</td>
      <td className="py-2 px-4 border-b">{data.orderDate}</td>
      <td className="py-2 px-4 border-b">{data.vendor}</td>
      <td className="py-2 px-4 border-b">{data.scheduledDate}</td>
      <td className="py-2 px-4 border-b">{data.sourceDocument}</td>
      <td className="py-2 px-4 border-b">{data.untaxed.toFixed(2)}</td>
      <td className="py-2 px-4 border-b">{data.total.toFixed(2)}</td>
      <td className="py-2 px-4 border-b">{data.status}</td>
    </tr>
  );
};

const RequestQuotationComponent = () => {
  const router = useRouter();

  const handleCardClick = (id:any) => {
    router.push(`/issue/${id}`);
  };

  // Dummy data for table rows
  const requisitionData = [
    {
      id: 1,
      reference: "REF123",
      orderDate: "2024-05-18",
      vendor: "Vendor A",
      scheduledDate: "2024-05-20",
      sourceDocument: "DOC123",
      untaxed: 1000.0,
      total: 1200.0,
      status: "RFQ",
    },
    {
      id: 2,
      reference: "REF456",
      orderDate: "2024-05-19",
      vendor: "Vendor B",
      scheduledDate: "2024-05-21",
      sourceDocument: "DOC456",
      untaxed: 2000.0,
      total: 2400.0,
      status: "RFQ",
    },
    // Add more rows as needed
  ];

  const totalUntaxed = requisitionData.reduce(
    (acc, item) => acc + item.untaxed,
    0
  );
  const totalOverall = requisitionData.reduce(
    (acc, item) => acc + item.total,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Request Quotation</div>
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
          onClick={() => router.push("/request-quotation/create/")}
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
              <th className="py-2 px-4 border-b">Order Date</th>
              <th className="py-2 px-4 border-b">Vendor</th>
              <th className="py-2 px-4 border-b">Scheduled Date</th>
              <th className="py-2 px-4 border-b">Source Document</th>
              <th className="py-2 px-4 border-b">Untaxed</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {requisitionData.map((item, index) => (
              <RequestQuotationRow
                key={item.id}
                index={index + 1}
                data={item}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td
                colSpan={7}
                className="py-2 px-4 border-t text-right font-bold"
              >
                Total
              </td>
              <td className="py-2 px-4 border-t">{totalUntaxed.toFixed(2)}</td>
              <td className="py-2 px-4 border-t">{totalOverall.toFixed(2)}</td>
              <td className="py-2 px-4 border-t"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default RequestQuotationComponent;
