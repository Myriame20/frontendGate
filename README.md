# EduGate - Plateforme de Gestion Scolaire

## 🎯 Vue d'ensemble

EduGate est une plateforme SaaS complète qui connecte les écoles et les familles. Elle permet aux écoles de créer leur page publique personnalisable et aux parents de découvrir les établissements, consulter les places disponibles en temps réel, et soumettre des candidatures d'inscription.

## ✨ Fonctionnalités Principales

### 🏫 Pour les Écoles

#### 1. **Création de Page avec Validation**
- Processus d'inscription en 3 étapes
- **Validation manuelle** par l'administrateur de la plateforme
- Les écoles ne sont pas publiées automatiquement
- Système de vérification pour éviter les fausses écoles

#### 2. **Gestion d'Équipe Multi-Rôles**
- **Super Admin** (Directeur) : Accès complet
- **Admin** (Directeur Adjoint) : Gestion des candidatures
- **Secrétaire** : Traitement des demandes
- **Communication** : Gestion des médias

#### 3. **Gestion des Places en Temps Réel**
- Définition du nombre total de places par année
- Décompte automatique lors des approbations
- Libération automatique des places en cas de renvoi
- **Anti-corruption** : Les parents voient les places réelles

#### 4. **Dossiers Annuels**
- Tableau de bord par année scolaire
- Suivi des élèves par classe
- Gestion des résultats et notes
- Publication des résultats annuels
- **Classement automatique** des écoles

#### 5. **Gestion des Candidatures**
- Consultation détaillée de chaque demande
- Statuts : En attente → En révision → Approuvée/Rejetée
- Indicateur de consultation (nouveau/consulté)
- Historique complet des modifications

### 👨‍👩‍👧 Pour les Parents

#### 1. **Découverte d'Écoles**
- Recherche par nom, ville, type
- Filtres avancés
- **Badge de places disponibles** en temps réel
- Pages publiques complètes des écoles

#### 2. **Candidatures Modifiables**
- Soumission de demandes d'inscription
- **Modification possible** tant que l'école n'a pas consulté
- Suivi du statut en temps réel
- Notifications de changement de statut

#### 3. **Transparence Totale**
- Visualisation des places disponibles avant de postuler
- Impossible de postuler si plus de places
- Suivi précis de l'état de chaque candidature

### 🔧 Pour l'Administration de la Plateforme

#### 1. **Validation des Écoles**
- Approbation ou rejet des nouvelles écoles
- Vérification de l'existence réelle
- Contrôle qualité du contenu

#### 2. **Supervision Globale**
- Vue d'ensemble de toutes les écoles
- Statistiques globales
- Gestion des problèmes

## 🎨 Design System

### Couleurs
- **Vert** : `#009E60` (principal) - Confiance, éducation
- **Jaune** : `#FCD116` (accents) - Excellence, prestige
- **Bleu** : `#3A75C4` (secondaire) - Professionnalisme

### Typographie
- **Titres** : Plus Jakarta Sans
- **Corps** : Inter
- **Style** : Premium, inspiré de Linear/Notion/Stripe

### Design International
- Logo EduGate professionnel (pas d'appartenance visuelle à un pays)
- Design épuré et moderne
- Adaptable pour expansion internationale

## 📊 Flux de Données

### Cycle de Vie d'une Candidature

```
Parent soumet → Statut: "pending" (modifiable)
    ↓
École consulte → viewedBySchool: true (non modifiable)
    ↓
École traite → Statut: "review" / "approved" / "rejected"
    ↓
Si approuvée → availablePlaces - 1
```

### Gestion des Places

```
École définit totalPlaces (ex: 100)
    ↓
availablePlaces = 100
    ↓
Candidature approuvée → availablePlaces = 99
    ↓
Élève renvoyé → availablePlaces = 100 (libération automatique)
```

## 🚀 Installation et Démarrage

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

## 📁 Structure du Projet

```
src/
├── components/
│   └── EduGateLogo.tsx          # Logo professionnel
├── data/
│   ├── store.ts                 # Gestion des données et localStorage
│   └── schoolLogos.ts           # Logos des écoles
├── pages/
│   ├── LandingPage.tsx          # Page d'accueil internationale
│   ├── SchoolsPage.tsx          # Recherche d'écoles
│   ├── SchoolDetailPage.tsx     # Détail d'une école
│   ├── SchoolOnboarding.tsx     # Inscription école (avec validation)
│   ├── SchoolDashboard.tsx      # Dashboard école
│   ├── ParentAuth.tsx           # Authentification parent
│   ├── ParentDashboard.tsx      # Dashboard parent
│   ├── ApplicationForm.tsx      # Formulaire de candidature
│   └── PlatformAdminDashboard.tsx # Admin plateforme
└── App.tsx                      # Router principal
```

## 🔐 Comptes de Test

### Écoles (après validation)
- Email : `admin@lyceeleonmba.ga`
- Mot de passe : `admin123`

### Parents
- Créer un compte via `/parent/auth`

### Administration Plateforme
- Accès via `/admin`

## 🎯 Fonctionnalités Clés Implémentées

✅ **Validation des écoles** par l'admin plateforme  
✅ **Places en temps réel** avec anti-corruption  
✅ **Candidatures modifiables** avant consultation  
✅ **Consultation détaillée** des demandes  
✅ **Statuts multiples** (pending/review/approved/rejected)  
✅ **Indicateur de consultation** (nouveau/consulté)  
✅ **Design international** (pas d'appartenance pays)  
✅ **Logos professionnels** (SVG, pas d'emojis enfantins)  
✅ **Responsive design** (mobile, tablet, desktop)  
✅ **Animations fluides** (Framer Motion)  

## 🔮 Fonctionnalités Futures

- [ ] Système de notifications (email, push)
- [ ] Upload de documents (PDF, images)
- [ ] Paiement en ligne
- [ ] Calendrier de rendez-vous
- [ ] Chat en temps réel
- [ ] Mode sombre
- [ ] Internationalisation (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Export PDF des résultats
- [ ] Classement détaillé par matière
- [ ] Historique complet des modifications

## 📝 Notes Importantes

1. **Données localStorage** : Pour la démo, les données sont stockées localement. Pour la production, utilisez une vraie base de données.

2. **Validation manuelle** : Les écoles doivent être validées par l'admin plateforme avant d'être visibles.

3. **Places en temps réel** : Le système empêche les inscriptions fantômes et la corruption.

4. **Modification des candidatures** : Les parents peuvent modifier leurs demandes tant que l'école ne les a pas consultées.

5. **Design international** : Le branding est neutre pour permettre l'expansion dans d'autres pays.

## 🤝 Contribution

Ce projet est un prototype démonstratif. Pour une version production :
1. Implémenter un backend robuste (Node.js, Django, etc.)
2. Ajouter l'authentification sécurisée (JWT, OAuth)
3. Mettre en place la validation des données
4. Configurer le déploiement (Vercel, Netlify, AWS)
5. Ajouter les tests automatisés

## 📄 Licence

Ce projet est destiné à un usage éducatif et démonstratif.

---

**Développé avec ❤️ pour l'éducation**
