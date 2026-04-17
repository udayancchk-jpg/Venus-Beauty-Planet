import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Upload, Wand2, Loader2, Sparkles, CheckCircle2, AlertCircle, RefreshCw, ChevronRight } from 'lucide-react';
import { analyzeImage as analyzeWithGemini } from '../services/geminiService';
import Markdown from 'react-markdown';
import { cn } from '../lib/utils';

export default function BeautyConsultant() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setError("Image size too large. Please upload an image under 4MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError(null);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const base64Data = image.split(',')[1];
      const mimeType = image.split(',')[0].split(':')[1].split(';')[0];
      
      const result = await analyzeWithGemini(base64Data, mimeType);
      setAnalysis(result || "I couldn't generate a report. Please try another photo.");
    } catch (err) {
      setError("Analysis failed. Please try a clearer photo or check your connection.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="max-w-5xl mx-auto bg-charcoal border border-gold/20 rounded-2xl overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Upload Area */}
        <div className="p-8 bg-wine/10 border-r border-gold/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif text-gold mb-2">Visual Consultant</h3>
            <p className="text-soft-white/60 text-sm italic">Upload a photo for instant AI skin & hair analysis</p>
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
                <p className="text-gold font-bold mb-1">Click to Capture/Upload</p>
                <p className="text-soft-white/40 text-xs">Selfies or close-ups work best (Max 4MB)</p>
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
                "btn-gold w-full !py-4 flex items-center justify-center gap-3 text-lg group",
                (!image || isAnalyzing) && "opacity-50 cursor-not-allowed"
              )}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Analyzing Features...
                </>
              ) : (
                <>
                  <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Get AI Consultation
                </>
              )}
            </button>
            {image && !isAnalyzing && (
              <button 
                onClick={reset}
                className="text-soft-white/40 hover:text-soft-white text-sm transition-colors"
              >
                Start Over
              </button>
            )}
          </div>

          <div className="mt-8 p-6 bg-gold/5 rounded-xl border border-gold/10">
            <h4 className="text-gold font-bold text-sm mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Privacy Promise
            </h4>
            <p className="text-soft-white/40 text-xs leading-relaxed">
              Your photos are processed in real-time by AI and are not stored permanently on our servers. Your privacy is our priority.
            </p>
          </div>
        </div>

        {/* Right Side: AI Insights */}
        <div className="p-8 lg:p-12 relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {!analysis && !isAnalyzing ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-20 h-20 bg-wine/20 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="text-gold/30 w-10 h-10" />
                </div>
                <h4 className="text-xl font-serif text-gold mb-3">AI Beauty Report</h4>
                <p className="text-soft-white/40 max-w-xs mx-auto">
                  Upload a photo to see our AI's deep analysis and personalized service recommendations.
                </p>
              </motion.div>
            ) : isAnalyzing ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
              >
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-gold/10 border-t-gold rounded-full animate-spin"></div>
                  <Sparkles className="absolute inset-0 m-auto text-gold w-8 h-8 animate-pulse" />
                </div>
                <p className="mt-8 text-gold font-medium animate-pulse">Scanning textures & features...</p>
                <p className="text-soft-white/30 text-xs mt-2 italic">Consulting with Venus Beauty Experts (AI)</p>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose prose-invert prose-gold max-w-none"
              >
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gold/10">
                   <CheckCircle2 className="text-gold w-6 h-6" />
                   <h3 className="text-2xl font-serif text-gold m-0">Your Personalized Consultation</h3>
                </div>
                
                <div className="markdown-body text-soft-white/80 leading-relaxed font-serif text-lg">
                  <Markdown>{analysis}</Markdown>
                </div>

                <div className="mt-12 p-8 bg-wine/5 border border-gold/20 rounded-2xl">
                  <h4 className="text-gold font-bold mb-4">Recommended Next Step</h4>
                  <p className="text-soft-white/70 mb-6 text-sm">
                    Based on your consultation, we recommend booking a professional in-person assessment.
                  </p>
                  <a href="/#booking" className="btn-gold inline-flex items-center gap-2 text-sm">
                    Book This Service <ChevronRight className="w-4 h-4" />
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
