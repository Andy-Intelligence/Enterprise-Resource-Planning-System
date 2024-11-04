// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Label } from "@/components/ui/label";

// const statusOptions = [
//   { label: "Draft", value: "draft" },
//   { label: "Confirmed", value: "confirmed" },
// ];

// interface BudgetRow {
//   budgetaryPosition: string;
//   analyticAccount: string;
//   startDate: string;
//   endDate: string;
//   paidDate: string;
//   plannedAmount: number;
//   practicalAmount: number;
//   theoreticalAmount: number;
//   achievement: string;
// }

// const BudgetComponent: React.FC = () => {
//   const router = useRouter();
//   const [formStatus, setFormStatus] = useState<string>("draft");
//   const [selectedRow, setSelectedRow] = useState<BudgetRow | null>(null);

//   const initialBudgetData: BudgetRow[] = [
//     {
//       budgetaryPosition: "Position 1",
//       analyticAccount: "Account 1",
//       startDate: "2024-01-01",
//       endDate: "2024-12-31",
//       paidDate: "2024-06-01",
//       plannedAmount: 1000,
//       practicalAmount: 800,
//       theoreticalAmount: 900,
//       achievement: "80%",
//     },
//     {
//       budgetaryPosition: "Position 2",
//       analyticAccount: "Account 2",
//       startDate: "2024-01-01",
//       endDate: "2024-12-31",
//       paidDate: "2024-06-01",
//       plannedAmount: 2000,
//       practicalAmount: 1500,
//       theoreticalAmount: 1800,
//       achievement: "75%",
//     },
//     // Add more rows as needed
//   ];

//   const [budgetData, setBudgetData] = useState<BudgetRow[]>(initialBudgetData);

//   const handleAddItem = () => {
//     setBudgetData([
//       ...budgetData,
//       {
//         budgetaryPosition: "",
//         analyticAccount: "",
//         startDate: "",
//         endDate: "",
//         paidDate: "",
//         plannedAmount: 0,
//         practicalAmount: 0,
//         theoreticalAmount: 0,
//         achievement: "",
//       },
//     ]);
//   };

//   const handleInputChange = (
//     index: number,
//     field: string,
//     value: string | number
//   ) => {
//     const newData = budgetData.map((row, i) =>
//       i === index ? { ...row, [field]: value } : row
//     );
//     setBudgetData(newData);
//   };

//   const openDialog = (row: BudgetRow) => {
//     setSelectedRow(row);
//   };

//   const calculateTotal = (field: keyof BudgetRow) => {
//     return budgetData.reduce((sum, row) => sum + Number(row[field]), 0);
//   };

//   return (
//     <div className="border rounded-lg p-4 relative">
//       <div className="text-3xl font-bold mb-4">
//         Budget / [Budget 2018] / [optimistic]
//       </div>
//       <div className="flex gap-2 items-center justify-between mb-4">
//         <div className="flex gap-2 items-center">
//           <Button className="px-4 py-2 bg-blue-500 text-white rounded-md">
//             Edit
//           </Button>
//           <Button
//             className="px-4 py-2 bg-blue-500 text-white rounded-md"
//             variant="outline"
//           >
//             Create
//           </Button>
//           <Button
//             className="px-4 py-2 bg-blue-500 text-white rounded-md"
//             variant="outline"
//           >
//             Confirm
//           </Button>
//         </div>
//         <div className="flex items-center space-x-2">
//           {statusOptions.map((status) => (
//             <button
//               key={status.value}
//               className={`px-2 py-1 text-xs rounded-full ${
//                 formStatus === status.value
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-black"
//               }`}
//               style={{ minWidth: "80px", textAlign: "center" }}
//               onClick={() => setFormStatus(status.value)}
//             >
//               {status.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <form>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <div className="mb-4">
//               <Label className="font-bold" htmlFor="budget">
//                 Budget
//               </Label>
//               <div>Budget 2018 Optimistic</div>
//             </div>
//             <div className="mb-4">
//               <Label className="font-bold" htmlFor="responsible">
//                 Responsible
//               </Label>
//               <div>Administrator</div>
//             </div>
//           </div>
//           <div>
//             <div className="mb-4">
//               <Label className="font-bold" htmlFor="period">
//                 Period
//               </Label>
//               <div>10/31/2017 - 10/31/2018</div>
//             </div>
//           </div>
//         </div>

//         <Tabs defaultValue="bl" className="w-full">
//           <TabsList>
//             <TabsTrigger
//               className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
//               value="bl"
//             >
//               Products
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value="bl">
//             <div className="mt-4">
//               <table className="min-w-full bg-white">
//                 <thead>
//                   <tr>
//                     <th className="py-2 px-4 border-b">Budgetary Position</th>
//                     <th className="py-2 px-4 border-b">Analytic Account</th>
//                     <th className="py-2 px-4 border-b">Start Date</th>
//                     <th className="py-2 px-4 border-b">End Date</th>
//                     <th className="py-2 px-4 border-b">Paid Date</th>
//                     <th className="py-2 px-4 border-b">Planned Amount</th>
//                     <th className="py-2 px-4 border-b">Practical Amount</th>
//                     <th className="py-2 px-4 border-b">Theoretical Amount</th>
//                     <th className="py-2 px-4 border-b">Achievement</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {budgetData.map((row, index) => (
//                     <Dialog key={index} onOpenChange={() => openDialog(row)}>
//                       <DialogTrigger asChild>
//                         <tr
//                           key={index}
//                           className="cursor-pointer"
//                           onClick={() => openDialog(row)}
//                         >
//                           <td className="py-2 px-4 border-b">
//                             {row.budgetaryPosition}
//                           </td>
//                           <td className="py-2 px-4 border-b">
//                             {row.analyticAccount}
//                           </td>
//                           <td className="py-2 px-4 border-b">
//                             {row.startDate}
//                           </td>
//                           <td className="py-2 px-4 border-b">{row.endDate}</td>
//                           <td className="py-2 px-4 border-b">{row.paidDate}</td>
//                           <td className="py-2 px-4 border-b">
//                             {row.plannedAmount}
//                           </td>
//                           <td className="py-2 px-4 border-b">
//                             {row.practicalAmount}
//                           </td>
//                           <td className="py-2 px-4 border-b">
//                             {row.theoreticalAmount}
//                           </td>
//                           <td className="py-2 px-4 border-b">
//                             {row.achievement}
//                           </td>
//                         </tr>
//                       </DialogTrigger>
//                       {selectedRow && (
//                         <DialogContent className="bg-gray-200">
//                           <DialogTitle>Open: Order Lines</DialogTitle>
//                           <div className="p-4">
//                             <p>
//                               <strong>Budgetary Position:</strong>{" "}
//                               {selectedRow.budgetaryPosition}
//                             </p>
//                             <p>
//                               <strong>Analytic Account:</strong>{" "}
//                               {selectedRow.analyticAccount}
//                             </p>
//                             <p>
//                               <strong>Start Date:</strong>{" "}
//                               {selectedRow.startDate}
//                             </p>
//                             <p>
//                               <strong>End Date:</strong> {selectedRow.endDate}
//                             </p>
//                             <p>
//                               <strong>Paid Date:</strong> {selectedRow.paidDate}
//                             </p>
//                             <p>
//                               <strong>Planned Amount:</strong>{" "}
//                               {selectedRow.plannedAmount}
//                             </p>
//                             <p>
//                               <strong>Practical Amount:</strong>{" "}
//                               {selectedRow.practicalAmount}
//                             </p>
//                             <p>
//                               <strong>Theoretical Amount:</strong>{" "}
//                               {selectedRow.theoreticalAmount}
//                             </p>
//                             <p>
//                               <strong>Achievement:</strong>{" "}
//                               {selectedRow.achievement}
//                             </p>
//                           </div>
//                         </DialogContent>
//                       )}
//                     </Dialog>
//                   ))}
//                 </tbody>
//                 <tfoot>
//                   <tr>
//                     <td className="py-2 px-4 border-t font-bold" colSpan={5}>
//                       Total
//                     </td>
//                     <td className="py-2 px-4 border-t font-bold">
//                       {calculateTotal("plannedAmount")}
//                     </td>
//                     <td className="py-2 px-4 border-t font-bold">
//                       {calculateTotal("practicalAmount")}
//                     </td>
//                     <td className="py-2 px-4 border-t font-bold">
//                       {calculateTotal("theoreticalAmount")}
//                     </td>
//                     <td className="py-2 px-4 border-t"></td>
//                   </tr>
//                 </tfoot>
//               </table>
//               <Button onClick={handleAddItem} className="mt-4">
//                 Add Item
//               </Button>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </form>
//     </div>
//   );
// };

// export default BudgetComponent;




"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const statusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Confirmed", value: "confirmed" },
];

interface BudgetRow {
  budgetaryPosition: string;
  analyticAccount: string;
  startDate: string;
  endDate: string;
  paidDate: string;
  plannedAmount: number;
  practicalAmount: number;
  theoreticalAmount: number;
  achievement: string;
}

const BudgetComponent: React.FC = () => {
  const router = useRouter();
  const [formStatus, setFormStatus] = useState<string>("draft");
  const [selectedRow, setSelectedRow] = useState<BudgetRow | null>(null);
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [newRow, setNewRow] = useState<BudgetRow>({
    budgetaryPosition: "",
    analyticAccount: "",
    startDate: "",
    endDate: "",
    paidDate: "",
    plannedAmount: 0,
    practicalAmount: 0,
    theoreticalAmount: 0,
    achievement: "",
  });

  const initialBudgetData: BudgetRow[] = [
    {
      budgetaryPosition: "Position 1",
      analyticAccount: "Account 1",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      paidDate: "2024-06-01",
      plannedAmount: 1000,
      practicalAmount: 800,
      theoreticalAmount: 900,
      achievement: "80%",
    },
    {
      budgetaryPosition: "Position 2",
      analyticAccount: "Account 2",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      paidDate: "2024-06-01",
      plannedAmount: 2000,
      practicalAmount: 1500,
      theoreticalAmount: 1800,
      achievement: "75%",
    },
  ];

  const [budgetData, setBudgetData] = useState<BudgetRow[]>(initialBudgetData);

  const handleAddItem = (e:any) => {
    e.preventDefault()
    setShowAddDialog(true);
  };

  const handleInputChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newData = budgetData.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setBudgetData(newData);
  };

  const handleNewRowChange = (field: string, value: string | number) => {
    setNewRow({ ...newRow, [field]: value });
  };

  const handleAddNewItem = () => {
    setBudgetData([...budgetData, newRow]);
    setShowAddDialog(false);
    setNewRow({
      budgetaryPosition: "",
      analyticAccount: "",
      startDate: "",
      endDate: "",
      paidDate: "",
      plannedAmount: 0,
      practicalAmount: 0,
      theoreticalAmount: 0,
      achievement: "",
    });
  };

  const openDialog = (row: BudgetRow) => {
    setSelectedRow(row);
  };

  const calculateTotal = (field: keyof BudgetRow) => {
    return budgetData.reduce((sum, row) => sum + Number(row[field]), 0);
  };

  return (
    <div className="border rounded-lg p-4 relative">
      <div className="text-3xl font-bold mb-4">
        Budget / [Budget 2018] / [optimistic]
      </div>
      <div className="flex gap-2 items-center justify-between mb-4">
        <div className="flex gap-2 items-center">
          <Button className="px-4 py-2 bg-green-500 text-white rounded-md">
            Edit
          </Button>
          <Button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            variant="outline"
            onClick={()=>{router.push("/budget/create")}}
          >
            Create
          </Button>
          <Button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            variant="outline"
          >
            Confirm
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          {statusOptions.map((status) => (
            <button
              key={status.value}
              className={`px-2 py-1 text-xs rounded-full ${
                formStatus === status.value
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              style={{ minWidth: "80px", textAlign: "center" }}
              onClick={() => setFormStatus(status.value)}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <div className="mb-4">
              <Label className="font-bold" htmlFor="budget">
                Budget
              </Label>
              <div>Budget 2018 Optimistic</div>
            </div>
            <div className="mb-4">
              <Label className="font-bold" htmlFor="responsible">
                Responsible
              </Label>
              <div>Administrator</div>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <Label className="font-bold" htmlFor="period">
                Period
              </Label>
              <div>10/31/2017 - 10/31/2018</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="bl" className="w-full">
          <TabsList>
            <TabsTrigger
              className="data-[state=active]:bg-bank-gradient data-[state=active]:text-white text-black"
              value="bl"
            >
              Products
            </TabsTrigger>
          </TabsList>
          <TabsContent value="bl">
            <div className="mt-4">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Budgetary Position</th>
                    <th className="py-2 px-4 border-b">Analytic Account</th>
                    <th className="py-2 px-4 border-b">Start Date</th>
                    <th className="py-2 px-4 border-b">End Date</th>
                    <th className="py-2 px-4 border-b">Paid Date</th>
                    <th className="py-2 px-4 border-b">Planned Amount</th>
                    <th className="py-2 px-4 border-b">Practical Amount</th>
                    <th className="py-2 px-4 border-b">Theoretical Amount</th>
                    <th className="py-2 px-4 border-b">Achievement</th>
                  </tr>
                </thead>
                <tbody>
                  {budgetData.map((row, index) => (
                    <Dialog key={index} onOpenChange={() => openDialog(row)}>
                      <DialogTrigger asChild>
                        <tr
                          key={index}
                          className="cursor-pointer"
                          onClick={() => openDialog(row)}
                        >
                          <td className="py-2 px-4 border-b">
                            {row.budgetaryPosition}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {row.analyticAccount}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {row.startDate}
                          </td>
                          <td className="py-2 px-4 border-b">{row.endDate}</td>
                          <td className="py-2 px-4 border-b">{row.paidDate}</td>
                          <td className="py-2 px-4 border-b">
                            {row.plannedAmount}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {row.practicalAmount}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {row.theoreticalAmount}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {row.achievement}
                          </td>
                        </tr>
                      </DialogTrigger>
                      {selectedRow && (
                        <DialogContent className="bg-gray-200">
                          <DialogTitle>Open: Order Lines</DialogTitle>
                          <div className="p-4">
                            <p>
                              <strong>Budgetary Position:</strong>{" "}
                              {selectedRow.budgetaryPosition}
                            </p>
                            <p>
                              <strong>Analytic Account:</strong>{" "}
                              {selectedRow.analyticAccount}
                            </p>
                            <p>
                              <strong>Start Date:</strong>{" "}
                              {selectedRow.startDate}
                            </p>
                            <p>
                              <strong>End Date:</strong> {selectedRow.endDate}
                            </p>
                            <p>
                              <strong>Paid Date:</strong> {selectedRow.paidDate}
                            </p>
                            <p>
                              <strong>Planned Amount:</strong>{" "}
                              {selectedRow.plannedAmount}
                            </p>
                            <p>
                              <strong>Practical Amount:</strong>{" "}
                              {selectedRow.practicalAmount}
                            </p>
                            <p>
                              <strong>Theoretical Amount:</strong>{" "}
                              {selectedRow.theoreticalAmount}
                            </p>
                            <p>
                              <strong>Achievement:</strong>{" "}
                              {selectedRow.achievement}
                            </p>
                          </div>
                        </DialogContent>
                      )}
                    </Dialog>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="py-2 px-4 border-t font-bold" colSpan={5}>
                      Total
                    </td>
                    <td className="py-2 px-4 border-t font-bold">
                      {calculateTotal("plannedAmount")}
                    </td>
                    <td className="py-2 px-4 border-t font-bold">
                      {calculateTotal("practicalAmount")}
                    </td>
                    <td className="py-2 px-4 border-t font-bold">
                      {calculateTotal("theoreticalAmount")}
                    </td>
                    <td className="py-2 px-4 border-t"></td>
                  </tr>
                </tfoot>
              </table>
              <Button onClick={handleAddItem} className="mt-4">
                Add Item
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>

      {showAddDialog && (
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            
          <DialogContent className="bg-gray-200  ">
            <DialogTitle>Add New Item</DialogTitle>
            <div className="p-4">
              <div className="mb-4">
                <Label className="font-bold" htmlFor="budgetaryPosition">
                  Budgetary Position
                </Label>
                <Input
                  type="text"
                  value={newRow.budgetaryPosition}
                  onChange={(e) =>
                    handleNewRowChange("budgetaryPosition", e.target.value)
                  }
                />
              </div>
              <div className="mb-4">
                <Label className="font-bold" htmlFor="analyticAccount">
                  Analytic Account
                </Label>
                <Input
                  type="text"
                  value={newRow.analyticAccount}
                  onChange={(e) =>
                    handleNewRowChange("analyticAccount", e.target.value)
                  }
                />
              </div>
              <div className="mb-4">
                <Label className="font-bold" htmlFor="startDate">
                  Start Date
                </Label>
                <Input
                  type="date"
                  value={newRow.startDate}
                  onChange={(e) =>
                    handleNewRowChange("startDate", e.target.value)
                  }
                />
              </div>
              <div className="mb-4">
                <Label className="font-bold" htmlFor="endDate">
                  End Date
                </Label>
                <Input
                  type="date"
                  value={newRow.endDate}
                  onChange={(e) =>
                    handleNewRowChange("endDate", e.target.value)
                  }
                />
              </div>
              <div className="mb-4">
                <Label className="font-bold" htmlFor="paidDate">
                  Paid Date
                </Label>
                <Input
                  type="date"
                  value={newRow.paidDate}
                  onChange={(e) =>
                    handleNewRowChange("paidDate", e.target.value)
                  }
                />
              </div>
              <div className="mb-4">
                <Label className="font-bold" htmlFor="plannedAmount">
                  Planned Amount
                </Label>
                <Input
                  type="number"
                  value={newRow.plannedAmount}
                  onChange={(e) =>
                    handleNewRowChange("plannedAmount", Number(e.target.value))
                  }
                />
              </div>
        
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddNewItem}>Add</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BudgetComponent;

