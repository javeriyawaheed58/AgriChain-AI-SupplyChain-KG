import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ForceGraph2D from 'react-force-graph-2d';
import { 
  Send, Bot, User, Sparkles, MapPin, Package, Tag, Copy, Download, Bookmark, CheckCircle2, Cpu, Share2
} from 'lucide-react';

// Mini Graph Component Rendered inside Chat Responses
const InlineGraph = ({ results, isDark }) => {
  const fgRef = useRef();

  const nodes = [];
  const links = [];

  results.forEach((item) => {
    const farmObj = item.farm || item.f;
    const batchObj = item.batch || item.b;
    const shipmentObj = item.shipment || item.s;

    if (farmObj) {
      const fId = farmObj.name || farmObj.id;
      if (!nodes.find(n => n.id === fId)) {
        nodes.push({ id: fId, color: '#10b981', group: 'Farm' });
      }
    }
    if (batchObj) {
      const bId = batchObj.id || batchObj.product;
      if (!nodes.find(n => n.id === bId)) {
        nodes.push({ id: bId, color: '#3b82f6', group: 'Batch' });
      }
      if (farmObj) {
        const fId = farmObj.name || farmObj.id;
        links.push({ source: fId, target: bId, label: 'PRODUCED' });
      }
    }
    if (shipmentObj) {
      const sId = shipmentObj.id || shipmentObj.carrier;
      if (!nodes.find(n => n.id === sId)) {
        nodes.push({ id: sId, color: '#f59e0b', group: 'Shipment' });
      }
      if (batchObj) {
        const bId = batchObj.id || batchObj.product;
        links.push({ source: bId, target: sId, label: 'SHIPPED_VIA' });
      }
    }
  });

  useEffect(() => {
    if (fgRef.current) {
      setTimeout(() => fgRef.current.zoomToFit(300, 30), 200);
    }
  }, [nodes]);

  if (nodes.length === 0) return null;

  return (
    <div className={`mt-3 p-3 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-500 mb-2">
        <Share2 className="w-3.5 h-3.5" /> Connected Knowledge Graph Trace
      </div>
      <div className="h-44 w-full rounded-lg overflow-hidden relative">
        <ForceGraph2D
          ref={fgRef}
          graphData={{ nodes, links }}
          nodeColor={n => n.color}
          nodeRelSize={5}
          linkDirectionalParticles={2}
          cooldownTicks={80}
          onEngineStop={() => fgRef.current && fgRef.current.zoomToFit(300, 30)}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 10 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.fillStyle = node.color;
            ctx.beginPath();
            ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
            ctx.fill();

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
            ctx.fillText(label, node.x, node.y + 11);
          }}
        />
      </div>
    </div>
  );
};

const Chat = ({ initialQuery = '', theme }) => {
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [showTechnical, setShowTechnical] = useState({});
  const [toast, setToast] = useState('');

  const isDark = theme === 'dark';

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleSendMessage = async (userText) => {
    if (!userText.trim()) return;

    setInputQuery('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/query', {
        question: userText,
        entity_context: 'None',
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: response.data?.results && response.data.results.length > 0
            ? `Retrieved ${response.data.count || response.data.results.length} record(s) matching your query.`
            : 'No matching records found in knowledge graph.',
          cypher: response.data?.generated_cypher,
          results: response.data?.results,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Error connecting to knowledge graph server.', error: true }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-100px)] p-4 relative">
      {toast && (
        <div className="absolute top-2 right-4 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs shadow-lg z-50 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {toast}
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
            <Sparkles className="w-10 h-10 text-emerald-500 animate-bounce" />
            <p className="text-sm font-medium">Ask any question about defective stock, farms, or batches...</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
            )}

            <div className={`max-w-[85%] space-y-1.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl p-4 text-xs leading-relaxed border ${
                msg.sender === 'user' 
                  ? 'bg-slate-900 text-white border-slate-800' 
                  : isDark 
                    ? 'bg-slate-900 border-slate-800 text-slate-100' 
                    : 'bg-white border-slate-200 text-slate-800 shadow-sm'
              }`}>
                <p className="font-semibold text-sm">{msg.text}</p>

                {msg.cypher && (
                  <div className="mt-2 border-t border-slate-800/20 pt-2">
                    <button onClick={() => setShowTechnical(prev => ({...prev, [index]: !prev[index]}))} className="text-[11px] text-slate-400 hover:text-emerald-500 flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                      {showTechnical[index] ? 'Hide Query' : 'View Generated Cypher Query'}
                    </button>

                    {showTechnical[index] && (
                      <div className="mt-2 p-2.5 bg-slate-950 text-emerald-400 rounded-xl font-mono text-[11px]">
                        {msg.cypher}
                      </div>
                    )}
                  </div>
                )}

                {msg.results && msg.results.length > 0 && (
                  <div className="mt-3 space-y-2.5">
                    {msg.results.map((item, rIdx) => {
                      const farmObj = item.farm || item.f;
                      const batchObj = item.batch || item.b;

                      return (
                        <div key={rIdx} className={`p-3 rounded-xl border space-y-2 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                          {farmObj && (
                            <div className="flex items-center justify-between border-b pb-2 border-slate-800/20">
                              <span className="font-bold flex items-center gap-1.5">
                                <Tag className="w-4 h-4 text-emerald-500" /> {farmObj.name || farmObj.id}
                              </span>
                              {farmObj.location && <span className="text-slate-400">{farmObj.location}</span>}
                            </div>
                          )}
                          {batchObj && (
                            <div className={`flex justify-between items-center p-2 rounded border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                              <span className="font-semibold">{batchObj.product} ({batchObj.id})</span>
                              <span className="text-slate-400">Qty: {batchObj.quantity} | {batchObj.harvest_date}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Inline Visual Graph Attached to Answer */}
                    <InlineGraph results={msg.results} isDark={isDark} />
                  </div>
                )}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0">
                <User className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}

        {loading && <div className="text-xs text-slate-400 italic">Searching knowledge graph...</div>}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputQuery); }} className="mt-3">
        <div className={`flex items-center border rounded-xl p-1.5 transition ${
          isDark ? 'bg-slate-900 border-slate-800 focus-within:border-emerald-500' : 'bg-white border-slate-300 focus-within:border-emerald-500 shadow-sm'
        }`}>
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask any question about farms or batches..."
            className="flex-1 bg-transparent px-3 py-2 text-xs placeholder-slate-400 focus:outline-none"
          />
          <button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5">
            <Send className="w-3.5 h-3.5" /> Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;