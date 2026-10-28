import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, Users, Filter, X } from 'lucide-react';
import { schools } from '../data/store';

export default function Schools() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const types = ['Maternelle', 'Primaire', 'Secondaire', 'Complexe'];
  const cities = [...new Set(schools.map(s => s.city))];

  const filtered = schools.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()) ||
      s.province.toLowerCase().includes(search.toLowerCase());
    const matchType = !typeFilter || s.type === typeFilter;
    const matchCity = !cityFilter || s.city === cityFilter;
    return matchSearch && matchType && matchCity;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-forest-700 to-forest-900 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white font-serif"
          >
            Nos Écoles Partenaires
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-forest-100 text-lg"
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
          <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center">
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
            {(typeFilter || cityFilter) && (
              <button
                onClick={() => { setTypeFilter(''); setCityFilter(''); }}
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
              <Link to={`/schools/${school.id}`} className="block card-hover bg-white rounded-2xl overflow-hidden border border-forest-100 shadow-sm h-full">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={school.coverImage}
                    alt={school.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-forest-700">
                    {school.type}
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
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-forest-500" />
                      {school.students} élèves
                    </div>
                    <span className="text-sm font-medium text-forest-600">
                      Voir le profil →
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
