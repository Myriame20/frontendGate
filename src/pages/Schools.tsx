import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Users, Filter, X, BookOpen, GraduationCap } from 'lucide-react';
import { getSchools } from '../data/store';

export default function Schools() {
  const allSchools = getSchools().filter(s => s.isVisible);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [enrollmentFilter, setEnrollmentFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const types = ['Maternelle', 'Primaire', 'Secondaire', 'Complexe'];
  const cities = [...new Set(allSchools.map(s => s.city))];

  const filtered = allSchools.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.province.toLowerCase().includes(search.toLowerCase());
    const matchType = !typeFilter || s.type === typeFilter;
    const matchCity = !cityFilter || s.city === cityFilter;
    const matchEnrollment = !enrollmentFilter || 
      (enrollmentFilter === 'open' && s.enrollmentOpen) ||
      (enrollmentFilter === 'closed' && !s.enrollmentOpen);
    return matchSearch && matchType && matchCity && matchEnrollment;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-forest-700 to-forest-900 py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="max-w-7xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-forest-100 text-sm mb-4 border border-white/10">
              <GraduationCap className="w-4 h-4" />
              <span>{allSchools.length} établissements partenaires</span>
            </div>
            <h1 className="text-4xl font-bold text-white font-serif">
              Nos Écoles Partenaires
            </h1>
            <p className="mt-4 text-forest-100 text-lg">
              Trouvez l'établissement idéal pour votre enfant
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, ville ou province..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white shadow-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-forest-400"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white text-sm"
            >
              <Filter className="w-4 h-4" />
              Filtres avancés
            </button>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white border-b border-forest-100 px-4 py-6"
        >
          <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-end">
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-1">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
              >
                <option value="">Tous les types</option>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-1">Ville</label>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
              >
                <option value="">Toutes les villes</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-1">Inscriptions</label>
              <select
                value={enrollmentFilter}
                onChange={(e) => setEnrollmentFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
              >
                <option value="">Tous</option>
                <option value="open">Inscriptions ouvertes</option>
                <option value="closed">Inscriptions fermées</option>
              </select>
            </div>
            {(typeFilter || cityFilter || enrollmentFilter) && (
              <button
                onClick={() => { setTypeFilter(''); setCityFilter(''); setEnrollmentFilter(''); }}
                className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
              >
                <X className="w-4 h-4" />
                Réinitialiser
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600">
            <span className="font-semibold text-forest-700">{filtered.length}</span> école{filtered.length > 1 ? 's' : ''} trouvée{filtered.length > 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((school, i) => (
            <motion.div
              key={school.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/schools/${school.id}`} className="block card-hover bg-white rounded-2xl overflow-hidden border border-forest-100 shadow-sm h-full group">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={school.coverImage}
                    alt={school.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-forest-700">
                      {school.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      school.enrollmentOpen ? 'enrollment-open' : 'enrollment-closed'
                    }`}>
                      {school.enrollmentOpen ? '🟢 Ouvert' : '🔴 Fermé'}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm">
                    <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                    <span className="font-medium">{school.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{school.logo}</span>
                      <h3 className="text-lg font-semibold text-white">{school.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                    <MapPin className="w-4 h-4" />
                    {school.city}, {school.province}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{school.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-forest-500" />
                        {school.students}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4 text-forest-500" />
                        {school.programs.length}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-forest-600 group-hover:translate-x-1 transition-transform">
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
            <h3 className="text-xl font-semibold text-gray-700">Aucune école trouvée</h3>
            <p className="text-gray-500 mt-2">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
}
