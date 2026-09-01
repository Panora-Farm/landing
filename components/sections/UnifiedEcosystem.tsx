'use client';

import '@xyflow/react/dist/base.css';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  ReactFlow,
  Handle,
  Position,
  MarkerType,
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
      <Handle type="target" position={Position.Left} isConnectable={false} />
      <EcoBox data={data} />
      <Handle type="source" position={Position.Right} isConnectable={false} />
    </>
  );
}

const nodeTypes = { eco: EcoNode };

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
        fitViewOptions={{ padding: 0.08, minZoom: 0.72, maxZoom: 1 }}
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
      />
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
        position: { x: i * 300, y: 0 },
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
        type: 'smoothstep',
        style: { stroke: HARVEST, strokeWidth: 1.5 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: HARVEST,
          width: 16,
          height: 16,
        },
      })),
    [rawNodes]
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
