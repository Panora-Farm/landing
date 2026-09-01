'use client';

import '@xyflow/react/dist/base.css';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  ReactFlow,
  Handle,
  Position,
  MarkerType,
  useReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react';
import { unifiedEcosystem } from '@/lib/content';
import { fadeUpInView } from '@/lib/motion';
import { pick, useLocale } from '@/lib/i18n';

const HARVEST = '#d9822b';

type EcoData = {
  num: string;
  title: string;
  subtitle?: string;
  body: string;
  hub?: boolean;
};

type EcoNodeType = Node<EcoData, 'eco'>;

function EcoBox({ data }: { data: EcoData }) {
  return (
    <div className={`eco-node-box${data.hub ? ' eco-node-box--hub' : ''}`}>
      <svg
        className="eco-node-cue"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
      <span className="eco-node-num">{data.num}</span>
      <h3 className="eco-node-title">{data.title}</h3>
      {data.subtitle ? <span className="eco-node-tag">{data.subtitle}</span> : null}
      <div className="eco-node-desc-wrap">
        <p className="eco-node-body">{data.body}</p>
      </div>
    </div>
  );
}

function EcoNode({ data }: NodeProps<EcoNodeType>) {
  return (
    <>
      <Handle id="t-left" type="target" position={Position.Left} isConnectable={false} />
      <Handle id="t-top" type="target" position={Position.Top} isConnectable={false} />
      <Handle id="t-right" type="target" position={Position.Right} isConnectable={false} />
      <EcoBox data={data} />
      <Handle id="s-right" type="source" position={Position.Right} isConnectable={false} />
      <Handle id="s-bottom" type="source" position={Position.Bottom} isConnectable={false} />
      <Handle id="s-left" type="source" position={Position.Left} isConnectable={false} />
    </>
  );
}

const nodeTypes = { eco: EcoNode };

const FIT_OPTIONS = { padding: 0.04, minZoom: 0.35, maxZoom: 2.4 } as const;

// 01 top-left, 02 top-right, 03 bottom-right, 04 bottom-left
const NODE_POS = [
  { x: 0, y: 0 },
  { x: 700, y: 0 },
  { x: 700, y: 415 },
  { x: 0, y: 415 },
] as const;

// per edge (01->02, 02->03, 03->04): which side leaves / which side arrives
const EDGE_HANDLES = [
  { sourceHandle: 's-right', targetHandle: 't-left' },
  { sourceHandle: 's-bottom', targetHandle: 't-top' },
  { sourceHandle: 's-left', targetHandle: 't-right' },
] as const;

/** Keep the graph filling the canvas as the viewport width changes. */
function FitOnResize() {
  const { fitView } = useReactFlow();
  useEffect(() => {
    let frame = 0;
    const refit = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => fitView(FIT_OPTIONS));
    };
    window.addEventListener('resize', refit);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', refit);
    };
  }, [fitView]);
  return null;
}

function EcoFlowCanvas({
  nodes,
  edges,
}: {
  nodes: EcoNodeType[];
  edges: Edge[];
}) {
  return (
    <div className="eco-rf">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={FIT_OPTIONS}
        minZoom={0.3}
        maxZoom={2.5}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        nodesFocusable={false}
        edgesFocusable={false}
        elementsSelectable={false}
        panOnDrag={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
      >
        <FitOnResize />
      </ReactFlow>
    </div>
  );
}

function EcoStack({ nodes }: { nodes: EcoNodeType[] }) {
  return (
    <ol className="eco-flow">
      {nodes.map((n, i) => (
        <li
          key={n.id}
          className={`eco-node${n.data.hub ? ' eco-node--hub' : ''}`}
        >
          {i > 0 ? (
            <span className="eco-node-arrow" aria-hidden>
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </span>
          ) : null}
          <EcoBox data={n.data} />
        </li>
      ))}
    </ol>
  );
}

export function UnifiedEcosystem() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = !!useReducedMotion();
  const { locale } = useLocale();
  const label = pick(unifiedEcosystem.label, locale);
  const title = pick(unifiedEcosystem.title, locale);
  const rawNodes = pick(unifiedEcosystem.nodes, locale);

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const nodes = useMemo<EcoNodeType[]>(
    () =>
      rawNodes.map((node, i) => ({
        id: node.num,
        type: 'eco',
        // 2x2 layout, flowing clockwise:  01 -> 02
        //                                  |     |
        //                                 04 <- 03
        position: NODE_POS[i] ?? { x: i * 372, y: 0 },
        draggable: false,
        selectable: false,
        data: {
          num: node.num,
          title: node.title,
          body: node.body,
          subtitle: 'subtitle' in node ? node.subtitle : undefined,
          hub: i === 1,
        },
      })),
    [rawNodes]
  );

  const edges = useMemo<Edge[]>(
    () =>
      rawNodes.slice(1).map((node, i) => ({
        id: `eco-e${i}`,
        source: rawNodes[i].num,
        target: node.num,
        ...EDGE_HANDLES[i],
        type: 'smoothstep',
        animated: !reduce,
        style: { stroke: HARVEST, strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: HARVEST,
          width: 20,
          height: 20,
        },
      })),
    [rawNodes, reduce]
  );

  return (
    <section className="ecosystem-flow-section" ref={ref}>
      <div className="ecosystem-flow-header">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{title}</h2>
      </div>

      <motion.div
        className="eco-flow-shell"
        {...fadeUpInView(inView, 0, reduce ? 0 : 24)}
      >
        {isDesktop ? (
          <EcoFlowCanvas nodes={nodes} edges={edges} />
        ) : (
          <EcoStack nodes={nodes} />
        )}
      </motion.div>
    </section>
  );
}
