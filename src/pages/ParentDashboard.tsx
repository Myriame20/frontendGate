import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, MessageSquare, Calendar, Clock, CheckCircle, XCircle, 
  AlertCircle, Heart, GraduationCap, User, LogOut
} from 'lucide-react';

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState('applications');

  const applications = [
    { id: 1, schoolName: 'Lycée Léon Mba', childName: 'Emma Mba', grade: '6ème', status: 'pending', date: '2026-01-15' },
    { id: 2, schoolName: 'École Internationale de Libreville', childName: 'Lucas Obame', grade: 'CE2', status: 'approved', date: '2026-01-14' },
    { id: 3, schoolName: 'Complexe Scolaire Les Colombes', childName: 'Sarah Ndong', grade: '3ème', status: 'review', date: '2026-01-13' }
  ];

  const followedSchools = [
    { id: 1, name: 'Lycée Léon Mba', logo: '🏫', city: 'Libreville', rating: 4.8 },
    { id: 2, name: 'École Internationale de Libreville', logo: '🌍', city: 'Libreville', rating: 4.9 }
  ];

  const statusConfig = {
    pending: { icon: Clock, label: 'En attente', class: 'badge-warning' },
    review: { icon: AlertCircle, label: 'En révision', class: 'badge-info' },
    approved: { icon: CheckCircle, label: 'Approuvée', class: 'badge-success' },
    rejected: { icon: XCircle, label: 'Rejetée', class: 'badge-error' }
  };

  const tabs = [
    { id: 'applications', label: 'Mes candidatures', icon: FileText, count: applications.length },
    { id: 'favorites', label: 'Écoles suivies', icon: Heart, count: followedSchools.length },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: 2 },
    { id: 'appointments', label: 'Rendez-vous', icon: Calendar, count: 1 }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-neutral-200 hidden lg:block">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-gabon-blue to-gabon-blue-dark rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold gradient-text-blue font-display">EduGate</span>
              <span className="text-xs text-neutral-500 block -mt-1">Espace Parent</span>
            </div>
          </Link>

          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gabon-blue/10 text-gabon-blue'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
                {tab.count && tab.count > 0 && (
                  <span className="ml-auto px-2 py-0.5 bg-gabon-blue/20 text-gabon-blue text-xs font-semibold rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-neutral-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-gabon-blue to-gabon-blue-dark rounded-full flex items-center justify-center text-white font-semibold">
              MN
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-neutral-900 truncate">Marie Ngozi</div>
              <div className="text-xs text-neutral-500 truncate">Parent</div>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900 font-display">
                  Bonjour, Marie 👋
                </h1>
                <p className="text-sm text-neutral-500 mt-1">
                  Gérez vos candidatures et communiquez avec les écoles
                </p>
              </div>
              <Link 
                to="/ecoles"
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                Explorer les écoles
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="card-premium p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Mes candidatures</h2>
                {applications.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-700">Aucune candidature</h3>
                    <p className="text-neutral-500 mt-2">Explorez les écoles et soumettez votre première candidature</p>
                    <Link to="/ecoles" className="btn-primary inline-flex items-center gap-2 mt-6">
                      Explorer les écoles
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map((app) => {
                      const status = statusConfig[app.status as keyof typeof statusConfig];
                      return (
                        <div key={app.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                          <div className="flex-1">
                            <div className="font-semibold text-neutral-900">{app.schoolName}</div>
                            <div className="flex flex-wrap gap-3 mt-2 text-sm text-neutral-500">
                              <span>👤 {app.childName}</span>
                              <span>📚 {app.grade}</span>
                              <span>📅 {new Date(app.date).toLocaleDateString('fr-FR')}</span>
                            </div>
                          </div>
                          <span className={`badge ${status.class}`}>
                            <status.icon className="w-4 h-4" />
                            {status.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Favorites Tab */}
          {activeTab === 'favorites' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="card-premium p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Écoles suivies</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {followedSchools.map((school) => (
                    <Link key={school.id} to={`/ecole/${school.id}`} className="card-premium p-4 hover:border-gabon-blue transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-gabon-green/20 to-gabon-blue/20 rounded-xl flex items-center justify-center text-3xl">
                          {school.logo}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-900">{school.name}</h3>
                          <p className="text-sm text-neutral-500 mt-1">{school.city}</p>
                          <div className="flex items-center gap-1 mt-2">
                            <span className="text-gabon-yellow">★</span>
                            <span className="text-sm font-medium text-neutral-700">{school.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card-premium p-6"
            >
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Messages</h2>
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-700">Aucun message</h3>
                <p className="text-neutral-500 mt-2">Les messages des écoles apparaîtront ici</p>
              </div>
            </motion.div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card-premium p-6"
            >
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Rendez-vous</h2>
              <div className="space-y-4">
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-neutral-900">Lycée Léon Mba</div>
                      <div className="text-sm text-neutral-500 mt-1">
                        📅 20 janvier 2026 à 14h00 • Visite
                      </div>
                    </div>
                    <span className="badge badge-success">Confirmé</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
