"use client";
import React from "react";
import { useRouter } from "next/navigation";
import MaterialsTable from "@/components/MaterialsTable";

interface Material {
  itemCode: string;
  name: string;
  salePrice: string;
  quantityOnHand: string;
  forecastQuantity: string;
  image: string;
}

const Materialpage: React.FC = () => {
  const router = useRouter();

  const materials: Material[] = [
    {
      itemCode: "IR001",
      name: "Material 1",
      salePrice: "$100.00",
      quantityOnHand: "50",
      forecastQuantity: "30",
      image: "1234567890",
    },
    {
      itemCode: "IR002",
      name: "Material 2",
      salePrice: "$200.00",
      quantityOnHand: "20",
      forecastQuantity: "10",
      image: "0987654321",
    },
    // Add more materials as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Items</div>
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
          onClick={() => router.push("/materials/create")}
        >
          Create
        </button>
        <div className="pagination">Pagination</div>
      </div>
      <div>
        <MaterialsTable materials={materials} />
      </div>
    </div>
  );
};

export default Materialpage;
