/**
 * Sanitiza una cadena de texto para prevenir ataques XSS básicos y limpiar espacios innecesarios.
 * @param input La cadena de texto a sanitizar.
 * @returns La cadena sanitizada.
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Elimina < y > para mitigar XSS simple
    .replace(/['"--]/g, ''); // Elimina comillas y guiones dobles para mitigar SQLi básico en el cliente
};
