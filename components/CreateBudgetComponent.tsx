"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

const CreateBudgetComponent: React.FC = () => {
  const [formStatus, setFormStatus] = useState<string>("draft");
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
  const [budgetData, setBudgetData] = useState<BudgetRow[]>([]);
  const [budgetDetails, setBudgetDetails] = useState({
    budget: "",
    responsible: "",
    periodStart: "",
    periodEnd: "",
  });

  const statusOptions = [
    { label: "Draft", value: "draft" },
    { label: "Confirmed", value: "confirmed" },
  ];

  const handleAddItem = (e: any) => {
    e.preventDefault();
    setBudgetData([...budgetData, newRow]);
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

  const handleInputChange = (field: string, value: string | number) => {
    setNewRow({ ...newRow, [field]: value });
  };

  const handleBudgetDetailsChange = (field: string, value: string | number) => {
    setBudgetDetails({ ...budgetDetails, [field]: value });
  };

  const calculateTotal = (field: keyof BudgetRow) => {
    return budgetData.reduce((sum, row) => sum + Number(row[field]), 0);
  };

  return (
    <div className="border rounded-lg p-4 relative">
      <div className="text-3xl font-bold mb-4">Create Budget</div>
      <div className="flex gap-2 items-center justify-between mb-4">
        <div className="flex gap-2 items-center">
          <Button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Edit
          </Button>
          <Button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            variant="outline"
            onClick={handleAddItem}
          >
            Create
          </Button>
          <Button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
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
                  ? "bg-blue-500 text-white"
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
              <Input
                id="budget"
                type="text"
                value={budgetDetails.budget}
                onChange={(e) =>
                  handleBudgetDetailsChange("budget", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <Label className="font-bold" htmlFor="responsible">
                Responsible
              </Label>
              <Input
                id="responsible"
                type="text"
                value={budgetDetails.responsible}
                onChange={(e) =>
                  handleBudgetDetailsChange("responsible", e.target.value)
                }
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <Label className="font-bold" htmlFor="periodStart">
                Period Start
              </Label>
              <Input
                id="periodStart"
                type="date"
                value={budgetDetails.periodStart}
                onChange={(e) =>
                  handleBudgetDetailsChange("periodStart", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
              <Label className="font-bold" htmlFor="periodEnd">
                Period End
              </Label>
              <Input
                id="periodEnd"
                type="date"
                value={budgetDetails.periodEnd}
                onChange={(e) =>
                  handleBudgetDetailsChange("periodEnd", e.target.value)
                }
              />
            </div>
          </div>
        </div>

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
                <tr key={index}>
                  <td className="py-2 px-4 border-b">
                    {row.budgetaryPosition}
                  </td>
                  <td className="py-2 px-4 border-b">{row.analyticAccount}</td>
                  <td className="py-2 px-4 border-b">{row.startDate}</td>
                  <td className="py-2 px-4 border-b">{row.endDate}</td>
                  <td className="py-2 px-4 border-b">{row.paidDate}</td>
                  <td className="py-2 px-4 border-b">{row.plannedAmount}</td>
                  <td className="py-2 px-4 border-b">{row.practicalAmount}</td>
                  <td className="py-2 px-4 border-b">
                    {row.theoreticalAmount}
                  </td>
                  <td className="py-2 px-4 border-b">{row.achievement}</td>
                </tr>
              ))}
              <tr>
                <td className="py-2 px-4 border-b">
                  <Input
                    type="text"
                    value={newRow.budgetaryPosition}
                    onChange={(e) =>
                      handleInputChange("budgetaryPosition", e.target.value)
                    }
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <Input
                    type="text"
                    value={newRow.analyticAccount}
                    onChange={(e) =>
                      handleInputChange("analyticAccount", e.target.value)
                    }
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <Input
                    type="date"
                    value={newRow.startDate}
                    onChange={(e) =>
                      handleInputChange("startDate", e.target.value)
                    }
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <Input
                    type="date"
                    value={newRow.endDate}
                    onChange={(e) =>
                      handleInputChange("endDate", e.target.value)
                    }
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <Input
                    type="date"
                    value={newRow.paidDate}
                    onChange={(e) =>
                      handleInputChange("paidDate", e.target.value)
                    }
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <Input
                    type="number"
                    value={newRow.plannedAmount}
                    onChange={(e) =>
                      handleInputChange(
                        "plannedAmount",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <Input
                    type="number"
                    value={newRow.practicalAmount}
                    onChange={(e) =>
                      handleInputChange(
                        "practicalAmount",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <Input
                    type="number"
                    value={newRow.theoreticalAmount}
                    onChange={(e) =>
                      handleInputChange(
                        "theoreticalAmount",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <Input
                    type="text"
                    value={newRow.achievement}
                    onChange={(e) =>
                      handleInputChange("achievement", e.target.value)
                    }
                  />
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-gray-200">
                <td className="py-2 px-4 font-bold border-b">Total</td>
                <td className="py-2 px-4 border-b"></td>
                <td className="py-2 px-4 border-b"></td>
                <td className="py-2 px-4 border-b"></td>
                <td className="py-2 px-4 border-b"></td>
                <td className="py-2 px-4 border-b">
                  {calculateTotal("plannedAmount")}
                </td>
                <td className="py-2 px-4 border-b">
                  {calculateTotal("practicalAmount")}
                </td>
                <td className="py-2 px-4 border-b">
                  {calculateTotal("theoreticalAmount")}
                </td>
                <td className="py-2 px-4 border-b"></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleAddItem}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Item
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBudgetComponent;
