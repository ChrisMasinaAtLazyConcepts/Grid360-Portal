import React, { useState } from 'react';
import { FiSearch, FiX, FiCalendar, FiUser, FiAlertCircle, FiFilter } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CarIcon } from 'lucide-react';

const Search = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  // Mock data - replace with real API calls
  const mockResults = [
    {
      id: 1,
      type: 'person',
      name: 'John Doe',
      thumbnail: '/thumbnails/person1.jpg',
      timestamp: '2023-06-15T14:30:00',
      cameraLocation: 'Zone 5, Metsimaholo',
      status: 'active'
    },
    {
      id: 2,
      type: 'vehicle',
      license: 'ABC 123 GP',
      thumbnail: '/thumbnails/vehicle1.jpg',
      timestamp: '2023-06-14T09:15:00',
      cameraLocation: 'Zone 2, Metsimaholo',
      status: 'safe'
    },
    {
      id: 3,
      type: 'alert',
      description: 'Suspicious package',
      thumbnail: '/thumbnails/alert1.jpg',
      timestamp: '2023-06-13T16:45:00',
      cameraLocation: 'Zone 1, Metsimaholo',
      status: 'assigned',
      assignedTo: 'You'
    },
  ];

  // Filter results based on search criteria
  const filteredResults = mockResults.filter(item => {
    const matchesSearch = searchTerm === '' || 
      (item.type === 'person' && item.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.type === 'vehicle' && item.license?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.type === 'alert' && item.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const itemDate = new Date(item.timestamp).getTime();
    const from = fromDate ? new Date(fromDate).getTime() : null;
    const to = toDate ? new Date(toDate).getTime() : null;

    const matchesDate = (!from || itemDate >= from) && 
                    (!to || itemDate <= to);
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'assigned' && item.status === 'assigned' && item.assignedTo === 'You');
    
    const matchesType = searchType === 'all' || item.type === searchType;
    
    return matchesSearch && matchesDate && matchesTab && matchesType;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">In-Video Search</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>
        
        {/* Search Controls */}
        <div className="p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search persons, vehicles, or alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="person">Person of Interest</option>
                  <option value="vehicle">Vehicle of Interest</option>
                  <option value="alert">Alerts</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FiFilter className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
     <div className="flex items-center space-x-2">
        <FiCalendar className="text-gray-400" />
        <DatePicker
            selected={fromDate || new Date()} // Provide a default date if fromDate is null/undefined
            selectsStart
            startDate={fromDate}
            endDate={toDate}
            placeholderText="From date"
            className="border rounded-md p-2 text-sm"
            dateFormat="yyyy-MM-dd" // Optional: Specify the date format
        />
        </div>
            
            <div className="flex items-center space-x-2">
              <FiCalendar className="text-gray-400" />
             <DatePicker
                selected={toDate}
                startDate={fromDate}
                endDate={toDate}
                placeholderText="To date"
                className="border rounded-md p-2 text-sm"
                />
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('all')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'all' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              All Results
            </button>
            <button
              onClick={() => setActiveTab('assigned')}
              className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${activeTab === 'assigned' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Assigned to Me
            </button>
          </nav>
        </div>
        
        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredResults.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No results found. Try adjusting your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={item.thumbnail} 
                      alt={item.type === 'person' ? item.name : item.type === 'vehicle' ? item.license : item.description}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                    <div className="absolute top-2 right-2">
                      {item.type === 'person' && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center">
                          <FiUser className="mr-1" /> POI
                        </span>
                      )}
                      {item.type === 'vehicle' && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center">
                          <CarIcon className="mr-1" /> VOI
                        </span>
                      )}
                      {item.type === 'alert' && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded flex items-center">
                          <FiAlertCircle className="mr-1" /> Alert
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">
                      {item.type === 'person' && item.name}
                      {item.type === 'vehicle' && `Vehicle: ${item.license}`}
                      {item.type === 'alert' && item.description}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{item.cameraLocation}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.status === 'active' ? 'bg-yellow-100 text-yellow-800' :
                        item.status === 'safe' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status === 'assigned' ? 'Assigned to you' : item.status}
                      </span>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="border-t px-6 py-3 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </div>
  );
};

// Usage in your Header component:
const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {/* ... other header code ... */}
      <button 
        onClick={() => setShowSearch(true)}
        className="menu-item flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
      >
        <FiSearch className="menu-icon w-5 h-5" />
        <span>Search</span>
      </button>
      
      {showSearch && <Search onClose={() => setShowSearch(false)} />}
    </>
  );
};

export default Search;