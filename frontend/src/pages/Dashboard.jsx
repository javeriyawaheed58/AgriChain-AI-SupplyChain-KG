import React from 'react';
import { Package, Truck, Tag, ShieldCheck, ArrowUpRight, TrendingUp, Sparkles, CheckCircle } from 'lucide-react';

const Dashboard = ({ onNavigateToChat }) => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-md flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-xl font-bold">Supply Chain Knowledge Portal</h2>
          <p className="text-xs text-emerald-100">Graph database active with 2 Farms, 2 Batches, and 2 Shipments registered.</p>
        </div>
        <button 
          onClick={onNavigateToChat}
          className="bg-white text-emerald-800 hover:bg-emerald-50 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow transition"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" /> Ask AI Query Engine
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold uppercase">Registered Farms</span>
            <Tag className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">2</p>
          <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium"><TrendingUp className="w-3 h-3" /> Punjab & KPK Active</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold uppercase">Active Batches</span>
            <Package className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">2</p>
          <p className="text-[11px] text-slate-500">1,500 kg Total Inventory</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold uppercase">Shipments</span>
            <Truck className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">2</p>
          <p className="text-[11px] text-blue-600 font-medium">1 Delivered, 1 In Transit</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold uppercase">Quality Audits</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">100%</p>
          <p className="text-[11px] text-emerald-600 font-medium">Pass Rate Verified</p>
        </div>
      </div>

      {/* Activity & Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 text-sm">Recent Supply Chain Events</h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-slate-700">Green Valley Farm produced BATCH-101</span>
              </div>
              <span className="text-slate-400 font-mono">2026-06-15</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-slate-700">SHP-2001 Delivered by FastLogistics</span>
              </div>
              <span className="text-slate-400 font-mono">Delivered</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 text-sm">AI Recommendation Engine</h3>
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs space-y-2 text-emerald-900">
            <p className="font-bold flex items-center gap-1.5 text-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-600" /> Optimal Route Verified
            </p>
            <p className="leading-relaxed text-emerald-700">
              ColdChain Express logistics is currently maintaining temperature threshold for Red Apples (BATCH-102).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;