import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Users, Shield, Calendar, MessageSquare, FileText, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { schools } from '../data/store';

export default function Home() {
  const features = [
    { icon: Search, title: 'Explorez les écoles', desc: 'Découvrez les meilleurs établissements du Gabon avec des profils détaillés.' },
    { icon: FileText, title: 'Inscription en ligne', desc: 'Soumettez vos candidatures et téléchargez les documents requis.' },
    { icon: MessageSquare, title: 'Communication directe', desc: 'Échangez avec les écoles et planifiez des rendez-vous.' },
    { icon: Shield, title: 'Sécurisé & fiable', desc: 'Vos données sont protégées avec un chiffrement de bout en bout.' },
    { icon: Calendar, title: 'Suivi en temps réel', desc: 'Suivez l\'état de vos candidatures à chaque étape.' },
    { icon: Users, title: 'Communauté éducative', desc: 'Connectez-vous avec les parents et les établissements.' },
  ];

  const stats = [
    { value: `${schools.length}+`, label: 'Écoles partenaires' },
    { value: '5 000+', label: 'Élèves inscrits' },
    { value: '98%', label: 'Satisfaction parents' },
    { value: '24/7', label: 'Support disponible' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-700 to-forest-600"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-forest-100 text-sm mb-6">
                <Star className="w-4 h-4 text-gold-400" />
                <span>Plateforme N°1 d'inscription scolaire au Gabon</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight font-serif">
                L'avenir scolaire de votre enfant commence ici
              </h1>
              <p className="mt-6 text-lg text-forest-100 max-w-lg">
                Découvrez les meilleurs établissements du Gabon, soumettez vos inscriptions en ligne, 
                et suivez chaque étape du processus d'admission en toute simplicité.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/schools"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-forest-700 rounded-xl font-semibold text-lg hover:bg-forest-50 transition-all shadow-xl shadow-black/20"
                >
                  <Search className="w-5 h-5" />
                  Explorer les écoles
                </Link>
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  Créer un compte
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-gold-400/20 to-forest-400/20 rounded-3xl blur-2xl"></div>
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="text-3xl font-bold text-white">6+</div>
                      <div className="text-forest-200 text-sm">Écoles partenaires</div>
                    </div>
                    <img
                      src="https://image.qwenlm.ai/generated-images/ce416082-bbcf-4291-997e-2a0c7d6faea4/_result.png"
                      alt="African students in school uniforms"
                      className="rounded-2xl w-full h-48 object-cover shadow-xl"
                    />
                  </div>
                  <div className="space-y-4 mt-8">
                    <img
                      src="https://image.qwenlm.ai/generated-images/946dd4cf-67ba-4ad7-a42a-d299dade208a/_result.png"
                      alt="Classroom in Gabon"
                      className="rounded-2xl w-full h-48 object-cover shadow-xl"
                    />
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="text-3xl font-bold text-white">98%</div>
                      <div className="text-forest-200 text-sm">Parents satisfaits</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-12 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-forest-100 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text font-serif">
              Tout ce dont vous avez besoin
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Une plateforme complète pour simplifier l'inscription scolaire et connecter les familles aux meilleurs établissements du Gabon.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-hover bg-white rounded-2xl p-8 border border-forest-100 shadow-sm"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-forest-100 to-forest-50 rounded-xl flex items-center justify-center mb-5">
                  <feature.icon className="w-7 h-7 text-forest-600" />
                </div>
                <h3 className="text-xl font-semibold text-forest-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 bg-gradient-to-b from-forest-50/50 to-ivory-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://image.qwenlm.ai/generated-images/f2e373f6-4d30-453c-afb1-8f82c761b463/_result.png"
                alt="Parent helping child with school enrollment"
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold gradient-text font-serif mb-6">
                Comment ça marche ?
              </h2>
              <div className="space-y-6">
                {[
                  { step: '1', title: 'Créez votre compte', desc: 'Inscrivez-vous gratuitement en quelques clics.' },
                  { step: '2', title: 'Explorez les écoles', desc: 'Parcourez les profils détaillés des établissements.' },
                  { step: '3', title: 'Soumettez vos demandes', desc: 'Postulez en ligne et téléchargez vos documents.' },
                  { step: '4', title: 'Suivez en temps réel', desc: 'Recevez des notifications à chaque étape.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-forest-600 to-forest-500 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg shadow-forest-600/20">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-forest-800">{item.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Schools */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text font-serif">
              Écoles populaires
            </h2>
            <p className="mt-4 text-gray-600">
              Découvrez les établissements les mieux notés de notre réseau
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schools.slice(0, 3).map((school, i) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <Link to={`/schools/${school.id}`} className="block card-hover bg-white rounded-2xl overflow-hidden border border-forest-100 shadow-sm">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={school.coverImage}
                      alt={school.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-forest-700">
                      {school.type}
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm">
                      <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                      <span className="font-medium">{school.rating}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{school.logo}</span>
                      <h3 className="text-lg font-semibold text-forest-800">{school.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{school.city}, {school.province}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {school.students} élèves
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-forest-500" />
                        {school.programs.length} programmes
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/schools"
              className="inline-flex items-center gap-2 px-8 py-3 bg-forest-600 text-white rounded-xl font-semibold hover:bg-forest-700 transition-all shadow-lg shadow-forest-600/20"
            >
              Voir toutes les écoles
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-forest-700 to-forest-900 rounded-3xl p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-4">
                Prêt à inscrire votre enfant ?
              </h2>
              <p className="text-forest-100 text-lg mb-8 max-w-2xl mx-auto">
                Rejoignez des milliers de parents qui font confiance à EduGate Gabon pour trouver l'école idéale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-forest-700 rounded-xl font-semibold text-lg hover:bg-forest-50 transition-all shadow-xl"
                >
                  Commencer maintenant
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
