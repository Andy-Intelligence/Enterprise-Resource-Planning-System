"use client";
import React from "react";
import MaterialRowComponent from "./MaterialRowComponent";

interface Material {
  itemCode: string;
  name: string;
  salePrice: string;
  quantityOnHand: string;
  forecastQuantity: string;
  image: string;
}

interface MaterialsTableProps {
  materials: Material[];
}

const MaterialsTable: React.FC<MaterialsTableProps> = ({ materials }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Select</th>
            <th className="py-2 px-4 border-b">S/N</th>
            <th className="py-2 px-4 border-b">Item Code</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Sale Price</th>
            <th className="py-2 px-4 border-b">Quantity on Hand</th>
            <th className="py-2 px-4 border-b">Forecast Quantity</th>
            <th className="py-2 px-4 border-b">Image</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material, index) => (
            <MaterialRowComponent
              key={material.itemCode}
              index={index + 1}
              data={material}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialsTable;
