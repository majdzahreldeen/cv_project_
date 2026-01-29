import { ArrowRight, Zap, TrendingUp, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeroProps {
  scrollY: number;
}

export default function Hero({ scrollY }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  const stats = [
    { icon: Award, value: '10K+', label: 'CVs Created', color: 'from-cyan-400 to-blue-400' },
    { icon: TrendingUp, value: '94%', label: 'Success Rate', color: 'from-teal-400 to-cyan-400' },
    { icon: Zap, value: '2.5x', label: 'Interview Rate', color: 'from-blue-400 to-teal-400' },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-40 w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-cyan-300 rounded-full animate-pulse"></div>
      </div>

      <div
        className="max-w-7xl mx-auto px-6 relative z-10"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-6 animate-bounce-slow">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 blur-2xl opacity-50 animate-pulse"></div>
              <span className="relative px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-400/50 rounded-full text-cyan-300 font-semibold backdrop-blur-sm">
                Transform Your Career Today
              </span>
            </div>
          </div>

          <h1 className="text-7xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent animate-gradient">
              Craft Your Perfect
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent animate-gradient-slow">
              Professional CV
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            AI-powered CV creation and analysis platform that helps you stand out.
            <span className="block mt-2 text-cyan-400 font-semibold">
              Join thousands who landed their dream jobs
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full font-semibold text-lg shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/75 transition-all duration-300 hover:scale-105 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="px-8 py-4 border-2 border-cyan-400/50 rounded-full font-semibold text-lg hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm">
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-cyan-400/50 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <Icon className={`w-12 h-12 mb-4 mx-auto bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`} />
                    <div className={`text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full p-1">
          <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-scroll"></div>
        </div>
      </div>
    </div>
  );
}
