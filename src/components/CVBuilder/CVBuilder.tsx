import { useState, useEffect } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Download, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CVDocument from './CVDocument';
import ProtectedPreview from './ProtectedPreview';
import PersonalInfo from './FormSections/PersonalInfo';
import Summary from './FormSections/Summary';
import Experience from './FormSections/Experience';
import Education from './FormSections/Education';
import Skills from './FormSections/Skills';
import { CVData } from './types';

const initialData: CVData = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        location: '',
        title: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: {
        hard: [],
        soft: [],
    },
};

export default function CVBuilder() {
    const [data, setData] = useState<CVData>(initialData);
    const [isPaid, setIsPaid] = useState(false);
    const navigate = useNavigate();

    // Simulating Payment Check (In real app, fetch from API or check context)
    useEffect(() => {
        // Check for local demo flag
        const isLocallyPaid = localStorage.getItem('cv_paid') === 'true';
        if (isLocallyPaid) {
            setIsPaid(true);
        }
    }, []);

    const updatePersonalInfo = (field: string, value: string) => {
        setData((prev) => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value },
        }));
    };

    const updateSummary = (value: string) => {
        setData((prev) => ({ ...prev, summary: value }));
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-slate-950 text-white flex flex-col lg:flex-row gap-8">
            {/* Left Column: Form */}
            <div className="w-full lg:w-1/2 h-[calc(100vh-120px)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <h1 className="text-3xl font-bold mb-6 text-cyan-400">CV Builder</h1>

                <div className="space-y-8">
                    <section className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <h2 className="text-xl font-semibold mb-4 text-teal-400">Personal Information</h2>
                        <PersonalInfo data={data.personalInfo} updateData={updatePersonalInfo} />
                    </section>

                    <section className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <h2 className="text-xl font-semibold mb-4 text-teal-400">Professional Summary</h2>
                        <Summary value={data.summary} onChange={updateSummary} />
                    </section>

                    <section className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <h2 className="text-xl font-semibold mb-4 text-teal-400">Experience</h2>
                        <Experience
                            items={data.experience}
                            setItems={(items) => setData(prev => ({ ...prev, experience: items }))}
                        />
                    </section>

                    <section className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <h2 className="text-xl font-semibold mb-4 text-teal-400">Education</h2>
                        <Education
                            items={data.education}
                            setItems={(items) => setData(prev => ({ ...prev, education: items }))}
                        />
                    </section>

                    <section className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                        <h2 className="text-xl font-semibold mb-4 text-teal-400">Skills</h2>
                        <Skills
                            skills={data.skills}
                            setSkills={(skills) => setData(prev => ({ ...prev, skills }))}
                        />
                    </section>
                </div>
            </div>

            {/* Right Column: Preview */}
            <div className="w-full lg:w-1/2 flex flex-col h-[calc(100vh-120px)]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">Live Preview</h2>

                    {isPaid ? (
                        <PDFDownloadLink
                            document={<CVDocument data={data} />}
                            fileName="my-cv.pdf"
                            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium transition-colors"
                        >
                            {({ loading }) => (
                                <>
                                    <Download size={18} />
                                    {loading ? 'Generating...' : 'Download PDF'}
                                </>
                            )}
                        </PDFDownloadLink>
                    ) : (
                        <button
                            onClick={() => navigate('/pricing')}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg font-medium transition-colors cursor-pointer border border-transparent hover:border-cyan-500/50"
                        >
                            <Lock size={18} className="text-cyan-400" />
                            <span>Unlock & Download</span>
                        </button>
                    )}
                </div>

                <div className="flex-1 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 relative">
                    <ProtectedPreview isPaid={isPaid}>
                        <PDFViewer width="100%" height="100%" className="w-full h-full border-none">
                            <CVDocument data={data} />
                        </PDFViewer>
                    </ProtectedPreview>
                </div>
            </div>
        </div>
    );
}
