import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Send, Plus, Trash2 } from 'lucide-react';
import { getParents, getApplications, getMessages, getAppointments, saveMessages, saveAppointments, getSchools, generateId, type Application, type Message, type Appointment } from '../data/store';

interface Props {
  parentId: string;
}

export default function ParentDashboard({ parentId }: Props) {
  const [activeTab, setActiveTab] = useState<'applications' | 'messages' | 'appointments'>('applications');
  const [applications, setApplications] = useState<Application[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [newAppointment, setNewAppointment] = useState({ schoolId: '', date: '', time: '', type: 'Visite', notes: '' });

  const parent = getParents().find(p => p.id === parentId);

  useEffect(() => {
    setApplications(getApplications().filter(a => a.parentId === parentId));
    setMessages(getMessages().filter(m => m.receiverId === parentId || m.senderId === parentId));
    setAppointments(getAppointments().filter(a => a.parentId === parentId));
  }, [parentId]);

  const statusConfig = {
    pending: { icon: Clock, label: 'En attente', class: 'status-pending' },
    review: { icon: AlertCircle, label: 'En révision', class: 'status-review' },
    approved: { icon: CheckCircle, label: 'Approuvée', class: 'status-approved' },
    rejected: { icon: XCircle, label: 'Rejetée', class: 'status-rejected' },
  };

  const allSchools = getSchools();
  const getSchoolName = (schoolId: string) => allSchools.find(s => s.id === schoolId)?.name || 'École inconnue';

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedSchool) return;
    const schoolAdmin = getMessages();
    const msg: Message = {
      id: generateId(),
      senderId: parentId,
      senderType: 'parent',
      receiverId: selectedSchool,
      receiverType: 'school',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };
    const updated = [...messages, msg];
    setMessages(updated);
    saveMessages([...getMessages(), msg]);
    setNewMessage('');
  };

  const handleBookAppointment = () => {
    if (!newAppointment.schoolId || !newAppointment.date || !newAppointment.time) return;
    const appt: Appointment = {
      id: generateId(),
      parentId,
      schoolId: newAppointment.schoolId,
      date: newAppointment.date,
      time: newAppointment.time,
      type: newAppointment.type,
      status: 'pending',
      notes: newAppointment.notes
    };
    const updated = [...appointments, appt];
    setAppointments(updated);
    saveAppointments([...getAppointments(), appt]);
    setNewAppointment({ schoolId: '', date: '', time: '', type: 'Visite', notes: '' });
  };

  const tabs = [
    { id: 'applications', label: 'Mes demandes', icon: FileText, count: applications.length },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: messages.filter(m => m.senderType === 'school' && !m.read).length },
    { id: 'appointments', label: 'Rendez-vous', icon: Calendar, count: appointments.filter(a => a.status === 'confirmed').length },
  ];

  return (
    <div className="min-h-screen bg-forest-50/30">
      {/* Header */}
      <div className="bg-white border-b border-forest-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-forest-800">
                Bonjour, {parent?.firstName || 'Parent'} 👋
              </h1>
              <p className="text-gray-500 text-sm mt-1">Gérez vos inscriptions et communications</p>
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
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-white/20' : 'bg-forest-100 text-forest-700'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {applications.length === 0 ? (
              <div className="bg-white rounded-xl border border-forest-100 p-12 text-center">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="text-lg font-semibold text-gray-700">Aucune demande</h3>
                <p className="text-gray-500 mt-2">Explorez nos écoles et soumettez votre première demande d'inscription.</p>
              </div>
            ) : (
              applications.map((app, i) => {
                const status = statusConfig[app.status];
                return (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl border border-forest-100 p-6 card-hover"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-forest-800">{getSchoolName(app.schoolId)}</h3>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                          <span>👤 {app.childName}</span>
                          <span>📚 {app.grade}</span>
                          <span>📅 {new Date(app.submittedAt).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${status.class}`}>
                        <status.icon className="w-4 h-4" />
                        {status.label}
                      </span>
                    </div>
                    {app.notes && (
                      <p className="mt-3 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                        💬 {app.notes}
                      </p>
                    )}
                  </motion.div>
                );
              })
            )}
          </motion.div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Send Message */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-forest-100 p-6">
                  <h3 className="font-semibold text-forest-800 mb-4">Envoyer un message</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">École</label>
                      <select
                        value={selectedSchool}
                        onChange={(e) => setSelectedSchool(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
                      >
                        <option value="">Sélectionner une école</option>
                        {allSchools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 resize-none"
                        placeholder="Votre message..."
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || !selectedSchool}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-forest-600 text-white rounded-lg text-sm font-medium hover:bg-forest-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>

              {/* Message History */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-forest-100 p-6">
                  <h3 className="font-semibold text-forest-800 mb-4">Historique des messages</h3>
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>Aucun message pour le moment</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-4 rounded-lg ${
                            msg.senderType === 'parent'
                              ? 'bg-forest-50 ml-8'
                              : 'bg-blue-50 mr-8'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-gray-500">
                              {msg.senderType === 'parent' ? 'Vous' : getSchoolName(msg.receiverId === parentId ? msg.senderId : msg.receiverId)}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(msg.timestamp).toLocaleDateString('fr-FR')} {new Date(msg.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
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

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Book Appointment */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-forest-100 p-6">
                  <h3 className="font-semibold text-forest-800 mb-4">Planifier un rendez-vous</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">École</label>
                      <select
                        value={newAppointment.schoolId}
                        onChange={(e) => setNewAppointment({...newAppointment, schoolId: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
                      >
                        <option value="">Sélectionner...</option>
                        {allSchools.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                          type="date"
                          value={newAppointment.date}
                          onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                        <input
                          type="time"
                          value={newAppointment.time}
                          onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select
                        value={newAppointment.type}
                        onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
                      >
                        <option>Visite</option>
                        <option>Réunion d'information</option>
                        <option>Entretien</option>
                        <option>Journée portes ouvertes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <textarea
                        value={newAppointment.notes}
                        onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                        rows={2}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400 resize-none"
                        placeholder="Informations complémentaires..."
                      />
                    </div>
                    <button
                      onClick={handleBookAppointment}
                      disabled={!newAppointment.schoolId || !newAppointment.date || !newAppointment.time}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-forest-600 text-white rounded-lg text-sm font-medium hover:bg-forest-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Calendar className="w-4 h-4" />
                      Réserver
                    </button>
                  </div>
                </div>
              </div>

              {/* Appointments List */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-forest-100 p-6">
                  <h3 className="font-semibold text-forest-800 mb-4">Mes rendez-vous</h3>
                  {appointments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>Aucun rendez-vous planifié</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {appointments.map((appt) => (
                        <div key={appt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-800">{getSchoolName(appt.schoolId)}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              📅 {new Date(appt.date).toLocaleDateString('fr-FR')} à {appt.time} • {appt.type}
                            </div>
                            {appt.notes && <div className="text-xs text-gray-400 mt-1">📝 {appt.notes}</div>}
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            appt.status === 'confirmed' ? 'status-approved' :
                            appt.status === 'pending' ? 'status-pending' : 'status-rejected'
                          }`}>
                            {appt.status === 'confirmed' ? 'Confirmé' : appt.status === 'pending' ? 'En attente' : 'Annulé'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
