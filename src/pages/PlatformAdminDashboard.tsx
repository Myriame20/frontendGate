import { useState, useEffect } from 'react';
import { getSchools, saveSchools, School } from '../data/store';
import { CheckCircle, XCircle, Clock, School as SchoolIcon } from 'lucide-react';

export default function PlatformAdminDashboard() {
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    setSchools(getSchools());
  }, []);

  const pendingSchools = schools.filter(s => s.verificationStatus === 'pending');
  const verifiedSchools = schools.filter(s => s.verificationStatus === 'verified');

  const handleVerify = (schoolId: string) => {
    const updated = schools.map(s => 
      s.id === schoolId ? { ...s, verificationStatus: 'verified' as const, isVerified: true, isVisible: true } : s
    );
    setSchools(updated);
    saveSchools(updated);
  };

  const handleReject = (schoolId: string) => {
    const updated = schools.map(s => 
      s.id === schoolId ? { ...s, verificationStatus: 'rejected' as const, isVerified: false, isVisible: false } : s
    );
    setSchools(updated);
    saveSchools(updated);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-neutral-900">Administration Plateforme</h1>
          <p className="text-sm text-neutral-500 mt-1">Gérez les écoles et les validations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card-premium p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="text-sm text-neutral-600">En attente</span>
            </div>
            <div className="text-3xl font-bold text-neutral-900">{pendingSchools.length}</div>
          </div>
          <div className="card-premium p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm text-neutral-600">Vérifiées</span>
            </div>
            <div className="text-3xl font-bold text-neutral-900">{verifiedSchools.length}</div>
          </div>
          <div className="card-premium p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <SchoolIcon className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-neutral-600">Total</span>
            </div>
            <div className="text-3xl font-bold text-neutral-900">{schools.length}</div>
          </div>
        </div>

        {/* Pending Schools */}
        <div className="card-premium p-6 mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Écoles en attente de validation</h2>
          {pendingSchools.length === 0 ? (
            <p className="text-neutral-500 text-center py-8">Aucune école en attente de validation</p>
          ) : (
            <div className="space-y-4">
              {pendingSchools.map((school) => (
                <div key={school.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{school.logo}</span>
                    <div>
                      <h3 className="font-semibold text-neutral-900">{school.name}</h3>
                      <p className="text-sm text-neutral-500">{school.city} • {school.type}</p>
                      <p className="text-sm text-neutral-500">{school.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVerify(school.id)}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Vérifier
                    </button>
                    <button
                      onClick={() => handleReject(school.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Rejeter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Verified Schools */}
        <div className="card-premium p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Écoles vérifiées</h2>
          <div className="space-y-3">
            {verifiedSchools.map((school) => (
              <div key={school.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{school.logo}</span>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{school.name}</h3>
                    <p className="text-sm text-neutral-500">{school.city} • {school.students} élèves</p>
                  </div>
                </div>
                <span className="badge badge-success">
                  <CheckCircle className="w-4 h-4" />
                  Vérifiée
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
