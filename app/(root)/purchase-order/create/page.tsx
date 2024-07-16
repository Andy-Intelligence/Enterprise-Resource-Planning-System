// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";

// interface ProductDetails {
//   id: string;
//   productName: string;
//   productCode: string;
//   requiredQuantity: number;
//   orderQty: number;
//   finishedQty: number;
//   unit: string;
//   deliveryDate: string;
//   unitPrice: number;
// }

// const CreatePurchaseOrder: React.FC = () => {
//   const router = useRouter();
//   const [productDetails, setProductDetails] = useState<ProductDetails[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [newProductDetail, setNewProductDetail] = useState<
//     Partial<ProductDetails>
//   >({
//     productName: "",
//     productCode: "",
//     requiredQuantity: 0,
//     orderQty: 0,
//     finishedQty: 0,
//     unit: "",
//     deliveryDate: "",
//     unitPrice: 0,
//   });
//   const [poDetails, setPoDetails] = useState({
//     vendorCode: "",
//     vendorName: "",
//     paymentTerms: "",
//     otherReference: "",
//     termsOfDelivery: "",
//     note: "",
//     poType: "Purchase Order",
//     poDate: "",
//     prNumber: "",
//     poNumber: "",
//     poRaisedBy: "Admin",
//     transportType: "By Road",
//     shippingAddress: "",
//     packingAmount: 0,
//     totalOrderValue: 0,
//     termsAndConditions: "",
//   });

//   const handleAddProduct = () => {
//     setProductDetails([
//       ...productDetails,
//       {
//         ...newProductDetail,
//         id: (productDetails.length + 1).toString(),
//       } as ProductDetails,
//     ]);
//     setIsDialogOpen(false);
//     setNewProductDetail({
//       productName: "",
//       productCode: "",
//       requiredQuantity: 0,
//       orderQty: 0,
//       finishedQty: 0,
//       unit: "",
//       deliveryDate: "",
//       unitPrice: 0,
//     });
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setPoDetails({ ...poDetails, [name]: value });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="text-3xl font-bold mb-4">Create Purchase Order</div>

//       {/* Vendor Information Section */}
//       <div className="mb-4">
//         <div className="text-2xl font-bold mb-4">Vendor Information</div>
//         <div className="mb-4">
//           <label className="block mb-2">Vendor Code</label>
//           <input
//             type="text"
//             name="vendorCode"
//             className="w-full px-4 py-2 border rounded-md"
//             value={poDetails.vendorCode}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Vendor Name</label>
//           <input
//             type="text"
//             name="vendorName"
//             className="w-full px-4 py-2 border rounded-md"
//             value={poDetails.vendorName}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Payment Terms</label>
//           <select
//             name="paymentTerms"
//             className="w-full px-4 py-2 border rounded-md"
//             value={poDetails.paymentTerms}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Payment Terms</option>
//             <option value="Net 30">Net 30</option>
//             <option value="Net 60">Net 60</option>
//             <option value="Net 90">Net 90</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Other Reference</label>
//           <input
//             type="text"
//             name="otherReference"
//             className="w-full px-4 py-2 border rounded-md"
//             value={poDetails.otherReference}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Terms of Delivery</label>
//           <input
//             type="text"
//             name="termsOfDelivery"
//             className="w-full px-4 py-2 border rounded-md"
//             value={poDetails.termsOfDelivery}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Note</label>
//           <textarea
//             name="note"
//             className="w-full px-4 py-2 border rounded-md"
//             value={poDetails.note}
//             onChange={handleInputChange}
//           ></textarea>
//         </div>
//       </div>

//       {/* PO Details Section */}
//       <div className="mb-4">
//         <div className="text-2xl font-bold mb-4">PO Details</div>
//         <div className="mb-4">
//           <label className="block mb-2">PO Type</label>
//           <select
//             name="poType"
//             className="w-full px-4 py-2 border rounded-md"
//             value={poDetails.poType}
//             onChange={handleInputChange}
//           >
//             <option value="Purchase Order">Purchase Order</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">PO Date</label>
//           <input
//             type="date"
//             name="poDate"
//             className="w-full px-4 py-2 border rounded-md"
//             value={poDetails.poDate}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Select PR Number</label>
//           <input
//             type="text"
//             name="prNumber"
//             className="w-full px-4 py-2 border rounded-md"
//             value={poDetails.prNumber}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">PO Number</label>
//           <input
//             type="text"
//             name="poNumber"
//             className="w-full px-4 py-2 border rounded-md"
//             value={poDetails.poNumber}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">PO Raised By</label>
//           <select
//             name="poRaisedBy"
//             className="w-full px-4 py-2 border rounded-md"
//             value={poDetails.poRaisedBy}
//             onChange={handleInputChange}
//           >
//             <option value="Admin">Admin</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Transport Type</label>
//           <select
//             name="transportType"
//             className="w-full px-4 py-2 border rounded-md"
//             value={poDetails.transportType}
//             onChange={handleInputChange}
//           >
//             <option value="By Road">By Road</option>
//             <option value="By Air">By Air</option>
//             <option value="By Sea">By Sea</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2">Shipping Address</label>
//           <textarea
//             name="shippingAddress"
//             className="w-full px-4 py-2 border rounded-md"
//             value={poDetails.shippingAddress}
//             onChange={handleInputChange}
//           ></textarea>
//         </div>
//       </div>

//       {/* Product Details Section */}
//       <div className="mb-4">
//         <div className="text-2xl font-bold mb-4">Product Details</div>
//         <div className="overflow-x-auto mb-4">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b">Product Name</th>
//                 <th className="py-2 px-4 border-b">Product Code</th>
//                 <th className="py-2 px-4 border-b">Required Quantity</th>
//                 <th className="py-2 px-4 border-b">Order Qty</th>
//                 <th className="py-2 px-4 border-b">Finished Qty</th>
//                 <th className="py-2 px-4 border-b">Unit</th>
//                 <th className="py-2 px-4 border-b">Delivery Date</th>
//                 <th className="py-2 px-4 border-b">Unit Price</th>
//                 <th className="py-2 px-4 border-b">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {productDetails.map((item) => (
//                 <tr key={item.id}>
//                   <td className="py-2 px-4 border-b">{item.productName}</td>
//                   <td className="py-2 px-4 border-b">{item.productCode}</td>
//                   <td className="py-2 px-4 border-b">
//                     {item.requiredQuantity}
//                   </td>
//                   <td className="py-2 px-4 border-b">{item.orderQty}</td>
//                   <td className="py-2 px-4 border-b">{item.finishedQty}</td>
//                   <td className="py-2 px-4 border-b">{item.unit}</td>
//                   <td className="py-2 px-4 border-b">{item.deliveryDate}</td>
//                   <td className="py-2 px-4 border-b">{item.unitPrice}</td>
//                   <td className="py-2 px-4 border-b">
//                     <button
//                       className="px-2 py-1 bg-red-500 text-white rounded-md"
//                       onClick={() =>
//                         setProductDetails(
//                           productDetails.filter((i) => i.id !== item.id)
//                         )
//                       }
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
//           onClick={() => setIsDialogOpen(true)}
//         >
//           Add Item
//         </button>

//         <div className="text-2xl font-bold mb-4">
//           Total Items: {productDetails.length}
//         </div>
//       </div>
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PurchaseOrderItem {
  id: string;
  productName: string;
  productCode: string;
  requiredQuantity: number;
  orderQty: number;
  finishedQty: number;
  unit: string;
  deliveryDate: string;
  unitPrice: number;
  amount: number;
  discountPercent: number;
  discountAmount: number;
  gstPercent: number;
  gstAmount: number;
  totalAmount: number;
}

const CreatePurchaseOrder: React.FC = () => {
  const router = useRouter();
  const [poItems, setPoItems] = useState<PurchaseOrderItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPoItem, setNewPoItem] = useState<Partial<PurchaseOrderItem>>({
    productName: "",
    productCode: "",
    requiredQuantity: 0,
    orderQty: 0,
    finishedQty: 0,
    unit: "",
    deliveryDate: "",
    unitPrice: 0,
    amount: 0,
    discountPercent: 0,
    discountAmount: 0,
    gstPercent: 0,
    gstAmount: 0,
    totalAmount: 0,
  });
  const [poDetails, setPoDetails] = useState({
    vendorCode: "",
    vendorName: "",
    paymentTerms: "",
    otherReference: "",
    termsOfDelivery: "",
    note: "",
    poType: "Purchase Order",
    poDate: "",
    prNumber: "",
    poNumber: "",
    poRaisedBy: "Admin",
    transportType: "By Road",
    shippingAddress: "",
    termsAndConditions: "",
    packingAmount: 0,
    totalOrderValue: 0,
  });

  const handleAddProduct = () => {
    setPoItems([
      ...poItems,
      {
        ...newPoItem,
        id: (poItems.length + 1).toString(),
      } as PurchaseOrderItem,
    ]);
    setIsDialogOpen(false);
    setNewPoItem({
      productName: "",
      productCode: "",
      requiredQuantity: 0,
      orderQty: 0,
      finishedQty: 0,
      unit: "",
      deliveryDate: "",
      unitPrice: 0,
      amount: 0,
      discountPercent: 0,
      discountAmount: 0,
      gstPercent: 0,
      gstAmount: 0,
      totalAmount: 0,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setPoDetails({ ...poDetails, [name]: value });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Create Purchase Order</div>

      {/* Vendor Information Section */}
      <div className="mb-6">
        <div className="text-2xl font-bold mb-4">Vendor Information</div>
        <div className="mb-4">
          <label className="block mb-2">Vendor Code</label>
          <input
            type="text"
            name="vendorCode"
            className="w-full px-4 py-2 border rounded-md"
            value={poDetails.vendorCode}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Vendor Name</label>
          <input
            type="text"
            name="vendorName"
            className="w-full px-4 py-2 border rounded-md"
            value={poDetails.vendorName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Payment Terms</label>
          <select
            name="paymentTerms"
            className="w-full px-4 py-2 border rounded-md"
            value={poDetails.paymentTerms}
            onChange={handleInputChange}
          >
            <option value="">Select Payment Terms</option>
            <option value="Net 30">Net 30</option>
            <option value="Net 60">Net 60</option>
            <option value="Net 90">Net 90</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Other Reference</label>
          <input
            type="text"
            name="otherReference"
            className="w-full px-4 py-2 border rounded-md"
            value={poDetails.otherReference}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Terms of Delivery</label>
          <input
            type="text"
            name="termsOfDelivery"
            className="w-full px-4 py-2 border rounded-md"
            value={poDetails.termsOfDelivery}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Note</label>
          <textarea
            name="note"
            className="w-full px-4 py-2 border rounded-md"
            value={poDetails.note}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      {/* Purchase Order Details Section */}
      <div className="mb-6">
        <div className="text-2xl font-bold mb-4">Purchase Order Details</div>
        <div className="mb-4">
          <label className="block mb-2">PO Type</label>
          <select
            name="poType"
            className="w-full px-4 py-2 border rounded-md"
            value={poDetails.poType}
            onChange={handleInputChange}
          >
            <option value="Purchase Order">Purchase Order</option>
            <option value="Standing Order">Standing Order</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">PO Date</label>
          <input
            type="date"
            name="poDate"
            className="w-full px-4 py-2 border rounded-md"
            value={poDetails.poDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Select PR Number</label>
          <input
            type="text"
            name="prNumber"
            className="w-full px-4 py-2 border rounded-md"
            value={poDetails.prNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">PO Number</label>
          <input
            type="text"
            name="poNumber"
            className="w-full px-4 py-2 border rounded-md"
            value={poDetails.poNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">PO Raised by</label>
          <select
            name="poRaisedBy"
            className="w-full px-4 py-2 border rounded-md"
            value={poDetails.poRaisedBy}
            onChange={handleInputChange}
          >
            <option value="Admin">Admin</option>
            <option value="User1">User1</option>
            <option value="User2">User2</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Transport Type</label>
          <select
            name="transportType"
            className="w-full px-4 py-2 border rounded-md"
            value={poDetails.transportType}
            onChange={handleInputChange}
          >
            <option value="By Road">By Road</option>
            <option value="By Air">By Air</option>
            <option value="By Sea">By Sea</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Shipping Address</label>
          <input
            type="text"
            name="shippingAddress"
            className="w-full px-4 py-2 border rounded-md"
            value={poDetails.shippingAddress}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Product Details Section */}
      <div className="mb-6">
        <div className="text-2xl font-bold mb-4">Product Details</div>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Product Code</th>
                <th className="py-2 px-4 border-b">Required Quantity</th>
                <th className="py-2 px-4 border-b">Order Qty</th>
                <th className="py-2 px-4 border-b">Finished Qty</th>
                <th className="py-2 px-4 border-b">Unit</th>
                <th className="py-2 px-4 border-b">Delivery Date</th>
                <th className="py-2 px-4 border-b">Unit Price</th>
                <th className="py-2 px-4 border-b">Amount</th>
                <th className="py-2 px-4 border-b">Disc %</th>
                <th className="py-2 px-4 border-b">Disc Amount</th>
                <th className="py-2 px-4 border-b">GST %</th>
                <th className="py-2 px-4 border-b">GST Amount</th>
                <th className="py-2 px-4 border-b">Total Amount</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {poItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b">{item.productName}</td>
                  <td className="py-2 px-4 border-b">{item.productCode}</td>
                  <td className="py-2 px-4 border-b">
                    {item.requiredQuantity}
                  </td>
                  <td className="py-2 px-4 border-b">{item.orderQty}</td>
                  <td className="py-2 px-4 border-b">{item.finishedQty}</td>
                  <td className="py-2 px-4 border-b">{item.unit}</td>
                  <td className="py-2 px-4 border-b">{item.deliveryDate}</td>
                  <td className="py-2 px-4 border-b">{item.unitPrice}</td>
                  <td className="py-2 px-4 border-b">{item.amount}</td>
                  <td className="py-2 px-4 border-b">{item.discountPercent}</td>
                  <td className="py-2 px-4 border-b">{item.discountAmount}</td>
                  <td className="py-2 px-4 border-b">{item.gstPercent}</td>
                  <td className="py-2 px-4 border-b">{item.gstAmount}</td>
                  <td className="py-2 px-4 border-b">{item.totalAmount}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded-md"
                      onClick={() =>
                        setPoItems(poItems.filter((i) => i.id !== item.id))
                      }
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Dialog>
          <DialogTrigger>
            {" "}
            <span className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4">
              Add Product
            </span>
          </DialogTrigger>
          <DialogContent className="bg-gray-200 overflow-y-scroll max-h-screen">
            <div className="flex items-center justify-center">
              <div className="">
                <div className="mb-4">
                  <label className="block mb-2">Product Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    value={newPoItem.productName}
                    onChange={(e) =>
                      setNewPoItem({
                        ...newPoItem,
                        productName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Product Code</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    value={newPoItem.productCode}
                    onChange={(e) =>
                      setNewPoItem({
                        ...newPoItem,
                        productCode: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Required Quantity</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-md"
                    value={newPoItem.requiredQuantity}
                    onChange={(e) =>
                      setNewPoItem({
                        ...newPoItem,
                        requiredQuantity: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Order Qty</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-md"
                    value={newPoItem.orderQty}
                    onChange={(e) =>
                      setNewPoItem({
                        ...newPoItem,
                        orderQty: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Finished Qty</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-md"
                    value={newPoItem.finishedQty}
                    onChange={(e) =>
                      setNewPoItem({
                        ...newPoItem,
                        finishedQty: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Unit</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md"
                    value={newPoItem.unit}
                    onChange={(e) =>
                      setNewPoItem({
                        ...newPoItem,
                        unit: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Delivery Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-md"
                    value={newPoItem.deliveryDate}
                    onChange={(e) =>
                      setNewPoItem({
                        ...newPoItem,
                        deliveryDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Unit Price</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border rounded-md"
                    value={newPoItem.unitPrice}
                    onChange={(e) =>
                      setNewPoItem({
                        ...newPoItem,
                        unitPrice: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={handleAddProduct}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <div className="text-2xl font-bold mb-4 mt-4">
          Total Items: {poItems.length}
        </div>
      </div>
      {/* Summary Section */}
      <div className="mb-4">
        <div className="text-2xl font-bold mb-4">Summary</div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Subtotal Amount (₦)</th>
              <th className="border px-4 py-2">Packing %</th>
              <th className="border px-4 py-2">Packing Amount (₦)</th>
              <th className="border px-4 py-2">Total Order Value (₦)</th>
              <th className="border px-4 py-2">SGST (₦)</th>
              <th className="border px-4 py-2">CGST (₦)</th>
              <th className="border px-4 py-2">IGST (₦)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-md"
                  readOnly
                  value={poItems.reduce(
                    (acc, item) => acc + item.unitPrice * item.orderQty,
                    0
                  )}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-md"
                  onChange={(e) => {
                    const packingPercent = parseFloat(e.target.value) || 0;
                    const subtotal = poItems.reduce(
                      (acc, item) => acc + item.unitPrice * item.orderQty,
                      0
                    );
                    const packingAmount = (packingPercent / 100) * subtotal;
                    setPoDetails({ ...poDetails, packingAmount });
                  }}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-md"
                  readOnly
                  value={poDetails.packingAmount}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-md"
                  readOnly
                  value={
                    poItems.reduce(
                      (acc, item) => acc + item.unitPrice * item.orderQty,
                      0
                    ) + (poDetails.packingAmount || 0)
                  }
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-md"
                  readOnly
                  value={(poDetails.totalOrderValue || 0) * 0.09}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-md"
                  readOnly
                  value={(poDetails.totalOrderValue || 0) * 0.09}
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-md"
                  readOnly
                  value={(poDetails.totalOrderValue || 0) * 0.18}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PO Summary Section */}
      <div className="mb-4">
        <div className="text-2xl font-bold mb-4">PO Summary</div>
        <div className="mb-4">
          <label className="block mb-2">Terms and Conditions</label>
          <textarea
            name="termsAndConditions"
            className="w-full px-4 py-2 border rounded-md"
            value={poDetails.termsAndConditions}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-between">
        <button className="px-4 py-2 bg-gray-500 text-white rounded-md">
          Save as Draft
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Save and Send
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md">
          Cancel
        </button>
      </div>

      {/* Dialog for Adding Product */}
    </div>
  );
};

export default CreatePurchaseOrder;
