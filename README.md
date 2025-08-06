# 🌾 Guilder – Application Web CUMA (Next.js + MongoDB)

**Guilder** est une application web de gestion pour les coopératives agricoles (type CUMA). Développée avec **Next.js** et **MongoDB**, elle permet de gérer les membres, outils, interventions, contestations et bilans via une interface moderne et sécurisée. Elle propose aussi des fonctions avancées comme l’envoi d’e-mails et la génération de PDF.

---

## 🚀 Fonctionnalités

- 🔐 Authentification sécurisée par JWT
- 👥 Gestion des membres
- 🧰 Déclaration d'interventions et gestion d’outils
- ⚖️ Contestation et arbitrage
- 📩 Envoi de mails automatiques avec Nodemailer
- 📄 Génération de PDF avec React-PDF
- 🧩 API REST intégrée via les routes Next.js (`app/api/...`)

---

## 🧱 Stack technique

- **Framework** : Next.js (App Router)
- **Langage** : TypeScript
- **Frontend** : React
- **Base de données** : MongoDB
- **ORM** : Mongoose
- **Authentification** : JWT (`jsonwebtoken`)
- **Sécurité** : `bcrypt` pour le hash des mots de passe
- **E-mails** : `nodemailer`
- **PDF** : `@react-pdf/renderer`

---

## 📁 Structure du projet

```
Guilder/
├── app/
│   ├── (app)/               # Pages privées (admin, guilde, déclaration, etc.)
│   ├── (landing)/           # Pages publiques (accueil, contact, mentions légales)
│   ├── api/                 # Endpoints API sécurisés
├── components/              # Composants UI réutilisables
├── constants/               # Types, rôles, couleurs
├── contexts/                # React Context (adminContext)
├── hooks/                   # Hooks personnalisés
├── utils/                   # Requêtes et helpers front
├── public/                  # Fichiers statiques
└── middleware.ts            # Middleware JWT
```

---

## 📦 Installation

### Prérequis

- Node.js ≥ 18
- MongoDB local ou distant

### Étapes

```bash
git clone https://github.com/MajorDown/Guilder.git
cd Guilder
cp .env.example .env        # Ajoute ta URI MongoDB
npm install
npm run dev
```

---

## 🔐 Authentification

L’app utilise des **tokens JWT**, envoyés via les headers HTTP :

- `Authorization: Bearer <token>`
- `X-user-Mail: <email>`

Ces informations sont traitées par le middleware pour sécuriser l’accès aux routes et API.

---

## 📧 Envoi d’e-mails

Les mails sont envoyés via **Nodemailer**, notamment pour :

- confirmation d’inscription
- récupération de mot de passe

---

## 📄 PDF

Des documents PDF (comme des bilans) peuvent être générés côté client via `@react-pdf/renderer`.

---

## 👨‍💻 Auteur

Développé par **Romain Fouillaron**  
🌍 [romainfouillarondev.fr](https://romainfouillarondev.fr)  
📧 romain.fouillaron@gmx.fr  
💼 [LinkedIn](https://www.linkedin.com/in/romain-fouillaron/)  
🐙 [GitHub](https://github.com/MajorDown)

---

## ⚖️ Licence

Ce projet est sous licence MIT.