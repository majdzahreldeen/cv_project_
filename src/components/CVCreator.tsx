import { useState } from 'react';
import { Upload, Download, Sparkles, FileText, CheckCircle, ArrowRight } from 'lucide-react';

export default function CVCreator() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { number: 1, title: 'Upload', description: 'Your current CV' },
    { number: 2, title: 'Enhance', description: 'AI optimization' },
    { number: 3, title: 'Download', description: 'Your new CV' },
  ];

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(step + 1);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
            Create Your Perfect CV
          </h1>
          <p className="text-xl text-gray-400">
            Transform your career in three simple steps
          </p>
        </div>

        <div className="mb-16">
          <div className="flex items-center justify-center gap-4">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                      step >= s.number
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/50 scale-110'
                        : 'bg-white/5 text-gray-500 border border-white/10'
                    }`}
                  >
                    {step > s.number ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : (
                      s.number
                    )}
                    {step === s.number && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 blur-xl opacity-50 animate-pulse"></div>
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <div className={`font-semibold ${step >= s.number ? 'text-cyan-400' : 'text-gray-500'}`}>
                      {s.title}
                    </div>
                    <div className="text-sm text-gray-500">{s.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-32 h-1 mx-4 mb-12 rounded-full transition-all duration-500 ${
                      step > s.number ? 'bg-gradient-to-r from-cyan-500 to-teal-500' : 'bg-white/10'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-12 shadow-2xl">
          {step === 1 && (
            <div className="text-center animate-fade-in">
              <div className="mb-8">
                <Upload className="w-20 h-20 mx-auto text-cyan-400 mb-4" />
                <h3 className="text-3xl font-bold mb-4">Upload Your Current CV</h3>
                <p className="text-gray-400 mb-8">Support for PDF, DOCX, and TXT formats</p>
              </div>

              <div className="border-2 border-dashed border-cyan-400/50 rounded-2xl p-16 hover:border-cyan-400 hover:bg-cyan-400/5 transition-all duration-300 cursor-pointer group">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-12 h-12 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold mb-2">Drop your file here or click to browse</p>
                    <p className="text-gray-500">Maximum file size: 10MB</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleProcess}
                className="mt-8 px-10 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full font-semibold text-lg shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/75 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center animate-fade-in">
              <div className="mb-8">
                <Sparkles className="w-20 h-20 mx-auto text-cyan-400 mb-4 animate-spin-slow" />
                <h3 className="text-3xl font-bold mb-4">AI Enhancement in Progress</h3>
                <p className="text-gray-400 mb-8">Optimizing your CV for maximum impact</p>
              </div>

              <div className="space-y-6 max-w-2xl mx-auto">
                {[
                  { label: 'Analyzing content structure', progress: 100 },
                  { label: 'Optimizing keywords for ATS', progress: 100 },
                  { label: 'Enhancing formatting and layout', progress: isProcessing ? 75 : 100 },
                  { label: 'Generating achievement highlights', progress: isProcessing ? 45 : 100 },
                ].map((item, index) => (
                  <div key={index} className="text-left">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{item.label}</span>
                      <span className="text-cyan-400 font-semibold">{item.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full transition-all duration-1000"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {!isProcessing && (
                <button
                  onClick={handleProcess}
                  className="mt-12 px-10 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full font-semibold text-lg shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/75 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto animate-bounce-in"
                >
                  View Results
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="text-center animate-fade-in">
              <div className="mb-8">
                <div className="relative inline-block">
                  <CheckCircle className="w-20 h-20 mx-auto text-cyan-400 mb-4" />
                  <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-50 animate-pulse"></div>
                </div>
                <h3 className="text-3xl font-bold mb-4">Your CV is Ready!</h3>
                <p className="text-gray-400 mb-8">Enhanced and optimized for success</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  { label: 'ATS Score', value: '96%', color: 'from-cyan-400 to-blue-400' },
                  { label: 'Keywords Optimized', value: '24', color: 'from-teal-400 to-cyan-400' },
                  { label: 'Improvements Made', value: '18', color: 'from-blue-400 to-teal-400' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full font-semibold text-lg shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/75 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download CV
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="px-10 py-4 border-2 border-cyan-400/50 rounded-full font-semibold text-lg hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
                >
                  Create Another
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
