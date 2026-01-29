import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { SkillsData } from '../types';

interface Props {
    skills: SkillsData;
    setSkills: (skills: SkillsData) => void;
}

export default function Skills({ skills, setSkills }: Props) {
    const [hardInput, setHardInput] = useState('');
    const [softInput, setSoftInput] = useState('');

    const addSkill = (type: 'hard' | 'soft', value: string) => {
        if (!value.trim()) return;
        const newSkills = { ...skills };
        if (!newSkills[type].includes(value.trim())) {
            newSkills[type].push(value.trim());
            setSkills(newSkills);
        }
    };

    const removeSkill = (type: 'hard' | 'soft', index: number) => {
        const newSkills = { ...skills };
        newSkills[type].splice(index, 1);
        setSkills(newSkills);
    };

    const handleKeyDown = (e: React.KeyboardEvent, type: 'hard' | 'soft', value: string, setter: (v: string) => void) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill(type, value);
            setter('');
        }
    };

    return (
        <div className="space-y-6">
            {/* Hard Skills */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">Technical / Hard Skills</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={hardInput}
                        onChange={(e) => setHardInput(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'hard', hardInput, setHardInput)}
                        className="flex-1 bg-slate-800 border border-slate-600 rounded-lg p-2 text-white text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                        placeholder="e.g. React, TypeScript, Python..."
                    />
                    <button
                        onClick={() => { addSkill('hard', hardInput); setHardInput(''); }}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                        <Plus size={20} className="text-cyan-400" />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {skills.hard.map((skill, idx) => (
                        <span key={idx} className="bg-cyan-900/50 text-cyan-200 text-xs px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1">
                            {skill}
                            <button onClick={() => removeSkill('hard', idx)} className="hover:text-white"><X size={12} /></button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Soft Skills */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300">Soft Skills</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={softInput}
                        onChange={(e) => setSoftInput(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, 'soft', softInput, setSoftInput)}
                        className="flex-1 bg-slate-800 border border-slate-600 rounded-lg p-2 text-white text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                        placeholder="e.g. Communication, Leadership..."
                    />
                    <button
                        onClick={() => { addSkill('soft', softInput); setSoftInput(''); }}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                    >
                        <Plus size={20} className="text-cyan-400" />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {skills.soft.map((skill, idx) => (
                        <span key={idx} className="bg-purple-900/50 text-purple-200 text-xs px-3 py-1 rounded-full border border-purple-500/30 flex items-center gap-1">
                            {skill}
                            <button onClick={() => removeSkill('soft', idx)} className="hover:text-white"><X size={12} /></button>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
