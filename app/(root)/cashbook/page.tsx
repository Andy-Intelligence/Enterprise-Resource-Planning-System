// "use client";
// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ArrowUpDown, Search, Download, Plus } from "lucide-react";

// const transactionTypes = ["Income", "Expense", "Transfer"];

// const initialTransactions = [
//   {
//     id: 1,
//     description: "Office Rent",
//     voucherName: "INV001",
//     transactionType: "Expense",
//     amount: -2000,
//     balance: 8000,
//     date: "2024-10-01",
//   },
//   {
//     id: 2,
//     description: "Client Payment",
//     voucherName: "REC001",
//     transactionType: "Income",
//     amount: 5000,
//     balance: 13000,
//     date: "2024-10-03",
//   },
//   {
//     id: 3,
//     description: "Utility Bill",
//     voucherName: "INV002",
//     transactionType: "Expense",
//     amount: -500,
//     balance: 12500,
//     date: "2024-10-05",
//   },
//   {
//     id: 4,
//     description: "Bank Transfer",
//     voucherName: "TRF001",
//     transactionType: "Transfer",
//     amount: -1000,
//     balance: 11500,
//     date: "2024-10-07",
//   },
//   {
//     id: 5,
//     description: "Consulting Fee",
//     voucherName: "REC002",
//     transactionType: "Income",
//     amount: 3000,
//     balance: 14500,
//     date: "2024-10-10",
//   },
// ];

// const Cashbook = () => {
//   const [transactions, setTransactions] = useState(initialTransactions);
//   const [sortConfig, setSortConfig] = useState<{
//     key: keyof (typeof initialTransactions)[0];
//     direction: "ascending" | "descending";
//   }>({
//     key: "description", // Default sorting key
//     direction: "ascending",
//   });
//   const [filterValue, setFilterValue] = useState("");

//   const handleSort = (key: keyof (typeof initialTransactions)[0]) => {
//     let direction: "ascending" | "descending" = "ascending";
//     if (sortConfig.key === key && sortConfig.direction === "ascending") {
//       direction = "descending";
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedTransactions = React.useMemo(() => {
//     let sortableItems = [...transactions];
//     if (sortConfig.key) {
//       sortableItems.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === "ascending" ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === "ascending" ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableItems;
//   }, [transactions, sortConfig]);

//   const filteredTransactions = sortedTransactions.filter(
//     (transaction) =>
//       transaction.description
//         .toLowerCase()
//         .includes(filterValue.toLowerCase()) ||
//       transaction.voucherName
//         .toLowerCase()
//         .includes(filterValue.toLowerCase()) ||
//       transaction.transactionType
//         .toLowerCase()
//         .includes(filterValue.toLowerCase())
//   );

//   const SortableHeader = ({
//     label,
//     sortKey,
//   }: {
//     label: string;
//     sortKey: keyof (typeof initialTransactions)[0];
//   }) => (
//     <TableHead>
//       <button
//         className="flex items-center space-x-1 text-left font-medium text-gray-500 hover:text-gray-700"
//         onClick={() => handleSort(sortKey)}
//       >
//         <span>{label}</span>
//         <ArrowUpDown className="h-4 w-4" />
//       </button>
//     </TableHead>
//   );

//   return (
//     <Card className="w-full shadow-lg">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-gray-800">
//           Cashbook
//         </CardTitle>
//         <div className="flex justify-between items-center mt-4">
//           <div className="relative w-64">
//             <Input
//               type="text"
//               placeholder="Search transactions..."
//               value={filterValue}
//               onChange={(e) => setFilterValue(e.target.value)}
//               className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//           </div>
//           <div className="space-x-2">
//             <Button variant="outline" className="flex items-center space-x-2">
//               <Download className="h-4 w-4" />
//               <span>Export</span>
//             </Button>
//             <Button className="flex items-center space-x-2">
//               <Plus className="h-4 w-4" />
//               <span>New Transaction</span>
//             </Button>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <SortableHeader label="Description" sortKey="description" />
//                 <SortableHeader label="Voucher Name" sortKey="voucherName" />
//                 <TableHead>Transaction Type</TableHead>
//                 <SortableHeader label="Amount" sortKey="amount" />
//                 <SortableHeader label="Balance" sortKey="balance" />
//                 <SortableHeader label="Date" sortKey="date" />
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredTransactions.map((transaction) => (
//                 <TableRow key={transaction.id} className="hover:bg-gray-50">
//                   <TableCell>{transaction.description}</TableCell>
//                   <TableCell>{transaction.voucherName}</TableCell>
//                   <TableCell>
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                         transaction.transactionType === "Income"
//                           ? "bg-green-100 text-green-800"
//                           : transaction.transactionType === "Expense"
//                           ? "bg-red-100 text-red-800"
//                           : "bg-blue-100 text-blue-800"
//                       }`}
//                     >
//                       {transaction.transactionType}
//                     </span>
//                   </TableCell>
//                   <TableCell
//                     className={
//                       transaction.amount >= 0
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }
//                   >
//                     {transaction.amount.toLocaleString("en-US", {
//                       style: "currency",
//                       currency: "USD",
//                     })}
//                   </TableCell>
//                   <TableCell>
//                     {transaction.balance.toLocaleString("en-US", {
//                       style: "currency",
//                       currency: "USD",
//                     })}
//                   </TableCell>
//                   <TableCell>
//                     {new Date(transaction.date).toLocaleDateString()}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default Cashbook;




"use client"
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowUpDown, Search, Download, Plus, Edit, Trash } from "lucide-react";

const transactionTypes = ["Income", "Expense", "Transfer"];

// Define type for transactions
interface Transaction {
  id: number;
  description: string;
  voucherName: string;
  transactionType: string;
  amount: number;
  balance: number;
  date: string;
}

const initialTransactions: Transaction[] = [
  {
    id: 1,
    description: "Office Rent",
    voucherName: "INV001",
    transactionType: "Expense",
    amount: -2000,
    balance: 8000,
    date: "2024-10-01",
  },
  {
    id: 2,
    description: "Client Payment",
    voucherName: "REC001",
    transactionType: "Income",
    amount: 5000,
    balance: 13000,
    date: "2024-10-03",
  },
  {
    id: 3,
    description: "Utility Bill",
    voucherName: "INV002",
    transactionType: "Expense",
    amount: -500,
    balance: 12500,
    date: "2024-10-05",
  },
  {
    id: 4,
    description: "Bank Transfer",
    voucherName: "TRF001",
    transactionType: "Transfer",
    amount: -1000,
    balance: 11500,
    date: "2024-10-07",
  },
  {
    id: 5,
    description: "Consulting Fee",
    voucherName: "REC002",
    transactionType: "Income",
    amount: 3000,
    balance: 14500,
    date: "2024-10-10",
  },
];

// Define the sort configuration
interface SortConfig {
  key: keyof Transaction;
  direction: "ascending" | "descending";
}

const Cashbook = () => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "date",
    direction: "descending",
  });
  const [filterValue, setFilterValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction | null>(null);
  const [formData, setFormData] = useState({
    description: "",
    voucherName: "",
    transactionType: "",
    amount: "",
    date: "",
  });

  const handleSort = (key: keyof Transaction) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedTransactions = React.useMemo(() => {
    let sortableItems = [...transactions];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [transactions, sortConfig]);

  const filteredTransactions = sortedTransactions.filter(
    (transaction) =>
      transaction.description
        .toLowerCase()
        .includes(filterValue.toLowerCase()) ||
      transaction.voucherName
        .toLowerCase()
        .includes(filterValue.toLowerCase()) ||
      transaction.transactionType
        .toLowerCase()
        .includes(filterValue.toLowerCase())
  );

  const SortableHeader = ({
    label,
    sortKey,
  }: {
    label: string;
    sortKey: keyof Transaction;
  }) => (
    <TableHead>
      <button
        className="flex items-center space-x-1 text-left font-medium text-gray-500 hover:text-gray-700"
        onClick={() => handleSort(sortKey)}
      >
        <span>{label}</span>
        <ArrowUpDown className="h-4 w-4" />
      </button>
    </TableHead>
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentTransaction) {
      // Update existing transaction
      const updatedTransactions = transactions.map((t) =>
        t.id === currentTransaction.id
          ? { ...t, ...formData, amount: parseFloat(formData.amount) }
          : t
      );
      setTransactions(updatedTransactions);
    } else {
      // Create new transaction
      const newTransaction: Transaction = {
        ...formData,
        id: transactions.length + 1,
        amount: parseFloat(formData.amount),
        balance: calculateNewBalance(parseFloat(formData.amount)),
      };
      setTransactions([...transactions, newTransaction]);
    }
    setIsModalOpen(false);
    setCurrentTransaction(null);
    resetForm();
  };

  const calculateNewBalance = (amount: number): number => {
    const lastTransaction = transactions[transactions.length - 1];
    return lastTransaction ? lastTransaction.balance + amount : amount;
  };

  const resetForm = () => {
    setFormData({
      description: "",
      voucherName: "",
      transactionType: "",
      amount: "",
      date: "",
    });
  };

  const openModal = (transaction: Transaction | null = null) => {
    if (transaction) {
      setCurrentTransaction(transaction);
      setFormData({
        description: transaction.description,
        voucherName: transaction.voucherName,
        transactionType: transaction.transactionType,
        amount: transaction.amount.toString(),
        date: transaction.date,
      });
    } else {
      setCurrentTransaction(null);
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Cashbook
        </CardTitle>
        <div className="flex justify-between items-center mt-4">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search transactions..."
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <div className="space-x-2">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button
              className="flex items-center space-x-2"
              onClick={() => openModal()}
            >
              <Plus className="h-4 w-4" />
              <span>New Transaction</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHeader label="Description" sortKey="description" />
                <SortableHeader label="Voucher Name" sortKey="voucherName" />
                <TableHead>Transaction Type</TableHead>
                <SortableHeader label="Amount" sortKey="amount" />
                <SortableHeader label="Balance" sortKey="balance" />
                <SortableHeader label="Date" sortKey="date" />
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-gray-50">
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.voucherName}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        transaction.transactionType === "Income"
                          ? "bg-green-100 text-green-800"
                          : transaction.transactionType === "Expense"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {transaction.transactionType}
                    </span>
                  </TableCell>
                  <TableCell
                    className={
                      transaction.amount >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {transaction.amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                  <TableCell>
                    {transaction.balance.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openModal(transaction)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(transaction.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gray-100">
          <DialogHeader>
            <DialogTitle>
              {currentTransaction ? "Edit Transaction" : "New Transaction"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="voucherName" className="text-right">
                  Voucher Name
                </Label>
                <Input
                  id="voucherName"
                  name="voucherName"
                  value={formData.voucherName}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="transactionType" className="text-right">
                  Transaction Type
                </Label>
                <Select
                  name="transactionType"
                  value={formData.transactionType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, transactionType: value }))
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {currentTransaction ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Cashbook;
