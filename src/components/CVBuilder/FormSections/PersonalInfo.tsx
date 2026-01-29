import { User, Mail, Phone, MapPin, Linkedin, Briefcase } from 'lucide-react';

import { PersonalInfoData } from '../types';

interface Props {
    data: PersonalInfoData;
    updateData: (field: string, value: string) => void;
}

export default function PersonalInfo({ data, updateData }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                    <User size={14} /> Full Name
                </label>
                <input
                    type="text"
                    value={data.fullName}
                    onChange={(e) => updateData('fullName', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                    <Briefcase size={14} /> Professional Title
                </label>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => updateData('title', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                    placeholder="Software Engineer"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                    <Mail size={14} /> Email
                </label>
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => updateData('email', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                    <Phone size={14} /> Phone
                </label>
                <input
                    type="tel"
                    value={data.phone}
                    onChange={(e) => updateData('phone', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                    <Linkedin size={14} /> LinkedIn / Portfolio
                </label>
                <input
                    type="text"
                    value={data.linkedin}
                    onChange={(e) => updateData('linkedin', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                    placeholder="linkedin.com/in/johndoe"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                    <MapPin size={14} /> Location
                </label>
                <input
                    type="text"
                    value={data.location}
                    onChange={(e) => updateData('location', e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                    placeholder="New York, NY"
                />
            </div>
        </div>
    );
}
