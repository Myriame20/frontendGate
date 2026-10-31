import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSchools, getApplications, saveApplications, getCurrentUser, generateId, updateAvailablePlaces } from '../data/store';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function ApplicationForm() {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const schools = getSchools();
  const school = schools.find(s => s.id === schoolId);
  const user = getCurrentUser();

  const [childName, setChildName] = useState('');
  const [childDob, setChildDob] = useState('');
  const [grade, setGrade] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏫</div>
          <h2 className="text-2xl font-bold text-neutral-700">École non trouvée</h2>
          <Link to="/schools" className="mt-4 inline-flex items-center gap-2 text-emerald-600">
            <ArrowLeft className="w-4 h-4" /> Retour aux écoles
          </Link>
        </div>
      </div>
    );
  }

  if (!user || user.type !== 'parent') {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-neutral-700 mb-4">Connexion requise</h2>
          <p className="text-neutral-600 mb-6">Vous devez être connecté en tant que parent pour postuler.</p>
          <Link to="/parent/auth" className="btn-primary">
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  if (school.availablePlaces === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-neutral-700 mb-4">Plus de places disponibles</h2>
          <p className="text-neutral-600 mb-6">Désolé, cette école n'a plus de places disponibles pour le moment.</p>
          <Link to="/schools" className="btn-primary">
            Voir d'autres écoles
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const apps = getApplications();
    const newApp = {
      id: generateId(),
      parentId: user.id,
      schoolId: school.id,
      childName,
      childDob,
      grade,
      status: 'pending' as const,
      submittedAt: new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
      viewedBySchool: false,
      documents: [],
      notes,
      academicYear: school.academicYear
    };
    apps.push(newApp);
    saveApplications(apps);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Demande envoyée !</h2>
          <p className="text-neutral-600 mb-6">
            Votre demande d'inscription a été soumise avec succès. Vous serez notifié dès que l'école l'aura consultée.
          </p>
          <Link to="/parent/dashboard" className="btn-primary">
            Voir mes demandes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <Link to={`/schools/${school.id}`} className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'école
        </Link>

        <div className="card-premium p-8">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Postuler à {school.name}
          </h1>
          <p className="text-neutral-600 mb-6">
            Remplissez le formulaire ci-dessous pour soumettre votre demande d'inscription.
          </p>

          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-emerald-700">
              <CheckCircle className="w-5 h-5" />
              <span><strong>{school.availablePlaces}</strong> places disponibles</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Nom complet de l'enfant
              </label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="input-premium"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Date de naissance
              </label>
              <input
                type="date"
                value={childDob}
                onChange={(e) => setChildDob(e.target.value)}
                className="input-premium"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Classe souhaitée
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="input-premium"
                required
              >
                <option value="">Sélectionner une classe</option>
                {school.programs.map((program, i) => (
                  <option key={i} value={program}>{program}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Notes supplémentaires (optionnel)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="input-premium"
                rows={4}
                placeholder="Informations complémentaires..."
              />
            </div>

            <button type="submit" className="w-full btn-primary">
              Soumettre la demande
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
