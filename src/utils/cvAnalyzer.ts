import { GoogleGenerativeAI } from '@google/generative-ai';

export interface AnalysisResult {
    score: number;
    metrics: {
        atsCompatibility: number;
        impactScore: number;
        readability: number;
        professionalRating: number;
    };
    suggestions: Array<{
        type: 'critical' | 'warning' | 'success' | 'info';
        title: string;
        description: string;
        priority: 'High' | 'Medium' | 'Good';
    }>;
    skills: Array<{
        skill: string;
        level: number;
        color: string;
    }>;
    missingKeywords: string[];
    summary: string;
}

export async function extractTextFromPDF(file: File): Promise<string> {
    // Dynamically import pdfjs-dist to avoid load-time errors
    const pdfjsLib = await import('pdfjs-dist');

    // Set worker source dynamically
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n';
    }

    return fullText;
}

export async function extractTextFromDOCX(file: File): Promise<string> {
    // Dynamically import mammoth
    const mammoth = (await import('mammoth')).default;
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
}

export async function analyzeWithGemini(text: string, apiKey: string): Promise<AnalysisResult> {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `
      You constitute an expert ATS (Applicant Tracking System) CV Analyzer. 
      Analyze the following CV text deeply.
      
      CV TEXT:
      ${text.substring(0, 10000)}

      Return a VALID JSON object (and ONLY JSON) with this exact structure:
      {
        "score": number (0-100),
        "metrics": {
          "atsCompatibility": number (0-100),
          "impactScore": number (0-100),
          "readability": number (0-100),
          "professionalRating": number (0-100)
        },
        "suggestions": [
          {
            "type": "critical" | "warning" | "success" | "info",
            "title": "Short title",
            "description": "Specific advice",
            "priority": "High" | "Medium" | "Good"
          }
        ],
        "skills": [
          { "skill": "Skill Name", "level": number (0-100), "color": "cyan" | "teal" | "blue" }
        ],
        "missingKeywords": ["keyword1", "keyword2"],
        "summary": "Brief 2-3 sentence summary of the candidate's profile."
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        // Clean up markdown code blocks if present
        const jsonStr = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(jsonStr);
    } catch (error) {
        console.error('Gemini Analysis Failed:', error);
        return heuristicAnalysis(text);
    }
}

export function heuristicAnalysis(text: string): AnalysisResult {
    // Basic fallback analysis
    const hasEmail = /@/.test(text);
    const hasPhone = /\d{3,}/.test(text);
    const hasLinkedIn = /linkedin\.com/.test(text);
    const wordCount = text.split(/\s+/).length;

    let score = 60;
    const suggestions = [];

    if (!hasEmail) {
        score -= 10;
        suggestions.push({
            type: 'critical',
            title: 'Missing Contact Info',
            description: 'Add your email address.',
            priority: 'High'
        });
    }

    if (!hasPhone) {
        score -= 5;
        suggestions.push({
            type: 'warning',
            title: 'Missing Phone Number',
            description: 'It is good practice to include a phone number.',
            priority: 'Medium'
        });
    }

    if (!hasLinkedIn) {
        suggestions.push({
            type: 'info',
            title: 'Add LinkedIn',
            description: 'Consider adding a link to your LinkedIn profile.',
            priority: 'Good'
        });
    }

    if (wordCount < 200) {
        score -= 10;
        suggestions.push({
            type: 'warning',
            title: 'Too Short',
            description: 'Your CV seems very short. Add more details about your experience.',
            priority: 'Medium'
        });
    }

    // Add more heuristic checks here...

    return {
        score,
        metrics: {
            atsCompatibility: score,
            impactScore: score - 5,
            readability: 85,
            professionalRating: score
        },
        suggestions: suggestions as any,
        skills: [
            { skill: 'Detected via Fallback', level: 50, color: 'blue' }
        ],
        missingKeywords: ['Leadership', 'Project Management'],
        summary: 'Basic heuristic analysis performed (AI unavailable).'
    };
}
