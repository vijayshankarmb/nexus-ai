import React, { useState } from 'react';
import { FileText, Copy, Download, CheckCircle2, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ReportViewerProps {
  report: string;
  isResearching: boolean;
  isActive: boolean;
}

export default function ReportViewer({ report, isResearching, isActive }: ReportViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'research-report.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const showContent = report.length > 0;
  const isDone = showContent && !isResearching;

  return (
    <div className={`transition-all duration-500 bg-[#0a0a0c] border border-gray-800/80 rounded-2xl relative overflow-hidden shadow-xl flex flex-col ${
      showContent || isActive ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-2'
    }`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/50 to-transparent opacity-50"></div>
      
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-[#0a0a0c]/90 backdrop-blur-md border-b border-gray-800/80 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <FileText className="w-5 h-5 text-emerald-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">Final Report</h2>
          {isDone && <CheckCircle2 className="w-5 h-5 text-green-500" />}
        </div>

        {showContent && (
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors" title="Copy to clipboard">
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <button onClick={handleExport} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors" title="Export as Markdown">
              <Download className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1">
        {showContent ? (
          <div className="prose prose-invert max-w-none text-gray-200 bg-[#050505] p-6 rounded-xl border border-gray-800/60 leading-relaxed shadow-inner overflow-y-auto custom-scrollbar max-h-[60vh]">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-extrabold mt-8 mb-4 text-white tracking-tight" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-100 border-b border-gray-800/60 pb-2" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-5 mb-2 text-gray-200" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 text-gray-300 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc list-outside pl-5 mb-4 space-y-1.5 text-gray-300 marker:text-gray-500" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal list-outside pl-5 mb-4 space-y-1.5 text-gray-300 marker:text-gray-500" {...props} />,
                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                a: ({node, ...props}) => <a className="text-indigo-400 hover:text-indigo-300 hover:underline underline-offset-4 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-indigo-500/50 pl-4 py-1 my-4 bg-gray-800/20 rounded-r-lg italic text-gray-400" {...props} />,
                code: ({node, inline, className, children, ...props}: any) => {
                  return inline ? (
                    <code className="bg-gray-800/80 text-indigo-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                      {children}
                    </code>
                  ) : (
                    <div className="my-4 rounded-xl overflow-hidden border border-gray-800 bg-[#0a0a0c]">
                      <div className="px-4 py-2 bg-gray-900/50 border-b border-gray-800 flex items-center">
                        <span className="text-xs font-mono text-gray-500">code</span>
                      </div>
                      <pre className="p-4 overflow-x-auto custom-scrollbar">
                        <code className="text-sm font-mono text-gray-300" {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  );
                },
                table: ({node, ...props}) => <div className="overflow-x-auto my-6 rounded-lg border border-gray-800"><table className="w-full text-sm text-left text-gray-300" {...props} /></div>,
                thead: ({node, ...props}) => <thead className="bg-gray-800/50 text-gray-200" {...props} />,
                th: ({node, ...props}) => <th className="px-4 py-3 font-medium border-b border-gray-700" {...props} />,
                td: ({node, ...props}) => <td className="px-4 py-3 border-b border-gray-800/50" {...props} />,
              }}
            >
              {report}
            </ReactMarkdown>
            {isResearching && isActive && (
              <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1 align-middle"></span>
            )}
          </div>
        ) : (
          <div className="h-32 flex flex-col items-center justify-center text-gray-500 border border-dashed border-gray-800 rounded-xl bg-gray-900/20">
            {isActive ? (
               <span className="flex items-center gap-2">
                 <Loader2 className="w-4 h-4 animate-spin"/> Synthesizing comprehensive report...
               </span>
            ) : (
              "Awaiting research completion"
            )}
          </div>
        )}
      </div>
    </div>
  );
}
