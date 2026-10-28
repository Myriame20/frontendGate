import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, User, LogOut, Home, BookOpen } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  user: { type: 'parent' | 'school'; id: string } | null;
  onLogout: () => void;
}

export default function Layout({ children, user, onLogout }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Accueil', icon: Home },
    { to: '/schools', label: 'Écoles', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-ivory-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-forest-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-forest-600 to-forest-500 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">EduGate</span>
                <span className="text-xs text-forest-500 block -mt-1">Gabon</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-forest-600'
                      : 'text-gray-600 hover:text-forest-600'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}

              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    to={user.type === 'parent' ? '/parent-dashboard' : '/school-dashboard'}
                    className="flex items-center gap-2 px-4 py-2 bg-forest-600 text-white rounded-lg text-sm font-medium hover:bg-forest-700 transition-colors shadow-md"
                  >
                    <User className="w-4 h-4" />
                    {user.type === 'parent' ? 'Mon Espace' : 'Administration'}
                  </Link>
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-1.5 px-3 py-2 text-gray-600 hover:text-red-600 text-sm font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="px-5 py-2.5 bg-gradient-to-r from-forest-600 to-forest-500 text-white rounded-lg text-sm font-semibold hover:from-forest-700 hover:to-forest-600 transition-all shadow-lg shadow-forest-600/20"
                >
                  Connexion
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-forest-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-forest-100 bg-white"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-forest-50"
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link
                      to={user.type === 'parent' ? '/parent-dashboard' : '/school-dashboard'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-forest-600 text-white"
                    >
                      <User className="w-5 h-5" />
                      {user.type === 'parent' ? 'Mon Espace' : 'Administration'}
                    </Link>
                    <button
                      onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center px-4 py-2.5 bg-forest-600 text-white rounded-lg font-medium"
                  >
                    Connexion / Inscription
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-forest-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-forest-400 to-forest-300 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">EduGate</span>
                  <span className="text-xs text-forest-300 block -mt-1">Gabon</span>
                </div>
              </div>
              <p className="text-forest-200 text-sm max-w-md">
                La première plateforme numérique d'inscription scolaire au Gabon. 
                Simplifiez le processus d'admission et connectez-vous aux meilleurs établissements du pays.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Navigation</h4>
              <ul className="space-y-2 text-sm text-forest-200">
                <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
                <li><Link to="/schools" className="hover:text-white transition-colors">Écoles</Link></li>
                <li><Link to="/auth" className="hover:text-white transition-colors">Connexion</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-forest-200">
                <li>📍 Libreville, Gabon</li>
                <li>📞 +241 01 00 00 00</li>
                <li>✉️ contact@edugate.ga</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-forest-700 mt-8 pt-8 text-center text-sm text-forest-300">
            © 2026 EduGate Gabon. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
