import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Globe, Star, Users, BookOpen, 
  CheckCircle, Calendar, Award, ArrowRight, Share2, Heart,
  GraduationCap, Menu, X
} from 'lucide-react';

export default function PublicSchoolPage() {
  const [activeTab, setActiveTab] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'about', label: 'À propos' },
    { id: 'programs', label: 'Programmes' },
    { id: 'gallery', label: 'Galerie' },
    { id: 'admission', label: 'Admission' },
    { id: 'contact', label: 'Contact' }
  ];

  const programs = [
    { name: 'Baccalauréat Général', duration: '3 ans', level: 'Secondaire' },
    { name: 'Baccalauréat Technique', duration: '3 ans', level: 'Secondaire' },
    { name: 'Programme Bilingue', duration: '6 ans', level: 'Collège + Lycée' },
    { name: 'Sciences', duration: '3 ans', level: 'Lycée' },
    { name: 'Lettres', duration: '3 ans', level: 'Lycée' }
  ];

  const gallery = [
    'https://image.qwenlm.ai/generated-images/c28b9e62-c6ed-4743-82c9-f42f6275c29d/_result.png',
    'https://image.qwenlm.ai/generated-images/b194f47a-30d9-40b1-89c3-52b11324f0a2/_result.png',
    'https://image.qwenlm.ai/generated-images/76a667f5-7301-45e9-8a11-b745ff65f955/_result.png'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-forest-600 to-forest-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏫</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-900 font-display">Lycée Léon Mba</h1>
                <p className="text-xs text-neutral-500">Libreville, Gabon</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-forest-600'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
                <Heart className="w-4 h-4" />
                Suivre
              </button>
              <Link 
                to="/onboarding"
                className="btn-primary flex items-center gap-2 text-sm"
              >
                Postuler
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button 
                className="md:hidden p-2 text-neutral-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white">
            <div className="px-6 py-4 space-y-3">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                    activeTab === tab.id
                      ? 'bg-forest-50 text-forest-700'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20">
        <div className="relative h-[500px] overflow-hidden">
          <img 
            src="https://image.qwenlm.ai/generated-images/c28b9e62-c6ed-4743-82c9-f42f6275c29d/_result.png"
            alt="Lycée Léon Mba"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="badge badge-success">
                    <CheckCircle className="w-4 h-4" />
                    Inscriptions ouvertes
                  </span>
                  <span className="badge badge-neutral">
                    <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                    4.8/5
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display mb-4">
                  Lycée Léon Mba
                </h1>
                <p className="text-xl text-neutral-200 max-w-2xl">
                  Excellence éducative depuis 1960. Formant les leaders de demain avec une approche pédagogique innovante.
                </p>
                <div className="flex flex-wrap items-center gap-6 mt-6 text-neutral-200">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>Libreville, Estuaire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>1 200 élèves</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    <span>Secondaire</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* About Section */}
        {activeTab === 'about' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 font-display mb-6">
                À propos de notre école
              </h2>
              <div className="prose prose-lg max-w-none text-neutral-600 leading-relaxed">
                <p className="mb-4">
                  Le Lycée Léon Mba est l'un des établissements les plus prestigieux du Gabon. Fondé en 1960, 
                  il offre une éducation d'excellence avec des programmes bilingues et une approche pédagogique innovante.
                </p>
                <p>
                  Nos élèves excellent dans les examens nationaux et internationaux. Nous formons les leaders 
                  de demain dans un environnement bienveillant et stimulant.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: 'Année de fondation', value: '1960', icon: Calendar },
                { label: 'Élèves', value: '1 200', icon: Users },
                { label: 'Enseignants', value: '85', icon: Award }
              ].map((stat, i) => (
                <div key={i} className="card-premium p-6 text-center">
                  <stat.icon className="w-8 h-8 text-forest-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-neutral-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-neutral-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-2xl font-bold text-neutral-900 font-display mb-6">
                Nos valeurs
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {['Excellence', 'Innovation', 'Respect', 'Intégrité'].map((value, i) => (
                  <div key={i} className="card-premium p-6 text-center">
                    <div className="w-12 h-12 bg-forest-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-forest-600" />
                    </div>
                    <div className="font-semibold text-neutral-900">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Programs Section */}
        {activeTab === 'programs' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 font-display mb-6">
                Programmes offerts
              </h2>
              <div className="space-y-4">
                {programs.map((program, i) => (
                  <div key={i} className="card-premium p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-neutral-900 mb-2">{program.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-neutral-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {program.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {program.level}
                          </span>
                        </div>
                      </div>
                      <button className="btn-primary text-sm">
                        En savoir plus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-neutral-900 font-display mb-6">
                Frais de scolarité
              </h3>
              <div className="card-premium overflow-hidden">
                {[
                  { label: 'Inscription', amount: '150 000 FCFA' },
                  { label: 'Scolarité annuelle', amount: '800 000 FCFA' },
                  { label: 'Cantine', amount: '120 000 FCFA' }
                ].map((fee, i) => (
                  <div key={i} className={`flex justify-between items-center p-6 ${i > 0 ? 'border-t border-neutral-200' : ''}`}>
                    <span className="text-neutral-700 font-medium">{fee.label}</span>
                    <span className="text-xl font-bold text-forest-600">{fee.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Gallery Section */}
        {activeTab === 'gallery' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-3xl font-bold text-neutral-900 font-display mb-8">
              Galerie photos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="aspect-square rounded-xl overflow-hidden group cursor-pointer"
                >
                  <img 
                    src={img} 
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Admission Section */}
        {activeTab === 'admission' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 font-display mb-6">
                Conditions d'admission
              </h2>
              <div className="card-premium p-8">
                <ul className="space-y-4">
                  {[
                    'Bulletins des 2 dernières années',
                    'Acte de naissance',
                    'Certificat de scolarité',
                    'Photos d\'identité (4)',
                    'Frais d\'inscription'
                  ].map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-forest-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-forest-700">{i + 1}</span>
                      </div>
                      <span className="text-neutral-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card-premium p-8 bg-gradient-to-br from-forest-50 to-forest-100 border-forest-200">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Prêt à postuler ?
              </h3>
              <p className="text-neutral-700 mb-6">
                Rejoignez notre communauté d'excellence. Les inscriptions sont ouvertes pour l'année scolaire 2026-2027.
              </p>
              <Link 
                to="/onboarding"
                className="btn-primary inline-flex items-center gap-2"
              >
                Commencer ma candidature
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Contact Section */}
        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-3xl font-bold text-neutral-900 font-display mb-8">
              Contactez-nous
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-forest-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-forest-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Adresse</h3>
                      <p className="text-neutral-600">Boulevard Triomphal<br />Libreville, Gabon</p>
                    </div>
                  </div>
                </div>

                <div className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-forest-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-forest-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Téléphone</h3>
                      <p className="text-neutral-600">+241 01 76 00 00</p>
                    </div>
                  </div>
                </div>

                <div className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-forest-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-forest-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Email</h3>
                      <p className="text-neutral-600">contact@lyceeleonmba.ga</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-premium p-6">
                <h3 className="font-semibold text-neutral-900 mb-4">Horaires d'ouverture</h3>
                <div className="space-y-3">
                  {[
                    { day: 'Lundi - Vendredi', hours: '07h30 - 17h00' },
                    { day: 'Samedi', hours: '08h00 - 12h00' },
                    { day: 'Dimanche', hours: 'Fermé' }
                  ].map((schedule, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-neutral-100 last:border-0">
                      <span className="text-neutral-700">{schedule.day}</span>
                      <span className="font-medium text-neutral-900">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-neutral-500">
            © 2026 Lycée Léon Mba. Propulsé par{' '}
            <Link to="/" className="text-forest-600 hover:text-forest-700 font-medium">
              EduGate Gabon
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
