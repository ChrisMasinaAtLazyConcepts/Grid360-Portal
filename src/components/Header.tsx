import React, { useEffect, useState } from 'react';
import { Shield, LogOut, Bell, Settings, HomeIcon, UserIcon, SettingsIcon, CarIcon, Search, GitGraphIcon, BellIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { FiHome, FiSearch, FiBell, FiInfo, FiX, FiMenu } from 'react-icons/fi';
import Dashboard from './dashboard/Dashboard';
import Modal from 'react-modal';
import Patrols from './patrols/Patrols';
import useAlertStore from './store/AlertStore';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [mode, setMode] = useState<'Standby' | 'Patrol'>('Standby');
  const [showDashboard, setShowDashboard] = useState(false); 
  const [showSearch, setShowSearch] = useState(false); 
  

  const handleDashboardOpen = () => {
    setShowDashboard(true);
  };

  const handleDashboardClose = () => {
    setShowDashboard(false);
  };

  const handleSearchOpen = () => {
    setShowSearch(true);
  };

  const handleSearchClose = () => {
    setShowSearch(false);
  };

   const handlePatrolClose = () => {
    setShowSearch(false);
  };

  const toggleMode = () => {
    setMode(prevMode => prevMode === 'Standby' ? 'Patrol' : 'Standby');
    toggleMode();
  };
  
  const camerasWithActiveDetections = useAlertStore(
    (state) => state.camerasWithDetections.length
  );

  return (
    <header className="bg-blue-850 backdrop-blur-md border-b border-gray-700 px-6 py-4">
      
      <div className="flex items-center justify-between">
        {/* Left side - Logo and version */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img
              src="/assets/saps.JPG"
              alt="SAPS Logo"
              className="w-10 h-10 object-contain rounded-sm mx-auto"
            />
            <h1 className="text-2xl font-bold text-white">SAPS <span className="text-blue-400 font-normal">360</span></h1>
          </div>
        </div>

        {/* Center - Navigation and mode switch */}
        <div className="relative left-[2%] flex items-left text-sm">
          <nav className="hidden md:flex justify-between items-center space-x-8">
            {/* Left-aligned items */}
            <div className="flex space-x-6">
                <button 
                  onClick={handleDashboardOpen}
                  className="menu-item flex space-x-1 text-gray-300 hover:text-white transition-colors"
                >
                  <GitGraphIcon className="menu-icon w-5 h-5" />
                  <span>Dashboard</span>
                </button>
                <button 
                 onClick={handleSearchOpen}
                  className="menu-item flex space-x-1 text-gray-300 hover:text-white transition-colors"
                >
                  <FiSearch className="menu-icon w-5 h-5" />
                  <span>Search</span>
                </button>
              <a className="menu-item flex items-center space-x-1 text-gray-300 hover:text-white transition-colors relative">
                <BellIcon className="menu-icon w-5 h-5" />
                <span>Alerts</span>
                {/* Counter badge - only shows if count > 0 */}
                {camerasWithActiveDetections > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-800 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {camerasWithActiveDetections}
                  </span>
                )}
              </a>
             <a  className="menu-item flex items-center space-x-1 text-gray-300 hover:text-white transition-colors relative">
              <CarIcon className="menu-icon w-5 h-5" />
              <span>Patrol</span>
              {/* Green counter badge */}
              <span className="absolute -top-2 -right-4 bg-red-800 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </a>
              <a  className="menu-item flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
                <SettingsIcon className="menu-icon w-5 h-5" />
                <span>Settings</span>
              </a>
            </div>

            {/* Mode Switch */}
            <div className="flex items-center space-x-2 mx-4">
              <span className="text-gray-300 text-sm">Mode:</span>
              <button
                onClick={toggleMode}
                className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none ${
                  mode === 'Patrol' ? 'bg-blue-500' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 transform transition-transform rounded-full bg-white ${
                    mode === 'Patrol' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
                <span className="sr-only">Toggle mode</span>
              </button>
              <span className={`text-sm font-medium ${
                mode === 'Patrol' ? 'text-blue-400' : 'text-gray-400'
              }`}>
                {mode}
              </span>
            </div>

            {/* Right-aligned items */}
            <div className="flex space-x-6">
             
            </div>
          </nav>
        </div>

        {/* Right side - User controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-white text-sm font-medium">Captain Premchandt</div>
              <div className="text-gray-400 text-xs">Badge Number: <span className="text-gray-200">SAPS-001</span></div>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
       
      </div>
      <Modal
        isOpen={showDashboard}
        onRequestClose={handleDashboardClose}
        contentLabel="Dashboard Modal"
      >
        <Dashboard />
        <button onClick={handleDashboardClose}>Close</button>
      </Modal>

      <Modal
        isOpen={showSearch}
        onRequestClose={handleSearchClose}
        contentLabel="Search Modal"
      >
        <Search />
        <button onClick={handleSearchClose}>Close</button>
      </Modal>
      <Modal
        isOpen={showSearch}
        onRequestClose={handlePatrolClose}
        contentLabel="Patrols Modal"
      >
        <Patrols />
        <button onClick={handlePatrolClose}>Close</button>
      </Modal>
      
    </header>
  );
};

export default Header;