import React, { useState, useEffect } from 'react';
import { Search, Bell, Activity, X, Settings } from 'lucide-react';

const Header = ({ activeTab, onSearch }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
      {/* Title */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
          <span>Portal</span>
          <span>/</span>
          <span className="text-emerald-600 font-semibold capitalize">{activeTab}</span>
        </div>
        <h1 className="text-sm font-bold text-slate-800 tracking-wide">
          {activeTab === 'dashboard' ? 'Analytics & Intelligence Dashboard' : 'Natural Language Knowledge Search'}
        </h1>
      </div>

      {/* Global Functional Search Bar */}
      <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center gap-2 bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-xl w-80 focus-within:border-emerald-500 focus-within:bg-white transition">
        <Search className="w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type search & press Enter (e.g. farm, batch)..." 
          className="bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none w-full"
        />
      </form>

      {/* Right Controls */}
      <div className="flex items-center gap-4 relative">
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span className="text-xs font-mono font-medium text-emerald-700">System Online</span>
        </div>

        <div className="hidden sm:block text-xs font-mono text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
          {time}
        </div>

        {/* Notifications Popover Toggle */}
        <button 
          onClick={() => setShowNotifs(!showNotifs)}
          className="relative p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </button>

        {/* Notifications Modal */}
        {showNotifs && (
          <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 text-xs">
            <div className="flex justify-between items-center border-b pb-2 font-bold text-slate-800">
              <span>System Notifications</span>
              <button onClick={() => setShowNotifs(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <div className="mt-3 space-y-2">
              <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100">
                <p className="font-semibold">BATCH-101 Verified</p>
                <p className="text-[10px] text-emerald-600">Harvest date verified in graph database.</p>
              </div>
              <div className="p-2 bg-slate-50 text-slate-700 rounded-lg border border-slate-200">
                <p className="font-semibold">SHP-2001 Status Update</p>
                <p className="text-[10px] text-slate-500">Delivered successfully by FastLogistics.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;