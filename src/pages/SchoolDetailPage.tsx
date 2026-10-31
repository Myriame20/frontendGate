import { useParams, Link } from 'react-router-dom';
import { getSchools } from '../data/store';
import { ArrowLeft, MapPin, Phone, Mail, Globe, Star, Users, BookOpen, CheckCircle } from 'lucide-react';

export default function SchoolDetailPage() {
  const { schoolId } = useParams();
  const schools = getSchools();
  const school = schools.find(s => s.id === schoolId);

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏫</div>
          <h2 className="text-2xl font-bold text-neutral-700">École non trouvée</h2>
          <Link to="/schools" className="mt-4 inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
            <ArrowLeft className="w-4 h-4" /> Retour aux écoles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/schools" className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900">
              <ArrowLeft className="w-4 h-4" />
              Retour aux écoles
            </Link>
            <Link to={`/apply/${school.id}`} className="btn-primary text-sm">
              Postuler
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative h-96 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center">
        <span className="text-9xl">{school.logo}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className={`badge ${school.enrollmentOpen ? 'badge-success' : 'badge-error'}`}>
                {school.enrollmentOpen ? '🟢 Inscriptions ouvertes' : '🔴 Inscriptions fermées'}
              </span>
              <span className="badge badge-neutral">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                {school.rating}/5
              </span>
              {school.availablePlaces > 0 && (
                <span className="badge badge-success">
                  {school.availablePlaces} places disponibles
                </span>
              )}
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{school.name}</h1>
            <div className="flex items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{school.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{school.students} élèves</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">À propos</h2>
              <p className="text-neutral-600 leading-relaxed">{school.description}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Programmes</h3>
              <div className="flex flex-wrap gap-2">
                {school.programs.map((program, i) => (
                  <span key={i} className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
                    {program}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Conditions d'admission</h3>
              <ul className="space-y-3">
                {school.admissionRequirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-emerald-700">{i + 1}</span>
                    </div>
                    <span className="text-neutral-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card-premium p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Contact</h3>
              <div className="space-y-3">
                <a href={`tel:${school.phone}`} className="flex items-center gap-3 text-sm text-neutral-600 hover:text-emerald-600">
                  <Phone className="w-4 h-4" />
                  {school.phone}
                </a>
                <a href={`mailto:${school.email}`} className="flex items-center gap-3 text-sm text-neutral-600 hover:text-emerald-600">
                  <Mail className="w-4 h-4" />
                  {school.email}
                </a>
                <div className="flex items-start gap-3 text-sm text-neutral-600">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  {school.address}
                </div>
              </div>
            </div>

            <div className="card-premium p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Frais de scolarité</h3>
              <div className="space-y-3">
                {school.fees.map((fee, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-neutral-600">{fee.label}</span>
                    <span className="font-semibold text-neutral-900">{fee.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to={`/apply/${school.id}`}
              className="block w-full btn-primary text-center"
            >
              Postuler maintenant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
