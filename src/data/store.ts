import { v4 as uuidv4 } from 'uuid';

export interface SchoolVideo {
  url: string;
  title: string;
  thumbnail: string;
}

export interface UploadedMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
  uploadedAt: string;
}

export interface School {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  type: 'Maternelle' | 'Primaire' | 'Secondaire' | 'Complexe';
  address: string;
  city: string;
  province: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  founded: number;
  students: number;
  teachers: number;
  programs: string[];
  languages: string[];
  fees: { label: string; amount: string }[];
  rating: number;
  gallery: string[];
  videos: SchoolVideo[];
  features: string[];
  adminEmail: string;
  enrollmentOpen: boolean;
  isVisible: boolean;
  uploadedMedia: UploadedMedia[];
  admissionRequirements: string[];
}

export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  children: { name: string; dob: string; grade: string }[];
}

export interface SchoolAdmin {
  id: string;
  schoolId: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'staff';
  permissions: string[];
}

export interface Application {
  id: string;
  parentId: string;
  schoolId: string;
  childName: string;
  childDob: string;
  grade: string;
  status: 'pending' | 'review' | 'approved' | 'rejected';
  submittedAt: string;
  documents: { name: string; type: string; uploadedAt: string }[];
  notes: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderType: 'parent' | 'school';
  receiverId: string;
  receiverType: 'parent' | 'school';
  content: string;
  timestamp: string;
  read: boolean;
  applicationId?: string;
}

export interface Appointment {
  id: string;
  parentId: string;
  schoolId: string;
  date: string;
  time: string;
  type: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes: string;
}

export const schools: School[] = [
  {
    id: 'school-1',
    name: 'Lycée Léon Mba',
    logo: '🏫',
    coverImage: 'https://image.qwenlm.ai/generated-images/ce416082-bbcf-4291-997e-2a0c7d6faea4/_result.png',
    type: 'Secondaire',
    address: 'Boulevard Triomphal, Libreville',
    city: 'Libreville',
    province: 'Estuaire',
    phone: '+241 01 76 00 00',
    email: 'contact@lyceeleonmba.ga',
    website: 'www.lyceeleonmba.ga',
    description: 'Le Lycée Léon Mba est l\'un des établissements les plus prestigieux du Gabon. Fondé en 1960, il offre une éducation d\'excellence avec des programmes bilingues et une approche pédagogique innovante. Nos élèves excellent dans les examens nationaux et internationaux.',
    founded: 1960,
    students: 1200,
    teachers: 85,
    programs: ['Baccalauréat Général', 'Baccalauréat Technique', 'Programme Bilingue', 'Sciences', 'Lettres'],
    languages: ['Français', 'Anglais'],
    fees: [
      { label: 'Inscription', amount: '150 000 FCFA' },
      { label: 'Scolarité annuelle', amount: '800 000 FCFA' },
      { label: 'Cantine', amount: '120 000 FCFA' }
    ],
    rating: 4.8,
    gallery: [
      'https://image.qwenlm.ai/generated-images/ce416082-bbcf-4291-997e-2a0c7d6faea4/_result.png',
      'https://image.qwenlm.ai/generated-images/946dd4cf-67ba-4ad7-a42a-d299dade208a/_result.png',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80'
    ],
    features: ['Laboratoire de sciences', 'Bibliothèque numérique', 'Terrain de sport', 'Salle informatique', 'Cafétéria'],
    adminEmail: 'admin@lyceeleonmba.ga',
    enrollmentOpen: true,
    isVisible: true,
    uploadedMedia: [],
    videos: [
      { url: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Visite du Lycée Léon Mba', thumbnail: 'https://image.qwenlm.ai/generated-images/ce416082-bbcf-4291-997e-2a0c7d6faea4/_result.png' }
    ],
    admissionRequirements: ['Bulletins des 2 dernières années', 'Acte de naissance', 'Certificat de scolarité', 'Photos d\'identité (4)', 'Frais d\'inscription']
  },
  {
    id: 'school-2',
    name: 'École Internationale de Libreville',
    logo: '🌍',
    coverImage: 'https://image.qwenlm.ai/generated-images/946dd4cf-67ba-4ad7-a42a-d299dade208a/_result.png',
    type: 'Complexe',
    address: 'Quartier Batterie IV, Libreville',
    city: 'Libreville',
    province: 'Estuaire',
    phone: '+241 01 44 55 66',
    email: 'info@eil-gabon.ga',
    website: 'www.eil-gabon.ga',
    description: 'L\'École Internationale de Libreville propose un curriculum international de la maternelle au baccalauréat. Avec des enseignants certifiés et des installations modernes, nous préparons les élèves à devenir des citoyens du monde.',
    founded: 1995,
    students: 800,
    teachers: 65,
    programs: ['IB Primary Years', 'IB Middle Years', 'IB Diploma', 'Programme National'],
    languages: ['Français', 'Anglais', 'Espagnol'],
    fees: [
      { label: 'Inscription', amount: '250 000 FCFA' },
      { label: 'Scolarité annuelle', amount: '1 500 000 FCFA' },
      { label: 'Activités extrascolaires', amount: '200 000 FCFA' }
    ],
    rating: 4.9,
    gallery: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80'
    ],
    features: ['Piscine olympique', 'Studio de musique', 'Laboratoire robotique', 'Jardin pédagogique', 'Transport scolaire'],
    adminEmail: 'admin@eil-gabon.ga',
    enrollmentOpen: true,
    isVisible: true,
    uploadedMedia: [],
    videos: [
      { url: 'https://www.w3schools.com/html/mov_bbb.mp4', title: 'Découvrez notre campus', thumbnail: 'https://image.qwenlm.ai/generated-images/946dd4cf-67ba-4ad7-a42a-d299dade208a/_result.png' }
    ],
    admissionRequirements: ['Bulletins des 3 dernières années', 'Acte de naissance', 'Lettre de motivation', 'Entretien familial', 'Tests d\'admission']
  },
  {
    id: 'school-3',
    name: 'Complexe Scolaire Les Colombes',
    logo: '🕊️',
    coverImage: 'https://image.qwenlm.ai/generated-images/c96b7a06-b0a1-4715-bed6-00d66c38f737/_result.png',
    type: 'Complexe',
    address: 'Avenue du Colonel Parant, Port-Gentil',
    city: 'Port-Gentil',
    province: 'Ogooué-Maritime',
    phone: '+241 07 33 22 11',
    email: 'contact@colombes-pg.ga',
    website: 'www.colombes-pg.ga',
    description: 'Le Complexe Scolaire Les Colombes est un établissement catholique d\'excellence qui allie valeurs morales et rigueur académique. Depuis plus de 40 ans, nous formons les leaders de demain dans un environnement bienveillant.',
    founded: 1982,
    students: 600,
    teachers: 45,
    programs: ['Maternelle Montessori', 'Primaire', 'Collège', 'Lycée'],
    languages: ['Français', 'Anglais'],
    fees: [
      { label: 'Inscription', amount: '100 000 FCFA' },
      { label: 'Scolarité annuelle', amount: '600 000 FCFA' },
      { label: 'Uniforme', amount: '75 000 FCFA' }
    ],
    rating: 4.6,
    gallery: [
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80',
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80'
    ],
    features: ['Chapelle', 'Salle de musique', 'Terrain multisport', 'Infirmerie', 'Cantine bio'],
    adminEmail: 'admin@colombes-pg.ga',
    enrollmentOpen: true,
    isVisible: true,
    uploadedMedia: [],
    videos: [],
    admissionRequirements: ['Bulletins scolaires', 'Acte de baptême (facultatif)', 'Certificat médical', 'Photos d\'identité']
  },
  {
    id: 'school-4',
    name: 'École Primaire Les Pionniers',
    logo: '🌟',
    coverImage: 'https://image.qwenlm.ai/generated-images/ba972827-156a-4d74-a2d6-755ab1ebca58/_result.png',
    type: 'Primaire',
    address: 'Rue de la Paix, Franceville',
    city: 'Franceville',
    province: 'Haut-Ogooué',
    phone: '+241 06 55 44 33',
    email: 'info@pionniers-fv.ga',
    website: 'www.pionniers-fv.ga',
    description: 'L\'École Primaire Les Pionniers offre un enseignement de qualité basé sur la pédagogie active. Nos classes à effectifs réduits permettent un suivi personnalisé de chaque élève.',
    founded: 2005,
    students: 350,
    teachers: 25,
    programs: ['CP', 'CE1', 'CE2', 'CM1', 'CM2'],
    languages: ['Français', 'Anglais'],
    fees: [
      { label: 'Inscription', amount: '80 000 FCFA' },
      { label: 'Scolarité annuelle', amount: '450 000 FCFA' },
      { label: 'Fournitures', amount: '50 000 FCFA' }
    ],
    rating: 4.5,
    gallery: [
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80'
    ],
    features: ['Cour de récréation', 'Salle de jeux', 'Bibliothèque', 'Jardin scolaire', 'Salle informatique'],
    adminEmail: 'admin@pionniers-fv.ga',
    enrollmentOpen: true,
    isVisible: true,
    uploadedMedia: [],
    videos: [],
    admissionRequirements: ['Bulletin de l\'année en cours', 'Acte de naissance', 'Carnet de santé', 'Photos d\'identité (2)']
  },
  {
    id: 'school-5',
    name: 'Maternelle Les Petits Génies',
    logo: '🧒',
    coverImage: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800&q=80',
    type: 'Maternelle',
    address: 'Quartier Louis, Libreville',
    city: 'Libreville',
    province: 'Estuaire',
    phone: '+241 01 22 33 44',
    email: 'contact@petitsgenies.ga',
    website: 'www.petitsgenies.ga',
    description: 'La Maternelle Les Petits Génies accueille les enfants de 2 à 6 ans dans un environnement chaleureux et stimulant. Notre approche ludique favorise l\'éveil et le développement harmonieux de chaque enfant.',
    founded: 2010,
    students: 150,
    teachers: 15,
    programs: ['Petite Section', 'Moyenne Section', 'Grande Section', 'Préparatoire'],
    languages: ['Français', 'Anglais'],
    fees: [
      { label: 'Inscription', amount: '60 000 FCFA' },
      { label: 'Scolarité annuelle', amount: '350 000 FCFA' },
      { label: 'Goûter', amount: '45 000 FCFA' }
    ],
    rating: 4.7,
    gallery: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=600&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80'
    ],
    features: ['Aire de jeux', 'Salle de sieste', 'Salle de motricité', 'Jardin', 'Cantine'],
    adminEmail: 'admin@petitsgenies.ga',
    enrollmentOpen: false,
    isVisible: true,
    uploadedMedia: [],
    videos: [],
    admissionRequirements: ['Formulaire d\'inscription', 'Acte de naissance', 'Carnet de vaccination', 'Certificat médical']
  },
  {
    id: 'school-6',
    name: 'Collège Technique de Oyem',
    logo: '⚙️',
    coverImage: 'https://image.qwenlm.ai/generated-images/9ee8ef39-7e64-4c6b-8d00-aab1afce393f/_result.png',
    type: 'Secondaire',
    address: 'Avenue de la République, Oyem',
    city: 'Oyem',
    province: 'Woleu-Ntem',
    phone: '+241 07 88 99 00',
    email: 'info@collegetech-oyem.ga',
    website: 'www.collegetech-oyem.ga',
    description: 'Le Collège Technique de Oyem forme les futurs techniciens et ingénieurs du Gabon. Nos ateliers modernes et nos partenariats avec l\'industrie garantissent une formation pratique et de qualité.',
    founded: 1988,
    students: 500,
    teachers: 40,
    programs: ['CAP Électricité', 'CAP Mécanique', 'BTS Informatique', 'BTS Génie Civil'],
    languages: ['Français', 'Anglais'],
    fees: [
      { label: 'Inscription', amount: '120 000 FCFA' },
      { label: 'Scolarité annuelle', amount: '550 000 FCFA' },
      { label: 'Ateliers', amount: '100 000 FCFA' }
    ],
    rating: 4.4,
    gallery: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80'
    ],
    features: ['Atelier mécanique', 'Labo informatique', 'Salle de dessin technique', 'Gymnase', 'Internat'],
    adminEmail: 'admin@collegetech-oyem.ga',
    enrollmentOpen: true,
    isVisible: true,
    uploadedMedia: [],
    videos: [],
    admissionRequirements: ['Bulletin de la classe de Troisième', 'Acte de naissance', 'Certificat médical', 'Dossier scolaire complet']
  }
];

// Store utilities
const STORAGE_KEYS = {
  PARENTS: 'edugate_parents',
  SCHOOL_ADMINS: 'edugate_school_admins',
  APPLICATIONS: 'edugate_applications',
  MESSAGES: 'edugate_messages',
  APPOINTMENTS: 'edugate_appointments',
  CURRENT_USER: 'edugate_current_user'
};

export function getParents(): Parent[] {
  const data = localStorage.getItem(STORAGE_KEYS.PARENTS);
  return data ? JSON.parse(data) : [];
}

export function saveParents(parents: Parent[]) {
  localStorage.setItem(STORAGE_KEYS.PARENTS, JSON.stringify(parents));
}

export function getSchoolAdmins(): SchoolAdmin[] {
  const data = localStorage.getItem(STORAGE_KEYS.SCHOOL_ADMINS);
  if (data) return JSON.parse(data);
  // Initialize with default admins
  const defaults: SchoolAdmin[] = schools.map(s => ({
    id: uuidv4(),
    schoolId: s.id,
    name: `Admin ${s.name}`,
    email: s.adminEmail,
    password: 'admin123',
    role: 'admin' as const,
    permissions: ['all']
  }));
  localStorage.setItem(STORAGE_KEYS.SCHOOL_ADMINS, JSON.stringify(defaults));
  return defaults;
}

export function saveSchoolAdmins(admins: SchoolAdmin[]) {
  localStorage.setItem(STORAGE_KEYS.SCHOOL_ADMINS, JSON.stringify(admins));
}

export function getApplications(): Application[] {
  const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
  return data ? JSON.parse(data) : [];
}

export function saveApplications(apps: Application[]) {
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
}

export function getMessages(): Message[] {
  const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  return data ? JSON.parse(data) : [];
}

export function saveMessages(msgs: Message[]) {
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(msgs));
}

export function getAppointments(): Appointment[] {
  const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
  return data ? JSON.parse(data) : [];
}

export function saveAppointments(appts: Appointment[]) {
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appts));
}

export function getCurrentUser(): { type: 'parent' | 'school'; id: string } | null {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user: { type: 'parent' | 'school'; id: string } | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

export function generateId(): string {
  return uuidv4();
}

// School media management
export function getSchools(): School[] {
  const data = localStorage.getItem('edugate_schools_custom');
  if (data) {
    const custom = JSON.parse(data);
    // Merge custom data with defaults
    return schools.map(s => {
      const customSchool = custom.find((cs: School) => cs.id === s.id);
      return customSchool ? { ...s, ...customSchool } : s;
    });
  }
  return schools;
}

export function saveSchoolMedia(schoolId: string, media: UploadedMedia) {
  const data = localStorage.getItem('edugate_schools_custom');
  const custom = data ? JSON.parse(data) : [];
  const schoolIdx = custom.findIndex((s: School) => s.id === schoolId);
  
  if (schoolIdx >= 0) {
    custom[schoolIdx].uploadedMedia.push(media);
  } else {
    const school = schools.find(s => s.id === schoolId);
    if (school) {
      custom.push({ ...school, uploadedMedia: [media] });
    }
  }
  
  localStorage.setItem('edugate_schools_custom', JSON.stringify(custom));
}

export function removeSchoolMedia(schoolId: string, mediaId: string) {
  const data = localStorage.getItem('edugate_schools_custom');
  if (!data) return;
  
  const custom = JSON.parse(data);
  const schoolIdx = custom.findIndex((s: School) => s.id === schoolId);
  
  if (schoolIdx >= 0) {
    custom[schoolIdx].uploadedMedia = custom[schoolIdx].uploadedMedia.filter((m: UploadedMedia) => m.id !== mediaId);
    localStorage.setItem('edugate_schools_custom', JSON.stringify(custom));
  }
}

export function updateSchoolEnrollment(schoolId: string, enrollmentOpen: boolean) {
  const data = localStorage.getItem('edugate_schools_custom');
  const custom = data ? JSON.parse(data) : [];
  const schoolIdx = custom.findIndex((s: School) => s.id === schoolId);
  
  if (schoolIdx >= 0) {
    custom[schoolIdx].enrollmentOpen = enrollmentOpen;
  } else {
    const school = schools.find(s => s.id === schoolId);
    if (school) {
      custom.push({ ...school, enrollmentOpen });
    }
  }
  
  localStorage.setItem('edugate_schools_custom', JSON.stringify(custom));
}
