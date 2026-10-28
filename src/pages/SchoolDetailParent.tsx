import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Globe, Star, Users, BookOpen, 
  CheckCircle, ArrowLeft, Heart, Share2, GraduationCap
} from 'lucide-react';

export default function SchoolDetailParent() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('about');
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock data - in real app, fetch from API
  const school = {
    id: slug,
    name: 'Lycée Léon Mba',
    logo: '🏫',
    type: 'Secondaire',
    city: 'Libreville',
    rating: 4.8,
    students: 1200,
    teachers: 85,
    founded: 1960,
    enrollmentOpen: true,
    description: 'Le Lycée Léon Mba est l\'un des établissements les plus prestigieux du Gabon. Fondé en 1960, il offre une éducation d\'excellence avec des programmes bilingues et une approche pédagogique innovante.',
    programs: ['Baccalauréat Général', 'Baccalauréat Technique', 'Programme Bilingue'],
    fees: [
      { label: 'Inscription', amount: '150 000 FCFA' },
      { label: 'Scolarité annuelle', amount: '800 000 FCFA' }
    ],
    requirements: ['Bulletins des 2 dernières années', 'Acte de naissance', 'Photos d\'identité']
  };

  const tabs = [
    { id: 'about', label: 'À propos' },
    { id: 'programs', label: 'Programmes' },
    { id: 'admission', label: 'Admission' },
    { id: 'contact', label: 'Contact' }
  ];

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏫</div>
          <h2 className="text-2xl font-bold text-neutral-700">École non trouvée</h2>
          <Link to="/ecoles" className="mt-4 inline-flex items-center gap-2 text-gabon-green hover:text-gabon-green-dark">
            <ArrowLeft className="w-4 h-4" /> Retour aux écoles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/ecoles" className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900">
              <ArrowLeft className="w-4 h-4" />
              Retour aux écoles
            </Link>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isFollowing 
                    ? 'bg-gabon-yellow text-neutral-900' 
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFollowing ? 'fill-current' : ''}`} />
                {isFollowing ? 'Suivi' : 'Suivre'}
              </button>
              <Link 
                to="/parent/dashboard"
                className="btn-primary flex items-center gap-2 text-sm"
              >
                Postuler
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20">
        <div className="relative h-[400px] bg-gradient-to-br from-gabon-green/20 to-gabon-blue/20 flex items-center justify-center">
          <span className="text-9xl">{school.logo}</span>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`badge ${school.enrollmentOpen ? 'badge-success' : 'badge-error'}`}>
                    {school.enrollmentOpen ? '🟢 Inscriptions ouvertes' : '🔴 Inscriptions fermées'}
                  </span>
                  <span className="badge badge-neutral">
                    <Star className="w-4 h-4 text-gabon-yellow fill-gabon-yellow" />
                    {school.rating}/5
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-white font-display mb-4">
                  {school.name}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{school.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{school.students} élèves</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    <span>{school.type}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-[73px] z-40 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-gabon-green text-gabon-green'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* About */}
        {activeTab === 'about' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 font-display mb-6">À propos</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">{school.description}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="card-premium p-6 text-center">
                <div className="text-3xl font-bold gradient-text-green mb-2">{school.founded}</div>
                <div className="text-sm text-neutral-600">Année de fondation</div>
              </div>
              <div className="card-premium p-6 text-center">
                <div className="text-3xl font-bold gradient-text-blue mb-2">{school.students}</div>
                <div className="text-sm text-neutral-600">Élèves</div>
              </div>
              <div className="card-premium p-6 text-center">
                <div className="text-3xl font-bold gradient-text-gold mb-2">{school.teachers}</div>
                <div className="text-sm text-neutral-600">Enseignants</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Programs */}
        {activeTab === 'programs' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 font-display mb-6">Programmes</h2>
              <div className="space-y-4">
                {school.programs.map((program, i) => (
                  <div key={i} className="card-premium p-6">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-gabon-green" />
                      <span className="text-lg font-semibold text-neutral-900">{program}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-neutral-900 font-display mb-6">Frais de scolarité</h3>
              <div className="card-premium overflow-hidden">
                {school.fees.map((fee, i) => (
                  <div key={i} className={`flex justify-between items-center p-6 ${i > 0 ? 'border-t border-neutral-200' : ''}`}>
                    <span className="text-neutral-700 font-medium">{fee.label}</span>
                    <span className="text-xl font-bold text-gabon-green">{fee.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Admission */}
        {activeTab === 'admission' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 font-display mb-6">Conditions d'admission</h2>
              <div className="card-premium p-8">
                <ul className="space-y-4">
                  {school.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gabon-green/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-gabon-green">{i + 1}</span>
                      </div>
                      <span className="text-neutral-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {school.enrollmentOpen && (
              <div className="card-premium p-8 bg-gradient-to-br from-gabon-green/5 to-gabon-blue/5 border-gabon-green/20">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Prêt à postuler ?</h3>
                <p className="text-neutral-700 mb-6">
                  Rejoignez notre communauté d'excellence. Les inscriptions sont ouvertes.
                </p>
                <Link to="/parent/dashboard" className="btn-primary inline-flex items-center gap-2">
                  Commencer ma candidature
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Contact */}
        {activeTab === 'contact' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold text-neutral-900 font-display mb-8">Contact</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-premium p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gabon-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gabon-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Téléphone</h3>
                    <p className="text-neutral-600">+241 01 76 00 00</p>
                  </div>
                </div>
              </div>
              <div className="card-premium p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gabon-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gabon-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                    <p className="text-neutral-600">contact@lyceeleonmba.ga</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
