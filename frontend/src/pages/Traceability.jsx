import React, { useState } from 'react';
import { GitMerge, Package, Truck, Tag, CheckCircle2, MapPin, Calendar, Clock } from 'lucide-react';

const Traceability = ({ theme }) => {
  const isDark = theme === 'dark';
  const [selectedBatch, setSelectedBatch] = useState('BATCH-101');

  const traceabilityData = {
    'BATCH-101': {
      product: 'Fresh Mangoes',
      qty: '500 kg',
      farm: 'Green Valley Farm',
      location: 'Punjab, Pakistan',
      harvestDate: '2026-06-15',
      carrier: 'FastLogistics',
      shipmentId: 'SHP-2001',
      status: 'Delivered',
      steps: [
        { title: 'Harvested at Origin', location: 'Green Valley Farm, Punjab', date: '2026-06-15', status: 'Completed', icon: Tag },
        { title: 'Batching & Quality Audit', location: 'Processing Hub Alpha', date: '2026-06-16', status: 'Completed', icon: Package },
        { title: 'In-Transit Transport', location: 'FastLogistics Carrier (SHP-2001)', date: '2026-06-18', status: 'Completed', icon: Truck },
        { title: 'Final Destination Delivery', location: 'Distribution Warehouse B', date: '2026-06-20', status: 'Completed', icon: CheckCircle2 }
      ]
    },
    'BATCH-102': {
      product: 'Red Apples',
      qty: '1000 kg',
      farm: 'Organic Orchard',
      location: 'KPK, Pakistan',
      harvestDate: '2026-07-01',
      carrier: 'ColdChain Express',
      shipmentId: 'SHP-2002',
      status: 'In Transit',
      steps: [
        { title: 'Harvested at Origin', location: 'Organic Orchard, KPK', date: '2026-07-01', status: 'Completed', icon: Tag },
        { title: 'Batching & Quality Audit', location: 'Processing Hub Beta', date: '2026-07-02', status: 'Completed', icon: Package },
        { title: 'In-Transit Cold Chain', location: 'ColdChain Express (SHP-2002)', date: '2026-07-04', status: 'Active', icon: Truck },
        { title: 'Final Destination Delivery', location: 'Retail Outlet C', date: 'Pending', status: 'Pending', icon: Clock }
      ]
    }
  };

  const activeData = traceabilityData[selectedBatch];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 select-none">
      {/* Top Header & Batch Selector */}
      <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
            <GitMerge className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-sm">Batch Traceability Lifecycle</h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Track origin, handling steps, and shipment trail in real-time.
            </p>
          </div>
        </div>

        {/* Batch Select Buttons */}
        <div className="flex items-center gap-2">
          {Object.keys(traceabilityData).map((bId) => (
            <button
              key={bId}
              onClick={() => setSelectedBatch(bId)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold transition ${
                selectedBatch === bId
                  ? 'bg-emerald-600 text-white shadow-md'
                  : isDark ? 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white' : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              {bId}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Card */}
      <div className={`p-5 rounded-2xl border grid grid-cols-1 md:grid-cols-4 gap-4 text-xs ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
      }`}>
        <div>
          <span className={`block mb-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Product Details</span>
          <p className="font-bold text-sm text-emerald-600 dark:text-emerald-500">{activeData.product}</p>
          <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Qty: {activeData.qty}</span>
        </div>
        <div>
          <span className={`block mb-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Source Farm</span>
          <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{activeData.farm}</p>
          <span className={`text-[11px] flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <MapPin className="w-3 h-3 text-slate-400" /> {activeData.location}
          </span>
        </div>
        <div>
          <span className={`block mb-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Carrier Logistics</span>
          <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{activeData.carrier}</p>
          <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{activeData.shipmentId}</span>
        </div>
        <div>
          <span className={`block mb-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Current Status</span>
          <span className={`inline-block px-2.5 py-1 rounded-full font-semibold text-[11px] ${
            activeData.status === 'Delivered' 
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
          }`}>
            {activeData.status}
          </span>
        </div>
      </div>

      {/* Visual Timeline Stepper */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-6">
          End-to-End Audit Trail
        </h3>

        <div className="relative pl-6 border-l-2 border-emerald-500/30 space-y-8">
          {activeData.steps.map((step, idx) => {
            const Icon = step.icon;
            const isDone = step.status === 'Completed';
            const isActive = step.status === 'Active';

            return (
              <div key={idx} className="relative group">
                {/* Step Marker Dot */}
                <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isDone 
                    ? 'bg-emerald-600 text-white ring-4 ' + (isDark ? 'ring-slate-900' : 'ring-white')
                    : isActive 
                      ? 'bg-amber-500 text-white ring-4 animate-pulse ' + (isDark ? 'ring-slate-900' : 'ring-white')
                      : 'bg-slate-300 dark:bg-slate-800 text-slate-500 ring-4 ' + (isDark ? 'ring-slate-900' : 'ring-white')
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Audit Card */}
                <div className={`p-4 rounded-xl border text-xs space-y-1 transition ${
                  isDark 
                    ? 'bg-slate-950 border-slate-800 text-slate-100' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 shadow-xs'
                }`}>
                  <div className="flex justify-between items-center">
                    {/* Fixed Heading Contrast */}
                    <h4 className={`font-bold text-sm ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                      {step.title}
                    </h4>
                    <span className={`font-mono flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      <Calendar className="w-3 h-3 text-slate-400" /> {step.date}
                    </span>
                  </div>
                  <p className={`flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> {step.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Traceability;