import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, FileText, Settings, BarChart3, Bell, Search,
  Plus, MoreVertical, Mail, Shield, Edit, Trash2,
  GraduationCap, LogOut, Eye, CheckCircle, Clock, XCircle
} from 'lucide-react';

export default function SchoolDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const teamMembers = [
    { id: 1, name: 'Marie Ngozi', email: 'marie@ecole.ga', role: 'Super Admin', avatar: '👩‍💼', status: 'active' },
    { id: 2, name: 'Jean Mba', email: 'jean@ecole.ga', role: 'Admin', avatar: '👨‍💼', status: 'active' },
    { id: 3, name: 'Sophie Obame', email: 'sophie@ecole.ga', role: 'Secrétaire', avatar: '👩‍🏫', status: 'active' },
    { id: 4, name: 'Paul Ndong', email: 'paul@ecole.ga', role: 'Communication', avatar: '👨‍🎨', status: 'pending' }
  ];

  const applications = [
    { id: 1, childName: 'Emma Mba', grade: '6ème', status: 'pending', date: '2026-01-15' },
    { id: 2, childName: 'Lucas Obame', grade: 'CE2', status: 'approved', date: '2026-01-14' },
    { id: 3, childName: 'Sarah Ndong', grade: '3ème', status: 'review', date: '2026-01-13' },
    { id: 4, childName: 'Thomas Mve', grade: 'CP', status: 'pending', date: '2026-01-12' }
  ];

  const stats = [
    { label: 'Candidatures totales', value: '247', change: '+12%', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'En attente', value: '18', change: '+3', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Approuvées', value: '156', change: '+8%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Visites page', value: '3.2K', change: '+24%', icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50' }
  ];

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'applications', label: 'Candidatures', icon: FileText, count: 18 },
    { id: 'team', label: 'Équipe', icon: Users },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-neutral-200 hidden lg:block">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-gabon-green to-gabon-green-dark rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold gradient-text-green font-display">EduGate</span>
              <span className="text-xs text-neutral-500 block -mt-1">Dashboard</span>
            </div>
          </Link>

          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gabon-green/10 text-gabon-green'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
                {tab.count && (
                  <span className="ml-auto px-2 py-0.5 bg-forest-100 text-forest-700 text-xs font-semibold rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-neutral-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-gabon-green to-gabon-green-dark rounded-full flex items-center justify-center text-white font-semibold">
              MN
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-neutral-900 truncate">Marie Ngozi</div>
              <div className="text-xs text-neutral-500 truncate">Super Admin</div>
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
                  {activeTab === 'overview' && 'Vue d\'ensemble'}
                  {activeTab === 'applications' && 'Candidatures'}
                  {activeTab === 'team' && 'Gestion d\'équipe'}
                  {activeTab === 'settings' && 'Paramètres'}
                </h1>
                <p className="text-sm text-neutral-500 mt-1">
                  Lycée Léon Mba • Libreville
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                  <Link 
                    to="/ecole/editor"
                    className="btn-primary flex items-center gap-2 text-sm"
                  >                  <Edit className="w-4 h-4" />
                  Modifier ma page
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="card-premium p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                    </div>
                    <div className="text-3xl font-bold text-neutral-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Applications */}
              <div className="card-premium p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-neutral-900">Candidatures récentes</h2>
                  <button 
                    onClick={() => setActiveTab('applications')}
                    className="text-sm text-forest-600 hover:text-forest-700 font-medium"
                  >
                    Voir tout →
                  </button>
                </div>
                <div className="space-y-3">
                  {applications.slice(0, 4).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-forest-500 to-forest-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {app.childName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-neutral-900">{app.childName}</div>
                          <div className="text-sm text-neutral-500">{app.grade} • {new Date(app.date).toLocaleDateString('fr-FR')}</div>
                        </div>
                      </div>
                      <span className={`badge ${
                        app.status === 'approved' ? 'badge-success' :
                        app.status === 'pending' ? 'badge-warning' :
                        'badge-info'
                      }`}>
                        {app.status === 'approved' ? 'Approuvée' :
                         app.status === 'pending' ? 'En attente' : 'En révision'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card-premium p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">Toutes les candidatures</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="input-premium pl-10 py-2 text-sm w-64"
                  />
                </div>
              </div>
              <div className="space-y-3">
                {applications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-forest-500 to-forest-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {app.childName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900">{app.childName}</div>
                        <div className="text-sm text-neutral-500">{app.grade} • {new Date(app.date).toLocaleDateString('fr-FR')}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`badge ${
                        app.status === 'approved' ? 'badge-success' :
                        app.status === 'pending' ? 'badge-warning' :
                        'badge-info'
                      }`}>
                        {app.status === 'approved' ? 'Approuvée' :
                         app.status === 'pending' ? 'En attente' : 'En révision'}
                      </span>
                      <button className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="card-premium p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-900">Membres de l'équipe</h2>
                    <p className="text-sm text-neutral-500 mt-1">Gérez les accès et permissions de votre équipe</p>
                  </div>
                  <button className="btn-primary flex items-center gap-2 text-sm">
                    <Plus className="w-4 h-4" />
                    Inviter un membre
                  </button>
                </div>

                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-forest-500 to-forest-600 rounded-full flex items-center justify-center text-2xl">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-neutral-900">{member.name}</div>
                          <div className="text-sm text-neutral-500">{member.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-neutral-400" />
                          <span className="text-sm font-medium text-neutral-700">{member.role}</span>
                        </div>
                        <span className={`badge ${member.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                          {member.status === 'active' ? 'Actif' : 'En attente'}
                        </span>
                        <button className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roles Info */}
              <div className="card-premium p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Rôles et permissions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { role: 'Super Admin', desc: 'Tous les droits', icon: '👑' },
                    { role: 'Admin', desc: 'Gérer candidatures et équipe', icon: '🛡️' },
                    { role: 'Secrétaire', desc: 'Voir et traiter candidatures', icon: '📋' },
                    { role: 'Communication', desc: 'Gérer contenu et médias', icon: '📢' }
                  ].map((r, i) => (
                    <div key={i} className="p-4 bg-neutral-50 rounded-xl">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{r.icon}</span>
                        <span className="font-semibold text-neutral-900">{r.role}</span>
                      </div>
                      <p className="text-sm text-neutral-600">{r.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card-premium p-6"
            >
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Paramètres de l'école</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Nom de l'école</label>
                  <input type="text" defaultValue="Lycée Léon Mba" className="input-premium" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Email de contact</label>
                  <input type="email" defaultValue="contact@lyceeleonmba.ga" className="input-premium" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Téléphone</label>
                  <input type="tel" defaultValue="+241 01 76 00 00" className="input-premium" />
                </div>
                <button className="btn-primary">Enregistrer les modifications</button>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
