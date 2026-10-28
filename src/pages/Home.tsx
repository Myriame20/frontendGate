import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Users, Shield, Calendar, MessageSquare, FileText, ArrowRight, Star, CheckCircle, Play, MapPin, GraduationCap, Award, BookOpen } from 'lucide-react';
import { getSchools } from '../data/store';
import VideoPlayer from '../components/VideoPlayer';

export default function Home() {
  const schools = getSchools().filter(s => s.isVisible);

  const features = [
    { icon: Search, title: 'Explorez les écoles', desc: 'Découvrez les meilleurs établissements du Gabon avec des profils détaillés, vidéos et galeries photos.' },
    { icon: FileText, title: 'Inscription en ligne', desc: 'Soumettez vos candidatures et téléchargez les documents requis en toute simplicité.' },
    { icon: MessageSquare, title: 'Communication directe', desc: 'Échangez avec les écoles et planifiez des rendez-vous directement depuis la plateforme.' },
    { icon: Shield, title: 'Sécurisé & fiable', desc: 'Vos données sont protégées avec un chiffrement de bout en bout et une isolation stricte.' },
    { icon: Calendar, title: 'Suivi en temps réel', desc: 'Suivez l\'état de vos candidatures à chaque étape avec des notifications instantanées.' },
    { icon: Users, title: 'Communauté éducative', desc: 'Connectez-vous avec les parents et les meilleurs établissements du pays.' },
  ];

  const stats = [
    { value: `${schools.length}+`, label: 'Écoles partenaires' },
    { value: '5 000+', label: 'Élèves inscrits' },
    { value: '98%', label: 'Satisfaction parents' },
    { value: '24/7', label: 'Support disponible' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div>
      {/* Hero Section with Video */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-forest-900/90 via-forest-800/80 to-forest-700/70"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-forest-100 text-sm mb-6 border border-white/10">
                <Award className="w-4 h-4 text-gold-400" />
                <span>Plateforme N°1 d'inscription scolaire au Gabon</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight font-serif">
                L'avenir scolaire de{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-forest-300">
                  votre enfant
                </span>{' '}
                commence ici
              </h1>
              <p className="mt-6 text-lg text-forest-100/90 max-w-lg leading-relaxed">
                Découvrez les meilleurs établissements du Gabon, soumettez vos inscriptions en ligne, 
                et suivez chaque étape du processus d'admission en toute simplicité.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/schools"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-forest-700 rounded-xl font-semibold text-lg hover:bg-forest-50 transition-all shadow-xl shadow-black/20"
                >
                  <Search className="w-5 h-5" />
                  Explorer les écoles
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  Créer un compte
                </Link>
              </div>
              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <CheckCircle className="w-4 h-4 text-forest-300" />
                  <span>100% gratuit pour les parents</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Shield className="w-4 h-4 text-forest-300" />
                  <span>Données sécurisées</span>
                </div>
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
                      <div className="text-3xl font-bold text-white">{schools.length}+</div>
                      <div className="text-forest-200 text-sm">Écoles partenaires</div>
                    </div>
                    <img
                      src="https://image.qwenlm.ai/generated-images/ce416082-bbcf-4291-997e-2a0c7d6faea4/_result.png"
                      alt="Étudiants africains en uniforme scolaire"
                      className="rounded-2xl w-full h-48 object-cover shadow-xl"
                    />
                  </div>
                  <div className="space-y-4 mt-8">
                    <img
                      src="https://image.qwenlm.ai/generated-images/946dd4cf-67ba-4ad7-a42a-d299dade208a/_result.png"
                      alt="Salle de classe au Gabon"
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-10">
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

      {/* Video Showcase */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text font-serif">
              Découvrez nos écoles en vidéo
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Plongez au cœur de nos établissements à travers des visites virtuelles et témoignages
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {schools.filter(s => s.videos && s.videos.length > 0).slice(0, 2).map((school, i) => (
              <motion.div
                key={school.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="card-hover"
              >
                <VideoPlayer
                  src={school.videos[0].url}
                  poster={school.videos[0].thumbnail}
                  title={school.videos[0].title}
                  autoplay={i === 0}
                  muted={true}
                  loop={true}
                  className="aspect-video"
                />
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{school.logo}</span>
                    <span className="font-semibold text-forest-800">{school.name}</span>
                  </div>
                  <Link to={`/schools/${school.id}`} className="text-sm text-forest-600 hover:text-forest-700 font-medium">
                    Voir le profil →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-forest-50/30 to-ivory-50">
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

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={item}
                className="card-hover bg-white rounded-2xl p-8 border border-forest-100 shadow-sm"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-forest-100 to-forest-50 rounded-xl flex items-center justify-center mb-5">
                  <feature.icon className="w-7 h-7 text-forest-600" />
                </div>
                <h3 className="text-xl font-semibold text-forest-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://image.qwenlm.ai/generated-images/f2e373f6-4d30-453c-afb1-8f82c761b463/_result.png"
                alt="Parent aidant son enfant avec les documents scolaires"
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
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-forest-600 to-forest-500 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg shadow-forest-600/20">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-forest-800">{item.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Schools */}
      <section className="py-20 px-4 bg-gradient-to-b from-forest-50/50 to-ivory-50">
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
                <Link to={`/schools/${school.id}`} className="block card-hover bg-white rounded-2xl overflow-hidden border border-forest-100 shadow-sm group">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={school.coverImage}
                      alt={school.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-forest-700">
                        {school.type}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        school.enrollmentOpen ? 'enrollment-open' : 'enrollment-closed'
                      }`}>
                        {school.enrollmentOpen ? '🟢 Inscriptions ouvertes' : '🔴 Inscriptions fermées'}
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
                          {school.programs.length} programmes
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

          <div className="text-center mt-10">
            <Link
              to="/schools"
              className="inline-flex items-center gap-2 px-8 py-3 bg-forest-600 text-white rounded-xl font-semibold hover:bg-forest-700 transition-all shadow-lg shadow-forest-600/20 group"
            >
              Voir toutes les écoles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Campus Aerial Image */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden h-80 sm:h-96"
          >
            <img
              src="https://image.qwenlm.ai/generated-images/9ee8ef39-7e64-4c6b-8d00-aab1afce393f/_result.png"
              alt="Vue aérienne d'un campus scolaire au Gabon"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-900/70 to-transparent flex items-center">
              <div className="p-8 sm:p-12 max-w-lg">
                <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-4">
                  Des campus d'exception
                </h2>
                <p className="text-forest-100 text-lg mb-6">
                  Nos écoles partenaires offrent des environnements d'apprentissage modernes et inspirants au cœur du Gabon.
                </p>
                <Link
                  to="/schools"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-forest-700 rounded-xl font-semibold hover:bg-forest-50 transition-all"
                >
                  Découvrir
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
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
              <GraduationCap className="w-12 h-12 text-gold-400 mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif mb-4">
                Prêt à inscrire votre enfant ?
              </h2>
              <p className="text-forest-100 text-lg mb-8 max-w-2xl mx-auto">
                Rejoignez des milliers de parents qui font confiance à EduGate Gabon pour trouver l'école idéale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-forest-700 rounded-xl font-semibold text-lg hover:bg-forest-50 transition-all shadow-xl group"
                >
                  Commencer maintenant
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
