// js/download.js

/**
 * Carga un archivo JSON de CV y lanza el diálogo de impresión A4
 * @param {string} jsonPath - Ruta al archivo resume.json
 */
export async function downloadResumePDF(jsonPath = 'resume.json') {
    try {
        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`No se pudo cargar ${jsonPath}`);
        const data = await response.json();

        // Crear una ventana temporal para la generación del reporte A4
        const printWindow = window.open('', '_blank');

        const htmlContent = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>CV - ${data.profile.name}</title>
                <style>
                    @page { size: A4; margin: 12mm 15mm; }
                    body { font-family: Arial, sans-serif; font-size: 9.5pt; color: #111; line-height: 1.35; margin: 0; }
                    header { border-bottom: 2px solid #222; padding-bottom: 6px; margin-bottom: 10px; }
                    h1 { font-size: 16pt; margin: 0 0 4px 0; text-transform: uppercase; }
                    .contact { font-size: 8.5pt; color: #444; }
                    h2 { font-size: 10.5pt; text-transform: uppercase; border-bottom: 1px solid #ccc; margin: 12px 0 6px 0; padding-bottom: 2px; }
                    .item { margin-bottom: 8px; page-break-inside: avoid; }
                    .item-header { display: flex; justify-content: space-between; font-weight: bold; }
                    .item-sub { font-style: italic; color: #444; font-size: 8.5pt; }
                    ul { margin: 3px 0; padding-left: 16px; }
                    li { margin-bottom: 2px; }
                    .skills { display: flex; flex-wrap: wrap; gap: 4px; }
                    .skill { background: #eee; padding: 2px 6px; font-size: 8pt; border-radius: 3px; }
                </style>
            </head>
            <body>
                <header>
                    <h1>${data.profile.name}</h1>
                    <div class="contact">
                        📍 ${data.profile.location} | ✉️ ${data.profile.email} | 🔗 ${data.profile.linkedin}
                    </div>
                </header>

                <section>
                    <h2>Experiencia Profesional</h2>
                    ${data.experience.map(exp => `
                        <div class="item">
                            <div class="item-header">
                                <span>${exp.role} — ${exp.company}</span>
                                <span>${exp.period}</span>
                            </div>
                            <ul>
                                ${exp.details.map(d => `<li>${d.text}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </section>

                <section>
                    <h2>Educación</h2>
                    ${data.education.map(edu => `
                        <div class="item">
                            <div class="item-header">
                                <span>${edu.name}</span>
                                <span>${edu.period}</span>
                            </div>
                            <div class="item-sub">${edu.university}</div>
                        </div>
                    `).join('')}
                </section>

                <section>
                    <h2>Habilidades</h2>
                    <div class="skills">
                        ${data.skills.map(s => `<span class="skill">${s}</span>`).join('')}
                    </div>
                </section>

                <section>
                    <h2>Cursos y Certificaciones</h2>
                    <ul>
                        ${data.courses.map(c => `<li>${c.details}</li>`).join('')}
                    </ul>
                </section>
            </body>
            </html>
        `;

        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();

        printWindow.onload = () => {
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        };

    } catch (err) {
        console.error('Error generando el PDF:', err);
    }
}