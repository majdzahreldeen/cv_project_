import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { EducationItem } from '../types';

interface Props {
    items: EducationItem[];
    setItems: (items: EducationItem[]) => void;
}

export default function Education({ items, setItems }: Props) {
    const addItem = () => {
        const newItem: EducationItem = {
            id: crypto.randomUUID(),
            degree: '',
            institution: '',
            graduationYear: '',
        };
        setItems([...items, newItem]);
    };

    const updateItem = (id: string, field: keyof EducationItem, value: string) => {
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
                        <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                            <GraduationCap size={16} /> Education Details
                        </h3>
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
                            value={item.degree}
                            onChange={(e) => updateItem(item.id, 'degree', e.target.value)}
                            className="bg-slate-800 border border-slate-600 rounded-lg p-2 text-white text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                            placeholder="Degree (e.g. BS Computer Science)"
                        />
                        <input
                            type="text"
                            value={item.institution}
                            onChange={(e) => updateItem(item.id, 'institution', e.target.value)}
                            className="bg-slate-800 border border-slate-600 rounded-lg p-2 text-white text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                            placeholder="Institution (e.g. University of Tech)"
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            value={item.graduationYear}
                            onChange={(e) => updateItem(item.id, 'graduationYear', e.target.value)}
                            className="w-full md:w-1/2 bg-slate-800 border border-slate-600 rounded-lg p-2 text-white text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                            placeholder="Graduation Year (e.g. 2024)"
                        />
                    </div>
                </div>
            ))}

            <button
                onClick={addItem}
                className="w-full py-3 border-2 border-dashed border-slate-700 rounded-lg text-slate-400 hover:border-cyan-500 hover:text-cyan-500 transition-all flex items-center justify-center gap-2"
            >
                <Plus size={18} /> Add Education
            </button>
        </div>
    );
}
