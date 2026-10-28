import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { getParents, saveParents, getSchoolAdmins, generateId } from '../data/store';

interface Props {
  onLogin: (type: 'parent' | 'school', id: string) => void;
}

export default function Auth({ onLogin }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'parent' | 'school'>('parent');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (role === 'parent') {
      const parents = getParents();
      const parent = parents.find(p => p.email === loginForm.email && p.password === loginForm.password);
      if (parent) {
        onLogin('parent', parent.id);
        navigate('/parent-dashboard');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } else {
      const admins = getSchoolAdmins();
      const admin = admins.find(a => a.email === loginForm.email && a.password === loginForm.password);
      if (admin) {
        onLogin('school', admin.id);
        navigate('/school-dashboard');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    if (registerForm.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    const parents = getParents();
    if (parents.find(p => p.email === registerForm.email)) {
      setError('Un compte avec cet email existe déjà');
      return;
    }

    const newParent = {
      id: generateId(),
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      email: registerForm.email,
      phone: registerForm.phone,
      password: registerForm.password,
      children: []
    };

    parents.push(newParent);
    saveParents(parents);
    onLogin('parent', newParent.id);
    navigate('/parent-dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-forest-800 to-forest-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative z-10 flex flex-col justify-center px-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-forest-400 to-forest-300 rounded-2xl flex items-center justify-center shadow-xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-3xl font-bold text-white">EduGate</span>
              <span className="text-sm text-forest-300 block">Gabon</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white font-serif leading-tight mb-6">
            L'éducation de qualité à portée de clic
          </h2>
          <p className="text-forest-200 text-lg max-w-md">
            Rejoignez la plus grande plateforme d'inscription scolaire du Gabon. 
            Simplifiez vos démarches et connectez-vous aux meilleurs établissements.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
              <div className="text-2xl font-bold text-white">6+</div>
              <div className="text-forest-200 text-sm">Écoles partenaires</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-forest-200 text-sm">Gratuit pour les parents</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-ivory-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-forest-600 to-forest-500 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">EduGate Gabon</span>
          </div>

          <h2 className="text-2xl font-bold text-forest-800 text-center">
            {mode === 'login' ? 'Bon retour !' : 'Créer un compte'}
          </h2>
          <p className="text-gray-500 text-center mt-2">
            {mode === 'login' ? 'Connectez-vous à votre espace' : 'Inscrivez-vous pour commencer'}
          </p>

          {/* Role Toggle */}
          {mode === 'login' && (
            <div className="mt-6 flex bg-forest-50 rounded-xl p-1">
              <button
                onClick={() => setRole('parent')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  role === 'parent' ? 'bg-white text-forest-700 shadow-sm' : 'text-gray-500'
                }`}
              >
                👨‍👩‍👧 Parent
              </button>
              <button
                onClick={() => setRole('school')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  role === 'school' ? 'bg-white text-forest-700 shadow-sm' : 'text-gray-500'
                }`}
              >
                🏫 École
              </button>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full pl-11 pr-11 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-forest-600 to-forest-500 text-white rounded-lg font-semibold hover:from-forest-700 hover:to-forest-600 transition-all shadow-lg shadow-forest-600/20"
              >
                Se connecter
              </button>
              {role === 'school' && (
                <p className="text-xs text-gray-400 text-center mt-2">
                  💡 Démo: admin@lyceeleonmba.ga / admin123
                </p>
              )}
            </form>
          ) : (
            <form onSubmit={handleRegister} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={registerForm.firstName}
                      onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400"
                      placeholder="Prénom"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    value={registerForm.lastName}
                    onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400"
                    placeholder="Nom"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400"
                    placeholder="+241 ..."
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                    className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400"
                    placeholder="Min. 6 caractères"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                <input
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-forest-600 to-forest-500 text-white rounded-lg font-semibold hover:from-forest-700 hover:to-forest-600 transition-all shadow-lg shadow-forest-600/20"
              >
                Créer mon compte
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            {mode === 'login' ? (
              <>
                Pas encore de compte ?{' '}
                <button onClick={() => { setMode('register'); setError(''); }} className="text-forest-600 font-medium hover:text-forest-700">
                  S'inscrire
                </button>
              </>
            ) : (
              <>
                Déjà un compte ?{' '}
                <button onClick={() => { setMode('login'); setError(''); }} className="text-forest-600 font-medium hover:text-forest-700">
                  Se connecter
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
