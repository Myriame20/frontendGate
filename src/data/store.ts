import { v4 as uuidv4 } from 'uuid';

// Types
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
  isVerified: boolean; // Validation par l'admin de la plateforme
  verificationStatus: 'pending' | 'verified' | 'rejected';
  uploadedMedia: UploadedMedia[];
  admissionRequirements: string[];
  totalPlaces: number; // Nombre total de places pour l'année
  availablePlaces: number; // Places restantes en temps réel
  academicYear: string; // Année scolaire en cours
}

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
  role: 'super_admin' | 'admin' | 'secretary' | 'communication';
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
  lastModifiedAt: string;
  viewedBySchool: boolean; // L'école a-t-elle consulté cette demande ?
  documents: { name: string; type: string; uploadedAt: string }[];
  notes: string;
  academicYear: string;
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

export interface AcademicYear {
  id: string;
  schoolId: string;
  year: string; // Ex: "2025-2026"
  totalStudents: number;
  studentsByClass: Record<string, Student[]>;
  results: ClassResult[];
  isOpen: boolean;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  results: { subject: string; grade: string; score: number }[];
  average: number;
  status: 'active' | 'transferred' | 'expelled';
}

export interface ClassResult {
  className: string;
  totalStudents: number;
  passed: number;
  failed: number;
  averageScore: number;
  passRate: number;
  topStudent: { name: string; average: number };
}

// Données initiales
export const initialSchools: School[] = [
  {
    id: 'school-1',
    name: 'Lycée Léon Mba',
    logo: '🏫',
    coverImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    type: 'Secondaire',
    address: 'Boulevard Triomphal, Libreville',
    city: 'Libreville',
    province: 'Estuaire',
    phone: '+241 01 76 00 00',
    email: 'contact@lyceeleonmba.ga',
    website: 'www.lyceeleonmba.ga',
    description: 'Le Lycée Léon Mba est l\'un des établissements les plus prestigieux du Gabon. Fondé en 1960, il offre une éducation d\'excellence avec des programmes bilingues et une approche pédagogique innovante.',
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
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80'
    ],
    videos: [],
    features: ['Laboratoire de sciences', 'Bibliothèque numérique', 'Terrain de sport', 'Salle informatique', 'Cafétéria'],
    adminEmail: 'admin@lyceeleonmba.ga',
    enrollmentOpen: true,
    isVisible: true,
    isVerified: true,
    verificationStatus: 'verified',
    uploadedMedia: [],
    admissionRequirements: ['Bulletins des 2 dernières années', 'Acte de naissance', 'Certificat de scolarité', 'Photos d\'identité (4)', 'Frais d\'inscription'],
    totalPlaces: 100,
    availablePlaces: 23,
    academicYear: '2025-2026'
  },
  {
    id: 'school-2',
    name: 'École Internationale de Libreville',
    logo: '🌍',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    type: 'Complexe',
    address: 'Quartier Batterie IV, Libreville',
    city: 'Libreville',
    province: 'Estuaire',
    phone: '+241 01 44 55 66',
    email: 'info@eil-gabon.ga',
    website: 'www.eil-gabon.ga',
    description: 'L\'École Internationale de Libreville propose un curriculum international de la maternelle au baccalauréat.',
    founded: 1995,
    students: 800,
    teachers: 65,
    programs: ['IB Primary Years', 'IB Middle Years', 'IB Diploma', 'Programme National'],
    languages: ['Français', 'Anglais', 'Espagnol'],
    fees: [
      { label: 'Inscription', amount: '250 000 FCFA' },
      { label: 'Scolarité annuelle', amount: '1 500 000 FCFA' }
    ],
    rating: 4.9,
    gallery: [],
    videos: [],
    features: ['Piscine olympique', 'Studio de musique', 'Laboratoire robotique'],
    adminEmail: 'admin@eil-gabon.ga',
    enrollmentOpen: true,
    isVisible: true,
    isVerified: true,
    verificationStatus: 'verified',
    uploadedMedia: [],
    admissionRequirements: ['Bulletins des 3 dernières années', 'Acte de naissance', 'Lettre de motivation', 'Entretien familial'],
    totalPlaces: 80,
    availablePlaces: 12,
    academicYear: '2025-2026'
  },
  {
    id: 'school-3',
    name: 'Complexe Scolaire Les Colombes',
    logo: '🕊️',
    coverImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80',
    type: 'Complexe',
    address: 'Avenue du Colonel Parant, Port-Gentil',
    city: 'Port-Gentil',
    province: 'Ogooué-Maritime',
    phone: '+241 07 33 22 11',
    email: 'contact@colombes-pg.ga',
    website: 'www.colombes-pg.ga',
    description: 'Le Complexe Scolaire Les Colombes est un établissement catholique d\'excellence.',
    founded: 1982,
    students: 600,
    teachers: 45,
    programs: ['Maternelle Montessori', 'Primaire', 'Collège', 'Lycée'],
    languages: ['Français', 'Anglais'],
    fees: [
      { label: 'Inscription', amount: '100 000 FCFA' },
      { label: 'Scolarité annuelle', amount: '600 000 FCFA' }
    ],
    rating: 4.6,
    gallery: [],
    videos: [],
    features: ['Chapelle', 'Salle de musique', 'Terrain multisport'],
    adminEmail: 'admin@colombes-pg.ga',
    enrollmentOpen: true,
    isVisible: true,
    isVerified: true,
    verificationStatus: 'verified',
    uploadedMedia: [],
    admissionRequirements: ['Bulletins scolaires', 'Acte de baptême (facultatif)', 'Certificat médical'],
    totalPlaces: 60,
    availablePlaces: 8,
    academicYear: '2025-2026'
  }
];

// Storage utilities
const STORAGE_KEYS = {
  SCHOOLS: 'edugate_schools',
  PARENTS: 'edugate_parents',
  SCHOOL_ADMINS: 'edugate_school_admins',
  APPLICATIONS: 'edugate_applications',
  MESSAGES: 'edugate_messages',
  APPOINTMENTS: 'edugate_appointments',
  ACADEMIC_YEARS: 'edugate_academic_years',
  CURRENT_USER: 'edugate_current_user'
};

export function getSchools(): School[] {
  const data = localStorage.getItem(STORAGE_KEYS.SCHOOLS);
  if (data) return JSON.parse(data);
  
  // Initialize with default schools
  localStorage.setItem(STORAGE_KEYS.SCHOOLS, JSON.stringify(initialSchools));
  return initialSchools;
}

export function saveSchools(schools: School[]) {
  localStorage.setItem(STORAGE_KEYS.SCHOOLS, JSON.stringify(schools));
}

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
  const schools = getSchools();
  const defaults: SchoolAdmin[] = schools.map(s => ({
    id: uuidv4(),
    schoolId: s.id,
    name: `Admin ${s.name}`,
    email: s.adminEmail,
    password: 'admin123',
    role: 'super_admin' as const,
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

export function getAcademicYears(): AcademicYear[] {
  const data = localStorage.getItem(STORAGE_KEYS.ACADEMIC_YEARS);
  return data ? JSON.parse(data) : [];
}

export function saveAcademicYears(years: AcademicYear[]) {
  localStorage.setItem(STORAGE_KEYS.ACADEMIC_YEARS, JSON.stringify(years));
}

export function getCurrentUser(): { type: 'parent' | 'school' | 'platform_admin'; id: string } | null {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
}

export function setCurrentUser(user: { type: 'parent' | 'school' | 'platform_admin'; id: string } | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

export function generateId(): string {
  return uuidv4();
}

// Update available places when application is approved/rejected
export function updateAvailablePlaces(schoolId: string, approved: boolean) {
  const schools = getSchools();
  const school = schools.find(s => s.id === schoolId);
  if (school && approved) {
    school.availablePlaces = Math.max(0, school.availablePlaces - 1);
    saveSchools(schools);
  }
}

// Release place when student is expelled/transferred
export function releasePlace(schoolId: string) {
  const schools = getSchools();
  const school = schools.find(s => s.id === schoolId);
  if (school) {
    school.availablePlaces += 1;
    saveSchools(schools);
  }
}
