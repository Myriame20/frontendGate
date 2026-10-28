// Professional school logos - sophisticated, institutional designs
export const schoolLogos: Record<string, string> = {
  'school-1': `data:image/svg+xml,${encodeURIComponent(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e3a8a"/>
          <stop offset="100%" stop-color="#3b82f6"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#g1)"/>
      <path d="M25 65 L50 35 L75 65 Z" fill="none" stroke="#fbbf24" stroke-width="3"/>
      <path d="M35 65 L50 45 L65 65" fill="none" stroke="#ffffff" stroke-width="2"/>
      <circle cx="50" cy="50" r="6" fill="#fbbf24"/>
      <text x="50" y="82" text-anchor="middle" fill="#ffffff" font-family="serif" font-size="10" font-weight="bold">LLM</text>
    </svg>
  `)}`,
  
  'school-2': `data:image/svg+xml,${encodeURIComponent(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7c2d12"/>
          <stop offset="100%" stop-color="#dc2626"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#g2)"/>
      <path d="M30 70 L30 40 L50 25 L70 40 L70 70" fill="none" stroke="#fbbf24" stroke-width="3"/>
      <rect x="40" y="55" width="20" height="15" fill="#fbbf24"/>
      <circle cx="50" cy="45" r="8" fill="none" stroke="#ffffff" stroke-width="2"/>
      <text x="50" y="85" text-anchor="middle" fill="#ffffff" font-family="serif" font-size="9" font-weight="bold">EIL</text>
    </svg>
  `)}`,
  
  'school-3': `data:image/svg+xml,${encodeURIComponent(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#064e3b"/>
          <stop offset="100%" stop-color="#059669"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#g3)"/>
      <path d="M50 20 L55 35 L70 35 L58 45 L63 60 L50 50 L37 60 L42 45 L30 35 L45 35 Z" fill="#fbbf24"/>
      <circle cx="50" cy="50" r="15" fill="none" stroke="#ffffff" stroke-width="2"/>
      <text x="50" y="82" text-anchor="middle" fill="#ffffff" font-family="serif" font-size="9" font-weight="bold">CSC</text>
    </svg>
  `)}`,
  
  'school-4': `data:image/svg+xml,${encodeURIComponent(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#581c87"/>
          <stop offset="100%" stop-color="#9333ea"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#g4)"/>
      <rect x="30" y="35" width="40" height="30" fill="none" stroke="#fbbf24" stroke-width="3" rx="2"/>
      <path d="M35 45 L45 55 L65 35" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <text x="50" y="82" text-anchor="middle" fill="#ffffff" font-family="serif" font-size="9" font-weight="bold">EPL</text>
    </svg>
  `)}`,
  
  'school-5': `data:image/svg+xml,${encodeURIComponent(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#831843"/>
          <stop offset="100%" stop-color="#ec4899"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#g5)"/>
      <circle cx="35" cy="45" r="10" fill="#fbbf24"/>
      <circle cx="65" cy="45" r="10" fill="#fbbf24"/>
      <path d="M30 60 Q50 75 70 60" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <text x="50" y="82" text-anchor="middle" fill="#ffffff" font-family="serif" font-size="9" font-weight="bold">MPG</text>
    </svg>
  `)}`,
  
  'school-6': `data:image/svg+xml,${encodeURIComponent(`
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e293b"/>
          <stop offset="100%" stop-color="#475569"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#g6)"/>
      <circle cx="50" cy="40" r="18" fill="none" stroke="#fbbf24" stroke-width="3"/>
      <path d="M50 25 L50 55" stroke="#fbbf24" stroke-width="2"/>
      <path d="M35 40 L65 40" stroke="#fbbf24" stroke-width="2"/>
      <rect x="42" y="55" width="16" height="12" fill="#fbbf24" rx="2"/>
      <text x="50" y="82" text-anchor="middle" fill="#ffffff" font-family="serif" font-size="9" font-weight="bold">CTO</text>
    </svg>
  `)}`
};

export const getSchoolLogo = (schoolId: string): string => {
  return schoolLogos[schoolId] || schoolLogos['school-1'];
};
