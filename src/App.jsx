import React, { useState } from 'react';
import { 
  Terminal, User, Briefcase, Code, Mail, Award, BookOpen, Download, 
  ExternalLink, Github, Linkedin, MapPin, Calendar, CheckCircle2, 
  ChevronRight, Star, Cpu, Globe, Database, Sparkles, Layers, ArrowUpRight, Copy, Check
} from 'lucide-react';
import CodeRain from './components/CodeRain';
import ProjectModal from './components/ProjectModal';

const App = () => {
  const [activeNav, setActiveNav] = useState('about');
  const [skillCategory, setSkillCategory] = useState('all');
  const [projectCategory, setProjectCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('adiver252@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  // Projects Data
  const projects = [
    {
      id: 'meteorappx',
      title: 'MeteorAppX',
      subtitle: 'Astronomical Computer Vision & Trajectory Prediction Framework',
      period: 'Mar 2025 – Apr 2026',
      category: 'ai',
      description: 'Architected an end-to-end Convolutional Neural Network (CNN) framework to detect meteors in astronomical video footage with geometric data augmentation and trajectory estimation.',
      fullDescription: 'MeteorAppX is an advanced AI framework built to process complex astronomical video footage in real-time. It leverages CNN-based object detection, custom preprocessing pipelines, and a multi-stage trajectory estimation module integrating Kalman filtering and geometric triangulation.',
      highlights: [
        'Architected end-to-end CNN computer vision framework to identify & track meteors with spatial-temporal normalization.',
        'Engineered an automated trajectory estimation pipeline integrating geometric triangulation, Kalman filtering, and spatial-temporal regression.',
        '4th Runner-Up award winner at NASA SpaceX 2025 Challenge.'
      ],
      tags: ['Python', 'PyTorch', 'CNN', 'OpenCV', 'Kalman Filter', 'Spatial-Temporal ML'],
      github: 'https://github.com/adiver252',
    },
    {
      id: 'demometeor',
      title: 'demoMeteor',
      subtitle: 'Real-Time ML Frontend & Dynamic Stream Overlay Visualization',
      period: 'Mar 2025 – Apr 2026',
      category: 'web',
      description: 'Developed a high-performance interactive frontend visualization layer displaying real-time ML meteor detection metrics and continuous confidence mapping.',
      fullDescription: 'demoMeteor serves as the real-time telemetry dashboard for the MeteorAppX AI pipeline. Built with low-latency video stream overlays, dynamic bounding box rendering, confidence score tracking, and predicted impact point mapping.',
      highlights: [
        'Built low-latency interactive visualization layer displaying real-time ML detection metrics.',
        'Integrated dynamic video overlays featuring bounding boxes, confidence heatmaps, and flight path forecasts.',
        'Optimized render performance to maintain constant 60FPS UI response under heavy video processing streams.'
      ],
      tags: ['React.js', 'Three.js', 'JavaScript ES6+', 'WebSockets', 'TailwindCSS'],
      github: 'https://github.com/adiver252',
    },
    {
      id: 'market-regime',
      title: 'Market Regime Detector',
      subtitle: 'Quantitative Financial Analytics & Machine Learning Workspace',
      period: 'Nov 2025',
      category: 'quant',
      description: 'Built an advanced quantitative analytics workspace fusing machine learning time-series clustering with macroeconomic regime identification.',
      fullDescription: 'An enterprise-grade quantitative analytics platform designed for algorithmic traders. It deploys unsupervised time-series clustering techniques to automatically classify evolving market regimes, volatility shifts, and structural macroeconomic trends.',
      highlights: [
        'Fused academic Machine Learning algorithms with an enterprise-grade quantitative workspace dashboard.',
        'Deployed unsupervised time-series clustering (K-Means/GMM) to dynamically track evolving market regimes.',
        'Generated automated risk metric alerts based on forecasted macroeconomic regime transitions.'
      ],
      tags: ['Python', 'Unsupervised ML', 'React.js', 'Financial Modeling', 'Flask', 'Pandas'],
      github: 'https://github.com/adiver252',
    },
    {
      id: 'hpatrader',
      title: 'HPATrader (High-Performance Arbitrage Trader)',
      subtitle: 'Low-Latency Algorithmic Trading & DEX Liquidity Scanner',
      period: 'Recent Project',
      category: 'quant',
      description: 'Conceptualized and structured a low-latency, short-term high-leveraged algorithmic trading system with decentralized DEX integration.',
      fullDescription: 'HPATrader is a specialized automated trading engine built for decentralized liquidity environments. It rapidly scans alternative token DEX ecosystems (such as Pump.fun) for micro-inefficiencies and liquidity gaps, executing high-velocity arbitrage transactions.',
      highlights: [
        'Engineered high-velocity automated trading engine with DEX integrations (Pump.fun).',
        'Built micro-inefficiency scanners targeting instant liquidity gaps across alternative token pools.',
        'Achieved sub-millisecond execution routing with robust risk management safety breakers.'
      ],
      tags: ['Rust', 'C++', 'Node.js', 'DEX Protocol', 'Algorithmic Trading', 'Solana/Web3'],
      github: 'https://github.com/adiver252',
    }
  ];

  // Skills Data
  const skills = [
    // Languages
    { name: 'Python', category: 'languages', proficiency: 92, icon: '🐍', desc: 'AI/ML models, data pipelines, backend APIs' },
    { name: 'C++', category: 'languages', proficiency: 90, icon: '💻', desc: 'High-performance algorithms & low-latency trading systems' },
    { name: 'JavaScript (ES6+)', category: 'languages', proficiency: 92, icon: '⚡', desc: 'Modern async web development & frontend architecture' },
    { name: 'Java', category: 'languages', proficiency: 85, icon: '☕', desc: 'Object-oriented software development & backend engineering' },
    { name: 'Rust', category: 'languages', proficiency: 78, icon: '🦀', desc: 'Memory-safe systems programming & high-velocity tools' },
    { name: 'Go', category: 'languages', proficiency: 75, icon: '🐹', desc: 'Concurrent microservices & cloud-native backend development' },
    { name: 'OCaml', category: 'languages', proficiency: 70, icon: '🐫', desc: 'Functional programming & quantitative finance logic' },

    // Web & Frontend/Backend
    { name: 'React.js', category: 'web', proficiency: 95, icon: '⚛️', desc: 'Component architecture, state management & UI optimization' },
    { name: 'Node.js', category: 'web', proficiency: 88, icon: '🟢', desc: 'Event-driven servers & scalable REST/WebSocket APIs' },
    { name: 'Three.js', category: 'web', proficiency: 82, icon: '🌐', desc: '3D WebGL graphics & interactive stream rendering' },
    { name: 'Vue.js', category: 'web', proficiency: 80, icon: '🟢', desc: 'Reactive user interface components' },
    { name: 'Django & Flask', category: 'web', proficiency: 85, icon: '🌶️', desc: 'Python web microservices & ML model serving APIs' },
    { name: 'MongoDB', category: 'web', proficiency: 88, icon: '🍃', desc: 'NoSQL document database design & indexing' },

    // AI & Automation
    { name: 'Machine & Deep Learning', category: 'ai', proficiency: 92, icon: '🧠', desc: 'CNNs, Predictive Modeling & Fine-tuning' },
    { name: 'Computer Vision & OpenCV', category: 'ai', proficiency: 95, icon: '👁️', desc: 'Video processing, object tracking & trajectory prediction' },
    { name: 'LLMs & Generative AI', category: 'ai', proficiency: 90, icon: '🤖', desc: 'Model evaluation, prompt engineering & agent pipelines' },
    { name: 'RAG Architecture', category: 'ai', proficiency: 88, icon: '🔍', desc: 'Retrieval-Augmented Generation & Vector embeddings' },
    { name: 'n8n & AI Automation', category: 'ai', proficiency: 85, icon: '⚙️', desc: 'Autonomous workflow automation & LLM tool integration' },

    // Hardware & IoT
    { name: 'IoT Systems', category: 'hardware', proficiency: 85, icon: '📟', desc: 'Embedded hardware, sensors & Braille pad development' },
    { name: 'KiCad & PCB Design', category: 'hardware', proficiency: 80, icon: '🔌', desc: 'Circuit schematic design & printed circuit board layout' },
    { name: 'CAD (Computer-Aided Design)', category: 'hardware', proficiency: 75, icon: '📐', desc: '3D enclosure modeling & hardware prototyping' },
  ];

  const filteredSkills = skillCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === skillCategory);

  const filteredProjects = projectCategory === 'all'
    ? projects
    : projects.filter(p => p.category === projectCategory);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-300">
      {/* Code Rain Matrix Background */}
      <CodeRain />

      <div className="relative z-10">
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <a href="#about" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <Terminal className="w-5 h-5 text-white" />
                </div>
                <div className="font-mono">
                  <div className="text-xl font-bold text-slate-100 flex items-center">
                    <span className="text-blue-400 font-semibold">&lt;</span>
                    <span className="mx-1 bg-gradient-to-r from-slate-100 via-blue-200 to-violet-300 bg-clip-text text-transparent">AdityaVerma</span>
                    <span className="text-blue-400 font-semibold">/&gt;</span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium hidden sm:block">AI/ML & Full Stack Developer</div>
                </div>
              </a>

              {/* Navigation Items */}
              <div className="hidden md:flex items-center space-x-1 bg-slate-900/80 rounded-xl p-1.5 backdrop-blur-sm border border-slate-800">
                {[
                  { id: 'about', label: 'About', icon: User },
                  { id: 'experience', label: 'Experience', icon: Briefcase },
                  { id: 'projects', label: 'Projects', icon: Code },
                  { id: 'skills', label: 'Skills', icon: Cpu },
                  { id: 'achievements', label: 'Achievements', icon: Award },
                  { id: 'contact', label: 'Contact', icon: Mail },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setActiveNav(item.id)}
                      className={`flex items-center space-x-2 rounded-lg px-3.5 py-2 font-medium text-sm transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>

              {/* Availability & Resume Badges */}
              <div className="hidden lg:flex items-center space-x-3">
                <a
                  href="/resume.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all shadow-md shadow-blue-500/20 transform hover:scale-105"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </a>
                <div className="flex items-center space-x-2 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/30">
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-400 text-xs font-mono font-medium">Available for work</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero / About Section */}
        <section id="about" className="min-h-screen flex items-center pt-28 pb-16 relative">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-blue-400 text-lg font-semibold">01.</span>
                    <div className="h-px bg-gradient-to-r from-blue-500/80 to-transparent flex-1"></div>
                  </div>

                  <div className="space-y-4">
                    <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                      <span class="text-slate-300">Hello, I'm</span><br />
                      <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                        Aditya Verma
                      </span>
                    </h1>
                    
                    {/* Terminal Code Snippet */}
                    <div className="font-mono text-base sm:text-lg text-slate-300 bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow-2xl">
                      <span className="text-emerald-400">const</span> <span className="text-blue-400">engineer</span> = &#123;<br />
                      <span className="ml-4 text-slate-400">role:</span> <span className="text-amber-400">"AI/ML & Full Stack Developer"</span>,<br />
                      <span className="ml-4 text-slate-400">specialization:</span> <span className="text-violet-400">"High-Throughput Pipelines & Computer Vision"</span>,<br />
                      <span className="ml-4 text-slate-400">passion:</span> <span className="text-pink-400">"Architecting Intelligent Systems"</span><br />
                      &#125;<span className="terminal-cursor text-blue-400 font-bold">|</span>
                    </div>
                  </div>
                </div>

                {/* Metrics Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="code-editor-bg rounded-xl p-4 text-center border border-slate-800 hover:border-blue-500/40 transition-colors">
                    <div className="text-2xl font-bold text-blue-400 font-mono">2028</div>
                    <div className="text-xs text-slate-400 font-medium">Expected Grad (KIET)</div>
                  </div>
                  <div className="code-editor-bg rounded-xl p-4 text-center border border-slate-800 hover:border-emerald-500/40 transition-colors">
                    <div className="text-2xl font-bold text-emerald-400 font-mono">15+</div>
                    <div className="text-xs text-slate-400 font-medium">Tech & Frameworks</div>
                  </div>
                  <div className="code-editor-bg rounded-xl p-4 text-center border border-slate-800 hover:border-violet-500/40 transition-colors">
                    <div className="text-2xl font-bold text-violet-400 font-mono">4+</div>
                    <div className="text-xs text-slate-400 font-medium">Major ML/Quant Apps</div>
                  </div>
                  <div className="code-editor-bg rounded-xl p-4 text-center border border-slate-800 hover:border-pink-500/40 transition-colors">
                    <div className="text-2xl font-bold text-pink-400 font-mono">1345</div>
                    <div className="text-xs text-slate-400 font-medium">Codeforces Pupil</div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-4 text-slate-300 text-base leading-relaxed">
                  <p>
                    Forward-thinking <span className="text-blue-400 font-semibold">Computer Science & Engineering</span> student at <span className="text-slate-100 font-semibold">KIET Group of Institutions</span> with a specialized passion for Artificial Intelligence and Machine Learning.
                  </p>
                  <p>
                    Proven experience in engineering <span className="text-emerald-400 font-semibold">high-throughput media pipelines</span>, deploying predictive ML models, building <span className="text-violet-400 font-semibold">computer vision trajectory frameworks</span>, and designing scalable quantitative systems.
                  </p>
                </div>

                {/* Location & Experience Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 code-editor-bg rounded-xl p-4 border border-slate-800">
                    <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                    <div>
                      <div className="text-slate-200 font-medium text-sm">Location</div>
                      <div className="text-slate-400 text-xs">Delhi, India</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 code-editor-bg rounded-xl p-4 border border-slate-800">
                    <BookOpen className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-slate-200 font-medium text-sm">Education</div>
                      <div className="text-slate-400 text-xs">B.Tech CSE (12th: 87% | 10th: 89%)</div>
                    </div>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="/resume.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 via-violet-600 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/25 border border-blue-400/30"
                  >
                    <Download className="w-5 h-5" />
                    <span>Resume</span>
                  </a>

                  <a
                    href="#contact"
                    className="inline-flex items-center space-x-2 code-editor-bg hover:bg-slate-800 text-slate-200 px-6 py-3.5 rounded-xl font-semibold transition-all border border-slate-700 hover:border-slate-500"
                  >
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span>Let's Connect</span>
                  </a>

                  <a
                    href="https://github.com/adiver252"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 code-editor-bg hover:bg-slate-800 text-slate-200 px-6 py-3.5 rounded-xl font-semibold transition-all border border-slate-700 hover:border-slate-500"
                  >
                    <Github className="w-4 h-4 text-blue-400" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/aditya-verma-4bba4927b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 code-editor-bg hover:bg-slate-800 text-slate-200 px-6 py-3.5 rounded-xl font-semibold transition-all border border-slate-700 hover:border-slate-500"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Right Column - Profile Widget */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-md code-editor-bg rounded-2xl p-6 shadow-2xl border border-slate-800 relative">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="font-mono text-xs text-slate-400">aditya-profile.tsx</span>
                  </div>

                  <div className="space-y-4 font-mono text-xs text-slate-300">
                    <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-2">
                      <p className="text-slate-500">// AI & System Architecture Status</p>
                      <p><span className="text-blue-400">status</span>: <span className="text-emerald-400">"Online & Building"</span></p>
                      <p><span className="text-blue-400">activeExperience</span>: <span className="text-amber-300">"Handshake (AI Trainee)"</span></p>
                      <p><span className="text-blue-400">currentFocus</span>: [<span className="text-violet-300">"Media Pipelines"</span>, <span className="text-violet-300">"RAG/LLMs"</span>]</p>
                      <p><span className="text-blue-400">awards</span>: <span className="text-pink-400">"NASA SpaceX & DTU Brainwave"</span></p>
                    </div>

                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-200">
                      <div className="flex items-center space-x-2 font-semibold text-sm mb-1 text-blue-400">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Key Highlight</span>
                      </div>
                      <p className="text-slate-300 text-xs font-sans leading-relaxed">
                        Experienced in building, training, and deploying AI models under highly strained media execution pipelines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Experience Section */}
        <section id="experience" className="py-20 relative bg-slate-900/40 border-y border-slate-800/60">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center space-x-4 mb-12">
              <span className="font-mono text-blue-400 text-lg font-semibold">02.</span>
              <h2 className="text-3xl sm:text-5xl font-bold text-slate-100">
                Professional Experience
              </h2>
              <div className="h-px bg-gradient-to-r from-blue-500/80 via-violet-500/50 to-transparent flex-1 hidden sm:block"></div>
            </div>

            <div className="space-y-8">
              {/* Handshake Experience */}
              <div className="group relative code-editor-bg rounded-2xl p-6 sm:p-8 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                        AI Trainee Specialist
                      </h3>
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-mono border border-blue-500/30">
                        Handshake
                      </span>
                    </div>
                    <p className="text-violet-400 font-medium text-sm mt-1">AI Pipeline Engineering & Media Model Training</p>
                  </div>
                  <span className="font-mono text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 self-start sm:self-center">
                    Specialist Role
                  </span>
                </div>

                <ul className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 font-mono font-bold mt-1">›</span>
                    <span>Trained, fine-tuned, and built AI/ML models specifically customized for complex data ingestion and processing tasks.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 font-mono font-bold mt-1">›</span>
                    <span>Engineered and optimized highly strained, high-throughput media pipelines, ensuring minimum latency and seamless handling of heavy video/audio dataset feeds.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 font-mono font-bold mt-1">›</span>
                    <span>Implemented automated data preprocessing routines, model quality evaluation frameworks, and fault-tolerant media transformation workflows.</span>
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2 mt-6">
                  {['AI Pipeline Engineering', 'Media Processing', 'Model Fine-tuning', 'Python', 'PyTorch', 'Data Optimization'].map((tag, idx) => (
                    <span key={idx} className="text-xs bg-slate-800/90 text-blue-300 px-3 py-1 rounded-md border border-slate-700/60 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Yanthura Experience */}
              <div className="group relative code-editor-bg rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-violet-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-violet-400 transition-colors">
                        Lead Debugger & React Developer
                      </h3>
                      <span className="text-xs bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full font-mono border border-violet-500/30">
                        Yanthura.com
                      </span>
                    </div>
                    <p className="text-slate-400 font-medium text-sm mt-1">Frontend Architecture & Application Stabilization</p>
                  </div>
                  <span className="font-mono text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 self-start sm:self-center">
                    Dec 2024 – Jan 2025
                  </span>
                </div>

                <ul className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <li className="flex items-start space-x-3">
                    <span className="text-violet-400 font-mono font-bold mt-1">›</span>
                    <span>Diagnosed and resolved critical state management anomalies and complex component lifecycle bottlenecks using systematic root-cause analysis.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-violet-400 font-mono font-bold mt-1">›</span>
                    <span>Significantly augmented overall application stability and rendering performance by optimizing React render trees and memoization strategies.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-violet-400 font-mono font-bold mt-1">›</span>
                    <span>Enforced strict React best practices, modern modular architecture paradigms, and rigorous code quality standards across cross-functional teams.</span>
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2 mt-6">
                  {['React.js', 'State Management', 'Performance Optimization', 'Root-Cause Analysis', 'JavaScript ES6+'].map((tag, idx) => (
                    <span key={idx} className="text-xs bg-slate-800/90 text-violet-300 px-3 py-1 rounded-md border border-slate-700/60 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="py-20 relative">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center space-x-4 mb-8">
              <span className="font-mono text-blue-400 text-lg font-semibold">03.</span>
              <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-slate-100 via-violet-200 to-pink-200 bg-clip-text text-transparent">
                Featured Projects & Products
              </h2>
            </div>

            {/* Project Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-12">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'ai', label: 'AI & Computer Vision' },
                { id: 'quant', label: 'Quant & Algorithmic Trading' },
                { id: 'web', label: 'Web & Visual Analytics' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setProjectCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    projectCategory === tab.id
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40 shadow-lg shadow-blue-500/10'
                      : 'code-editor-bg text-slate-400 hover:text-slate-200 hover:border-slate-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-gradient-to-br from-slate-900/80 via-slate-900/50 to-slate-800/40 backdrop-blur-md rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between p-6 sm:p-8"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-violet-400 text-xs sm:text-sm font-medium mt-1">{project.subtitle}</p>
                      </div>
                      <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full font-mono border border-slate-700/60 shrink-0">
                        {project.period}
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-slate-800/90 text-blue-300 px-2.5 py-1 rounded-md border border-slate-700/60 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>View Deep Dive</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700/60"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Expertise Section */}
        <section id="skills" className="py-20 relative bg-slate-900/30 border-y border-slate-800/60">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center space-x-4 mb-8">
              <span className="font-mono text-blue-400 text-lg font-semibold">04.</span>
              <h2 className="text-3xl sm:text-5xl font-bold text-slate-100">
                Technical Expertise
              </h2>
            </div>

            {/* Skill Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-12">
              {[
                { id: 'all', label: 'All Technologies', count: skills.length },
                { id: 'languages', label: 'Languages', count: skills.filter(s => s.category === 'languages').length },
                { id: 'web', label: 'Web & Frameworks', count: skills.filter(s => s.category === 'web').length },
                { id: 'ai', label: 'AI & Automation', count: skills.filter(s => s.category === 'ai').length },
                { id: 'hardware', label: 'Hardware & IoT', count: skills.filter(s => s.category === 'hardware').length },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSkillCategory(cat.id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    skillCategory === cat.id
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40 shadow-lg shadow-blue-500/10'
                      : 'code-editor-bg text-slate-400 hover:text-slate-200 hover:border-slate-600'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 font-mono">{cat.count}</span>
                </button>
              ))}
            </div>

            {/* Skills Matrix Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="code-editor-bg rounded-xl p-5 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <div>
                        <h3 className="font-bold text-slate-100 text-sm">{skill.name}</h3>
                        <span className="text-[10px] text-blue-400 font-mono uppercase tracking-wider">{skill.category}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-400 font-mono">{skill.proficiency}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mb-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-violet-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements, Certifications & Languages */}
        <section id="achievements" className="py-20 relative">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center space-x-4 mb-12">
              <span className="font-mono text-blue-400 text-lg font-semibold">05.</span>
              <h2 className="text-3xl sm:text-5xl font-bold text-slate-100">
                Achievements & Credentials
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Achievements Column */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-200 flex items-center space-x-2 border-b border-slate-800 pb-3">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Honors & Competitions</span>
                </h3>

                <div className="space-y-4">
                  <div className="code-editor-bg rounded-xl p-5 border border-slate-800 hover:border-amber-500/40 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-slate-100 text-base">4th Runner-Up – NASA SpaceX 2025</h4>
                      <span className="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full font-mono shrink-0">Global Competition</span>
                    </div>
                    <p className="text-slate-300 text-sm mt-2">
                      Awarded for developing <span className="text-blue-400 font-semibold">MeteorX</span>, an AI-powered astronomical meteor detection and automated trajectory analysis platform.
                    </p>
                  </div>

                  <div className="code-editor-bg rounded-xl p-5 border border-slate-800 hover:border-amber-500/40 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-slate-100 text-base">3rd Place – DTU Brainwave 2.0 (2026)</h4>
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-mono shrink-0">IoT Domain</span>
                    </div>
                    <p className="text-slate-300 text-sm mt-2">
                      Designed an affordable, dynamic <span className="text-emerald-400 font-semibold">IoT-enabled Braille Pad</span> tailored for visually impaired users.
                    </p>
                  </div>

                  <div className="code-editor-bg rounded-xl p-5 border border-slate-800 hover:border-amber-500/40 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-slate-100 text-base">Codeforces Rating: 1345 (Pupil)</h4>
                      <span className="text-xs bg-violet-500/10 text-violet-400 px-2.5 py-1 rounded-full font-mono shrink-0">Competitive Coding</span>
                    </div>
                    <p className="text-slate-300 text-sm mt-2">
                      Demonstrating strong algorithmic problem-solving and optimization capabilities in real-time contests.
                    </p>
                  </div>
                </div>
              </div>

              {/* Certifications & Spoken Languages */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-200 flex items-center space-x-2 border-b border-slate-800 pb-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Certifications & Languages</span>
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="code-editor-bg rounded-xl p-4 border border-slate-800">
                    <span className="text-xs text-blue-400 font-mono">Google</span>
                    <h5 className="font-bold text-slate-100 text-sm mt-1">Google Machine Learning Crash Course</h5>
                    <span className="text-xs text-slate-400 mt-2 block">Nov 2025</span>
                  </div>

                  <div className="code-editor-bg rounded-xl p-4 border border-slate-800">
                    <span className="text-xs text-violet-400 font-mono">DeepLearning.AI / Coursera</span>
                    <h5 className="font-bold text-slate-100 text-sm mt-1">Deep Learning Specialization</h5>
                    <span className="text-xs text-slate-400 mt-2 block">Jun 2025</span>
                  </div>

                  <div className="code-editor-bg rounded-xl p-4 border border-slate-800">
                    <span className="text-xs text-emerald-400 font-mono">Udemy (Abdul Bari)</span>
                    <h5 className="font-bold text-slate-100 text-sm mt-1">Advanced C++ Programming</h5>
                    <span className="text-xs text-slate-400 mt-2 block">Jun 2026</span>
                  </div>

                  <div className="code-editor-bg rounded-xl p-4 border border-slate-800">
                    <span className="text-xs text-pink-400 font-mono">Amazon Web Services</span>
                    <h5 className="font-bold text-slate-100 text-sm mt-1">AWS Cloud Practitioner</h5>
                    <span className="text-xs text-slate-400 mt-2 block">Feb 2026</span>
                  </div>
                </div>

                {/* Spoken Languages */}
                <div className="code-editor-bg rounded-xl p-5 border border-slate-800 mt-6">
                  <h4 className="font-bold text-slate-100 text-sm mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span>Spoken Languages Proficiency</span>
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                      <div className="font-bold text-blue-400 text-sm">English</div>
                      <div className="text-xs text-slate-400 mt-0.5">Proficient (C1)</div>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                      <div className="font-bold text-violet-400 text-sm">German</div>
                      <div className="text-xs text-slate-400 mt-0.5">Intermediate (B2)</div>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                      <div className="font-bold text-emerald-400 text-sm">Hindi</div>
                      <div className="text-xs text-slate-400 mt-0.5">Intermediate (B2)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Footer Section */}
        <section id="contact" className="py-20 relative bg-slate-950 border-t border-slate-800">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
              <span className="font-mono text-blue-400 text-lg font-semibold">06. What's Next?</span>
              <h2 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-slate-100 via-blue-200 to-violet-300 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                I'm actively looking for opportunities in AI/ML Engineering, Media Pipeline Architecture, and Full-Stack Development. Whether you have a question or just want to collaborate, feel free to reach out!
              </p>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-start">
              {/* Direct Info */}
              <div className="md:col-span-5 space-y-4">
                <div className="code-editor-bg rounded-xl p-5 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                    <div className="text-left">
                      <div className="text-slate-400 text-xs">Email</div>
                      <div className="text-slate-100 font-mono text-sm font-semibold">adiver252@gmail.com</div>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="code-editor-bg rounded-xl p-5 border border-slate-800 flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="text-left">
                    <div className="text-slate-400 text-xs">Phone</div>
                    <div className="text-slate-100 font-mono text-sm font-semibold">+91-7042596576</div>
                  </div>
                </div>

                <div className="code-editor-bg rounded-xl p-5 border border-slate-800 flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-violet-400 shrink-0" />
                  <div className="text-left">
                    <div className="text-slate-400 text-xs">Location</div>
                    <div className="text-slate-100 text-sm font-semibold">Delhi, India</div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="md:col-span-7 code-editor-bg rounded-2xl p-6 sm:p-8 border border-slate-800">
                {formSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-100">Message Sent Successfully!</h3>
                    <p className="text-slate-300 text-sm">Thank you for reaching out. I'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Aditya"
                          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">Your Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="aditya@example.com"
                          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Subject</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Collaboration Opportunities"
                        className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Message</label>
                      <textarea
                        rows="4"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Hello Aditya, I'd like to discuss..."
                        className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/20"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="pt-16 mt-16 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
              <div>
                &copy; {new Date().getFullYear()} Aditya Verma. Designed & Built with React & Tailwind CSS.
              </div>
              <div className="flex items-center space-x-4">
                <a href="https://github.com/adiver252" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
                  GitHub
                </a>
                <span>•</span>
                <a href="https://www.linkedin.com/in/aditya-verma-4bba4927b/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Modal for Deep Dive Project view */}
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
    </div>
  );
};

export default App;
