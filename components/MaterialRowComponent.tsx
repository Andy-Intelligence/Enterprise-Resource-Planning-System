"use client";
import React from "react";

interface Material {
  internalReference: string;
  name: string;
  salePrice: string;
  quantityOnHand: string;
  forecastQuantity: string;
  barcode: string;
}

interface MaterialRowProps {
  index: number;
  data: Material;
}

const MaterialRowComponent: React.FC<MaterialRowProps> = ({ index, data }) => {
  return (
    <tr>
      <td className="py-2 px-4 border-b text-center">
        <input type="checkbox" />
      </td>
      <td className="py-2 px-4 border-b">{index}</td>
      <td className="py-2 px-4 border-b">{data.internalReference}</td>
      <td className="py-2 px-4 border-b">{data.name}</td>
      <td className="py-2 px-4 border-b">{data.salePrice}</td>
      <td className="py-2 px-4 border-b">{data.quantityOnHand}</td>
      <td className="py-2 px-4 border-b">{data.forecastQuantity}</td>
      <td className="py-2 px-4 border-b">{data.barcode}</td>
    </tr>
  );
};

export default MaterialRowComponent;
