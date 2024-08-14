"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiSave,
  FiX,
  FiFileText,
  FiDollarSign,
  FiBook,
  FiChevronDown,
} from "react-icons/fi";
import axios from "axios";

const CreateInventoryItem: React.FC = () => {
  const router = useRouter();

  const [inventoryCode, setInventoryCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string; desc: string }>
  >([]);
  const [image, setImage] = useState<File | null>(null);
  const [quantity, setQuantity] = useState<number | "">("");
  const [unitPrice, setUnitPrice] = useState<number | "">("");
  const [VAT, setVAT] = useState<number | "">("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };

  const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
  };

  const fetchCategories = async () => {
    try {
      const accessToken = getAccessToken();
      const response = await axios.get(
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
        const refreshToken = getRefreshToken();
        const response = await axios.post(
          "https://erp-backend-nv09.onrender.com/api/auth/token/refresh/",
          {
            refresh: refreshToken,
          }
        );
        localStorage.setItem("accessToken", response.data.access);
        fetchCategories();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        router.push("/sign-in");
      }
    }
  };

  const handleSave = async () => {
    try {
      const accessToken = getAccessToken();
      const formData = new FormData();
      formData.append("name", itemName);
      formData.append("description", itemDescription);
      formData.append("unit_price", String(unitPrice));
      formData.append("quantity", String(quantity));
      formData.append("category_id", selectedCategory || "");
      if (image) {
        formData.append("image", image);
      }

      await axios.post(
        "https://erp-backend-nv09.onrender.com/api/items/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      router.push("/inventory");
    } catch (error) {
      console.error("Error creating item:", error);
      handleTokenRefresh(error);
    }
  };

  const handleDiscard = () => {
    router.push("/inventory");
  };

  const handleAction = (action: string) => {
    console.log(action);
    // Handle action logic here
  };

  const handleCreateCategory = async () => {
    try {
      const accessToken = getAccessToken();
      const response = await axios.post(
        "https://erp-backend-nv09.onrender.com/api/categories/create/",
        {
          name: categoryInput,
          desc: categoryDescription,
          created_at: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCategories([...categories, response.data]);
      setSelectedCategory(response.data.id);
      setCategoryInput(response.data.name);
      setCategoryDescription("");
    } catch (error) {
      console.error("Error creating category:", error);
      handleTokenRefresh(error);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(categoryInput.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create Inventory Item
        </h1>

        <div className="flex flex-wrap items-center justify-start gap-3 mb-8">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
            onClick={handleSave}
          >
            <FiSave /> Save
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
            onClick={handleDiscard}
          >
            <FiX /> Discard
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            onClick={() => handleAction("Quotation")}
          >
            <FiFileText /> Quotation
          </button>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
            onClick={() => handleAction("Invoice")}
          >
            <FiDollarSign /> Invoice
          </button>
          <button
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors flex items-center gap-2"
            onClick={() => handleAction("Receipts")}
          >
            <FiBook /> Receipts
          </button>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Inventory Code
            </label>
            <input
              type="text"
              value={inventoryCode}
              onChange={(e) => setInventoryCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Item Name
            </label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Item Description
            </label>
            <textarea
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <div className="relative">
              <div className="flex items-center">
                <input
                  type="text"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search or create category"
                />
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="px-4 py-2 bg-gray-200 rounded-r-md"
                >
                  <FiChevronDown />
                </button>
              </div>
              {showCategoryDropdown && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setCategoryInput(category.name);
                        setShowCategoryDropdown(false);
                      }}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              )}
              {categoryInput &&
                !categories.some(
                  (cat) =>
                    cat.name.toLowerCase() === categoryInput.toLowerCase()
                ) && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={categoryDescription}
                      onChange={(e) => setCategoryDescription(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                      placeholder="Category Description"
                    />
                    <button
                      type="button"
                      onClick={handleCreateCategory}
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                      Create Category
                    </button>
                  </div>
                )}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Image
            </label>
            <input
              type="file"
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  e.target.value === "" ? "" : parseInt(e.target.value, 10)
                )
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Unit Price
            </label>
            <input
              type="number"
              value={unitPrice}
              onChange={(e) =>
                setUnitPrice(
                  e.target.value === "" ? "" : parseFloat(e.target.value)
                )
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              VAT (%)
            </label>
            <input
              type="number"
              value={VAT}
              onChange={(e) =>
                setVAT(e.target.value === "" ? "" : parseFloat(e.target.value))
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInventoryItem;
