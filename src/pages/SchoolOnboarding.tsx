import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getSchools, saveSchools, getSchoolAdmins, saveSchoolAdmins, generateId, School, SchoolAdmin } from '../data/store';
import { GraduationCap, ArrowRight, CheckCircle, Clock } from 'lucide-react';

export default function SchoolOnboarding() {
  const [step, setStep] = useState(1);
  const [schoolName, setSchoolName] = useState('');
  const [schoolType, setSchoolType] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create school with pending status
    const newSchool: School = {
      id: generateId(),
      name: schoolName,
      logo: '🏫',
      coverImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
      type: schoolType as any,
      address,
      city,
      province: '',
      phone,
      email,
      website: '',
      description,
      founded: new Date().getFullYear(),
      students: 0,
      teachers: 0,
      programs: [],
      languages: ['Français'],
      fees: [],
      rating: 0,
      gallery: [],
      videos: [],
      features: [],
      adminEmail,
      enrollmentOpen: false,
      isVisible: false,
      isVerified: false,
      verificationStatus: 'pending',
      uploadedMedia: [],
      admissionRequirements: [],
      totalPlaces: 0,
      availablePlaces: 0,
      academicYear: '2025-2026'
    };

    const schools = getSchools();
    schools.push(newSchool);
    saveSchools(schools);

    // Create admin account
    const newAdmin: SchoolAdmin = {
      id: generateId(),
      schoolId: newSchool.id,
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'super_admin',
      permissions: ['all']
    };

    const admins = getSchoolAdmins();
    admins.push(newAdmin);
    saveSchoolAdmins(admins);

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Demande envoyée !</h2>
          <p className="text-neutral-600 mb-6">
            Votre école a été soumise pour vérification. Notre équipe va vérifier l'existence de votre établissement et vous recevrez une notification dès que votre page sera activée.
          </p>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Prochaine étape :</strong> Vous recevrez un email de confirmation avec vos identifiants de connexion une fois votre école vérifiée.
            </p>
          </div>
          <Link to="/" className="btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <GraduationCap className="w-8 h-8 text-emerald-600" />
          <span className="text-xl font-bold">EduGate</span>
        </Link>

        <div className="card-premium p-8">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Créer votre page école
          </h1>
          <p className="text-neutral-600 mb-6">
            Remplissez le formulaire ci-dessous. Votre école sera vérifiée par notre équipe avant d'être publiée.
          </p>

          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s ? 'bg-emerald-500 text-white' : 'bg-neutral-200 text-neutral-500'
                }`}>
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-20 h-1 mx-2 ${step > s ? 'bg-emerald-500' : 'bg-neutral-200'}`}></div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Nom de l'école
                  </label>
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Type d'établissement
                  </label>
                  <select
                    value={schoolType}
                    onChange={(e) => setSchoolType(e.target.value)}
                    className="input-premium"
                    required
                  >
                    <option value="">Sélectionner</option>
                    <option value="Maternelle">Maternelle</option>
                    <option value="Primaire">Primaire</option>
                    <option value="Secondaire">Secondaire</option>
                    <option value="Complexe">Complexe (Maternelle à Secondaire)</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  Suivant
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Ville
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Adresse complète
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email de contact
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg font-medium hover:bg-neutral-200"
                  >
                    Retour
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    Suivant
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Description de l'école
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-premium"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Nom du directeur/administrateur
                  </label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Email de connexion
                  </label>
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg font-medium hover:bg-neutral-200"
                  >
                    Retour
                  </button>
                  <button type="submit" className="flex-1 btn-primary flex items-center justify-center gap-2">
                    Soumettre
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
