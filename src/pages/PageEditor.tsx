import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Save, Eye, Image, Type, Layout, Settings,
  Upload, X, Check, GripVertical
} from 'lucide-react';

export default function PageEditor() {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'En-tête', icon: Layout },
    { id: 'about', label: 'À propos', icon: Type },
    { id: 'gallery', label: 'Galerie', icon: Image },
    { id: 'programs', label: 'Programmes', icon: Layout },
    { id: 'contact', label: 'Contact', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Top Bar */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-neutral-900">Éditeur de page</h1>
                <p className="text-sm text-neutral-500">Lycée Léon Mba</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
                <Eye className="w-4 h-4" />
                Prévisualiser
              </button>
              <button className="bg-gradient-to-r from-gabon-green to-gabon-green-dark text-white px-6 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all flex items-center gap-2">
                <Save className="w-4 h-4" />
                Publier
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar - Sections */}
        <aside className="w-64 bg-white border-r border-neutral-200 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
              Sections
            </h3>
            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-forest-50 text-forest-700'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                  {section.label}
                  <GripVertical className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-50" />
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-neutral-200">
            <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
              Thème
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-neutral-600 mb-1 block">Couleur principale</label>
                <div className="flex gap-2">
                  {['#1B4332', '#2D6A4F', '#0F281D', '#163B2B'].map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-lg border-2 border-neutral-200 hover:border-neutral-400 transition-colors"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Editor Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section Editor */}
            {activeSection === 'hero' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="card-premium p-6">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6">En-tête de la page</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Logo de l'école
                      </label>
                      <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-forest-500 transition-colors cursor-pointer">
                        <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                        <p className="text-sm text-neutral-600 font-medium">Cliquez pour uploader ou glissez-déposez</p>
                        <p className="text-xs text-neutral-500 mt-1">PNG, JPG jusqu'à 5MB</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Image de couverture
                      </label>
                      <div className="relative rounded-xl overflow-hidden bg-neutral-100 aspect-video">
                        <img 
                          src="https://image.qwenlm.ai/generated-images/c28b9e62-c6ed-4743-82c9-f42f6275c29d/_result.png"
                          alt="Cover"
                          className="w-full h-full object-cover"
                        />
                        <button className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-lg hover:bg-neutral-50 transition-colors">
                          <X className="w-4 h-4 text-neutral-600" />
                        </button>
                      </div>
                      <button className="mt-3 text-sm text-forest-600 hover:text-forest-700 font-medium">
                        Changer l'image
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Titre principal
                      </label>
                      <input
                        type="text"
                        defaultValue="Lycée Léon Mba"
                        className="input-premium text-2xl font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Sous-titre
                      </label>
                      <input
                        type="text"
                        defaultValue="Excellence éducative depuis 1960"
                        className="input-premium"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* About Section Editor */}
            {activeSection === 'about' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card-premium p-6"
              >
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">À propos</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Description de l'école
                    </label>
                    <textarea
                      rows={6}
                      defaultValue="Le Lycée Léon Mba est l'un des établissements les plus prestigieux du Gabon. Fondé en 1960, il offre une éducation d'excellence avec des programmes bilingues et une approche pédagogique innovante."
                      className="input-premium resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Année de fondation
                      </label>
                      <input
                        type="number"
                        defaultValue="1960"
                        className="input-premium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Nombre d'élèves
                      </label>
                      <input
                        type="number"
                        defaultValue="1200"
                        className="input-premium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Valeurs de l'école
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Excellence', 'Innovation', 'Respect', 'Intégrité'].map((value, i) => (
                        <span key={i} className="px-3 py-1.5 bg-forest-50 text-forest-700 rounded-lg text-sm font-medium flex items-center gap-2">
                          {value}
                          <button className="text-forest-600 hover:text-forest-700">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                      <button className="px-3 py-1.5 border border-neutral-300 text-neutral-600 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors">
                        + Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Gallery Section Editor */}
            {activeSection === 'gallery' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card-premium p-6"
              >
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Galerie photos</h2>
                
                <div className="border-2 border-dashed border-neutral-300 rounded-xl p-12 text-center hover:border-forest-500 transition-colors cursor-pointer mb-6">
                  <Upload className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-600 font-medium mb-1">Glissez vos photos ici</p>
                  <p className="text-sm text-neutral-500">ou cliquez pour parcourir</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    'https://image.qwenlm.ai/generated-images/c28b9e62-c6ed-4743-82c9-f42f6275c29d/_result.png',
                    'https://image.qwenlm.ai/generated-images/b194f47a-30d9-40b1-89c3-52b11324f0a2/_result.png',
                    'https://image.qwenlm.ai/generated-images/76a667f5-7301-45e9-8a11-b745ff65f955/_result.png'
                  ].map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                      <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="p-2 bg-white rounded-lg">
                          <X className="w-5 h-5 text-neutral-900" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Programs Section Editor */}
            {activeSection === 'programs' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card-premium p-6"
              >
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Programmes et tarifs</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Programmes offerts
                    </label>
                    <div className="space-y-2">
                      {['Baccalauréat Général', 'Baccalauréat Technique', 'Programme Bilingue'].map((prog, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            type="text"
                            defaultValue={prog}
                            className="input-premium flex-1"
                          />
                          <button className="p-2 text-neutral-400 hover:text-red-600 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button className="text-sm text-forest-600 hover:text-forest-700 font-medium">
                        + Ajouter un programme
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Frais de scolarité
                    </label>
                    <div className="space-y-3">
                      {[
                        { label: 'Inscription', amount: '150 000 FCFA' },
                        { label: 'Scolarité annuelle', amount: '800 000 FCFA' }
                      ].map((fee, i) => (
                        <div key={i} className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            defaultValue={fee.label}
                            placeholder="Libellé"
                            className="input-premium"
                          />
                          <input
                            type="text"
                            defaultValue={fee.amount}
                            placeholder="Montant"
                            className="input-premium"
                          />
                        </div>
                      ))}
                      <button className="text-sm text-forest-600 hover:text-forest-700 font-medium">
                        + Ajouter des frais
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact Section Editor */}
            {activeSection === 'contact' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card-premium p-6"
              >
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">Informations de contact</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Adresse complète
                    </label>
                    <input
                      type="text"
                      defaultValue="Boulevard Triomphal, Libreville"
                      className="input-premium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        defaultValue="+241 01 76 00 00"
                        className="input-premium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="contact@lyceeleonmba.ga"
                        className="input-premium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Site web
                    </label>
                    <input
                      type="url"
                      defaultValue="www.lyceeleonmba.ga"
                      className="input-premium"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
