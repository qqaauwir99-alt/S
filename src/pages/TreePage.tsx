import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Lock,
  ChevronDown,
  Info,
  RotateCcw,
  Search,
  Compass,
  Maximize2,
  FileText,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import {
  genealogyTree,
  salemPathIds,
  findNodeById,
  getNodeAncestryPath
} from '../data/genealogy';
import { GenealogyNode } from '../types';
import { NodeDrawer } from '../components/NodeDrawer';
import { Toast } from '../components/Toast';
import { LineageCertificateModal } from '../components/LineageCertificateModal';

interface TreePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  initialRevealSalem?: boolean;
  targetNodeId?: string | null;
}

export const TreePage: React.FC<TreePageProps> = ({
  onNavigate,
  onOpenSearch,
  initialRevealSalem = false,
  targetNodeId
}) => {
  // Set of opened node IDs. Start with Qahtan expanded so the tree is alive & interactive immediately
  const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(() => new Set(['qahtan']));
  
  // Selected node for info drawer
  const [selectedNode, setSelectedNode] = useState<GenealogyNode | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Toast state for locked nodes
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [shakingNodeId, setShakingNodeId] = useState<string | null>(null);

  // Certificate Modal
  const [showCertificate, setShowCertificate] = useState(false);

  // Auto-reveal state for Salem path
  const [isAutoRevealing, setIsAutoRevealing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Expand full ancestry path to a given node ID and open its drawer
  const expandToNodeId = useCallback((nodeId: string) => {
    if (!nodeId) return;
    const targetNode = findNodeById(genealogyTree, nodeId);
    if (!targetNode) return;

    const path = getNodeAncestryPath(genealogyTree, nodeId);
    if (path) {
      setExpandedNodeIds((prev) => {
        const next = new Set(prev);
        path.forEach((n) => next.add(n.id));
        return next;
      });
      setSelectedNode(targetNode);
      setIsDrawerOpen(true);
      setTimeout(() => {
        const el = document.getElementById(`tree-node-${nodeId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 250);
    }
  }, []);

  // Deep linking: read hash on mount & listen to hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        expandToNodeId(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [expandToNodeId]);

  // Handle targetNodeId prop from search selection or props
  useEffect(() => {
    if (targetNodeId) {
      expandToNodeId(targetNodeId);
    }
  }, [targetNodeId, expandToNodeId]);

  // Handle Initial Reveal Salem if requested from home
  useEffect(() => {
    if (initialRevealSalem) {
      triggerSalemAutoReveal();
    }
  }, [initialRevealSalem]);

  // Trigger Toast with safe vibration
  const triggerLockedWarning = (nodeId: string) => {
    setShakingNodeId(nodeId);
    setToastMessage('هذا الفرع جانبي موثق في الأنساب القديمة، ويقتصر المسار على صيعر وآل سالم.');
    setShowToast(true);
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(40);
      }
    } catch {
      // Ignore vibration error if blocked in iframe
    }
    setTimeout(() => {
      setShakingNodeId(null);
    }, 450);
  };

  /**
   * Primary Node Click Handler:
   * Clicking ANY name opens its detailed lineage drawer so the user can inspect it.
   * If it has children and is collapsed, it also smoothly expands it.
   * Crucially: Clicking the name NEVER collapses or hides the tree!
   */
  const handleNodeClick = (node: GenealogyNode) => {
    setSelectedNode(node);
    setIsDrawerOpen(true);

    if (node.locked) {
      triggerLockedWarning(node.id);
      return;
    }

    // Expand children if not expanded
    if (node.children.length > 0 && !expandedNodeIds.has(node.id)) {
      setExpandedNodeIds((prev) => {
        const next = new Set(prev);
        next.add(node.id);
        return next;
      });

      setTimeout(() => {
        const el = document.getElementById(`tree-node-${node.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 150);
    }
  };

  /**
   * Dedicated Expand/Collapse Chevron Button:
   * Allows explicitly toggling branch expansion without confusing the name click.
   */
  const toggleNodeExpand = (node: GenealogyNode, e: React.MouseEvent) => {
    e.stopPropagation();
    if (node.locked) {
      triggerLockedWarning(node.id);
      return;
    }

    if (node.children.length === 0) return;

    setExpandedNodeIds((prev) => {
      const next = new Set(prev);
      if (next.has(node.id)) {
        // Collapse node AND all descendants
        const removeDescendants = (n: GenealogyNode) => {
          next.delete(n.id);
          n.children.forEach(removeDescendants);
        };
        removeDescendants(node);
      } else {
        // Expand node
        next.add(node.id);
      }
      return next;
    });
  };

  // Rewind breadcrumb: collapse all nodes below the target
  const handleBreadcrumbClick = (targetId: string) => {
    const path = getNodeAncestryPath(genealogyTree, targetId);
    if (!path) return;
    const idsToKeep = new Set<string>();
    path.forEach((n) => idsToKeep.add(n.id));
    setExpandedNodeIds(idsToKeep);
    const targetNode = findNodeById(genealogyTree, targetId);
    if (targetNode) {
      setSelectedNode(targetNode);
      setIsDrawerOpen(true);
    }
    setTimeout(() => {
      document.getElementById(`tree-node-${targetId}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 200);
  };

  // Auto Reveal Al-Salem Path step-by-step
  const triggerSalemAutoReveal = useCallback(() => {
    if (isAutoRevealing) return;
    setIsAutoRevealing(true);

    let step = 0;
    const currentSet = new Set<string>();

    const interval = setInterval(() => {
      if (step < salemPathIds.length) {
        currentSet.add(salemPathIds[step]);
        setExpandedNodeIds(new Set(currentSet));
        
        const activeNodeId = salemPathIds[step];
        const el = document.getElementById(`tree-node-${activeNodeId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        step++;
      } else {
        clearInterval(interval);
        setIsAutoRevealing(false);
        const salemNode = findNodeById(genealogyTree, 'marai-salem');
        if (salemNode) {
          setSelectedNode(salemNode);
        }
        setTimeout(() => {
          document.getElementById('salem-family-branch')?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 300);
      }
    }, 180);
  }, [isAutoRevealing]);

  // Previous generation action: collapse deepest open node
  const handlePreviousGeneration = () => {
    if (expandedNodeIds.size <= 1) return;
    const expandedList = Array.from(expandedNodeIds);
    const lastId = expandedList[expandedList.length - 1];
    if (lastId === 'qahtan') return;
    setExpandedNodeIds((prev) => {
      const next = new Set(prev);
      next.delete(lastId);
      return next;
    });
  };

  // Reset to initial state (keep Qahtan open for clean exploration)
  const handleReset = () => {
    setExpandedNodeIds(new Set(['qahtan']));
    setSelectedNode(null);
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compute active lineage breadcrumb from root to deepest primary open node
  const currentPathNodes = useMemo<GenealogyNode[]>(() => {
    const list: GenealogyNode[] = [genealogyTree];
    let current = genealogyTree;
    let safetyCounter = 0;

    while (expandedNodeIds.has(current.id) && current.children.length > 0 && safetyCounter < 60) {
      safetyCounter++;
      const openChild = current.children.find(c => expandedNodeIds.has(c.id)) 
        || current.children.find(c => c.primary);
      if (openChild && expandedNodeIds.has(openChild.id) && openChild.id !== current.id) {
        list.push(openChild);
        current = openChild;
      } else {
        break;
      }
    }
    return list;
  }, [expandedNodeIds]);

  // Truncate breadcrumb if too long (keep first name + last 4)
  const displayBreadcrumbs = currentPathNodes.length > 6
    ? [currentPathNodes[0], null, ...currentPathNodes.slice(-4)]
    : currentPathNodes;

  // Render a Single Node Component
  const renderNodeBox = (node: GenealogyNode) => {
    const isExpanded = expandedNodeIds.has(node.id);
    const isShaking = shakingNodeId === node.id;
    const isSalem = node.id === 'marai-salem';
    const isSayaar = node.id === 'alashmoos-sayaar';
    const isSadafTribal = node.relationType === 'tribal';
    const isSelected = selectedNode?.id === node.id;

    return (
      <div className="relative inline-flex flex-col items-center group">
        
        {/* Special Transition Pill for Tribal Branching */}
        {isSadafTribal && (
          <div className="mb-2 px-3 py-1 rounded-full bg-[#10221E] border border-[#C5A96A]/40 text-[#C5A96A] text-[11px] font-medium shadow-sm animate-fadeIn">
            من الصدف (انتساب قبلي)
          </div>
        )}

        {/* Special Transition Pill for Sayaar Branches */}
        {isSayaar && isExpanded && (
          <div className="mb-2 px-3.5 py-1 rounded-full bg-[#19312A] border border-[#C5A96A] text-[#C5A96A] text-xs font-bold shadow-md animate-fadeIn flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A96A]" />
            <span>فروع صيعر — الشجرة الخاصة المعتمدة</span>
          </div>
        )}

        {/* Special Halo Badge for Al-Salem */}
        {isSalem && (
          <div className="mb-2.5 px-4 py-1 rounded-full bg-gradient-to-r from-[#C5A96A]/20 via-[#C5A96A]/35 to-[#C5A96A]/20 border border-[#C5A96A] text-[#E0CA94] text-xs font-bold tracking-wider shadow-lg animate-pulse-subtle">
            آل سالم المعتمد
          </div>
        )}

        {/* Main Node Box */}
        <div
          id={`tree-node-${node.id}`}
          onClick={() => handleNodeClick(node)}
          className={`relative min-w-[165px] sm:min-w-[195px] max-w-[260px] px-4 py-3 rounded-xl border transition-all duration-200 select-none cursor-pointer flex items-center justify-between gap-3 shadow-md ${
            isShaking ? 'animate-gentle-shake' : ''
          } ${
            isSelected
              ? 'ring-2 ring-[#C5A96A] shadow-xl shadow-[#C5A96A]/25 border-[#C5A96A]'
              : ''
          } ${
            node.locked
              ? 'bg-[#0B1714]/85 border-[#19312A] text-[#A39D8F]/75 hover:border-[#C5A96A]/40 hover:bg-[#10221E]'
              : isSalem
              ? 'bg-[#19312A] border-2 border-[#C5A96A] text-[#F3EFE5] shadow-xl shadow-[#C5A96A]/15 ring-1 ring-[#C5A96A]/30'
              : isExpanded
              ? 'bg-[#10221E] border-[#C5A96A] text-[#F3EFE5] shadow-lg shadow-[#C5A96A]/10 ring-1 ring-[#C5A96A]/30'
              : 'bg-[#0B1714] border-[#C5A96A]/35 text-[#F3EFE5] hover:border-[#C5A96A] hover:bg-[#10221E]/70'
          }`}
        >
          {/* Status Indicator / Lock / Chevron Button */}
          <div className="shrink-0">
            {node.locked ? (
              <div className="w-6 h-6 rounded-md bg-[#06100D] border border-[#19312A] flex items-center justify-center text-[#A39D8F]/60" title="فرع جانبي">
                <Lock className="w-3.5 h-3.5" />
              </div>
            ) : node.children.length > 0 ? (
              <button
                type="button"
                onClick={(e) => toggleNodeExpand(node, e)}
                className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${
                  isExpanded
                    ? 'bg-[#19312A] border-[#C5A96A] text-[#C5A96A] rotate-180'
                    : 'bg-[#06100D] border-[#C5A96A]/30 text-[#C5A96A]'
                }`}
                title={isExpanded ? 'طي الأبناء' : 'فتح الأبناء'}
                aria-label={isExpanded ? 'طي الأبناء' : 'فتح الأبناء'}
              >
                <ChevronDown className="w-3.5 h-3.5 pointer-events-none" />
              </button>
            ) : node.badge ? (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#C5A96A]/20 text-[#C5A96A] border border-[#C5A96A]/40 font-bold">
                {node.badge}
              </span>
            ) : (
              <div className="w-2 h-2 rounded-full bg-[#C5A96A]/40" />
            )}
          </div>

          {/* Node Name & Subtitle */}
          <div className="text-right flex-1 min-w-0">
            <span
              className={`block truncate font-heritage leading-snug ${
                isSalem
                  ? 'text-base sm:text-lg font-bold text-[#F3EFE5]'
                  : 'text-sm sm:text-base font-semibold text-[#F3EFE5]'
              }`}
            >
              {node.name}
            </span>
            {node.subtitle && (
              <span className="block text-[11px] text-[#A39D8F] truncate mt-1 leading-normal">
                {node.subtitle}
              </span>
            )}
          </div>

          {/* Info Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNodeClick(node);
            }}
            className="p-1 rounded text-[#A39D8F] hover:text-[#C5A96A] hover:bg-[#19312A] transition-colors shrink-0"
            title="معلومات العقدة وسلسلة النسب"
            aria-label="معلومات العقدة"
          >
            <Info className="w-3.5 h-3.5 pointer-events-none" />
          </button>
        </div>
      </div>
    );
  };

  // Recursive Tree Branch Renderer
  const renderTreeRecursive = (node: GenealogyNode) => {
    const isExpanded = expandedNodeIds.has(node.id);
    const hasChildren = node.children.length > 0;
    const isSalem = node.id === 'marai-salem';

    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* The Node Box */}
        {renderNodeBox(node)}

        {/* Children Branches with SVG/CSS Connectors */}
        {isExpanded && hasChildren && (
          <div className="flex flex-col items-center w-full animate-fadeIn">
            
            {/* 1. Direct Vertical Connector Line from Parent */}
            <div className="w-0.5 h-7 sm:h-9 bg-[#C5A96A]/60" />

            {/* If node is Salem: Custom royal grid layout for the 8 sons */}
            {isSalem ? (
              <div id="salem-family-branch" className="flex flex-col items-center w-full mt-1">
                {/* Horizontal branch line for sons */}
                <div className="w-full max-w-4xl h-0.5 bg-[#C5A96A]/60" />
                
                {/* Sons container */}
                <div className="pt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl px-2">
                  {node.children.map((son, idx) => (
                    <div
                      key={son.id}
                      className="flex flex-col items-center"
                    >
                      {/* Vertical line down to each son */}
                      <div className="w-0.5 h-4 bg-[#C5A96A]/60 -mt-5 mb-1" />
                      
                      <div
                        id={`tree-node-${son.id}`}
                        onClick={() => handleNodeClick(son)}
                        className={`w-full p-3 sm:p-3.5 rounded-xl border text-center shadow-lg transition-all cursor-pointer group ${
                          selectedNode?.id === son.id
                            ? 'bg-[#19312A] border-[#C5A96A] ring-2 ring-[#C5A96A]/60 text-[#F3EFE5]'
                            : 'bg-[#0B1714] border-[#C5A96A]/40 hover:border-[#C5A96A] hover:bg-[#10221E]'
                        }`}
                      >
                        <div className="text-[10px] text-[#A39D8F] mb-0.5 font-mono">
                          الابن {idx + 1}
                        </div>
                        <div className="font-heritage text-base font-bold text-[#F3EFE5] group-hover:text-[#C5A96A] transition-colors">
                          {son.name}
                        </div>
                        {son.badge && (
                          <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-[#C5A96A]/20 text-[#C5A96A] border border-[#C5A96A]/40 font-semibold mt-1">
                            {son.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtitle: وتستمر الأجيال… */}
                <div className="mt-8 mb-4 px-6 py-2 rounded-full bg-[#10221E] border border-[#C5A96A]/30 text-xs sm:text-sm text-[#E0CA94] font-amiri tracking-wider shadow-inner">
                  وتستمر الأجيال…
                </div>
              </div>
            ) : node.children.length === 1 ? (
              /* Single Child: Direct vertical connection without horizontal split */
              <div className="flex flex-col items-center">
                {renderTreeRecursive(node.children[0])}
              </div>
            ) : (
              /* Multiple Children: Standard clean distribution with horizontal bar */
              <div className="flex flex-col items-center w-full">
                {/* Responsive container allowing horizontal scroll if wide */}
                <div className="overflow-x-auto max-w-full pb-4 px-4 scrollbar-thin">
                  <div className="flex items-start justify-center gap-3 sm:gap-5 min-w-max pt-1">
                    {node.children.map((child, index) => {
                      const isFirst = index === 0;
                      const isLast = index === node.children.length - 1;

                      return (
                        <div
                          key={child.id}
                          className="flex flex-col items-center relative"
                        >
                          {/* Top Connector Lines for Multi-child layout */}
                          <div className="w-full flex h-5">
                            {/* Left half of horizontal bar */}
                            <div
                              className={`w-1/2 h-0.5 ${
                                isLast ? 'bg-transparent' : 'bg-[#C5A96A]/60'
                              }`}
                            />
                            {/* Right half of horizontal bar */}
                            <div
                              className={`w-1/2 h-0.5 ${
                                isFirst ? 'bg-transparent' : 'bg-[#C5A96A]/60'
                              }`}
                            />
                          </div>

                          {/* Vertical drop into child node */}
                          <div className="w-0.5 h-4 bg-[#C5A96A]/60 -mt-5 mb-1" />

                          {/* Recursive Child Node */}
                          {renderTreeRecursive(child)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#06100D] text-[#F3EFE5] pb-24 text-right" dir="rtl">
      
      {/* Sticky Tree Controls Toolbar */}
      <section className="sticky top-20 z-30 w-full bg-[#0B1714]/90 backdrop-blur-md border-b border-[#C5A96A]/20 py-2.5 px-3 sm:px-6 shadow-md no-print">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          
          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="px-3 py-1.5 rounded-lg bg-[#10221E] hover:bg-[#162e29] border border-[#C5A96A]/30 text-xs sm:text-sm text-[#F3EFE5] font-medium flex items-center gap-1.5 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-[#C5A96A]" />
              <span>بحث في الشجرة</span>
            </button>

            {/* Previous Generation */}
            <button
              onClick={handlePreviousGeneration}
              disabled={expandedNodeIds.size <= 1}
              className="px-3 py-1.5 rounded-lg bg-[#10221E] hover:bg-[#162e29] border border-[#19312A] text-xs sm:text-sm text-[#F3EFE5] disabled:opacity-40 disabled:cursor-not-allowed font-medium flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-[#A39D8F]" />
              <span>الجيل السابق</span>
            </button>

            {/* Salem Path Auto Reveal */}
            <button
              onClick={triggerSalemAutoReveal}
              disabled={isAutoRevealing}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                isAutoRevealing
                  ? 'bg-[#C5A96A] text-[#06100D] animate-pulse'
                  : 'bg-[#19312A] hover:bg-[#203f36] border border-[#C5A96A]/50 text-[#C5A96A]'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-current" />
              <span>{isAutoRevealing ? 'جارٍ فتح المسار…' : 'مسار آل سالم'}</span>
            </button>

            {/* Reset to Beginning */}
            <button
              onClick={handleReset}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#06100D] hover:bg-[#10221E] border border-[#19312A] text-xs sm:text-sm text-[#A39D8F] hover:text-[#F3EFE5] font-medium flex items-center gap-1 transition-colors"
              title="إعادة ضبط الشجرة للبداية"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>البداية</span>
            </button>
          </div>

          {/* Secondary Actions: Full Tree & Certificate */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => onNavigate('/tree/full')}
              className="px-3 py-1.5 rounded-lg bg-[#10221E] hover:bg-[#162e29] border border-[#19312A] text-xs sm:text-sm text-[#A39D8F] hover:text-[#C5A96A] font-medium flex items-center gap-1.5 transition-colors"
              title="عرض الشجرة كاملة بطريقة Overview"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">عرض كامل</span>
            </button>

            <button
              onClick={() => setShowCertificate(true)}
              className="px-3 py-1.5 rounded-lg bg-[#10221E] hover:bg-[#162e29] border border-[#C5A96A]/30 text-xs sm:text-sm text-[#C5A96A] font-medium flex items-center gap-1.5 transition-colors"
              title="عرض بطاقة سلسلة نسب آل سالم المعتمدة"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>سلسلة النسب</span>
            </button>
          </div>

        </div>

        {/* Dynamic Breadcrumbs */}
        <div className="max-w-7xl mx-auto pt-2 border-t border-[#19312A]/60 flex items-center gap-1 text-xs text-[#A39D8F] overflow-x-auto whitespace-nowrap scrollbar-none">
          <span className="text-[#C5A96A] shrink-0 font-medium">المسار المفتوح:</span>
          {displayBreadcrumbs.map((node, i) => {
            if (!node) {
              return (
                <span key={`ellipsis-${i}`} className="px-1 text-[#A39D8F]/60">
                  …
                </span>
              );
            }
            const isLast = i === displayBreadcrumbs.length - 1;
            return (
              <React.Fragment key={node.id}>
                {i > 0 && <span className="text-[#19312A]">›</span>}
                <button
                  onClick={() => handleBreadcrumbClick(node.id)}
                  className={`hover:text-[#C5A96A] transition-colors rounded px-1 ${
                    isLast ? 'text-[#F3EFE5] font-bold bg-[#10221E]' : ''
                  }`}
                >
                  {node.name.split('—')[0].trim()}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* Main Interactive Tree Canvas */}
      <main
        ref={containerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 flex flex-col items-center min-h-[600px]"
      >
        {/* Helper Hint */}
        <div className="mb-6 px-5 py-2.5 rounded-xl bg-[#0B1714]/90 border border-[#C5A96A]/25 text-xs sm:text-sm text-[#A39D8F] text-center max-w-xl leading-relaxed shadow-sm">
          انقر على أي اسم في شجرة آل سالم لعرض بطاقة النسب الكاملة والمعلومات التاريخية المعتمدة، أو اختر <strong className="text-[#C5A96A]">مسار آل سالم</strong> للانتقال المباشر.
        </div>

        {/* Tree Root */}
        <div className="w-full flex justify-center py-4">
          {renderTreeRecursive(genealogyTree)}
        </div>
      </main>

      {/* Side Panel / Bottom Sheet Node Drawer */}
      <NodeDrawer
        node={selectedNode}
        ancestryPath={selectedNode ? (getNodeAncestryPath(genealogyTree, selectedNode.id) || [selectedNode]) : []}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigateToReferences={(refId) => onNavigate(`/references#${refId || ''}`)}
      />

      {/* Toast Alert for Locked Nodes */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Lineage Certificate Modal */}
      <LineageCertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
      />

    </div>
  );
};
