// Professional SVG logos for schools
export const schoolLogos = {
  'school-1': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#009E60"/><stop offset="100%" stop-color="#006B40"/></linearGradient></defs><circle cx="50" cy="50" r="48" fill="url(#g1)"/><path d="M30 65 L50 30 L70 65 Z" fill="#FCD116" stroke="#fff" stroke-width="2"/><circle cx="50" cy="50" r="8" fill="#fff"/><text x="50" y="82" text-anchor="middle" fill="#fff" font-family="Arial" font-size="10" font-weight="bold">LLM</text></svg>`,
  
  'school-2': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3A75C4"/><stop offset="100%" stop-color="#1E4D8C"/></linearGradient></defs><circle cx="50" cy="50" r="48" fill="url(#g2)"/><circle cx="50" cy="40" r="20" fill="none" stroke="#FCD116" stroke-width="3"/><path d="M35 55 Q50 70 65 55" fill="none" stroke="#fff" stroke-width="3"/><text x="50" y="82" text-anchor="middle" fill="#fff" font-family="Arial" font-size="9" font-weight="bold">EIL</text></svg>`,
  
  'school-3': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#8B4513"/><stop offset="100%" stop-color="#5D2E0D"/></linearGradient></defs><circle cx="50" cy="50" r="48" fill="url(#g3)"/><path d="M50 25 L55 40 L70 40 L58 50 L62 65 L50 55 L38 65 L42 50 L30 40 L45 40 Z" fill="#FCD116"/><text x="50" y="82" text-anchor="middle" fill="#fff" font-family="Arial" font-size="9" font-weight="bold">CSC</text></svg>`,
  
  'school-4': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF6B35"/><stop offset="100%" stop-color="#C44D1A"/></linearGradient></defs><circle cx="50" cy="50" r="48" fill="url(#g4)"/><rect x="35" y="35" width="30" height="30" rx="4" fill="#fff"/><path d="M40 50 L47 57 L60 44" fill="none" stroke="#FF6B35" stroke-width="4" stroke-linecap="round"/><text x="50" y="82" text-anchor="middle" fill="#fff" font-family="Arial" font-size="9" font-weight="bold">EPL</text></svg>`,
  
  'school-5': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#E91E63"/><stop offset="100%" stop-color="#AD1457"/></linearGradient></defs><circle cx="50" cy="50" r="48" fill="url(#g5)"/><circle cx="40" cy="45" r="8" fill="#fff"/><circle cx="60" cy="45" r="8" fill="#fff"/><path d="M35 60 Q50 72 65 60" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><text x="50" y="82" text-anchor="middle" fill="#fff" font-family="Arial" font-size="9" font-weight="bold">MPG</text></svg>`,
  
  'school-6': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#424242"/><stop offset="100%" stop-color="#212121"/></linearGradient></defs><circle cx="50" cy="50" r="48" fill="url(#g6)"/><circle cx="50" cy="45" r="15" fill="none" stroke="#FCD116" stroke-width="3"/><path d="M42 45 L50 35 L58 45" fill="#FCD116"/><rect x="45" y="55" width="10" height="15" fill="#FCD116"/><text x="50" y="82" text-anchor="middle" fill="#fff" font-family="Arial" font-size="9" font-weight="bold">CTO</text></svg>`
};

// Convert SVG string to data URL
export function getLogoDataUrl(schoolId: string): string {
  const svg = schoolLogos[schoolId as keyof typeof schoolLogos];
  if (!svg) return '';
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
