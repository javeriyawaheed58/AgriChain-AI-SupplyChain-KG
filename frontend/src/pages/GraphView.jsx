import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const GraphView = ({ graphData }) => {
  // Agar backend se data na mil raha ho to fallback empty check
  if (!graphData || !graphData.nodes || graphData.nodes.length === 0) {
    return (
      <div style={{ padding: '20px', border: '1px dashed #ccc', textAlign: 'center' }}>
        No graph data available for this query.
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
      <ForceGraph2D
        graphData={graphData}
        nodeAutoColorBy="group"
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.label || node.id;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          
          // Draw Node Circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.color || '#007bff';
          ctx.fill();

          // Draw Text Label
          ctx.fillStyle = '#333333';
          ctx.fillText(label, node.x + 8, node.y + 4);
        }}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        width={700}
        height={400}
      />
    </div>
  );
};

export default GraphView;