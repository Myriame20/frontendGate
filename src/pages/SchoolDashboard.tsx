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
