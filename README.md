## Landing page — Modernisation Web

### Prérequis
- Node.js (LTS recommandé)

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

### Build

```bash
npm run build
```

### À personnaliser
- `src/constants/contact.ts`: email et téléphone (utilisés partout + formulaire)
- `src/App.tsx`: nom de marque, contenu des sections
- Section `#portfolio`: tes projets (captures dans `src/assets/portfolio/*.jpg`, importées par Vite)

### Captures d’écran du portfolio
Les cartes utilisent des **fichiers image locaux** (pas une URL externe). Si tu vois une image cassée :

1. Ouvre un terminal **dans le dossier du projet** (là où se trouve `package.json`).
2. Installe les dépendances : `npm install`
3. Installe le navigateur pour les captures (une fois) : `npx playwright install chromium`
4. Génère les images : `npm run capture:portfolio`  
   → les fichiers sont écrits dans `src/assets/portfolio/remidental.jpg` et `ailien.jpg`
5. Lance le site : `npm run dev` puis ouvre `http://localhost:5173`

**Important** : ouvre le site via **`npm run dev`**, pas en double-cliquant sur `index.html` (sinon les chemins d’assets ne fonctionnent pas).

### Formulaire de contact
Les envois passent par [FormSubmit](https://formsubmit.co/) (gratuit, sans backend). Au **premier** message, vérifie ta boîte **roangilson@gmail.com** : FormSubmit envoie souvent un e-mail de **validation** à activer avant de relayer les soumissions.

