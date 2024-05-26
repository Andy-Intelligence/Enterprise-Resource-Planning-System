"use client";
import React, { useState } from "react";
import { IoDocumentsSharp } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosRadioButtonOn } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FaArrowsAltV } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaRepeat } from "react-icons/fa6";
import { TiDocumentText } from "react-icons/ti";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Link from "next/link";
import CreateEditCustomer from "@/components/CreateEditCustomer";
import CreateEditTimeSchedule from "@/components/CreateEditTimeSchedule";
import CreateProjectSettings from "@/components/CreateProjectSettings";
import CreateProjectRelatedSalesOrder from "@/components/CreateProjectRelatedSalesOrder";
import CreateProjectRelatedPurchaseOrder from "@/components/CreateProjectRelatedPurchaseOrder";
import CreateProjectInventoryUsage from "@/components/CreateProjectInventoryUsage";
import CreateProjectDeliverables from "@/components/CreateProjectDeliverables";
import CreateProjectWorkPackage from "@/components/CreateProjectWorkPackage";
import MaterialGeneralInformation from "@/components/MaterialGeneralInformation";
import MaterialInventory from "@/components/MaterialInventory";
import MaterialSaleCondition from "@/components/MaterialSaleCondition";
import MaterialInvoicing from "@/components/MaterialInvoicing";
import MaterialNote from "@/components/MaterialNote";

const NewProjectForm = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showTimeScheduleModal, setShowTimeScheduleModal] = useState(false);

  const handleManagerModal = (event: any) => {
    setShowModal(!showModal);
  };
  return (
    <div className="border rounded-lg p-4">
      <div className="text-3xl font-bold mb-4">Materials / New</div>
      <div className="mb-4 flex items-center justify-start gap-2">
        <Button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Save
        </Button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md">
          Discard
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md"
              variant="outline"
            >
              Update Qty OnHand
            </Button>
          </DialogTrigger>
          <DialogContent className=" w-full bg-gray-200">
            <DialogHeader>
              <DialogTitle>Update Product Quantity</DialogTitle>
              <DialogDescription>
                Enter the new quantity on hand for the product below and click
                update.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product-name" className="text-right">
                  Product Name
                </Label>
                <div className="col-span-3">Red Sand</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  New Quantity on Hand
                </Label>
                <Input
                  id="quantity"
                  defaultValue="100"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                type="submit"
              >
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Procurement Request
        </Button>
      </div>
      <form>
        <div className="mb-4 flex">
          <div className="w-1/2 pr-4">
            <label className="block text-sm font-semibold mb-2">
              Product Name
            </label>
            <input
              type="text"
              className="border rounded-md px-4 py-2 mb-4"
              placeholder="Product Name"
            />
            <div className="mb-4 flex items-center justify-start">
              <div className="flex items-center justify-center gap-1">
                <input type="checkbox" className="" />
                <label className="block text-sm font-semibold mr-4">
                  Can be sold
                </label>
                {/* <span className="mr-4">as Tasks</span> */}
              </div>
              <div className="flex items-center justify-start gap-1">
                <input type="checkbox" className="mr-2" />
                <label className="block text-sm font-semibold mr-4">
                  Can be purchased
                </label>
                {/* <span className="mr-4">as Issues</span> */}
              </div>
              {/* <div className="flex items-center justify-start gap-1">
                <input type="checkbox" />
                <label className="block text-sm font-semibold">
                  Allow Timesheet
                </label>
              </div> */}
            </div>
          </div>
          <div className="w-1/2">
            <div className="grid grid-cols-3  flex-wrap -mx-2">
              <div className="w-1/2 px-2 mb-4">
                <div
                  className="flex gap-2 items-center select-none cursor-pointer"
                  //   onClick={() => router.push("/projects/create/attachments")}
                >
                  <div>
                    <FaArrowsAltV className="text-bankGradient" size={32} />
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex items-center justify-start text-bankGradient ">
                      1
                    </div>
                    <div>Traceability</div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-2 mb-4">
                <div className="flex gap-2 items-center">
                  <div>
                    <FaTruck className="text-bankGradient" size={32} />
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex items-center justify-start text-bankGradient ">
                      1
                    </div>
                    <div>Procurement</div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-2 mb-4">
                <div className="flex gap-2 items-center">
                  <div>
                    <TbCurrencyNaira className="text-bankGradient" size={32} />
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex items-center justify-start text-bankGradient ">
                      1
                    </div>
                    <div>Sales</div>
                  </div>
                </div>
              </div>

              <div className="w-1/2 px-2 mb-4">
                <div className="flex gap-2 items-center">
                  <div>
                    <FaRepeat className="text-bankGradient" size={32} />
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex items-center justify-start text-bankGradient ">
                      1
                    </div>
                    <div>ReOrdering</div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-2 mb-4">
                <div className="flex gap-2 items-center">
                  <div>
                    <TiDocumentText className="text-bankGradient" size={32} />
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex items-center justify-start text-bankGradient ">
                      1
                    </div>
                    <div>OnHand</div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-2 mb-4">
                <div className="flex gap-2 items-center">
                  <div>
                    <TiDocumentText className="text-bankGradient" size={32} />
                  </div>
                  <div className="flex flex-col">
                    <div className=" flex items-center justify-start text-bankGradient ">
                      1
                    </div>
                    <div>ForeCasted</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="gi" className="w-full">
          <TabsList className="flex items-center justify-start w-full">
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="gi"
            >
              General Information
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="inventory"
            >
              Inventory
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="sales"
            >
              Sales
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="invoicing"
            >
              Invoicing
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="notes"
            >
              Notes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="gi">
            <MaterialGeneralInformation />
          </TabsContent>
          <TabsContent value="inventory">
            <MaterialInventory />
          </TabsContent>
          <TabsContent value="sales">
            <MaterialSaleCondition />
          </TabsContent>
          <TabsContent value="invoicing">
            <MaterialInvoicing />
          </TabsContent>
          <TabsContent value="notes">
            <MaterialNote />
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
};

export default NewProjectForm;
