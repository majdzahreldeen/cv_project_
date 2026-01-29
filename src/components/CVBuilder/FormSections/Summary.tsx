interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function Summary({ value, onChange }: Props) {
    return (
        <div className="space-y-2">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-32 bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Briefly describe your professional background, key achievements, and career goals..."
            />
            <p className="text-xs text-slate-500 text-right">
                Keep it concise (3-5 sentences recommended)
            </p>
        </div>
    );
}
