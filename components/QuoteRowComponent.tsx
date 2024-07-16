"use client";
import React from "react";

interface Quote {

  quoteCode: string;
  customerName: string;
  ProjectName: string;
  quoteDate: string;
  expiryDate: string;
}


interface MaterialRowProps {
  index: number;
  data: Quote;
}



const QuoteRowComponent: React.FC<MaterialRowProps> = ({ index, data }) => {
  return (
    <tr>
      <td className="py-2 px-4 border-b text-center">
        <input type="checkbox" />
      </td>
      <td className="py-2 px-4 border-b">{index}</td>
      <td className="py-2 px-4 border-b">{data.quoteCode}</td>
      <td className="py-2 px-4 border-b">{data.customerName}</td>
      <td className="py-2 px-4 border-b">{data.ProjectName}</td>
      <td className="py-2 px-4 border-b">{data.quoteDate}</td>
      <td className="py-2 px-4 border-b">{data.expiryDate}</td>
    </tr>
  );
};

export default QuoteRowComponent;
