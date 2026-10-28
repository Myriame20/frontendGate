import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Check, Sparkles, Users, Globe, Shield, 
  Zap, BarChart3, MessageSquare, Calendar, Star,
  Play, ChevronRight, GraduationCap
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: Globe,
      title: 'Page publique personnalisable',
      desc: 'Créez une vitrine unique pour votre école avec notre éditeur intuitif.',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Users,
      title: 'Gestion d\'équipe complète',
      desc: 'Invitez votre personnel avec des rôles et permissions granulaires.',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: MessageSquare,
      title: 'Communication directe',
      desc: 'Échangez avec les parents et gérez les candidatures en un clic.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics avancés',
      desc: 'Suivez les performances de votre page et optimisez votre visibilité.',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: Shield,
      title: 'Sécurité enterprise',
      desc: 'Vos données sont protégées avec un chiffrement de bout en bout.',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Zap,
      title: 'Ultra rapide',
      desc: 'Performance optimale pour une expérience utilisateur fluide.',
      gradient: 'from-yellow-500 to-orange-600'
    }
  ];

  const plans = [
    {
      name: 'Gratuit',
      price: '0',
      desc: 'Pour découvrir la plateforme',
      features: ['Page publique basique', '1 membre', '50 candidatures/mois', 'Support email'],
      cta: 'Commencer gratuitement',
      popular: false
    },
    {
      name: 'Pro',
      price: '50 000',
      desc: 'Pour les écoles établies',
      features: ['Page complète personnalisable', '5 membres', 'Candidatures illimitées', 'Galerie illimitée', 'Vidéos', 'Analytics', 'Support prioritaire'],
      cta: 'Essai gratuit 14 jours',
      popular: true
    },
    {
      name: 'Premium',
      price: '150 000',
      desc: 'Pour les institutions',
      features: ['Tout du Pro +', 'Membres illimités', 'Domaine personnalisé', 'Analytics avancés', 'API access', 'Chat en direct', 'Support dédié', 'Formation incluse'],
      cta: 'Nous contacter',
      popular: false
    }
  ];

  const stats = [
    { value: '500+', label: 'Écoles inscrites' },
    { value: '50K+', label: 'Candidatures traitées' },
    { value: '98%', label: 'Satisfaction' },
    { value: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-forest-600 to-forest-500 rounded-xl flex items-center justify-center shadow-lg shadow-forest-600/20">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text font-display">EduGate</span>
                <span className="text-xs text-neutral-500 block -mt-1">Gabon</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Fonctionnalités</a>
              <a href="#pricing" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Tarifs</a>
              <a href="#testimonials" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">Témoignages</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="hidden sm:block text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors">
                Connexion
              </Link>
              <Link 
                to="/onboarding" 
                className="btn-primary flex items-center gap-2 text-sm"
              >
                Créer ma page
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient"></div>
        <div className="absolute inset-0 grid-bg opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-neutral-200 shadow-sm mb-8">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <span className="text-sm font-medium text-neutral-700">
                  La plateforme N°1 pour les écoles au Gabon
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 font-display leading-[1.1]"
            >
              Créez la page de{' '}
              <span className="gradient-text">votre école</span>
              <br />
              en quelques minutes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed"
            >
              La première plateforme SaaS éducative au Gabon. 
              Créez votre page publique, gérez votre équipe et recevez 
              les candidatures des parents en toute simplicité.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                to="/onboarding"
                className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-base"
              >
                Créer ma page gratuitement
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-neutral-200 rounded-xl font-semibold text-neutral-700 hover:border-neutral-300 transition-all shadow-sm">
                <Play className="w-5 h-5" />
                Voir la démo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex items-center justify-center gap-6 text-sm text-neutral-500"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-forest-500" />
                <span>Gratuit pour commencer</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-forest-500" />
                <span>Sans carte bancaire</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-forest-500" />
                <span>Annulation à tout moment</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-forest-500/20 via-gold-400/10 to-forest-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-2xl shadow-neutral-900/10">
              <img 
                src="https://image.qwenlm.ai/generated-images/4b5f6ca9-67f6-4197-bf47-be2ba99af7fc/_result.png" 
                alt="Dashboard EduGate"
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-y border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold gradient-text font-display">{stat.value}</div>
                <div className="text-sm text-neutral-600 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 font-display">
              Tout ce dont vous avez besoin
            </h2>
            <p className="mt-6 text-xl text-neutral-600">
              Une plateforme complète pour gérer votre présence en ligne et connecter avec les familles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="card-premium p-8 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 font-display">
              Comment ça marche ?
            </h2>
            <p className="mt-6 text-xl text-neutral-600">
              3 étapes simples pour lancer votre page école
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Créez votre compte', desc: 'Inscrivez-vous en 2 minutes avec votre email professionnel.' },
              { step: '02', title: 'Personnalisez votre page', desc: 'Ajoutez vos informations, photos et programmes avec notre éditeur.' },
              { step: '03', title: 'Recevez les candidatures', desc: 'Les parents découvrent votre école et postulent directement.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-8xl font-bold text-neutral-100 font-display absolute -top-4 -left-2">
                  {item.step}
                </div>
                <div className="relative pt-12">
                  <h3 className="text-2xl font-semibold text-neutral-900 mb-4">{item.title}</h3>
                  <p className="text-neutral-600 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 font-display">
              Des tarifs simples et transparents
            </h2>
            <p className="mt-6 text-xl text-neutral-600">
              Choisissez le plan qui correspond à vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative card-premium p-8 ${plan.popular ? 'ring-2 ring-forest-500 scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1 bg-gradient-to-r from-forest-600 to-forest-500 text-white text-sm font-semibold rounded-full shadow-lg">
                      Le plus populaire
                    </div>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-neutral-900">{plan.name}</h3>
                  <p className="text-neutral-600 text-sm mt-1">{plan.desc}</p>
                </div>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-neutral-900">{plan.price}</span>
                  <span className="text-neutral-600 ml-2">FCFA/mois</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-forest-500 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular 
                    ? 'btn-primary' 
                    : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                }`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-forest-800 via-forest-700 to-forest-600 p-12 sm:p-16 text-center">
            <div className="absolute inset-0 grid-bg opacity-10"></div>
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl font-bold text-white font-display mb-6">
                Prêt à transformer votre école ?
              </h2>
              <p className="text-xl text-forest-100 mb-10 max-w-2xl mx-auto">
                Rejoignez des centaines d'écoles qui font confiance à EduGate Gabon pour leur présence en ligne.
              </p>
              <Link 
                to="/onboarding"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-forest-700 rounded-xl font-semibold text-lg hover:bg-forest-50 transition-all shadow-xl group"
              >
                Créer ma page maintenant
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-forest-600 to-forest-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold gradient-text font-display">EduGate Gabon</span>
                <p className="text-xs text-neutral-500">© 2026 Tous droits réservés</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-600">
              <a href="#" className="hover:text-neutral-900 transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-neutral-900 transition-colors">Conditions</a>
              <a href="#" className="hover:text-neutral-900 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
