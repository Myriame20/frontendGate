import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ArrowLeft, Check, Building2, User, Mail, 
  Phone, MapPin, GraduationCap, Sparkles
} from 'lucide-react';

export default function SchoolOnboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    schoolName: '',
    email: '',
    phone: '',
    directorName: '',
    directorEmail: '',
    city: '',
    type: '',
    description: ''
  });

  const steps = [
    { num: 1, title: 'Informations école' },
    { num: 2, title: 'Directeur' },
    { num: 3, title: 'Localisation' },
    { num: 4, title: 'Confirmation' }
  ];

  const schoolTypes = [
    'Maternelle',
    'Primaire',
    'Secondaire',
    'Complexe (Maternelle à Secondaire)',
    'Technique',
    'International'
  ];

  const cities = [
    'Libreville', 'Port-Gentil', 'Franceville', 'Oyem', 
    'Moanda', 'Lambaréné', 'Mouila', 'Tchibanga'
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-forest-600 to-forest-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text font-display">EduGate</span>
                <span className="text-xs text-neutral-500 block -mt-1">Gabon</span>
              </div>
            </Link>
            <div className="text-sm text-neutral-600">
              Déjà inscrit ?{' '}
              <Link to="/dashboard" className="text-forest-600 font-medium hover:text-forest-700">
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= s.num 
                      ? 'bg-gradient-to-br from-forest-600 to-forest-500 text-white shadow-lg shadow-forest-600/20' 
                      : 'bg-neutral-100 text-neutral-400'
                  }`}>
                    {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${
                    step >= s.num ? 'text-neutral-900' : 'text-neutral-400'
                  }`}>
                    {s.title}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 transition-all ${
                    step > s.num ? 'bg-forest-500' : 'bg-neutral-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: School Info */}
            {step === 1 && (
              <div className="card-premium p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-neutral-900 font-display">
                    Informations de l'école
                  </h2>
                  <p className="text-neutral-600 mt-2">
                    Commençons par les informations de base de votre établissement.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Nom de l'école *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="text"
                        value={formData.schoolName}
                        onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                        className="input-premium pl-12"
                        placeholder="Ex: Lycée Léon Mba"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Type d'établissement *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="input-premium"
                    >
                      <option value="">Sélectionner un type</option>
                      {schoolTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email de contact *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="input-premium pl-12"
                        placeholder="contact@ecole.ga"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Téléphone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="input-premium pl-12"
                        placeholder="+241 01 00 00 00"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Director Info */}
            {step === 2 && (
              <div className="card-premium p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-neutral-900 font-display">
                    Informations du directeur
                  </h2>
                  <p className="text-neutral-600 mt-2">
                    Le directeur sera le super administrateur de votre page école.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Nom complet du directeur *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="text"
                        value={formData.directorName}
                        onChange={(e) => setFormData({...formData, directorName: e.target.value})}
                        className="input-premium pl-12"
                        placeholder="Ex: Jean-Baptiste Mba"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email du directeur *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="email"
                        value={formData.directorEmail}
                        onChange={(e) => setFormData({...formData, directorEmail: e.target.value})}
                        className="input-premium pl-12"
                        placeholder="directeur@ecole.ga"
                      />
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                      Un email de vérification sera envoyé à cette adresse.
                    </p>
                  </div>

                  <div className="p-4 bg-forest-50 border border-forest-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-forest-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-forest-900 text-sm">Super Administrateur</h4>
                        <p className="text-sm text-forest-700 mt-1">
                          Le directeur aura tous les droits : gérer l'équipe, modifier la page, 
                          voir les candidatures, etc.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <div className="card-premium p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-neutral-900 font-display">
                    Localisation
                  </h2>
                  <p className="text-neutral-600 mt-2">
                    Où se trouve votre établissement ?
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Ville *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="input-premium pl-12"
                      >
                        <option value="">Sélectionner une ville</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Description de l'école
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      className="input-premium resize-none"
                      placeholder="Présentez votre école en quelques lignes..."
                    />
                    <p className="text-xs text-neutral-500 mt-2">
                      Cette description apparaîtra sur votre page publique.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="card-premium p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-neutral-900 font-display">
                    Confirmation
                  </h2>
                  <p className="text-neutral-600 mt-2">
                    Vérifiez les informations avant de créer votre page.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-neutral-50 rounded-xl space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm text-neutral-500">École</div>
                        <div className="font-semibold text-neutral-900">{formData.schoolName || '—'}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-neutral-500">Type</div>
                        <div className="font-semibold text-neutral-900">{formData.type || '—'}</div>
                      </div>
                    </div>
                    <div className="border-t border-neutral-200 pt-4">
                      <div className="text-sm text-neutral-500">Directeur</div>
                      <div className="font-semibold text-neutral-900">{formData.directorName || '—'}</div>
                      <div className="text-sm text-neutral-600">{formData.directorEmail || '—'}</div>
                    </div>
                    <div className="border-t border-neutral-200 pt-4">
                      <div className="text-sm text-neutral-500">Contact</div>
                      <div className="font-semibold text-neutral-900">{formData.email || '—'}</div>
                      <div className="text-sm text-neutral-600">{formData.phone || '—'}</div>
                    </div>
                    <div className="border-t border-neutral-200 pt-4">
                      <div className="text-sm text-neutral-500">Ville</div>
                      <div className="font-semibold text-neutral-900">{formData.city || '—'}</div>
                    </div>
                  </div>

                  <div className="p-4 bg-forest-50 border border-forest-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-forest-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-forest-900 text-sm">Plan Gratuit</h4>
                        <p className="text-sm text-forest-700 mt-1">
                          Vous commencez avec le plan gratuit. Vous pourrez upgrader à tout moment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className="flex items-center gap-2 px-6 py-3 text-neutral-700 hover:text-neutral-900 disabled:opacity-0 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Précédent
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="btn-primary flex items-center gap-2"
            >
              Suivant
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <Link
              to="/dashboard"
              className="btn-primary flex items-center gap-2"
            >
              Créer ma page
              <Sparkles className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
