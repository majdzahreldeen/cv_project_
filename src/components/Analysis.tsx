
import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Target,
  AlertCircle,
  CheckCircle2,
  Zap,
  Eye,
  Award,
  FileText,
  Upload,
  Loader2
} from 'lucide-react';
import { extractTextFromPDF, extractTextFromDOCX, analyzeWithGemini, AnalysisResult } from '../utils/cvAnalyzer';

export default function Analysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const startAnalysis = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    try {
      let text = '';
      if (file.type === 'application/pdf') {
        text = await extractTextFromPDF(file);
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        text = await extractTextFromDOCX(file);
      } else {
        // Assume text file
        text = await file.text();
      }

      // Use API key from environment variables
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      const result = await analyzeWithGemini(text, apiKey);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in relative">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
            AI CV Analysis & Insights
          </h1>
          <p className="text-xl text-gray-400">
            Get detailed insights and recommendations to improve your CV
          </p>
        </div>

        {!analysisResult ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center">
              <FileText className="w-20 h-20 mx-auto text-cyan-400 mb-6" />
              <h3 className="text-3xl font-bold mb-4">Upload CV for Analysis</h3>
              <p className="text-gray-400 mb-8">
                {file ? `Selected: ${file.name} ` : "Get instant AI feedback on your CV's effectiveness"}
              </p>

              <label
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`block border - 2 border - dashed ${file ? 'border-cyan-400 bg-cyan-400/10' : 'border-cyan-400/50 hover:border-cyan-400 hover:bg-cyan-400/5'} rounded - 2xl p - 16 transition - all duration - 300 cursor - pointer group mb - 8 relative`}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                />

                <div className="flex flex-col items-center gap-4">
                  <div className={`w - 24 h - 24 bg - gradient - to - br from - cyan - 500 / 20 to - teal - 500 / 20 rounded - full flex items - center justify - center ${!file && 'group-hover:scale-110'} transition - transform duration - 300`}>
                    {isAnalyzing ? (
                      <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                    ) : (
                      <Upload className="w-12 h-12 text-cyan-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-xl font-semibold mb-2">
                      {isAnalyzing ? 'Analyzing your CV...' : (file ? 'Click to change file' : 'Drop your CV here or click to browse')}
                    </p>
                    <p className="text-gray-500">PDF, DOCX, or TXT format</p>
                  </div>
                </div>
              </label>

              <button
                onClick={startAnalysis}
                disabled={!file || isAnalyzing}
                className={`px - 10 py - 4 bg - gradient - to - r from - cyan - 500 to - teal - 500 rounded - full font - semibold text - lg shadow - lg shadow - cyan - 500 / 50 transition - all duration - 300 ${(!file || isAnalyzing) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-cyan-500/75 hover:scale-105'} `}
              >
                {isAnalyzing ? 'Processing...' : 'Analyze Now'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            <div className="flex justify-end">
              <button
                onClick={() => { setAnalysisResult(null); setFile(null); }}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" /> Upload New CV
              </button>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-400/50 rounded-2xl p-8 mb-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-400/5 blur-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>
                <p className="text-lg text-gray-300 max-w-4xl mx-auto italic leading-relaxed">"{analysisResult.summary}"</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'ATS Compatibility', score: analysisResult.metrics.atsCompatibility, icon: CheckCircle2, color: 'from-cyan-400 to-blue-400' },
                { label: 'Impact Score', score: analysisResult.metrics.impactScore, icon: Zap, color: 'from-teal-400 to-cyan-400' },
                { label: 'Readability', score: analysisResult.metrics.readability, icon: Eye, color: 'from-blue-400 to-teal-400' },
                { label: 'Professional Rating', score: analysisResult.metrics.professionalRating, icon: Award, color: 'from-cyan-500 to-teal-500' },
              ].map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
                    style={{ animationDelay: `${index * 100} ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <Icon className={`w - 8 h - 8 bg - gradient - to - r ${metric.color} bg - clip - text text - transparent`} />
                        <div className={`text - 3xl font - bold bg - gradient - to - r ${metric.color} bg - clip - text text - transparent`}>
                          {metric.score}%
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold mb-2">{metric.label}</h3>

                      <div className="mt-4 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h - full bg - gradient - to - r ${metric.color} rounded - full transition - all duration - 1000`}
                          style={{ width: `${metric.score}% ` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-2xl font-bold">Recommendations</h2>
                  </div>

                  <div className="space-y-4">
                    {analysisResult.suggestions.map((suggestion, index) => {
                      const priorityColors = {
                        High: 'border-red-500/50 bg-red-500/10',
                        Medium: 'border-yellow-500/50 bg-yellow-500/10',
                        Good: 'border-green-500/50 bg-green-500/10',
                      };

                      return (
                        <div
                          key={index}
                          className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                              {suggestion.type === 'critical' && <AlertCircle className="w-6 h-6 text-red-400" />}
                              {suggestion.type === 'warning' && <Target className="w-6 h-6 text-yellow-400" />}
                              {suggestion.type === 'success' && <CheckCircle2 className="w-6 h-6 text-green-400" />}
                              {suggestion.type === 'info' && <TrendingUp className="w-6 h-6 text-cyan-400" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold">
                                  {suggestion.title}
                                </h3>
                                <span
                                  className={`px - 3 py - 1 rounded - full text - xs font - semibold border ${priorityColors[suggestion.priority]
                                    } `}
                                >
                                  {suggestion.priority}
                                </span>
                              </div>
                              <p className="text-gray-400">{suggestion.description}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {analysisResult.missingKeywords && analysisResult.missingKeywords.length > 0 && (
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <BarChart3 className="w-6 h-6 text-cyan-400" />
                      <h2 className="text-2xl font-bold">Missing Keywords</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.missingKeywords.map((kw, i) => (
                        <span key={i} className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-300 rounded-full text-sm">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                    <h2 className="text-2xl font-bold">Skills Analysis</h2>
                  </div>

                  <div className="space-y-6">
                    {analysisResult.skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300 font-medium">{skill.skill}</span>
                          <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                        </div>
                        <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h - full bg - gradient - to - r from - ${skill.color} -500 to - ${skill.color} -400 rounded - full transition - all duration - 1000`}
                            style={{ width: `${skill.level}% ` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

