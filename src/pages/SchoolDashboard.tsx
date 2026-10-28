import { useState, useEffect } from 'react';
import { getCurrentUser, getSchoolAdmins, getSchools, getApplications, saveApplications, School, Application } from '../data/store';
import { Link, useNavigate } from 'react-router-dom';
import { Users, FileText, Settings, BarChart3, CheckCircle, Clock, XCircle, Eye, GraduationCap } from 'lucide-react';

export default function SchoolDashboard() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [school, setSchool] = useState<School | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    if (!user || user.type !== 'school') {
      navigate('/');
      return;
    }
    const admins = getSchoolAdmins();
    const admin = admins.find(a => a.id === user.id);
    if (admin) {
      const schools = getSchools();
      const s = schools.find(sch => sch.id === admin.schoolId);
      setSchool(s || null);
      const apps = getApplications().filter(a => a.schoolId === admin.schoolId);
      setApplications(apps);
    }
  }, [user]);

  // Vérifier si l'école est validée
  const isSchoolVerified = school?.verificationStatus === 'verified';
  const isSchoolPending = school?.verificationStatus === 'pending';
  const isSchoolRejected = school?.verificationStatus === 'rejected';

  const handleUpdateStatus = (appId: string, status: 'approved' | 'rejected' | 'review') => {
    const apps = getApplications();
    const idx = apps.findIndex(a => a.id === appId);
    if (idx !== -1) {
      apps[idx].status = status;
      apps[idx].viewedBySchool = true;
      saveApplications(apps);
      setApplications(apps.filter(a => a.schoolId === school?.id));
      setSelectedApp(null);
    }
  };

  const handleViewApplication = (app: Application) => {
    const apps = getApplications();
    const idx = apps.findIndex(a => a.id === app.id);
    if (idx !== -1 && !apps[idx].viewedBySchool) {
      apps[idx].viewedBySchool = true;
      saveApplications(apps);
      setApplications(apps.filter(a => a.schoolId === school?.id));
    }
    setSelectedApp(app);
  };

  if (!school) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  // Écran d'attente si l'école n'est pas encore validée
  if (isSchoolPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center">
              {/* Icône animée */}
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
              </div>

              <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                Votre école est en cours de validation
              </h1>
              
              <p className="text-lg text-neutral-600 mb-8">
                Merci d'avoir créé votre page <strong>{school.name}</strong> ! 
                Notre équipe est en train de vérifier les informations fournies.
              </p>

              {/* Statut de validation */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-yellow-900 mb-2">Statut actuel</h3>
                    <ul className="space-y-2 text-sm text-yellow-800">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        Inscription reçue ✓
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                        Vérification en cours...
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-neutral-300 rounded-full"></span>
                        Publication de la page
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Délai estimé */}
              <div className="bg-neutral-50 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <svg className="w-6 h-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-lg font-semibold text-neutral-900">Délai estimé</span>
                </div>
                <p className="text-neutral-600">
                  La validation prend généralement <strong>24 à 48 heures</strong>. 
                  Vous recevrez une notification dès que votre page sera activée.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Actualiser le statut
                </button>
                
                <button
                  onClick={() => {
                    localStorage.removeItem('edugate_current_user');
                    navigate('/');
                  }}
                  className="w-full bg-neutral-100 text-neutral-700 py-3 px-6 rounded-xl font-semibold hover:bg-neutral-200 transition-all"
                >
                  Retour à l'accueil
                </button>
              </div>

              {/* Contact support */}
              <div className="mt-8 pt-6 border-t border-neutral-200">
                <p className="text-sm text-neutral-500">
                  Besoin d'aide ? Contactez-nous à{' '}
                  <a href="mailto:support@edugate.com" className="text-emerald-600 font-semibold hover:underline">
                    support@edugate.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Écran de rejet
  if (isSchoolRejected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>

              <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                Inscription non validée
              </h1>
              
              <p className="text-lg text-neutral-600 mb-8">
                Malheureusement, nous n'avons pas pu valider l'inscription de <strong>{school.name}</strong>.
              </p>

              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-semibold text-red-900 mb-3">Raisons possibles :</h3>
                <ul className="space-y-2 text-sm text-red-800">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Informations incomplètes ou incorrectes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Impossible de vérifier l'existence de l'établissement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Doublon avec une école déjà inscrite</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <Link
                  to="/school/onboarding"
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Soumettre une nouvelle inscription
                </Link>
                
                <a
                  href="mailto:support@edugate.com"
                  className="w-full block bg-neutral-100 text-neutral-700 py-3 px-6 rounded-xl font-semibold hover:bg-neutral-200 transition-all text-center"
                >
                  Contacter le support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Total candidatures', value: applications.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'En attente', value: applications.filter(a => a.status === 'pending').length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Approuvées', value: applications.filter(a => a.status === 'approved').length, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Places disponibles', value: school.availablePlaces, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-neutral-200 hidden lg:block">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <GraduationCap className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-bold">EduGate</span>
          </Link>
          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
              { id: 'applications', label: 'Candidatures', icon: FileText, count: applications.filter(a => a.status === 'pending').length },
              { id: 'students', label: 'Élèves', icon: Users },
              { id: 'settings', label: 'Paramètres', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id ? 'bg-emerald-50 text-emerald-700' : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
                {tab.count && tab.count > 0 && (
                  <span className="ml-auto px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">{school.name}</h1>
                <p className="text-sm text-neutral-500 mt-1">Année scolaire {school.academicYear}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <span className="text-sm font-semibold text-emerald-700">{school.availablePlaces} places</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="card-premium p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-neutral-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="card-premium p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Candidatures récentes</h2>
                <div className="space-y-3">
                  {applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                      <div>
                        <div className="font-semibold text-neutral-900">{app.childName}</div>
                        <div className="text-sm text-neutral-500">{app.grade} • {new Date(app.submittedAt).toLocaleDateString('fr-FR')}</div>
                      </div>
                      <span className={`badge ${
                        app.status === 'approved' ? 'badge-success' :
                        app.status === 'pending' ? 'badge-warning' :
                        app.status === 'review' ? 'badge-info' : 'badge-error'
                      }`}>
                        {app.status === 'approved' ? 'Approuvée' :
                         app.status === 'pending' ? 'En attente' :
                         app.status === 'review' ? 'En révision' : 'Rejetée'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="card-premium p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Toutes les candidatures</h2>
              {selectedApp ? (
                <div className="space-y-6">
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="text-sm text-emerald-600 hover:text-emerald-700"
                  >
                    ← Retour à la liste
                  </button>
                  <div className="p-6 bg-neutral-50 rounded-xl space-y-4">
                    <h3 className="text-lg font-semibold text-neutral-900">{selectedApp.childName}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-neutral-500">Date de naissance</label>
                        <div className="font-medium text-neutral-900">{new Date(selectedApp.childDob).toLocaleDateString('fr-FR')}</div>
                      </div>
                      <div>
                        <label className="text-sm text-neutral-500">Classe souhaitée</label>
                        <div className="font-medium text-neutral-900">{selectedApp.grade}</div>
                      </div>
                      <div>
                        <label className="text-sm text-neutral-500">Date de soumission</label>
                        <div className="font-medium text-neutral-900">{new Date(selectedApp.submittedAt).toLocaleDateString('fr-FR')}</div>
                      </div>
                      <div>
                        <label className="text-sm text-neutral-500">Dernière modification</label>
                        <div className="font-medium text-neutral-900">{new Date(selectedApp.lastModifiedAt).toLocaleDateString('fr-FR')}</div>
                      </div>
                    </div>
                    {selectedApp.notes && (
                      <div>
                        <label className="text-sm text-neutral-500">Notes</label>
                        <div className="font-medium text-neutral-900 mt-1 p-3 bg-white rounded-lg">{selectedApp.notes}</div>
                      </div>
                    )}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => handleUpdateStatus(selectedApp.id, 'approved')}
                        className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approuver
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedApp.id, 'review')}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        En révision
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedApp.id, 'rejected')}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Rejeter
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => handleViewApplication(app)}
                      className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {app.childName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-neutral-900">{app.childName}</div>
                          <div className="text-sm text-neutral-500">{app.grade} • {new Date(app.submittedAt).toLocaleDateString('fr-FR')}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {!app.viewedBySchool && (
                          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        )}
                        <span className={`badge ${
                          app.status === 'approved' ? 'badge-success' :
                          app.status === 'pending' ? 'badge-warning' :
                          app.status === 'review' ? 'badge-info' : 'badge-error'
                        }`}>
                          {app.status === 'approved' ? 'Approuvée' :
                           app.status === 'pending' ? 'En attente' :
                           app.status === 'review' ? 'En révision' : 'Rejetée'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'students' && (
            <div className="card-premium p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Gestion des élèves</h2>
              <p className="text-neutral-600">Fonctionnalité à venir : dossiers annuels, résultats, classement</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="card-premium p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Paramètres de l'école</h2>
              <p className="text-neutral-600">Fonctionnalité à venir : édition de la page école</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
