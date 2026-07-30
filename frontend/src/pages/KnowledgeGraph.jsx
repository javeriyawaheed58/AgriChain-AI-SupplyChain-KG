import React, { useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Share2 } from 'lucide-react';

const KnowledgeGraph = ({ theme }) => {
  const fgRef = useRef();
  const isDark = theme === 'dark';

  const graphData = {
    nodes: [
      { id: 'Green Valley Farm', group: 'Farm', color: '#10b981' },
      { id: 'Organic Orchard', group: 'Farm', color: '#10b981' },
      { id: 'BATCH-101', group: 'Batch', color: '#3b82f6' },
      { id: 'BATCH-102', group: 'Batch', color: '#3b82f6' },
      { id: 'SHP-2001', group: 'Shipment', color: '#f59e0b' },
      { id: 'SHP-2002', group: 'Shipment', color: '#f59e0b' },
    ],
    links: [
      { source: 'Green Valley Farm', target: 'BATCH-101', label: 'PRODUCED' },
      { source: 'Organic Orchard', target: 'BATCH-102', label: 'PRODUCED' },
      { source: 'BATCH-101', target: 'SHP-2001', label: 'SHIPPED_VIA' },
      { source: 'BATCH-102', target: 'SHP-2002', label: 'SHIPPED_VIA' },
    ]
  };

  useEffect(() => {
    if (fgRef.current) {
      setTimeout(() => fgRef.current.zoomToFit(400, 60), 300);
    }
  }, []);

  return (
    <div className="p-4 h-[calc(100vh-80px)] flex flex-col space-y-3 select-none">
      <div className={`p-3 rounded-2xl border flex items-center justify-between ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-emerald-500" />
          <span className="font-bold text-xs">Knowledge Graph Explorer</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-medium">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Farm</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Batch</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Shipment</span>
        </div>
      </div>

      <div className={`flex-1 rounded-2xl border overflow-hidden relative ${
        isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          nodeLabel={(node) => `${node.group}: ${node.id}`}
          nodeColor={(node) => node.color}
          nodeRelSize={8}
          linkWidth={2}
          linkColor={() => (isDark ? '#38bdf8' : '#0284c7')}
          linkDirectionalParticles={3}
          linkDirectionalParticleSpeed={0.006}
          linkDirectionalParticleWidth={3}
          linkLabel={(link) => link.label}
          cooldownTicks={100}
          onEngineStop={() => fgRef.current && fgRef.current.zoomToFit(400, 60)}
          nodeCanvasObjectMode={() => 'after'}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 11 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
            ctx.fillText(label, node.x, node.y + 14);
          }}
          linkCanvasObjectMode={() => 'after'}
          linkCanvasObject={(link, ctx, globalScale) => {
            const start = link.source;
            const end = link.target;
            if (!start || !end || start.x === undefined || end.x === undefined) return;

            const text = link.label;
            const fontSize = 9 / globalScale;
            ctx.font = `${fontSize}px monospace`;
            ctx.fillStyle = isDark ? '#a7f3d0' : '#047857';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const midX = start.x + (end.x - start.x) * 0.5;
            const midY = start.y + (end.y - start.y) * 0.5;

            ctx.fillText(text, midX, midY - 6);
          }}
        />
      </div>
    </div>
  );
};

export default KnowledgeGraph;