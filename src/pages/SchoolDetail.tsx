import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Star, Users, BookOpen, Calendar, CheckCircle, ArrowLeft, Upload, Send } from 'lucide-react';
import { schools, getApplications, saveApplications, generateId } from '../data/store';

interface Props {
  user: { type: 'parent' | 'school'; id: string } | null;
}

export default function SchoolDetail({ user }: Props) {
  const { id } = useParams();
  const school = schools.find(s => s.id === id);
  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'gallery' | 'apply'>('overview');
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    childName: '',
    childDob: '',
    grade: '',
    notes: ''
  });

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏫</div>
          <h2 className="text-2xl font-bold text-gray-700">École non trouvée</h2>
          <Link to="/schools" className="mt-4 inline-flex items-center gap-2 text-forest-600 hover:text-forest-700">
            <ArrowLeft className="w-4 h-4" /> Retour aux écoles
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmitApplication = () => {
    if (!user || user.type !== 'parent') return;
    const apps = getApplications();
    apps.push({
      id: generateId(),
      parentId: user.id,
      schoolId: school.id,
      childName: formData.childName,
      childDob: formData.childDob,
      grade: formData.grade,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      documents: [],
      notes: formData.notes
    });
    saveApplications(apps);
    setApplicationSubmitted(true);
  };

  const tabs = [
    { id: 'overview', label: 'Aperçu' },
    { id: 'programs', label: 'Programmes' },
    { id: 'gallery', label: 'Galerie' },
    { id: 'apply', label: 'Inscription' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-72 sm:h-96">
        <img src={school.coverImage} alt={school.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-7xl mx-auto">
            <Link to="/schools" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4">
              <ArrowLeft className="w-4 h-4" /> Retour aux écoles
            </Link>
            <div className="flex items-end gap-4">
              <span className="text-5xl">{school.logo}</span>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white font-serif">{school.name}</h1>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-white/80 text-sm">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{school.city}, {school.province}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-gold-400 fill-gold-400" />{school.rating}/5</span>
                  <span className="px-2 py-0.5 bg-white/20 rounded-full">{school.type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-30 bg-white border-b border-forest-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-forest-600 text-forest-700'
                    : 'border-transparent text-gray-500 hover:text-forest-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold text-forest-800 mb-4">À propos</h2>
                <p className="text-gray-600 leading-relaxed mb-8">{school.description}</p>

                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  <div className="bg-forest-50 rounded-xl p-5 text-center">
                    <div className="text-2xl font-bold text-forest-700">{school.founded}</div>
                    <div className="text-sm text-gray-600">Année de fondation</div>
                  </div>
                  <div className="bg-forest-50 rounded-xl p-5 text-center">
                    <div className="text-2xl font-bold text-forest-700">{school.students}</div>
                    <div className="text-sm text-gray-600">Élèves</div>
                  </div>
                  <div className="bg-forest-50 rounded-xl p-5 text-center">
                    <div className="text-2xl font-bold text-forest-700">{school.teachers}</div>
                    <div className="text-sm text-gray-600">Enseignants</div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-forest-800 mb-4">Installations & Services</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {school.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-forest-500 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'programs' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold text-forest-800 mb-6">Programmes & Tarifs</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-forest-700 mb-3">Programmes offerts</h3>
                  <div className="flex flex-wrap gap-2">
                    {school.programs.map((p, i) => (
                      <span key={i} className="px-4 py-2 bg-forest-50 text-forest-700 rounded-lg text-sm font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-forest-700 mb-3">Langues d'enseignement</h3>
                  <div className="flex flex-wrap gap-2">
                    {school.languages.map((l, i) => (
                      <span key={i} className="px-4 py-2 bg-gold-400/10 text-gold-500 rounded-lg text-sm font-medium border border-gold-400/20">
                        🌐 {l}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-forest-700 mb-3">Frais de scolarité</h3>
                <div className="bg-white rounded-xl border border-forest-100 overflow-hidden">
                  {school.fees.map((fee, i) => (
                    <div key={i} className={`flex justify-between items-center p-4 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                      <span className="text-gray-700">{fee.label}</span>
                      <span className="font-semibold text-forest-700">{fee.amount}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'gallery' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold text-forest-800 mb-6">Galerie Photos</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {school.gallery.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="aspect-square rounded-xl overflow-hidden"
                    >
                      <img src={img} alt={`${school.name} ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'apply' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold text-forest-800 mb-6">Demande d'inscription</h2>
                
                {applicationSubmitted ? (
                  <div className="bg-forest-50 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-forest-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-forest-800">Demande envoyée !</h3>
                    <p className="text-gray-600 mt-2">Votre demande d'inscription a été soumise avec succès. Vous recevrez une réponse sous 48h.</p>
                    {user?.type === 'parent' && (
                      <Link to="/parent-dashboard" className="mt-4 inline-flex items-center gap-2 text-forest-600 font-medium hover:text-forest-700">
                        Voir mes demandes →
                      </Link>
                    )}
                  </div>
                ) : !user ? (
                  <div className="bg-ivory-100 rounded-xl p-8 text-center border border-forest-100">
                    <div className="text-4xl mb-4">🔐</div>
                    <h3 className="text-xl font-semibold text-forest-800">Connectez-vous pour postuler</h3>
                    <p className="text-gray-600 mt-2">Créez un compte ou connectez-vous pour soumettre une demande d'inscription.</p>
                    <Link to="/auth" className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-forest-600 text-white rounded-xl font-medium hover:bg-forest-700">
                      Se connecter
                    </Link>
                  </div>
                ) : user.type !== 'parent' ? (
                  <div className="bg-ivory-100 rounded-xl p-8 text-center border border-forest-100">
                    <p className="text-gray-600">Seuls les parents peuvent soumettre des demandes d'inscription.</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-forest-100 p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet de l'enfant</label>
                        <input
                          type="text"
                          value={formData.childName}
                          onChange={(e) => setFormData({...formData, childName: e.target.value})}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400"
                          placeholder="Ex: Marie Ngozi"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                          <input
                            type="date"
                            value={formData.childDob}
                            onChange={(e) => setFormData({...formData, childDob: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Classe souhaitée</label>
                          <select
                            value={formData.grade}
                            onChange={(e) => setFormData({...formData, grade: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400"
                          >
                            <option value="">Sélectionner...</option>
                            {school.programs.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Documents</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-forest-400 transition-colors cursor-pointer">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Glissez vos fichiers ici ou cliquez pour parcourir</p>
                          <p className="text-xs text-gray-400 mt-1">Acte de naissance, bulletins, photos d'identité...</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message (optionnel)</label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          rows={3}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400 resize-none"
                          placeholder="Informations complémentaires..."
                        />
                      </div>
                      <button
                        onClick={handleSubmitApplication}
                        disabled={!formData.childName || !formData.childDob || !formData.grade}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-forest-600 text-white rounded-xl font-semibold hover:bg-forest-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-forest-600/20"
                      >
                        <Send className="w-5 h-5" />
                        Soumettre la demande
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-xl border border-forest-100 p-6 shadow-sm">
                <h3 className="font-semibold text-forest-800 mb-4">Contact</h3>
                <div className="space-y-3">
                  <a href={`tel:${school.phone}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-forest-600">
                    <Phone className="w-4 h-4 text-forest-500" />
                    {school.phone}
                  </a>
                  <a href={`mailto:${school.email}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-forest-600">
                    <Mail className="w-4 h-4 text-forest-500" />
                    {school.email}
                  </a>
                  {school.website && (
                    <a href={`https://${school.website}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-forest-600">
                      <Globe className="w-4 h-4 text-forest-500" />
                      {school.website}
                    </a>
                  )}
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-forest-500 mt-0.5" />
                    {school.address}
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-xl border border-forest-100 p-6 shadow-sm">
                <h3 className="font-semibold text-forest-800 mb-4">Informations clés</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Type</span>
                    <span className="font-medium text-gray-700">{school.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Fondée en</span>
                    <span className="font-medium text-gray-700">{school.founded}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Élèves</span>
                    <span className="font-medium text-gray-700">{school.students}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Enseignants</span>
                    <span className="font-medium text-gray-700">{school.teachers}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Note</span>
                    <span className="font-medium text-gray-700 flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold-500 fill-gold-500" />{school.rating}/5
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => setActiveTab('apply')}
                className="w-full px-6 py-4 bg-gradient-to-r from-forest-600 to-forest-500 text-white rounded-xl font-semibold hover:from-forest-700 hover:to-forest-600 transition-all shadow-lg shadow-forest-600/20 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                S'inscrire maintenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
