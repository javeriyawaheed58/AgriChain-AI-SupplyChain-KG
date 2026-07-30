import React, { useState } from 'react';
import { 
  LayoutDashboard, MessageSquareCode, GitMerge, Share2, 
  Settings, ChevronLeft, ChevronRight, ShieldCheck, User, X, Sun, Moon, CheckCircle2
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, theme, setTheme }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chat', label: 'NL Query Chat', icon: MessageSquareCode, badge: 'AI' },
    { id: 'traceability', label: 'Traceability Engine', icon: GitMerge },
    { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Share2 },
  ];

  const isDark = theme === 'dark';

  return (
    <aside className={`relative h-screen transition-all duration-300 z-30 select-none flex flex-col justify-between border-r ${
      isDark ? 'bg-slate-950 text-slate-300 border-slate-800' : 'bg-slate-900 text-slate-200 border-slate-800'
    } ${collapsed ? 'w-20' : 'w-64'}`}>
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm">AgriChain AI</span>
                <span className="text-[10px] text-emerald-400 font-mono">Enterprise Portal</span>
              </div>
            </div>
          ) : (
            <div className="w-9 h-9 mx-auto rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
          )}

          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition ${
                  isActive ? 'bg-emerald-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
                {!collapsed && item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded font-mono">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <button 
          onClick={() => setShowSettings(true)} 
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-sm transition cursor-pointer"
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Portal Settings</span>}
        </button>

        <div className="pt-2 border-t border-slate-800 flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white shrink-0 font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold text-slate-200 truncate">Supply Chain Admin</span>
              <span className="text-[10px] text-slate-400 truncate">admin@agrichain.ai</span>
            </div>
          )}
        </div>
      </div>

      {/* Instant Auto-Apply Theme Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 text-slate-800">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl space-y-5 transition-all text-slate-100 relative">
            <div className="flex justify-between items-center border-b pb-3 border-slate-800">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-slate-100 text-base">Appearance Settings</h3>
              </div>
              <button onClick={() => setShowSettings(false)} className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="font-semibold block text-xs text-slate-300">Select Theme Mode</label>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Light Theme Card */}
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 font-semibold text-xs transition duration-200 cursor-pointer ${
                    theme === 'light'
                      ? 'border-emerald-500 bg-emerald-950/50 text-emerald-400 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-emerald-500/50'
                  }`}
                >
                  <Sun className={`w-5 h-5 ${theme === 'light' ? 'text-emerald-400' : 'text-amber-500'}`} />
                  <span>Light Theme</span>
                  {theme === 'light' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </button>

                {/* Dark Theme Card */}
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 font-semibold text-xs transition duration-200 cursor-pointer ${
                    theme === 'dark'
                      ? 'border-emerald-500 bg-slate-800 text-emerald-400 shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-emerald-500/50'
                  }`}
                >
                  <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-emerald-400' : 'text-indigo-400'}`} />
                  <span>Dark Theme</span>
                  {theme === 'dark' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;