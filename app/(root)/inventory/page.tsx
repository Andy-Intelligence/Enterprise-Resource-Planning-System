"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiPlus, FiFilter } from "react-icons/fi";
import axios from "axios";

interface Inventory {
  id: string;
  name: string;
  category_id: string;
  image: string;
  quantity: number;
  unit_price: number;
  vat: number;
}

interface Category {
  id: string;
  name: string;
}

const InventoryPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, []);

  const fetchItems = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get<Inventory[]>(
        "https://erp-backend-nv09.onrender.com/api/items/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
      handleTokenRefresh(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get<Category[]>(
        "https://erp-backend-nv09.onrender.com/api/categories/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      handleTokenRefresh(error);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          "https://erp-backend-nv09.onrender.com/api/auth/token/refresh/",
          {
            refresh: refreshToken,
          }
        );
        localStorage.setItem("accessToken", response.data.access);
        fetchItems();
        fetchCategories();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        router.push("/sign-in");
      }
    }
  };

  const filteredInventory = inventory.filter(
    (item) =>
      (filterType === "" || item.category_id === filterType) &&
      (searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Inventory</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/inventory/create")}
        >
          <FiPlus /> Create Item
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-1/2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="bg-transparent w-full focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <FiFilter className="text-gray-400 mr-2" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-100 rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="">All Types</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Inventory Code</th>
                <th className="py-3 px-4 text-left">Item Name</th>
                <th className="py-3 px-4 text-left">Item Type</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Purchase Price</th>
                <th className="py-3 px-4 text-left">VAT</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr
                  key={item.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => router.push(`/inventory/${item.id}`)}
                >
                  <td className="py-4 px-4 border-b">{item.id}</td>
                  <td className="py-4 px-4 border-b">{item.name}</td>
                  <td className="py-4 px-4 border-b">
                    {getCategoryName(item.category_id)}
                  </td>
                  <td className="py-4 px-4 border-b">{item.quantity}</td>
                  <td className="py-4 px-4 border-b">
                    ${item.unit_price.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 border-b">{item.vat}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredInventory.length} of {inventory.length} items
        </p>
        <div className="flex gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                page === 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
