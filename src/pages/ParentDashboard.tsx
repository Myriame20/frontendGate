import { useState, useEffect } from 'react';
import { getCurrentUser, getParents, getApplications, getSchools, Application, School } from '../data/store';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Edit, GraduationCap } from 'lucide-react';

export default function ParentDashboard() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [editingApp, setEditingApp] = useState<Application | null>(null);

  useEffect(() => {
    if (!user || user.type !== 'parent') {
      navigate('/parent/auth');
      return;
    }
    const apps = getApplications().filter(a => a.parentId === user.id);
    setApplications(apps);
    setSchools(getSchools());
  }, [user]);

  const getSchoolName = (schoolId: string) => {
    const school = schools.find(s => s.id === schoolId);
    return school?.name || 'École inconnue';
  };

  const canEdit = (app: Application) => {
    return !app.viewedBySchool && app.status === 'pending';
  };

  const handleEdit = (app: Application) => {
    setEditingApp(app);
  };

  const handleSaveEdit = () => {
    if (!editingApp) return;
    const apps = getApplications();
    const idx = apps.findIndex(a => a.id === editingApp.id);
    if (idx !== -1) {
      apps[idx] = { ...editingApp, lastModifiedAt: new Date().toISOString() };
      setApplications(apps.filter(a => a.parentId === user?.id));
      setEditingApp(null);
    }
  };

  if (editingApp) {
    return (
      <div className="min-h-screen bg-neutral-50 py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="card-premium p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Modifier la demande</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Nom de l'enfant</label>
                <input
                  type="text"
                  value={editingApp.childName}
                  onChange={(e) => setEditingApp({ ...editingApp, childName: e.target.value })}
                  className="input-premium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Date de naissance</label>
                <input
                  type="date"
                  value={editingApp.childDob}
                  onChange={(e) => setEditingApp({ ...editingApp, childDob: e.target.value })}
                  className="input-premium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Notes</label>
                <textarea
                  value={editingApp.notes}
                  onChange={(e) => setEditingApp({ ...editingApp, notes: e.target.value })}
                  className="input-premium"
                  rows={4}
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingApp(null)}
                  className="flex-1 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg font-medium hover:bg-neutral-200"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 btn-primary"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">Espace Parent</h1>
                <p className="text-sm text-neutral-500">Gérez vos candidatures</p>
              </div>
            </div>
            <Link to="/schools" className="btn-secondary text-sm">
              Explorer les écoles
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="card-premium p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">Mes candidatures</h2>
          
          {applications.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-700">Aucune candidature</h3>
              <p className="text-neutral-500 mt-2">Explorez les écoles et soumettez votre première candidature</p>
              <Link to="/schools" className="btn-primary inline-flex items-center gap-2 mt-6">
                Explorer les écoles
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => {
                const editable = canEdit(app);
                return (
                  <div key={app.id} className="p-6 bg-neutral-50 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-neutral-900 text-lg">{getSchoolName(app.schoolId)}</h3>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-neutral-500">
                          <span>👤 {app.childName}</span>
                          <span>📚 {app.grade}</span>
                          <span>📅 {new Date(app.submittedAt).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`badge ${
                          app.status === 'approved' ? 'badge-success' :
                          app.status === 'pending' ? 'badge-warning' :
                          app.status === 'review' ? 'badge-info' : 'badge-error'
                        }`}>
                          {app.status === 'approved' ? '✓ Approuvée' :
                           app.status === 'pending' ? '⏳ En attente' :
                           app.status === 'review' ? '👁 En révision' : '✗ Rejetée'}
                        </span>
                        {editable && (
                          <button
                            onClick={() => handleEdit(app)}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                            title="Modifier (l'école n'a pas encore consulté)"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {editable && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-700">
                          💡 Vous pouvez modifier cette demande car l'école ne l'a pas encore consultée.
                        </p>
                      </div>
                    )}
                    
                    {!editable && app.viewedBySchool && (
                      <div className="mt-3 p-3 bg-neutral-100 border border-neutral-200 rounded-lg">
                        <p className="text-sm text-neutral-600">
                          ℹ️ Cette demande a été consultée par l'école et ne peut plus être modifiée.
                        </p>
                      </div>
                    )}
                    
                    {app.notes && (
                      <div className="mt-3 p-3 bg-white rounded-lg">
                        <p className="text-sm text-neutral-600">
                          <strong>Notes :</strong> {app.notes}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
