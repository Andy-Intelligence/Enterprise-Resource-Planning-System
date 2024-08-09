import React from "react";
import {
  FiPackage,
  FiDollarSign,
  FiPercent,
  FiHash,
  FiImage,
  FiList,
  FiCalendar,
} from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const InventoryItemDisplay = ({ item }:any) => {
  const InfoCard = ({ icon, title, value }:any) => (
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
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-white">
            <div className="flex items-center space-x-6">
              <div className="bg-white p-4 rounded-full">
                <FiPackage className="text-blue-600 text-4xl" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{item.itemName}</h1>
                <p className="text-xl text-blue-100 mb-4">{item.itemType}</p>
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {item.inventoryCode}
                  </span>
                  <span className="flex items-center text-blue-200">
                    <FiCalendar className="mr-2" />
                    Added on {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <InfoCard
                icon={<FiHash className="text-blue-600 text-2xl" />}
                title="Quantity"
                value={item.quantity}
              />
              <InfoCard
                icon={<FiDollarSign className="text-blue-600 text-2xl" />}
                title="Purchase Price"
                value={`₦${item.purchasePrice.toLocaleString()}`}
              />
              <InfoCard
                icon={<FiPercent className="text-blue-600 text-2xl" />}
                title="VAT"
                value={`${item.VAT}%`}
              />
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Stock Status
              </h2>
              <Progress
                value={(item.quantity / 100) * 100}
                className="h-4 mb-4"
              />
              <p className="text-center text-lg font-semibold text-blue-600">
                {item.quantity} units in stock
              </p>
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="details"
                >
                  Item Details
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="image"
                >
                  Image
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="history"
                >
                  History
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Item Specifications
                  </h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-600">
                        Inventory Code
                      </dt>
                      <dd className="text-lg font-semibold text-gray-800">
                        {item.inventoryCode}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">
                        Item Name
                      </dt>
                      <dd className="text-lg font-semibold text-gray-800">
                        {item.itemName}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">
                        Item Type
                      </dt>
                      <dd className="text-lg font-semibold text-gray-800">
                        {item.itemType}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">
                        Total Value
                      </dt>
                      <dd className="text-lg font-semibold text-gray-800">
                        ₦{(item.quantity * item.purchasePrice).toLocaleString()}
                      </dd>
                    </div>
                  </dl>
                </div>
              </TabsContent>
              <TabsContent value="image">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Item Image
                  </h3>
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.itemName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="history">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Item History
                  </h3>
                  <p className="text-gray-600">
                    Detailed item history will be displayed here.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItemDisplay;
