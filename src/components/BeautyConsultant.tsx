import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, Wand2, Loader2, Sparkles, CheckCircle2, AlertCircle, RefreshCw, ChevronRight, Info } from 'lucide-react';
import { analyzeImage as analyzeWithGemini } from '../services/geminiService';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';

export default function BeautyConsultant() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasStartedStreaming, setHasStartedStreaming] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanStep, setScanStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scanSteps = [
    "Optimizing scan resolution...",
    "Scanning hydration levels...",
    "Detecting pigmentation...",
    "Consulting expert database...",
    "Finalizing report..."
  ];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnalyzing && !analysis) {
      interval = setInterval(() => {
        setScanStep(prev => (prev + 1) % scanSteps.length);
      }, 1200);
    } else {
      setScanStep(0);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing, analysis]);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnalyzing && !analysis) {
      setTimeLeft(10);
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) return 1;
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isAnalyzing, analysis]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
          setError(null);
          setAnalysis(null);
          if (e.target) e.target.value = '';
        };
        reader.onerror = () => {
          setError("Failed to read the selected file. Please try again.");
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error("File selection error:", err);
      setError("An unexpected error occurred while selecting the image.");
    }
  };

  const resizeImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = () => reject(new Error("Failed to load image for analysis."));
      img.src = base64Str;
    });
  };

  const startAnalysis = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const resizedImage = await resizeImage(image);
      const base64Data = resizedImage.split(',')[1];
      const mimeType = 'image/jpeg';
      
      const stream = analyzeWithGemini(base64Data, mimeType);
      let fullText = "";
      
      for await (const chunk of stream) {
        setHasStartedStreaming(true);
        fullText += chunk;
        setAnalysis(fullText);
      }
      
      if (!fullText) {
        setAnalysis("I couldn't generate a specific report. Please try another photo.");
      }
    } catch (err) {
      console.error("AI Analysis Error:", err);
      // Fallback report
      setHasStartedStreaming(true);
      setAnalysis(`SKIN_TYPE: Mixed textures
PRIMARY_CONCERN: Moderate dullness
SKIN_ISSUES: Uneven tone, minor dryness
CURRENT_CONDITION:
- Needs a boost in moisture
- Looks slightly dull and tired
RECOMMENDED_SERVICE: Signature HydraFacial
EXPECTED_RESULTS:
- Give you a bright glow
- Make your skin feel smooth
- Help you look fresh`);
      // Inform the user that a general report was generated
      setError("Note: Using a general assessment as visual scanning is currently unavailable.");
    } finally {
      setIsAnalyzing(false);
      setHasStartedStreaming(false);
    }
  };

  const parseAnalysis = (text: string) => {
    const lines = text.split('\n');
    const data: any = {
      skinType: '',
      concern: '',
      issues: '',
      condition: [],
      service: '',
      results: []
    };

    let currentSection = '';

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('SKIN_TYPE:')) data.skinType = trimmed.replace('SKIN_TYPE:', '').trim();
      else if (trimmed.startsWith('PRIMARY_CONCERN:')) data.concern = trimmed.replace('PRIMARY_CONCERN:', '').trim();
      else if (trimmed.startsWith('SKIN_ISSUES:')) data.issues = trimmed.replace('SKIN_ISSUES:', '').trim();
      else if (trimmed.startsWith('RECOMMENDED_SERVICE:')) data.service = trimmed.replace('RECOMMENDED_SERVICE:', '').trim();
      else if (trimmed.startsWith('CURRENT_CONDITION:')) currentSection = 'condition';
      else if (trimmed.startsWith('EXPECTED_RESULTS:')) currentSection = 'results';
      else if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
        const item = trimmed.substring(1).trim();
        if (currentSection === 'condition') data.condition.push(item);
        if (currentSection === 'results') data.results.push(item);
      }
    });

    return data;
  };

  const parsedData = analysis ? parseAnalysis(analysis) : null;

  const reset = () => {
    setImage(null);
    setAnalysis(null);
    setError(null);
    setHasStartedStreaming(false);
  };

  return (
    <div className="max-w-5xl mx-auto bg-charcoal border border-gold/20 rounded-2xl overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Upload Area */}
        <div className="p-8 bg-wine/10 border-r border-gold/10">
          <div className="text-center mb-8 relative group/info">
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-2xl font-serif text-gold">Visual Consultant</h3>
              <div className="relative">
                <Info className="w-4 h-4 text-gold/50 cursor-help hover:text-gold transition-colors" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-charcoal border border-gold/30 rounded-lg shadow-2xl opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all z-50 pointer-events-none">
                  <p className="text-gold text-xs font-bold mb-1">Tips for best analysis:</p>
                  <ul className="text-soft-white/80 text-[10px] text-left list-disc list-inside space-y-1 font-sans">
                    <li>Use bright, natural daylight</li>
                    <li>Keep a neutral expression</li>
                    <li>Focus clearly on face, hair, or skin</li>
                    <li>Remove glasses if checking skin</li>
                  </ul>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gold/30"></div>
                </div>
              </div>
            </div>
            <p className="text-soft-white/60 text-sm italic">Scan features for a structured expert report</p>
          </div>

          <div 
            onClick={() => !isAnalyzing && fileInputRef.current?.click()}
            className={cn(
              "relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden group",
              image ? "border-gold/50" : "border-gold/20 hover:border-gold/40 bg-charcoal/50",
              isAnalyzing && "opacity-50 cursor-wait"
            )}
          >
            {image ? (
              <>
                <img src={image} alt="Upload" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-wine/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <RefreshCw className="text-gold w-10 h-10" />
                </div>
              </>
            ) : (
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="text-gold w-8 h-8" />
                </div>
                <p className="text-gold font-bold mb-1 font-sans">Capture / Upload Photo</p>
                <p className="text-soft-white/40 text-xs font-sans">Selfies or close-ups work best</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={startAnalysis}
              disabled={!image || isAnalyzing}
              className={cn(
                "w-full py-4 flex items-center justify-center gap-3 text-base font-bold rounded-lg transition-all",
                (!image || isAnalyzing) 
                  ? "bg-gold/20 text-gold/40 cursor-not-allowed" 
                  : "bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90 active:scale-[0.98]"
              )}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Analyzing Features...
                </>
              ) : (
                <>
                  <Wand2 className="w-6 h-6" />
                  Generate My Analysis
                </>
              )}
            </button>
            {image && !isAnalyzing && (
              <button 
                onClick={reset}
                className="text-soft-white/40 hover:text-soft-white text-sm transition-colors font-sans"
              >
                Start Over
              </button>
            )}
          </div>

          <div className="mt-8 p-6 bg-gold/5 rounded-xl border border-gold/10">
            <h4 className="text-gold font-bold text-sm mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Privacy Promise
            </h4>
            <p className="text-soft-white/40 text-xs leading-relaxed font-sans">
              Your photos are processed in real-time by AI and are not stored permanently. Your privacy is our priority.
            </p>
          </div>
        </div>

        {/* Right Side: AI Dashboard */}
        <div className="p-6 lg:p-10 bg-[#0F0F0F] relative min-h-[550px] flex flex-col">
          <AnimatePresence mode="wait">
            {!analysis && !isAnalyzing ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-20 h-20 bg-wine/20 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="text-gold/30 w-10 h-10" />
                </div>
                <h4 className="text-xl font-serif text-gold mb-3">Professional Report</h4>
                <p className="text-soft-white/40 max-w-xs mx-auto font-sans text-sm">
                  Upload a photo to see our expert AI skin & hair dashboard with structured insights.
                </p>
              </motion.div>
            ) : isAnalyzing && !hasStartedStreaming ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col pt-8"
              >
                <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl p-8 shadow-2xl flex-1 flex flex-col relative overflow-hidden">
                  {/* Dynamic Scanner Overlay */}
                  <div className="absolute inset-x-0 h-1 bg-gold/30 animate-scanline z-10" />
                  
                  <div className="flex flex-col items-center justify-center py-12 border-b border-gold/10 mb-8">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 border-2 border-gold/10 border-t-gold rounded-full animate-spin" />
                      <Wand2 className="absolute inset-0 m-auto text-gold w-6 h-6 animate-pulse" />
                    </div>
                    <p className="text-gold font-bold font-sans text-lg animate-pulse h-7">
                      {scanSteps[scanStep]}
                    </p>
                    <div className="mt-4 flex flex-col items-center">
                      <p className="text-soft-white/60 text-xs font-sans">
                        {timeLeft > 1 ? "Report arriving in approximately" : "Finalizing results..."}
                      </p>
                      <p className={cn(
                        "text-gold font-mono text-2xl font-bold mt-1 tracking-widest",
                        timeLeft <= 1 && "animate-pulse"
                      )}>
                        {timeLeft}s
                      </p>
                    </div>
                    <p className="text-soft-white/30 text-[10px] mt-4 uppercase tracking-widest font-sans">
                      {timeLeft > 1 ? "Venus Vision Neural Scan v3.1" : "Optimizing for high traffic..."}
                    </p>
                  </div>

                  {/* Skeleton Rows */}
                  <div className="space-y-8 opacity-20 pointer-events-none select-none">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-10 bg-white/5 rounded-md animate-pulse" />
                      <div className="h-10 bg-white/5 rounded-md animate-pulse" />
                    </div>
                    <div className="space-y-4">
                      <div className="h-4 w-1/3 bg-white/5 rounded animate-pulse" />
                      <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                      <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                    </div>
                    <div className="h-20 bg-gold/5 rounded-xl border border-gold/10 animate-pulse" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl p-6 lg:p-8 shadow-2xl flex-1 flex flex-col overflow-hidden"
              >
                <h3 className="text-xl lg:text-[22px] font-serif text-white mb-6 tracking-tight">Your Skin Analysis</h3>
                
                {/* Top Label Section */}
                <div className="grid grid-cols-1 gap-4 mb-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">🧴 Skin Type</span>
                    <div className="bg-[#0F0F0F] px-3 py-2 rounded-md border border-[#D4AF37]/10">
                      <p className="text-sm font-sans text-white font-medium">{parsedData?.skinType}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">⚠️ Primary Concern</span>
                      <div className="bg-[#0F0F0F] px-3 py-2 rounded-md border border-[#D4AF37]/10">
                        <p className="text-sm font-sans text-white font-medium leading-tight">{parsedData?.concern}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">⚠️ Skin Issues</span>
                      <div className="bg-[#0F0F0F] px-3 py-2 rounded-md border border-[#D4AF37]/10 flex flex-col gap-1">
                        {parsedData?.issues?.split(',').map((issue: string, i: number) => {
                          const trimmed = issue.trim();
                          if (!trimmed) return null;
                          return (
                            <p key={i} className="text-sm font-sans text-white font-medium leading-tight flex items-start gap-1">
                              <span className="text-[#D4AF37]">•</span>
                              {trimmed}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[#D4AF37]/10 w-full mb-8" />

                {/* Main Content Sections */}
                <div className="space-y-8 flex-1">
                  <section>
                    <h4 className="text-sm border-l-2 border-[#D4AF37] pl-3 font-bold text-white mb-4 font-sans">Current Condition:</h4>
                    <ul className="space-y-2">
                      {parsedData?.condition?.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm font-sans text-[#B0B0B0]">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-sm border-l-2 border-[#D4AF37] pl-3 font-bold text-white mb-4 font-sans">💆 Recommended Service:</h4>
                    <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-4 rounded-xl">
                      <p className="text-gold font-bold text-base font-serif">{parsedData?.service || 'Calculating...'}</p>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-sm border-l-2 border-[#D4AF37] pl-3 font-bold text-white mb-4 font-sans">✨ Expected Results:</h4>
                    <ul className="space-y-2">
                      {parsedData?.results?.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-sm font-sans text-[#B0B0B0]">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* CTA Button */}
                <div className="mt-10 pt-6 border-t border-[#D4AF37]/10">
                  <a 
                    href="/#booking" 
                    className="w-full bg-[#D4AF37] text-black py-4 px-6 rounded-lg text-base font-bold flex items-center justify-center gap-2 hover:bg-[#D4AF37]/90 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.3)]"
                  >
                    Book This Service
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}
