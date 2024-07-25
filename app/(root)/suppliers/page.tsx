"use client";
import React from "react";
import { useRouter } from "next/navigation";
import QuotesTable from "@/components/QuotesTable";
import SalesTable from "@/components/SalesTable";
import SuppliersTable from "@/components/SuppliersTable";

interface Supplier {
  supplierId: string;
  supplierName: string;
  address: string;
  phoneNumber: string;
  email: string;
}

const Supplierpage: React.FC = () => {
  const router = useRouter();

  const suppliers: Supplier[] = [
    {
  supplierId: "SUP0001",
  supplierName: "Delwire",
  address: "Jumbo Street",
  phoneNumber: "1234566",
  email: "delwire@gmail.com",
    },
    {
  supplierId: "SUP0001",
  supplierName: "Delwire",
  address: "Jumbo Street",
  phoneNumber: "1234566",
  email: "delwire@gmail.com",
    },
    {
  supplierId: "SUP0001",
  supplierName: "Delwire",
  address: "Jumbo Street",
  phoneNumber: "1234566",
  email: "delwire@gmail.com",
    },
    // Add more materials as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Sales</div>
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
          onClick={() => router.push("/suppliers/create")}
        >
          Create
        </button>
        <div className="pagination">Pagination</div>
      </div>
      <div>
        <SuppliersTable suppliers={suppliers} />
      </div>
    </div>
  );
};

export default Supplierpage;
