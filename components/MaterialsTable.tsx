"use client"
import React from "react";
import MaterialRow from "./MaterialRow";

const MaterialsTable = ({ materials }:any) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">S/n</th>
            <th className="py-2 px-4 border-b">Internal Reference</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Sale Price</th>
            <th className="py-2 px-4 border-b">Quantity on Hand</th>
            <th className="py-2 px-4 border-b">Forecast Quantity</th>
            <th className="py-2 px-4 border-b">Barcode</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material:any,index:number) => (
            <MaterialRow
              key={material.internalReference}
              internalReference={material.internalReference}
              name={material.name}
              salePrice={material.salePrice}
              quantityOnHand={material.quantityOnHand}
              forecastQuantity={material.forecastQuantity}
              barcode={material.barcode}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialsTable;
