import React from 'react';
import { X, ExternalLink, Github, Calendar, Cpu, Layers, Sparkles } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="font-mono text-xs text-slate-400 ml-2">{project.title.toLowerCase().replace(/\s+/g, '-')}.config</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                {project.title}
              </h2>
              <span className="flex items-center space-x-1.5 text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>{project.period}</span>
              </span>
            </div>
            <p className="text-violet-300 font-medium text-sm mb-4">{project.subtitle}</p>
            <p className="text-slate-300 leading-relaxed text-sm">{project.fullDescription || project.description}</p>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> Key Features & Architecture
              </h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-sm text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
                    <span className="text-blue-400 font-mono font-bold">›</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" /> Technologies & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 bg-slate-800/80 text-blue-300 text-xs font-mono rounded-lg border border-slate-700/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-500">
            Aditya Verma Portfolio
          </div>
          <div className="flex items-center space-x-3">
            {project.github && (
              <a 
                href={project.github}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-sm font-medium transition-all border border-slate-600/50"
              >
                <Github className="w-4 h-4" />
                <span>View Repository</span>
              </a>
            )}
            {project.demoLink && (
              <a 
                href={project.demoLink}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg shadow-blue-500/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
