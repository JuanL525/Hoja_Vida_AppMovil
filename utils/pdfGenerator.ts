import { CVData } from '../types/cv.types';

export const generatePDFHtml = (cvData: CVData): string => {
    return `
        <html>
            <body style="font-family: Arial, sans-serif; color: #333333; padding: 20px;">
                <h1 style="color: #0033A0;">${cvData.personalInfo.fullName}</h1>
                <p>${cvData.personalInfo.email} | ${cvData.personalInfo.phone}</p>
                <h2 style="color: #C41230;">Resumen</h2>
                <p>${cvData.personalInfo.summary}</p>
                
                <h2 style="color: #0033A0;">Experiencia</h2>
                ${cvData.experiences.map(exp => `<p><b>${exp.company}</b> - ${exp.position}</p>`).join('')}
                
                <h2 style="color: #0033A0;">Educación</h2>
                ${cvData.education.map(edu => `<p><b>${edu.institution}</b> - ${edu.degree}</p>`).join('')}

                <h2 style="color: #0033A0;">Habilidades</h2>
                ${cvData.skills.map(skill => `<p>${skill.name} (${skill.level})</p>`).join('')}
            </body>
        </html>
    `;
};