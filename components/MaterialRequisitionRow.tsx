"use client";
import React from "react";

const MaterialRequisitionRow = ({ index, data }:any) => {
  return (
    <tr>
      <td className="py-2 px-4 border-b">
        <input type="checkbox" />
      </td>
      <td className="py-2 px-4 border-b">{index}</td>
      <td className="py-2 px-4 border-b">{data.reference}</td>
      <td className="py-2 px-4 border-b">{data.destination}</td>
      <td className="py-2 px-4 border-b">{data.partner}</td>
      <td className="py-2 px-4 border-b">{data.scheduledDate}</td>
      <td className="py-2 px-4 border-b">{data.sourceDocument}</td>
      <td className="py-2 px-4 border-b">{data.backOrderOf}</td>
      <td className="py-2 px-4 border-b">{data.status}</td>
    </tr>
  );
};

export default MaterialRequisitionRow;
