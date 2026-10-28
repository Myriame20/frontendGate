import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getParents, saveParents, setCurrentUser, generateId } from '../data/store';
import { GraduationCap, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function ParentAuth() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const parents = getParents();
    const parent = parents.find(p => p.email === email && p.password === password);
    if (parent) {
      setCurrentUser({ type: 'parent', id: parent.id });
      navigate('/parent/dashboard');
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const parents = getParents();
    if (parents.find(p => p.email === email)) {
      setError('Un compte avec cet email existe déjà');
      return;
    }
    const newParent = {
      id: generateId(),
      firstName,
      lastName,
      email,
      phone,
      password,
      children: []
    };
    parents.push(newParent);
    saveParents(parents);
    setCurrentUser({ type: 'parent', id: newParent.id });
    navigate('/parent/dashboard');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <GraduationCap className="w-8 h-8 text-emerald-600" />
          <span className="text-2xl font-bold">EduGate</span>
        </Link>

        <div className="card-premium p-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            {mode === 'login' ? 'Connexion Parent' : 'Inscription Parent'}
          </h2>
          <p className="text-neutral-600 mb-6">
            {mode === 'login' ? 'Accédez à votre espace parent' : 'Créez votre compte parent'}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-premium pl-10"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-premium pl-10"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                Se connecter
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Prénom</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Nom</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input-premium"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-premium"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Téléphone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-premium"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-premium"
                  required
                />
              </div>
              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                Créer mon compte
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-neutral-600">
            {mode === 'login' ? (
              <>
                Pas encore de compte ?{' '}
                <button onClick={() => setMode('register')} className="text-emerald-600 font-medium hover:text-emerald-700">
                  S'inscrire
                </button>
              </>
            ) : (
              <>
                Déjà un compte ?{' '}
                <button onClick={() => setMode('login')} className="text-emerald-600 font-medium hover:text-emerald-700">
                  Se connecter
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
