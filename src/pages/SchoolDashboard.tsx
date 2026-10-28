import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, MessageSquare, Settings, CheckCircle, XCircle, Clock, AlertCircle, Send, Building2, UserCheck, Shield } from 'lucide-react';
import { getSchoolAdmins, getApplications, saveApplications, getMessages, saveMessages, schools, generateId, type Application, type Message } from '../data/store';

interface Props {
  adminId: string;
}

export default function SchoolDashboard({ adminId }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'messages' | 'profile'>('overview');
  const [applications, setApplications] = useState<Application[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedParent, setSelectedParent] = useState('');

  const admin = getSchoolAdmins().find(a => a.id === adminId);
  const school = schools.find(s => s.id === admin?.schoolId);

  useEffect(() => {
    if (admin?.schoolId) {
      setApplications(getApplications().filter(a => a.schoolId === admin.schoolId));
      setMessages(getMessages().filter(m => m.receiverId === admin.schoolId || m.senderId === admin.schoolId));
    }
  }, [admin?.schoolId]);

  const handleUpdateStatus = (appId: string, status: 'approved' | 'rejected' | 'review') => {
    const allApps = getApplications();
    const idx = allApps.findIndex(a => a.id === appId);
    if (idx !== -1) {
      allApps[idx].status = status;
      saveApplications(allApps);
      setApplications(allApps.filter(a => a.schoolId === admin?.schoolId));
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedParent) return;
    const msg: Message = {
      id: generateId(),
      senderId: admin?.schoolId || '',
      senderType: 'school',
      receiverId: selectedParent,
      receiverType: 'parent',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };
    const updated = [...messages, msg];
    setMessages(updated);
    saveMessages([...getMessages(), msg]);
    setNewMessage('');
  };

  const stats = [
    { label: 'Total demandes', value: applications.length, icon: FileText, color: 'bg-blue-50 text-blue-700' },
    { label: 'En attente', value: applications.filter(a => a.status === 'pending').length, icon: Clock, color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Approuvées', value: applications.filter(a => a.status === 'approved').length, icon: CheckCircle, color: 'bg-green-50 text-green-700' },
    { label: 'Messages', value: messages.length, icon: MessageSquare, color: 'bg-purple-50 text-purple-700' },
  ];

  const tabs = [
    { id: 'overview', label: 'Tableau de bord', icon: Users },
    { id: 'applications', label: 'Candidatures', icon: FileText, count: applications.filter(a => a.status === 'pending').length },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profil école', icon: Settings },
  ];

  if (!school || !admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-gray-700">Accès non autorisé</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest-50/30">
      {/* Header */}
      <div className="bg-white border-b border-forest-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-forest-600 to-forest-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                {school.logo}
              </div>
              <div>
                <h1 className="text-xl font-bold text-forest-800">{school.name}</h1>
                <p className="text-gray-500 text-sm">Administration • {admin.name}</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-forest-50 rounded-lg">
              <Shield className="w-4 h-4 text-forest-600" />
              <span className="text-sm font-medium text-forest-700">{admin.role === 'admin' ? 'Administrateur' : 'Personnel'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-forest-600 text-white shadow-lg shadow-forest-600/20'
                  : 'bg-white text-gray-600 hover:bg-forest-50 border border-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count && tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-red-100 text-red-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl border border-forest-100 p-5"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color} mb-3`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* School Info */}
            <div className="bg-white rounded-xl border border-forest-100 p-6 mb-8">
              <h3 className="font-semibold text-forest-800 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5" /> Informations de l'établissement
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-forest-50 rounded-lg">
                  <div className="text-sm text-gray-500">Type</div>
                  <div className="font-medium text-forest-800">{school.type}</div>
                </div>
                <div className="p-4 bg-forest-50 rounded-lg">
                  <div className="text-sm text-gray-500">Élèves</div>
                  <div className="font-medium text-forest-800">{school.students}</div>
                </div>
                <div className="p-4 bg-forest-50 rounded-lg">
                  <div className="text-sm text-gray-500">Enseignants</div>
                  <div className="font-medium text-forest-800">{school.teachers}</div>
                </div>
                <div className="p-4 bg-forest-50 rounded-lg">
                  <div className="text-sm text-gray-500">Fondée en</div>
                  <div className="font-medium text-forest-800">{school.founded}</div>
                </div>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-xl border border-forest-100 p-6">
              <h3 className="font-semibold text-forest-800 mb-4">Dernières candidatures</h3>
              {applications.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Aucune candidature reçue</p>
              ) : (
                <div className="space-y-3">
                  {applications.slice(0, 5).map(app => (
                    <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">{app.childName}</div>
                        <div className="text-sm text-gray-500">{app.grade} • {new Date(app.submittedAt).toLocaleDateString('fr-FR')}</div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        app.status === 'approved' ? 'status-approved' :
                        app.status === 'rejected' ? 'status-rejected' :
                        app.status === 'review' ? 'status-review' : 'status-pending'
                      }`}>
                        {app.status === 'approved' ? 'Approuvée' : app.status === 'rejected' ? 'Rejetée' : app.status === 'review' ? 'En révision' : 'En attente'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Applications */}
        {activeTab === 'applications' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {applications.length === 0 ? (
              <div className="bg-white rounded-xl border border-forest-100 p-12 text-center">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="text-lg font-semibold text-gray-700">Aucune candidature</h3>
                <p className="text-gray-500 mt-2">Les candidatures apparaîtront ici dès qu'un parent soumettra une demande.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app, i) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-xl border border-forest-100 p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-forest-800 text-lg">{app.childName}</h3>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                          <span>📚 {app.grade}</span>
                          <span>🎂 Né(e) le {new Date(app.childDob).toLocaleDateString('fr-FR')}</span>
                          <span>📅 Soumis le {new Date(app.submittedAt).toLocaleDateString('fr-FR')}</span>
                        </div>
                        {app.notes && (
                          <p className="mt-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                            💬 {app.notes}
                          </p>
                        )}
                        {app.documents.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {app.documents.map((doc, j) => (
                              <span key={j} className="text-xs bg-forest-50 text-forest-700 px-2 py-1 rounded">
                                📎 {doc.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'review')}
                          className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          Réviser
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'approved')}
                          className="px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 flex items-center gap-1"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approuver
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'rejected')}
                          className="px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 flex items-center gap-1"
                        >
                          <XCircle className="w-4 h-4" />
                          Rejeter
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Messages */}
        {activeTab === 'messages' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-forest-100 p-6">
                  <h3 className="font-semibold text-forest-800 mb-4">Répondre à un parent</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Parent (ID)</label>
                      <input
                        type="text"
                        value={selectedParent}
                        onChange={(e) => setSelectedParent(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
                        placeholder="ID du parent..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 resize-none"
                        placeholder="Votre réponse..."
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || !selectedParent}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-forest-600 text-white rounded-lg text-sm font-medium hover:bg-forest-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-forest-100 p-6">
                  <h3 className="font-semibold text-forest-800 mb-4">Messages reçus</h3>
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>Aucun message reçu</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((msg) => (
                        <div key={msg.id} className={`p-4 rounded-lg ${
                          msg.senderType === 'school' ? 'bg-forest-50 ml-8' : 'bg-blue-50 mr-8'
                        }`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-gray-500">
                              {msg.senderType === 'school' ? school.name : `Parent (${msg.senderId.slice(0, 8)}...)`}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(msg.timestamp).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{msg.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Profile */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white rounded-xl border border-forest-100 p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-forest-600 to-forest-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                  {school.logo}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-forest-800">{school.name}</h2>
                  <p className="text-gray-500">{school.type} • {school.city}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input type="text" defaultValue={school.name} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <input type="text" defaultValue={school.type} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="text" defaultValue={school.email} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input type="text" defaultValue={school.phone} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" readOnly />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                  <input type="text" defaultValue={school.address} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm" readOnly />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea defaultValue={school.description} rows={4} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm resize-none" readOnly />
                </div>
              </div>

              <div className="mt-8 p-4 bg-forest-50 rounded-xl">
                <h4 className="font-medium text-forest-800 mb-3 flex items-center gap-2">
                  <UserCheck className="w-5 h-5" /> Permissions de votre compte
                </h4>
                <div className="flex flex-wrap gap-2">
                  {admin.permissions.map((p, i) => (
                    <span key={i} className="px-3 py-1 bg-white text-forest-700 rounded-lg text-sm border border-forest-200">
                      {p === 'all' ? '✅ Accès complet' : p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
