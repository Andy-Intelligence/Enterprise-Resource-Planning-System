"use client";
import React from "react";
import Head from "next/head";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  // Sample data for charts
  const projectData = {
    labels: ["Project A", "Project B", "Project C", "Project D"],
    datasets: [
      {
        label: "Completion Status (%)",
        data: [70, 50, 90, 60],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336", "#2196F3"],
      },
    ],
  };

  const financialData = {
    labels: ["Budget", "Actual"],
    datasets: [
      {
        label: "Amount ($)",
        data: [1200000, 1000000],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  const kpiData = {
    labels: ["Safety", "Quality", "Timeliness"],
    datasets: [
      {
        label: "Percentage",
        data: [98, 95, 85],
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3"],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        <title>ERP Dashboard</title>
      </Head>

      <header className="bg-blue-600 p-4 text-white text-center">
        ERP Dashboard
      </header>

      <main className="flex flex-grow p-4 space-x-4">
        {/* Left Section: Project Overview and Milestones */}
        <section className="flex-1 space-y-4">
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Project Overview</h2>
            <div className="mb-4">
              <div className="bg-gray-100 p-2 rounded-md shadow-sm">
                <p>Total Projects: 4</p>
                <p>Projects On Track: 2</p>
                <p>Projects Delayed: 1</p>
                <p>Projects Completed: 1</p>
              </div>
            </div>
            <Bar data={projectData} options={{ responsive: true }} />
          </div>
        </section>

        {/* Center Section: Financial Summary and KPIs */}
        <section className="flex-1 space-y-4">
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Financial Summary</h2>
            <div className="mb-4">
              <div className="bg-gray-100 p-2 rounded-md shadow-sm">
                <p>Total Budget: $1,200,000</p>
                <p>Total Actual Spend: $1,000,000</p>
                <p>Revenue: $2,000,000</p>
                <p>Expenses: $800,000</p>
              </div>
            </div>
            <Pie data={financialData} options={{ responsive: true }} />
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">
              Key Performance Indicators (KPIs)
            </h2>
            <div className="mb-4">
              <div className="bg-gray-100 p-2 rounded-md shadow-sm">
                <p>Safety Incidents: 2</p>
                <p>Quality Control: 98%</p>
                <p>Project Timeliness: 80% on time</p>
              </div>
            </div>
            <Bar data={kpiData} options={{ responsive: true }} />
          </div>
        </section>

        {/* Right Section: Resource Management and Inventory Status */}
        <section className="flex-1 space-y-4">
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Resource Management</h2>
            <div className="mb-4">
              <div className="bg-gray-100 p-2 rounded-md shadow-sm">
                <p>Employee Utilization: 85%</p>
                <p>Equipment Status: 95% operational</p>
                <p>Subcontractor Performance: 90% satisfaction</p>
              </div>
            </div>
            <Line data={projectData} options={{ responsive: true }} />
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Inventory Management</h2>
            <div className="mb-4">
              <div className="bg-gray-100 p-2 rounded-md shadow-sm">
                <p>Stock Levels: Sufficient</p>
                <p>Material Usage: On track</p>
              </div>
            </div>
            <Pie data={financialData} options={{ responsive: true }} />
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 p-4 text-white text-center">
        &copy; 2024 Construction Company
      </footer>
    </div>
  );
};

export default Dashboard;
