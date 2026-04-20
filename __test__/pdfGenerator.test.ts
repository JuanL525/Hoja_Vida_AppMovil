import { CVData } from "../types/cv.types";
import { generatePDFHtml } from "../utils/pdfGenerator";

describe("Generador de HTML para PDF del CV", () => {
  it("debe contener las secciones esperadas y la información del usuario", () => {
    // 1. Preparar los datos falsos (Mock Data)
    const mockData: CVData = {
      personalInfo: {
        fullName: "Usuario De Prueba",
        email: "usuario@prueba.com",
        phone: "0999999999",
        location: "Quito",
        summary: "Desarrollador de software enfocado en la calidad.",
      },
      experiences: [],
      education: [],
      skills: [],
    };

    // 2. Ejecutar la función que queremos probar
    const htmlOutput = generatePDFHtml(mockData);

    // 3. Afirmar (Assert) que el resultado contiene las secciones clave
    expect(htmlOutput).toContain("Usuario De Prueba"); // Verifica que imprima el nombre
    expect(htmlOutput).toContain("Resumen"); // Verifica la sección resumen
    expect(htmlOutput).toContain("Experiencia"); // Verifica la sección experiencia
    expect(htmlOutput).toContain("Educación"); // Verifica la sección educación
    expect(htmlOutput).toContain("Habilidades"); // Verifica la sección habilidades
  });
});
