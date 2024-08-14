"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  FiEdit,
  FiTrash2,
  FiUser,
  FiBriefcase,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";
import axios from "axios";
import { getAccessToken, refreshAccessToken } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ClientDetails {
  id: number;
  name: string;
  company_name: string;
  email: string;
  position: string;
  address: string;
  phone: string;
  zipcode: string;
  state: string;
  site_address: string;
  image: string;
}

const ClientDisplayDetails: React.FC = () => {
  const router = useRouter();
  const { clientId } = useParams();
  const [client, setClient] = useState<ClientDetails | null>(null);

  useEffect(() => {
    if (clientId) {
      fetchClientDetails();
    }
  }, [clientId]);

  const fetchClientDetails = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.get(
        `https://erp-backend-nv09.onrender.com/api/clients/${clientId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setClient(response.data);
    } catch (error) {
      console.error("Error fetching client details:", error);
      handleTokenRefresh(error);
    }
  };

  const handleTokenRefresh = async (error: any) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken();
        fetchClientDetails();
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
    }
  };

  const handleEdit = () => {
    router.push(`/client/edit/${clientId}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        const accessToken = await getAccessToken();
        await axios.delete(
          `https://erp-backend-nv09.onrender.com/api/clients/${clientId}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        router.push("/clients");
      } catch (error) {
        console.error("Error deleting client:", error);
        handleTokenRefresh(error);
      }
    }
  };

  if (!client) {
    return <div>Loading...</div>;
  }

  const InfoCard: React.FC<{
    title: string;
    value: string;
    icon: React.ReactNode;
  }> = ({ title, value, icon }) => (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
      <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-lg font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 px-8 py-12 text-white">
            <div className="flex items-center space-x-6">
              <img
                src={client.image}
                alt={client.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-4xl font-bold mb-2">{client.name}</h1>
                <p className="text-xl text-blue-100 mb-4">
                  {client.position} at {client.company_name}
                </p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-100 transition-colors flex items-center"
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
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <InfoCard
                title="Email"
                value={client.email}
                icon={<FiMail className="text-blue-600 text-2xl" />}
              />
              <InfoCard
                title="Phone"
                value={client.phone}
                icon={<FiPhone className="text-blue-600 text-2xl" />}
              />
              <InfoCard
                title="Location"
                value={`${client.state}, ${client.zipcode}`}
                icon={<FiMapPin className="text-blue-600 text-2xl" />}
              />
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="details"
                >
                  Client Details
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="addresses"
                >
                  Addresses
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Client Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="text-gray-800">{client.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Company
                      </p>
                      <p className="text-gray-800">{client.company_name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Position
                      </p>
                      <p className="text-gray-800">{client.position}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">State</p>
                      <p className="text-gray-800">{client.state}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Zip Code
                      </p>
                      <p className="text-gray-800">{client.zipcode}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="addresses">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Addresses
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Contact Address
                      </p>
                      <p className="text-gray-800">{client.address}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Site Address
                      </p>
                      <p className="text-gray-800">{client.site_address}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDisplayDetails;
