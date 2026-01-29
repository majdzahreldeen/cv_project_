import { useState, useEffect, useRef } from 'react';
import { Briefcase, Trophy, Star, TrendingUp, Users, Target } from 'lucide-react';

export default function Achievements() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const achievements = [
    {
      icon: Briefcase,
      company: 'Google',
      role: 'Senior Software Engineer',
      salary: '$180K',
      metric: '3 weeks to hire',
      improvement: '+85% salary increase',
      color: 'from-cyan-400 to-blue-400',
      bgGlow: 'bg-cyan-500/20',
    },
    {
      icon: Trophy,
      company: 'Amazon',
      role: 'Product Manager',
      salary: '$165K',
      metric: '5 interviews landed',
      improvement: '+120% response rate',
      color: 'from-teal-400 to-cyan-400',
      bgGlow: 'bg-teal-500/20',
    },
    {
      icon: Star,
      company: 'Microsoft',
      role: 'Data Scientist',
      salary: '$175K',
      metric: '2 weeks to offer',
      improvement: '+95% interview conversion',
      color: 'from-blue-400 to-teal-400',
      bgGlow: 'bg-blue-500/20',
    },
    {
      icon: Target,
      company: 'Meta',
      role: 'UX Designer',
      salary: '$155K',
      metric: '8 companies reached out',
      improvement: '+150% recruiter interest',
      color: 'from-cyan-500 to-teal-500',
      bgGlow: 'bg-cyan-400/20',
    },
    {
      icon: TrendingUp,
      company: 'Apple',
      role: 'iOS Developer',
      salary: '$185K',
      metric: '1 week to offer',
      improvement: '+100% callback rate',
      color: 'from-teal-500 to-blue-500',
      bgGlow: 'bg-teal-400/20',
    },
    {
      icon: Users,
      company: 'Netflix',
      role: 'Marketing Lead',
      salary: '$145K',
      metric: '10+ interview requests',
      improvement: '+200% profile views',
      color: 'from-blue-500 to-cyan-500',
      bgGlow: 'bg-blue-400/20',
    },
  ];

  return (
    <div ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-400/50 rounded-full mb-6">
            <Trophy className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 font-semibold">Success Stories</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
            Real Results, Real People
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how our clients transformed their careers with professionally crafted CVs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div
                    className={`absolute inset-0 ${achievement.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`}
                  ></div>

                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full opacity-50"></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 bg-gradient-to-br ${achievement.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-bold bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`}>
                          {achievement.salary}
                        </div>
                        <div className="text-sm text-gray-400">New Salary</div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {achievement.role}
                    </h3>
                    <p className="text-cyan-400 font-semibold mb-4">{achievement.company}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                        <span className="text-gray-300">{achievement.metric}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-gray-300">{achievement.improvement}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Success Rate</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${achievement.color} rounded-full animate-progress`}
                              style={{ width: '94%' }}
                            ></div>
                          </div>
                          <span className="text-cyan-400 font-semibold">94%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`mt-20 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <button className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full font-semibold text-lg shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/75 transition-all duration-300 hover:scale-105">
            <span className="flex items-center gap-2">
              Start Your Success Story
              <TrendingUp className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
