"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiPlus, FiFilter } from "react-icons/fi";
import axios from "axios";
import { getAccessToken, refreshAccessToken } from "@/lib/utils";

interface Client {
  id: number;
  name: string;
  company_name: string;
  email: string;
  position: string;
  image: string;
}

const ClientPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        "https://erp-backend-nv09.onrender.com/api/clients/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
      handleTokenRefresh(error);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken();
        fetchClients();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }
  };

  const filteredClients = clients.filter(
    (client) =>
      (filterType === "" || client.position === filterType) &&
      (searchQuery === "" ||
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.company_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Clients</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => router.push("/clients/create")}
        >
          <FiPlus /> Create Client
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-1/2">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search clients..."
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
              <option value="">All Positions</option>
              {Array.from(
                new Set(clients.map((client) => client.position))
              ).map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Client</th>
                <th className="py-3 px-4 text-left">Company</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Position</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => router.push(`/clients/${client.id}`)}
                >
                  <td className="py-4 px-4 border-b">
                    <div className="flex items-center">
                      <img
                        src={client.image}
                        alt={client.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <span>{client.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 border-b">{client.company_name}</td>
                  <td className="py-4 px-4 border-b">{client.email}</td>
                  <td className="py-4 px-4 border-b">{client.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredClients.length} of {clients.length} clients
        </p>
        {/* Add pagination here if needed */}
      </div>
    </div>
  );
};

export default ClientPage;
