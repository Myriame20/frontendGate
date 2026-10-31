import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Users, Filter, X, BookOpen, GraduationCap, CheckCircle, Clock } from 'lucide-react';
import { getSchools } from '../data/store';
import { useState } from 'react';

export default function SchoolsPage() {
  const schools = getSchools().filter(s => s.isVisible && s.isVerified);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const types = ['Maternelle', 'Primaire', 'Secondaire', 'Complexe'];
  const cities = [...new Set(schools.map(s => s.city))];

  const filtered = schools.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase());
    const matchType = !typeFilter || s.type === typeFilter;
    const matchCity = !cityFilter || s.city === cityFilter;
    return matchSearch && matchType && matchCity;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-emerald-600" />
              <span className="text-xl font-bold">EduGate</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/parent/dashboard" className="text-sm font-medium text-neutral-700 hover:text-neutral-900">
                Espace Parent
              </Link>
              <Link to="/school/onboarding" className="btn-primary text-sm">
                Je suis une école
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white"
          >
            Découvrez les écoles vérifiées
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-white/90"
          >
            Trouvez l'établissement idéal pour votre enfant
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher par nom ou ville..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white shadow-xl text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center">
          <div>
            <label className="text-sm font-medium text-neutral-600 block mb-1">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Tous les types</option>
              {types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-600 block mb-1">Ville</label>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Toutes les villes</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {(typeFilter || cityFilter) && (
            <button
              onClick={() => { setTypeFilter(''); setCityFilter(''); }}
              className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg mt-6"
            >
              <X className="w-4 h-4" />
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-neutral-600 mb-8">
          <span className="font-semibold text-emerald-600">{filtered.length}</span> école{filtered.length > 1 ? 's' : ''} trouvée{filtered.length > 1 ? 's' : ''}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((school, i) => (
            <motion.div
              key={school.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/schools/${school.id}`} className="block card-premium overflow-hidden h-full group">
                <div className="relative h-48 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center">
                  <span className="text-6xl">{school.logo}</span>
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-neutral-700">
                      {school.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      school.enrollmentOpen ? 'badge-success' : 'badge-error'
                    }`}>
                      {school.enrollmentOpen ? '🟢 Ouvert' : '🔴 Fermé'}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{school.rating}</span>
                  </div>
                  {school.availablePlaces > 0 && (
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-semibold">
                      {school.availablePlaces} places
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">{school.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-neutral-500 mb-3">
                    <MapPin className="w-4 h-4" />
                    {school.city}
                  </div>
                  <p className="text-sm text-neutral-600 line-clamp-2 mb-4">{school.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <div className="flex items-center gap-1 text-sm text-neutral-600">
                      <Users className="w-4 h-4 text-emerald-500" />
                      {school.students} élèves
                    </div>
                    <span className="text-sm font-medium text-emerald-600 group-hover:translate-x-1 transition-transform">
                      Voir →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-neutral-700">Aucune école trouvée</h3>
            <p className="text-neutral-500 mt-2">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
}
