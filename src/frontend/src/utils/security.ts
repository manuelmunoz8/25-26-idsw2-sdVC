/**
 * Sanitiza una cadena de texto para prevenir ataques XSS básicos y limpiar espacios innecesarios.
 * @param input La cadena de texto a sanitizar.
 * @returns La cadena sanitizada.
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  const encodingMap: Record<string, string> = {
    '<': '%3C',
    '>': '%3E',
    "'": '%27',
    '"': '%22',
    '-': '%2D'
  };

  return input
    .trim()
    .replace(/[<>'"-]/g, (match) => encodingMap[match]);
};
