import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FiInfo, FiDownload } from 'react-icons/fi';

interface DemographicDataItem {
  name: string;
  value: number;
}

// In your component
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
const demographicData: DemographicDataItem[] = [
  { name: 'Male', value: 58 },
  { name: 'Female', value: 42 },
  { name: 'Children', value: 15 },
];

const Dashboard = () => {
  // People counting data
  const [peopleData] = useState([
    { date: 'Mon', visitors: 1240 },
    { date: 'Tue', visitors: 1890 },
    { date: 'Wed', visitors: 2100 },
    { date: 'Thu', visitors: 1780 },
    { date: 'Fri', visitors: 2450 },
    { date: 'Sat', visitors: 3120 },
    { date: 'Sun', visitors: 2870 },
  ]);

  // Demographic data
  const [demographicData] = useState([
    { name: 'Male', value: 58 },
    { name: 'Female', value: 42 },
    { name: 'Children', value: 15 },
  ]);

  // Vehicle tracking data
  const [vehicleData] = useState([
    { time: '6-9 AM', cars: 420 },
    { time: '9-12 PM', cars: 780 },
    { time: '12-3 PM', cars: 650 },
    { time: '3-6 PM', cars: 920 },
    { time: '6-9 PM', cars: 540 },
    { time: '9-12 AM', cars: 210 },
  ]);

  // Monthly trends
  const [monthlyTrends] = useState([
    { month: 'Jan', visitors: 58200, vehicles: 12400 },
    { month: 'Feb', visitors: 61200, vehicles: 13200 },
    { month: 'Mar', visitors: 65400, vehicles: 14100 },
    { month: 'Apr', visitors: 69800, vehicles: 15200 },
    { month: 'May', visitors: 72300, vehicles: 16700 },
    { month: 'Jun', visitors: 78900, vehicles: 18200 },
  ]);

  // Parking utilization
  const [parkingData] = useState([
    { zone: 'A', capacity: 120, used: 92 },
    { zone: 'B', capacity: 80, used: 78 },
    { zone: 'C', capacity: 150, used: 102 },
    { zone: 'D', capacity: 200, used: 187 },
  ]);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Export to Excel
  const exportToExcel = () => {
    console.log("Export to Excel functionality would go here");
  };

  // Calculate totals
  const weeklyVisitors = peopleData.reduce((sum, day) => sum + day.visitors, 0);
  const monthlyVisitors = monthlyTrends[monthlyTrends.length - 1].visitors;
  const avgVehicles = Math.round(vehicleData.reduce((sum, t) => sum + t.cars, 0) / vehicleData.length);
  const parkingUtilization = Math.round(
    (parkingData.reduce((sum, zone) => sum + zone.used, 0) / 
    parkingData.reduce((sum, zone) => sum + zone.capacity, 0) * 100
  ));
  const peakHour = vehicleData.reduce((max, t) => t.cars > max.cars ? t : max, vehicleData[0]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Grid 360 Analytics Dashboard</h1>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiDownload /> Export Data
          </button>
        </div>

        {/* Info Note */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
          <div className="flex items-start">
            <FiInfo className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              AI-powered insights for optimized premises management. Real-time analytics combined with 
              historical patterns to enhance visitor experience and operational efficiency.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Weekly Visitors</h3>
            <p className="text-2xl font-bold">{weeklyVisitors.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Monthly Visitors</h3>
            <p className="text-2xl font-bold text-green-600">{monthlyVisitors.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Avg. Vehicles/Day</h3>
            <p className="text-2xl font-bold text-blue-600">{avgVehicles.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Parking Utilization</h3>
            <p className="text-2xl font-bold text-purple-600">{parkingUtilization}%</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Visitor Trends */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Weekly Visitor Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={peopleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="visitors" fill="#8884d8" name="Visitors" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Demographic Analysis */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Visitor Demographics</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                <Pie
                  data={demographicData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }: any) => 
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {demographicData.map((entry, index) => (
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

        {/* Second Row of Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Vehicle Tracking */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Vehicle Traffic Patterns</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vehicleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cars" fill="#00C49F" name="Vehicles" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Monthly Visitor & Vehicle Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="visitors" stroke="#8884d8" name="Visitors" />
                  <Line type="monotone" dataKey="vehicles" stroke="#82ca9d" name="Vehicles" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Parking Management */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Parking Utilization Analysis</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={parkingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="capacity" fill="#8884d8" name="Capacity" />
                <Bar dataKey="used" fill="#82ca9d" name="Utilized" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actionable Insights */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">AI-Generated Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-medium text-gray-800">Peak Hours Analysis</h3>
              <p className="text-sm text-gray-600">
                Saturday between 3-6 PM has the highest visitor traffic. Consider adding staff during this period.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-medium text-gray-800">Parking Optimization</h3>
              <p className="text-sm text-gray-600">
                Zone D is consistently at 94% capacity. Recommend expanding parking in this zone.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="font-medium text-gray-800">Demographic Opportunities</h3>
              <p className="text-sm text-gray-600">
                Female visitors represent 42% of traffic. Consider adding female-focused retail options.
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <h3 className="font-medium text-gray-800">Staffing Recommendations</h3>
              <p className="text-sm text-gray-600">
                Increase security staff on Fridays when vehicle traffic peaks at 920 cars.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;