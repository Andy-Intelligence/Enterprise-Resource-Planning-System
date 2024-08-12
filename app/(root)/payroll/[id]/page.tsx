"use client";

import React from "react";
import {
  FiUser,
  FiBriefcase,
  FiCalendar,
  FiDollarSign,
  FiPercent,
  FiPieChart,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface PayrollData {
  employeeName: string;
  employeeId: string;
  designation: string;
  payStartDate: string;
  payEndDate: string;
  grossSalary: number;
  netSalary: number;
  annualGrossSalary: number;
  allowance: number;
  appraisalScore: number;
  deductions: number;
  annualDeductions: number;
  annualNetSalary: number;
  payDate: string;
}

const dummyPayroll: PayrollData = {
  employeeName: "John Doe",
  employeeId: "EMP001",
  designation: "Senior Software Engineer",
  payStartDate: "2024-08-01",
  payEndDate: "2024-08-31",
  grossSalary: 500000,
  netSalary: 425000,
  annualGrossSalary: 6000000,
  allowance: 50000,
  appraisalScore: 92,
  deductions: 75000,
  annualDeductions: 900000,
  annualNetSalary: 5100000,
  payDate: "2024-09-05",
};

const PayrollDetailsDisplay: React.FC = () => {
  const payroll = dummyPayroll;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const InfoCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: "up" | "down" | "neutral";
  }> = ({ title, value, icon, trend }) => (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
      <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <div className="flex items-center space-x-2">
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {trend && (
            <span
              className={`text-sm ${
                trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-white">
            <h1 className="text-4xl font-bold mb-2">Payroll Details</h1>
            <p className="text-blue-100 mb-6">
              Payment period: {payroll.payStartDate} to {payroll.payEndDate}
            </p>
            <div className="flex items-center space-x-4">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {payroll.designation}
              </span>
              <span className="flex items-center text-blue-200">
                <FiCalendar className="mr-2" />
                Pay Date: {payroll.payDate}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <InfoCard
                title="Gross Salary"
                value={formatCurrency(payroll.grossSalary)}
                icon={<FiDollarSign className="text-blue-600 text-2xl" />}
                trend="up"
              />
              <InfoCard
                title="Net Salary"
                value={formatCurrency(payroll.netSalary)}
                icon={<FiDollarSign className="text-blue-600 text-2xl" />}
              />
              <InfoCard
                title="Deductions"
                value={formatCurrency(payroll.deductions)}
                icon={<FiTrendingDown className="text-blue-600 text-2xl" />}
                trend="down"
              />
              <InfoCard
                title="Allowance"
                value={formatCurrency(payroll.allowance)}
                icon={<FiTrendingUp className="text-blue-600 text-2xl" />}
                trend="up"
              />
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Performance Overview
              </h2>
              <Progress value={payroll.appraisalScore} className="h-4 mb-4" />
              <p className="text-center text-lg font-semibold text-blue-600">
                {payroll.appraisalScore}% Appraisal Score
              </p>
            </div>

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="flex items-center justify-start w-full mb-4 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="details"
                >
                  Employee Details
                </TabsTrigger>
                <TabsTrigger
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2 px-4 text-sm font-medium transition-all"
                  value="annual"
                >
                  Annual Overview
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Employee Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Employee Name
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {payroll.employeeName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Employee ID
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {payroll.employeeId}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Designation
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {payroll.designation}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Pay Date
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {payroll.payDate}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="annual">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Annual Salary Overview
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-green-600 mb-1">
                        Annual Gross Salary
                      </p>
                      <p className="text-2xl font-bold text-green-800">
                        {formatCurrency(payroll.annualGrossSalary)}
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-red-600 mb-1">
                        Annual Deductions
                      </p>
                      <p className="text-2xl font-bold text-red-800">
                        {formatCurrency(payroll.annualDeductions)}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-blue-600 mb-1">
                        Annual Net Salary
                      </p>
                      <p className="text-2xl font-bold text-blue-800">
                        {formatCurrency(payroll.annualNetSalary)}
                      </p>
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

export default PayrollDetailsDisplay;
