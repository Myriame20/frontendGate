# EduGate Gabon 🎓

**La plateforme qui connecte les écoles et les familles au Gabon**

EduGate Gabon est une plateforme SaaS éducative à double audience qui permet aux écoles de créer leur page publique personnalisable et aux parents de découvrir les établissements et d'inscrire leurs enfants en toute simplicité.

---

## 🎨 Design System

### Couleurs du Drapeau Gabonais
- **Vert** : `#009E60` (principal) - Confiance, éducation
- **Jaune** : `#FCD116` (accents) - Excellence, prestige
- **Bleu** : `#3A75C4` (secondaire) - Professionnalisme, technologie

### Typographie
- **Titres** : Plus Jakarta Sans
- **Corps** : Inter
- **Style** : Clean, professionnel, aéré

### Inspiration Design
- Linear (dashboard, animations)
- Notion (éditeur, organisation)
- Stripe (pricing, gradients)
- Framer (animations, hero sections)

---

## 🚀 Fonctionnalités

### Pour les Écoles
1. **Création de page publique** : Éditeur intuitif avec sections personnalisables
2. **Gestion d'équipe** : Système de rôles (Super Admin, Admin, Secrétaire, Communication)
3. **Gestion des candidatures** : Recevoir, traiter et suivre les inscriptions
4. **Analytics** : Statistiques de visites et de candidatures
5. **Communication** : Messagerie avec les parents

### Pour les Parents
1. **Découverte d'écoles** : Recherche et filtres avancés
2. **Pages publiques** : Consultation des profils d'écoles
3. **Candidatures** : Soumission de demandes d'inscription
4. **Suivi** : Timeline des candidatures et notifications
5. **Favoris** : Suivi des écoles intéressantes

---

## 📱 Pages de l'Application

### Pages Publiques
- **Landing Page** (`/`) : Présentation de la plateforme pour les deux audiences
- **Recherche Écoles** (`/ecoles`) : Liste des écoles avec filtres
- **Détail École** (`/ecole/:slug`) : Page publique d'une école

### Espace École
- **Onboarding** (`/ecole/onboarding`) : Inscription en 4 étapes
- **Dashboard** (`/ecole/dashboard`) : Interface d'administration
- **Éditeur** (`/ecole/editor`) : Personnalisation de la page

### Espace Parent
- **Dashboard** (`/parent/dashboard`) : Espace personnel avec candidatures, favoris, messages

---

## 🛠️ Stack Technique

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- **React Router** (navigation)
- **Lucide React** (icônes)

---

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build

# Prévisualiser le build
npm run preview
```

---

## 🎯 Structure du Projet

```
src/
├── App.tsx                    # Router principal
├── index.css                  # Design system global
├── main.tsx                   # Point d'entrée
├── data/
│   └── logos.ts              # Logos SVG des écoles
└── pages/
    ├── LandingPage.tsx        # Page d'accueil
    ├── SchoolOnboarding.tsx   # Inscription école
    ├── SchoolDashboard.tsx    # Dashboard école
    ├── PageEditor.tsx         # Éditeur de page
    ├── PublicSchoolPage.tsx   # Page publique école
    ├── SchoolsSearch.tsx      # Recherche écoles
    ├── SchoolDetailParent.tsx # Détail école (parent)
    └── ParentDashboard.tsx    # Dashboard parent
```

---

## 🎨 Personnalisation

### Modifier les couleurs
Éditez `src/index.css` dans la section `@theme` :
```css
--color-gabon-green: #009E60;
--color-gabon-yellow: #FCD116;
--color-gabon-blue: #3A75C4;
```

### Ajouter une école
Modifiez les données dans les composants de page (à remplacer par une API backend)

### Changer les icônes
Remplacez les imports Lucide dans chaque composant

---

## 🔌 Intégration Backend

L'application utilise actuellement des données statiques. Pour connecter un backend :

1. **Remplacer les données statiques** par des appels API
2. **Implémenter l'authentification** (JWT, OAuth, etc.)
3. **Créer les endpoints** :
   - `GET /api/schools` - Liste des écoles
   - `GET /api/schools/:id` - Détail d'une école
   - `POST /api/applications` - Soumettre une candidature
   - `GET /api/applications` - Lister les candidatures
   - etc.

4. **Sécurité** :
   - Validation côté serveur
   - Rate limiting
   - Protection CSRF
   - Chiffrement des données sensibles

---

## 📊 Prochaines Étapes

### Fonctionnalités à ajouter
- [ ] Système de notifications (email, push)
- [ ] Upload de documents (PDF, images)
- [ ] Paiement en ligne (frais d'inscription)
- [ ] Calendrier de rendez-vous
- [ ] Chat en temps réel
- [ ] Mode sombre
- [ ] Internationalisation (i18n)
- [ ] PWA (Progressive Web App)

### Améliorations techniques
- [ ] Migration vers une vraie base de données (PostgreSQL, MongoDB)
- [ ] Tests unitaires et E2E
- [ ] CI/CD pipeline
- [ ] Monitoring et analytics
- [ ] Optimisation des performances

---

## 🤝 Contribution

Ce projet est un prototype démonstratif. Pour une version production :
1. Implémenter un backend robuste
2. Ajouter l'authentification sécurisée
3. Mettre en place la validation des données
4. Configurer le déploiement (Vercel, Netlify, AWS)
5. Ajouter les tests automatisés

---

## 📄 Licence

Ce projet est destiné à un usage éducatif et démonstratif.

---

## 🎉 Remerciements

Design inspiré des meilleures applications SaaS :
- Linear, Notion, Stripe, Framer, Airtable

Couleurs du drapeau gabonais pour une identité locale forte.

---

**Développé avec ❤️ pour l'éducation au Gabon**
