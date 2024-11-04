"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  FiUser,
  FiMapPin,
  FiPhone,
  FiMail,
  FiPackage,
  FiDollarSign,
  FiCalendar,
  FiStar,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import axios from "axios";
import { getAccessToken, refreshAccessToken } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SupplierDetails {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  total_orders: number;
  total_spent: number;
  last_order_date: string;
  rating: number;
}

const SupplierDetailsDisplay: React.FC = () => {
  const router = useRouter();
  const { supplierId } = useParams();
  const [supplier, setSupplier] = useState<SupplierDetails | null>(null);

  useEffect(() => {
    if (supplierId) {
      fetchSupplierDetails();
    }
  }, [supplierId]);

  const fetchSupplierDetails = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        `https://erp-backend-nv09.onrender.com/api/suppliers/detailed/${supplierId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSupplier(response.data);
    } catch (error) {
      console.error("Error fetching supplier details:", error);
      handleTokenRefresh(error);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken();
        fetchSupplierDetails();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }
  };

  const handleEdit = () => {
    router.push(`/supplier/edit/${supplierId}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        const accessToken = await getAccessToken();
        await axios.delete(
          `https://erp-backend-nv09.onrender.com/api/suppliers/delete/${supplierId}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        router.push("/suppliers");
      } catch (error) {
        console.error("Error deleting supplier:", error);
        handleTokenRefresh(error);
      }
    }
  };

  if (!supplier) {
    return <div>Loading...</div>;
  }

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
  }> = ({ title, value, icon }) => (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
      <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-white">
            <h1 className="text-4xl font-bold mb-2">{supplier.name}</h1>
            <p className="text-purple-100 mb-6">Supplier ID: {supplier.id}</p>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-blue-200 text-green-800 rounded-full text-sm font-semibold">
                Active Supplier
              </span>
              <div className="flex items-center space-x-2">
                <FiStar className="text-yellow-400" />
                <span className="font-semibold">{supplier.rating} / 5</span>
              </div>
            </div>
            <div className="mt-6 flex items-center space-x-4">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-white text-green-600 rounded-md hover:bg-blue-100 transition-colors flex items-center"
              >
                <FiEdit className="mr-2" /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center"
              >
                <FiTrash2 className="mr-2" /> Delete
              </button>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Orders"
                value={supplier.total_orders}
                icon={<FiPackage className="text-green-600 text-2xl" />}
              />
              <StatCard
                title="Total Spent"
                value={`$${supplier?.total_spent?.toLocaleString()}`}
                icon={<FiDollarSign className="text-green-600 text-2xl" />}
              />
              <StatCard
                title="Last Order"
                value={supplier.last_order_date}
                icon={<FiCalendar className="text-green-600 text-2xl" />}
              />
              <StatCard
                title="Rating"
                value={`${supplier.rating} / 5`}
                icon={<FiStar className="text-green-600 text-2xl" />}
              />
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="details"
                >
                  Supplier Details
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="orders"
                >
                  Order History
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="performance"
                >
                  Performance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Contact Information
                    </h3>
                    <dl className="space-y-2">
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600 flex items-center">
                          <FiUser className="mr-2" /> Name:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {supplier.name}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600 flex items-center">
                          <FiMapPin className="mr-2" /> Address:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {supplier.address}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600 flex items-center">
                          <FiPhone className="mr-2" /> Phone:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {supplier.phone}
                        </dd>
                      </div>
                      <div className="flex items-center">
                        <dt className="w-1/3 text-sm font-medium text-gray-600 flex items-center">
                          <FiMail className="mr-2" /> Email:
                        </dt>
                        <dd className="w-2/3 text-sm text-gray-800">
                          {supplier.email}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Supplier Statistics
                    </h3>
                    <dl className="space-y-2">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm font-medium text-gray-600">
                          Total Orders:
                        </dt>
                        <dd className="text-sm font-semibold text-gray-800">
                          {supplier.total_orders}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-sm font-medium text-gray-600">
                          Total Spent:
                        </dt>
                        <dd className="text-sm font-semibold text-gray-800">
                          ${supplier?.total_spent?.toLocaleString()}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-sm font-medium text-gray-600">
                          Last Order Date:
                        </dt>
                        <dd className="text-sm font-semibold text-gray-800">
                          {supplier.last_order_date}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-sm font-medium text-gray-600">
                          Supplier Rating:
                        </dt>
                        <dd className="text-sm font-semibold text-gray-800">
                          {supplier.rating} / 5
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="orders">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Recent Orders
                </h3>
                <p className="text-gray-600">
                  Order history will be displayed here.
                </p>
              </TabsContent>

              <TabsContent value="performance">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Supplier Performance
                </h3>
                <p className="text-gray-600">
                  Performance metrics and charts will be displayed here.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetailsDisplay;
