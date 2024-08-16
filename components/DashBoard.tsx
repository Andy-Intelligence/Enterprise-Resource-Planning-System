"use client";
import React, { useState, useEffect } from "react";
import { Line, Bar, Doughnut, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
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
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const notificationInterval = setInterval(() => {
      setNotifications((prev) => [
        `New ${
          ["procurement", "operations", "HR"][Math.floor(Math.random() * 3)]
        } alert at ${new Date().toLocaleTimeString()}`,
        ...prev.slice(0, 4),
      ]);
    }, 5000);

    return () => clearInterval(notificationInterval);
  }, []);

  const procurementData = {
    labels: ["PO 123", "PO 456", "PO 789", "PO 101"],
    datasets: [
      {
        label: "Purchase Order Amount ($)",
        data: [12000, 4500, 30000, 23000],
        backgroundColor: "#71C946",
      },
    ],
  };

  const financialData = {
    labels: ["Budget", "Actual Spend", "Revenue", "Expenses"],
    datasets: [
      {
        label: "Amount ($)",
        data: [1200000, 1000000, 2000000, 800000],
        backgroundColor: ["#71C946", "#FF0000", "#2196F3", "#FFC107"],
      },
    ],
  };

  const inventoryData = {
    labels: ["Material A", "Material B", "Material C", "Material D"],
    datasets: [
      {
        label: "Stock Levels",
        data: [65, 59, 80, 81],
        backgroundColor: "#71C946",
      },
    ],
  };

  const employeePerformanceData = {
    labels: [
      "Productivity",
      "Quality",
      "Teamwork",
      "Innovation",
      "Communication",
    ],
    datasets: [
      {
        label: "Employee Performance",
        data: [85, 75, 90, 80, 88],
        backgroundColor: "rgba(113, 201, 70, 0.2)",
        borderColor: "#71C946",
        pointBackgroundColor: "#71C946",
      },
    ],
  };

  const requisitionData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        data: [20, 10, 5],
        backgroundColor: ["#71C946", "#FFC107", "#FF0000"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">


      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard title="Procurement Overview">
            <Bar data={procurementData} options={{ responsive: true }} />
          </DashboardCard>
          <DashboardCard title="Financial Summary">
            <Doughnut data={financialData} options={{ responsive: true }} />
          </DashboardCard>
          <DashboardCard title="Inventory Stock Levels">
            <Bar data={inventoryData} options={{ responsive: true }} />
          </DashboardCard>
          <DashboardCard title="Employee Performance">
            <Radar
              data={employeePerformanceData}
              options={{ responsive: true }}
            />
          </DashboardCard>
          <DashboardCard title="Requisition Status">
            <Doughnut data={requisitionData} options={{ responsive: true }} />
          </DashboardCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ModuleCard title="Procurement" icon="🛒" color="bg-white">
            <p className="font-semibold">
              New Purchase Orders: <span className="text-blue-600">5</span>
            </p>
            <p className="font-semibold">
              Pending Requisitions: <span className="text-yellow-600">3</span>
            </p>
            <p className="font-semibold">
              Critical Inventory Alerts: <span className="text-red-600">2</span>
            </p>
          </ModuleCard>
          <ModuleCard title="Operations" icon="⚙️" color="bg-white">
            <p className="font-semibold">
              Active Tasks: <span className="text-blue-600">15</span>
            </p>
            <p className="font-semibold">
              Open Issues: <span className="text-orange-600">7</span>
            </p>
            <p className="font-semibold">
              Budget Status: <span className="text-green-600">On Track</span>
            </p>
          </ModuleCard>
          <ModuleCard title="Resource Management" icon="👥" color="bg-white">
            <p className="font-semibold">
              Employee Utilization: <span className="text-green-600">85%</span>
            </p>
            <p className="font-semibold">
              Equipment Status:{" "}
              <span className="text-green-600">95% operational</span>
            </p>
          </ModuleCard>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Real-Time Notifications
          </h2>
          <ul className="space-y-2">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="p-3 bg-gray-100 rounded-md shadow-sm flex items-center"
              >
                <span className="mr-2">🔔</span>
                <span className="flex-grow">{notification}</span>
                <button className="text-gray-500 hover:text-red-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>

    </div>
  );
};

const DashboardCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="bg-white rounded-lg shadow-lg p-4 transition-all duration-300 hover:shadow-xl">
    <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
    {children}
  </div>
);

const ModuleCard: React.FC<{
  title: string;
  icon: string;
  color: string;
  children: React.ReactNode;
}> = ({ title, icon, color, children }) => (
  <div
    className={`${color} rounded-lg shadow-lg p-4 transition-all duration-300 hover:shadow-xl`}
  >
    <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
      <span className="mr-2 text-2xl">{icon}</span>
      {title}
    </h2>
    {children}
  </div>
);

export default Dashboard;
