import type { IoTNode } from '../../types/index';
import { NodeCard } from './NodeCard';

interface NodeTickerProps {
  nodes: IoTNode[];
  selectedNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
}

export function NodeTicker({ nodes, selectedNodeId, onNodeSelect }: NodeTickerProps) {
  return (
    <div
      className="flex flex-row gap-3 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
      role="list"
      aria-label="IoT node status list"
    >
      {nodes.map((node) => (
        <div key={node.id} role="listitem">
          <NodeCard
            node={node}
            isSelected={node.id === selectedNodeId}
            onClick={onNodeSelect}
          />
        </div>
      ))}
    </div>
  );
}

export default NodeTicker;
