import React, { useEffect, useState } from 'react';

const STRUCTURED_SNIPPETS = [
  {
    filename: 'ai_pipeline.py',
    lang: 'Python',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-cyan-500/30',
    headerColor: 'text-cyan-400',
    code: `import torch
import torch.nn as nn

class HighThroughputPipeline(nn.Module):
    def __init__(self, num_workers=16):
        super().__init__()
        self.encoder = torch.hub.load("vision", "resnet50")
        self.queue = torch.multiprocessing.Queue(maxsize=1024)

    def process_media_stream(self, frame_chunk: torch.Tensor):
        with torch.no_grad():
            features = self.encoder(frame_chunk.cuda())
            return torch.softmax(features, dim=-1)`
  },
  {
    filename: 'arbitrage_engine.rs',
    lang: 'Rust',
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30',
    headerColor: 'text-amber-400',
    code: `pub struct QuantArbitrageEngine {
    pub pool: PumpFunLiquidity,
    pub min_profit_threshold: f64,
}

impl QuantArbitrageEngine {
    pub async fn scan_micro_inefficiencies(&self) -> Result<TradeSignal> {
        let depth = self.pool.fetch_depth().await?;
        if depth.spread > self.min_profit_threshold {
            Ok(TradeSignal::Execute(depth.best_ask))
        } else {
            Ok(TradeSignal::Hold)
        }
    }
}`
  },
  {
    filename: 'kalman_tracker.cpp',
    lang: 'C++',
    color: 'from-violet-500/20 to-purple-500/20',
    borderColor: 'border-violet-500/30',
    headerColor: 'text-violet-400',
    code: `#include <opencv2/opencv.hpp>
#include <torch/script.h>

template <typename T>
class MeteorTrajectoryEstimator {
public:
    Vector3D predict_impact_point(const cv::Mat& videoFrame) {
        auto bbox = detector_.detect(videoFrame);
        kalman_filter_.update(bbox.center());
        return kalman_filter_.forecast(120 /* frames */);
    }
};`
  },
  {
    filename: 'MediaStreamWorker.java',
    lang: 'Java',
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30',
    headerColor: 'text-emerald-400',
    code: `public class MediaStreamWorker implements Runnable {
    private final BlockingQueue<MediaFrame> frameQueue;
    private final ExecutorService executor;

    public MediaStreamWorker(int threadCount) {
        this.executor = Executors.newFixedThreadPool(threadCount);
        this.frameQueue = new LinkedBlockingQueue<>(2048);
    }

    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            MediaFrame frame = frameQueue.take();
            executor.submit(() -> processFrame(frame));
        }
    }
}`
  }
];

const TypewriterSnippet = ({ snippet, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fullCode = snippet.code;

    if (index < fullCode.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + fullCode[index]);
        setIndex((prev) => prev + 1);
      }, 35); // Calm typing speed: 35ms per char

      return () => clearTimeout(timer);
    } else {
      // Pause when finished typing, then reset & restart cleanly
      const pauseTimer = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
      }, 8000);

      return () => clearTimeout(pauseTimer);
    }
  }, [index, snippet.code]);

  return (
    <div className={`code-editor-bg rounded-2xl p-5 border ${snippet.borderColor} shadow-2xl backdrop-blur-md transition-all duration-500 hover:scale-102`}>
      {/* Code Card Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
          <span className={`font-mono text-xs font-semibold ${snippet.headerColor} ml-2`}>
            {snippet.filename}
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase bg-slate-800/80 px-2 py-0.5 rounded text-slate-400 border border-slate-700/60">
          {snippet.lang}
        </span>
      </div>

      {/* Structured Code Block */}
      <pre className="font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto whitespace-pre">
        <code>
          {displayedText}
          <span className="terminal-cursor text-blue-400 font-bold">|</span>
        </code>
      </pre>
    </div>
  );
};

const CodeRain = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Floating Structured Code Windows */}
      <div className="absolute inset-0 p-6 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 opacity-25 max-w-7xl mx-auto">
        <div className="self-start mt-12">
          <TypewriterSnippet snippet={STRUCTURED_SNIPPETS[0]} />
        </div>
        <div className="self-center justify-self-end mt-20 hidden md:block">
          <TypewriterSnippet snippet={STRUCTURED_SNIPPETS[1]} />
        </div>
        <div className="self-end mb-16 hidden lg:block">
          <TypewriterSnippet snippet={STRUCTURED_SNIPPETS[2]} />
        </div>
        <div className="self-center justify-self-end mb-8 hidden xl:block">
          <TypewriterSnippet snippet={STRUCTURED_SNIPPETS[3]} />
        </div>
      </div>
    </div>
  );
};

export default CodeRain;
