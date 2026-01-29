export interface ExperienceItem {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
}

export interface EducationItem {
    id: string;
    degree: string;
    institution: string;
    graduationYear: string;
}

export interface PersonalInfoData {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    title: string;
}

export interface SkillsData {
    hard: string[];
    soft: string[];
}

export interface CVData {
    personalInfo: PersonalInfoData;
    summary: string;
    experience: ExperienceItem[];
    education: EducationItem[];
    skills: SkillsData;
}
