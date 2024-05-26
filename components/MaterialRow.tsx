"use client"
import React from "react";

const MaterialRow = ({
    index,
  internalReference,
  name,
  salePrice,
  quantityOnHand,
  forecastQuantity,
  barcode,
}:any) => {
  return (
    <tr>
      <td className="border px-4 py-2">{index}</td>
      <td className="border px-4 py-2">{internalReference}</td>
      <td className="border px-4 py-2">{name}</td>
      <td className="border px-4 py-2">{salePrice}</td>
      <td className="border px-4 py-2">{quantityOnHand}</td>
      <td className="border px-4 py-2">{forecastQuantity}</td>
      <td className="border px-4 py-2">{barcode}</td>
    </tr>
  );
};

export default MaterialRow;
