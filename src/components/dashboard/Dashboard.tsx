import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import * as XLSX from 'xlsx';
import { FiInfo, FiDownload } from 'react-icons/fi';
import { PieLabelProps } from 'recharts/types/polar/Pie';

const Dashboard = () => {
  // Mock data for alerts
  const [alertData, setAlertData] = useState([
    { date: '2023-06-01', total: 12, safe: 8, actioned: 3, dispatched: 1, assigned: 0 },
    { date: '2023-06-02', total: 15, safe: 9, actioned: 4, dispatched: 2, assigned: 0 },
    { date: '2023-06-03', total: 8, safe: 5, actioned: 2, dispatched: 1, assigned: 0 },
    { date: '2023-06-04', total: 18, safe: 12, actioned: 4, dispatched: 2, assigned: 0 },
    { date: '2023-06-05', total: 14, safe: 9, actioned: 3, dispatched: 2, assigned: 0 },
    { date: '2023-06-06', total: 22, safe: 15, actioned: 5, dispatched: 2, assigned: 0 },
  ]);

  // Mock data for crime by area
  const [crimeData, setCrimeData] = useState([
    { name: 'Zone 1', cases: 24 },
    { name: 'Zone 2', cases: 18 },
    { name: 'Zone 3', cases: 32 },
    { name: 'Zone 4', cases: 12 },
    { name: 'Zone 5', cases: 28 },
  ]);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Export to Excel
  const exportToExcel = () => {
    // const worksheet1 = XLSX.utils.json_to_sheet(alertData);
    // const worksheet2 = XLSX.utils.json_to_sheet(crimeData);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet1, "Alerts");
    // XLSX.utils.book_append_sheet(workbook, worksheet2, "CrimeByArea");
    // XLSX.writeFile(workbook, "SAPS_Dashboard_Data.xlsx");
  };

  // Calculate totals
  const totalAlerts = alertData.reduce((sum, day) => sum + day.total, 0);
  const totalSafe = alertData.reduce((sum, day) => sum + day.safe, 0);
  const totalActioned = alertData.reduce((sum, day) => sum + day.actioned, 0);
  const totalDispatched = alertData.reduce((sum, day) => sum + day.dispatched, 0);
  const totalAssigned = alertData.reduce((sum, day) => sum + day.assigned, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">SAPS 360 Dashboard</h1>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiDownload /> Export to Excel
          </button>
        </div>

        {/* Info Note */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
          <div className="flex items-start">
            <FiInfo className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              This data is analyzed by our AI system to determine suggested patrol routes and resource allocation for officers. 
              Historical patterns and real-time data are combined to optimize police presence in high-risk areas.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Alerts</h3>
            <p className="text-2xl font-bold">{totalAlerts}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Marked Safe</h3>
            <p className="text-2xl font-bold text-green-600">{totalSafe}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Actioned</h3>
            <p className="text-2xl font-bold text-yellow-600">{totalActioned}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Dispatched</h3>
            <p className="text-2xl font-bold text-blue-600">{totalDispatched}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Assigned to Me</h3>
            <p className="text-2xl font-bold text-purple-600">{totalAssigned}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Alerts Over Time */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Alerts This Month</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={alertData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#8884d8" name="Total Alerts" />
                  <Bar dataKey="safe" fill="#82ca9d" name="Marked Safe" />
                  <Bar dataKey="actioned" fill="#ffc658" name="Actioned" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Crime by Area */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Crime Reports in Metsimaholo (10111 Data)</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={crimeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="cases"
                    nameKey="name"
                   label={({ name, percent }: PieLabelProps) => `${name}: ${(percent as number * 100).toFixed(0)}%`}
                  >
                    {crimeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Additional Statistics */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Response Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-gray-500 text-sm mb-2">Average Response Time</h3>
              <p className="text-xl font-bold">24 minutes</p>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm mb-2">Most Active Zone</h3>
              <p className="text-xl font-bold">Zone 3 (32 cases)</p>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm mb-2">Cases Cleared</h3>
              <p className="text-xl font-bold text-green-600">78% clearance rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;