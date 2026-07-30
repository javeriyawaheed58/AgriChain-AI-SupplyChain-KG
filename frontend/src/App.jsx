import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Chat from './pages/Chat';
import Dashboard from './pages/Dashboard';
import KnowledgeGraph from './pages/KnowledgeGraph';
import Traceability from './pages/Traceability';

function App() {
  const [activeTab, setActiveTab] = useState('traceability');
  const [globalQuery, setGlobalQuery] = useState('');
  const [theme, setTheme] = useState('dark');

  const handleGlobalSearch = (query) => {
    setGlobalQuery(query);
    setActiveTab('chat');
  };

  const isDark = theme === 'dark';

  return (
    <div className={`flex h-screen font-sans overflow-hidden transition-colors duration-200 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        theme={theme}
        setTheme={setTheme}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header activeTab={activeTab} onSearch={handleGlobalSearch} theme={theme} />
        
        <main className={`flex-1 overflow-y-auto transition-colors duration-200 ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
          {activeTab === 'dashboard' && (
            <Dashboard onNavigateToChat={() => setActiveTab('chat')} theme={theme} />
          )}
          {activeTab === 'chat' && (
            <Chat initialQuery={globalQuery} theme={theme} />
          )}
          {activeTab === 'knowledge-graph' && (
            <KnowledgeGraph theme={theme} />
          )}
          {activeTab === 'traceability' && (
            <Traceability theme={theme} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;