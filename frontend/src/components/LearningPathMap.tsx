import React, { useCallback, useMemo } from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    Handle,
    Position,
    Background,
    Controls
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom Node Component
const CustomSkillNode = ({ data }: { data: any }) => {
    const statusColors = {
        'Locked': 'bg-gray-200 border-gray-400 text-gray-500',
        'Unlocked': 'bg-blue-100 border-blue-500 text-blue-700',
        'In Progress': 'bg-yellow-100 border-yellow-500 text-yellow-700',
        'Completed': 'bg-green-100 border-green-500 text-green-700',
        'Skipped': 'bg-red-100 border-red-500 text-red-700'
    };

    return (
        <div className={`px-4 py-2 rounded shadow-md border-2 w-48 ${statusColors[data.status] || 'bg-white'}`}>
            <Handle type="target" position={Position.Top} className="w-16 !bg-gray-500" />
            <div className="font-bold text-sm">{data.label}</div>
            <div className="text-xs">{data.category}</div>
            {data.status === 'Completed' && <div className="text-xs mt-1">Score: {data.score}</div>}
            <Handle type="source" position={Position.Bottom} className="w-16 !bg-gray-500" />
        </div>
    );
};

const nodeTypes = {
    skillNode: CustomSkillNode,
};

interface LearningPathMapProps {
    path: any; // The LearningPath object from API
    onNodeClick: (nodeId: string) => void;
}

export const LearningPathMap: React.FC<LearningPathMapProps> = ({ path, onNodeClick }) => {
    // Transform API data to React Flow nodes/edges
    const { nodes: flowNodes, edges: flowEdges } = useMemo(() => {
        if (!path || !path.nodes) return { nodes: [], edges: [] };

        const nodes = path.nodes.map((node: any, index: number) => ({
            id: node.skillNode._id,
            type: 'skillNode',
            position: { x: 250, y: index * 150 }, // Simple vertical layout
            data: {
                label: node.skillNode.name,
                category: node.skillNode.category,
                status: node.status,
                score: node.score
            },
        }));

        const edges = path.nodes.slice(0, -1).map((node: any, index: number) => ({
            id: `e-${index}-${index + 1}`,
            source: node.skillNode._id,
            target: path.nodes[index + 1].skillNode._id,
            animated: node.status === 'Completed',
            style: { stroke: node.status === 'Completed' ? '#22c55e' : '#b1b1b1' }
        }));

        return { nodes, edges };
    }, [path]);

    const [nodes, setNodes, onNodesChange] = useNodesState(flowNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(flowEdges);

    // Update nodes when prop changes
    React.useEffect(() => {
        setNodes(flowNodes);
        setEdges(flowEdges);
    }, [flowNodes, flowEdges, setNodes, setEdges]);

    return (
        <div style={{ height: '500px', width: '100%' }} className="border rounded-lg bg-gray-50">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                onNodeClick={(_, node) => onNodeClick(node.id)}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};
