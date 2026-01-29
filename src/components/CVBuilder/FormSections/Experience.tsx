import { Plus, Trash2, Calendar } from 'lucide-react';
import { ExperienceItem } from '../types';

interface Props {
    items: ExperienceItem[];
    setItems: (items: ExperienceItem[]) => void;
}

export default function Experience({ items, setItems }: Props) {
    const addItem = () => {
        const newItem: ExperienceItem = {
            id: crypto.randomUUID(),
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            current: false,
            description: '',
        };
        setItems([...items, newItem]);
    };

    const updateItem = (id: string, field: keyof ExperienceItem, value: any) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div className="space-y-6">
            {items.map((item) => (
                <div key={item.id} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 space-y-4">
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium text-slate-300">Job Details</h3>
                        <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                            className="bg-slate-800 border border-slate-600 rounded-lg p-2 text-white text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                            placeholder="Job Title"
                        />
                        <input
                            type="text"
                            value={item.company}
                            onChange={(e) => updateItem(item.id, 'company', e.target.value)}
                            className="bg-slate-800 border border-slate-600 rounded-lg p-2 text-white text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                            placeholder="Company Name"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs text-slate-400 flex items-center gap-1">
                                <Calendar size={12} /> Start Date
                            </label>
                            <input
                                type="text"
                                value={item.startDate}
                                onChange={(e) => updateItem(item.id, 'startDate', e.target.value)}
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 text-white text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                                placeholder="MM/YYYY"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-slate-400 flex items-center gap-1">
                                <Calendar size={12} /> End Date
                            </label>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    value={item.endDate}
                                    disabled={item.current}
                                    onChange={(e) => updateItem(item.id, 'endDate', e.target.value)}
                                    className={`w-full bg-slate-800 border border-slate-600 rounded-lg p-2 text-white text-sm focus:ring-2 focus:ring-cyan-500 outline-none ${item.current ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    placeholder={item.current ? 'Present' : 'MM/YYYY'}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id={`current-${item.id}`}
                            checked={item.current}
                            onChange={(e) => updateItem(item.id, 'current', e.target.checked)}
                            className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
                        />
                        <label htmlFor={`current-${item.id}`} className="text-sm text-slate-300 select-none cursor-pointer">
                            I currently work here
                        </label>
                    </div>

                    <textarea
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="w-full h-24 bg-slate-800 border border-slate-600 rounded-lg p-2 text-white text-sm focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
                        placeholder="• Achieved X by doing Y&#10;• Led a team of Z developers&#10;• Improved performance by W%"
                    />
                </div>
            ))}

            <button
                onClick={addItem}
                className="w-full py-3 border-2 border-dashed border-slate-700 rounded-lg text-slate-400 hover:border-cyan-500 hover:text-cyan-500 transition-all flex items-center justify-center gap-2"
            >
                <Plus size={18} /> Add Experience
            </button>
        </div>
    );
}
