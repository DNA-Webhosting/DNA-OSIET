# DNA-OSIET

## Système d'Information Médical - OSIET

Le système d'information "Medilog" est conçu pour informatiser l'ensemble des processus métier de l'OSIET. Il vise une transformation numérique complète pour améliorer l'efficacité, la qualité des soins et la prise de décision.

## 🚀 Technologies Utilisées

- **Backend**: Laravel 11 (PHP 8.3)
- **Frontend**: Vue.js 3 + Inertia.js + TypeScript
- **Base de données**: MySQL/PostgreSQL
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Architecture**: Modulaire (Laravel Modules)

## 📦 Architecture Modulaire

Le projet utilise une architecture modulaire avec les modules suivants :

- **Adherent**: Gestion des sociétés adhérentes, ayants droit et cotisations
- **Clinique**: Consultations médicales (générales et médecine du travail)
- **Finance**: Administration, finances et caisse
- **ParcoursPatient**: Parcours patient de l'accueil à la sortie
- **Pharmacie**: Gestion des stocks, dispensation et fournisseurs
- **Reporting**: Pilotage et reporting automatisé

## 🛠️ Installation

### Prérequis

- PHP 8.3+
- Composer
- Node.js 20+
- MySQL/PostgreSQL
- Git

### Installation du projet

```bash
# Cloner le dépôt
git clone --recurse-submodules https://github.com/DNA-Webhosting/DNA-OSIET.git
cd DNA-OSIET

# Installer les dépendances PHP
composer install

# Installer les dépendances Node.js
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Générer la clé d'application
php artisan key:generate

# Configurer la base de données dans .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=dna_osiet
# DB_USERNAME=votre_username
# DB_PASSWORD=votre_password

# Exécuter les migrations
php artisan migrate

# Publier les assets des modules
php artisan module:publish

# Compiler les assets
npm run build

# Démarrer le serveur de développement
php artisan serve
```

### Installation des modules

Chaque module est un sous-module Git. Pour les initialiser :

```bash
# Initialiser les sous-modules
git submodule update --init --recursive

# Installer les dépendances de chaque module
cd Modules/Adherent && composer install && npm install
cd ../Clinique && composer install && npm install
cd ../Finance && composer install && npm install
cd ../ParcoursPatient && composer install && npm install
cd ../Pharmacie && composer install && npm install
cd ../Reporting && composer install && npm install
```

## 🏗️ Structure du Projet

```
DNA-OSIET/
├── app/                    # Code de l'application principale
├── Modules/               # Modules du système
│   ├── Adherent/         # Module Gestion des Adhérents
│   ├── Clinique/         # Module Consultations Médicales
│   ├── Finance/          # Module Administration & Finances
│   ├── ParcoursPatient/  # Module Parcours Patient
│   ├── Pharmacie/        # Module Gestion Pharmacie
│   └── Reporting/        # Module Reporting
├── resources/            # Ressources frontend
├── routes/               # Routes de l'application
├── database/             # Migrations et seeders
├── config/               # Configuration
└── public/               # Assets publics
```

## 📋 Fonctionnalités Principales

### 🔐 Authentification & Autorisation
- Système d'authentification multi-profils
- Gestion des rôles et permissions
- QR Code unique par ayant droit

### 👥 Gestion des Adhérents
- Sociétés adhérentes avec suivi des cotisations
- Ayants droit et bénéficiaires
- Statut de paiement en temps réel (Vert/Orange/Rouge)

### 🏥 Parcours Patient
- Accueil et enregistrement
- Prise des paramètres vitaux
- Triage automatique des urgences
- Orientation intelligente

### 🩺 Consultations Médicales
- Dossier médical intégré
- Prescriptions électroniques
- Examens et certificats médicaux
- Traçabilité complète

### 💊 Gestion Pharmacie
- Catalogue et stocks
- Dispensation automatisée
- Gestion des fournisseurs
- Alertes de péremption

### 💰 Administration & Finances
- Caisse et facturation
- Gestion des dépenses
- Rapports financiers
- Paramétrage système

### 📊 Reporting
- Tableaux de bord temps réel
- Rapports réglementaires automatisés
- KPIs et métriques
- Exports PDF/Excel

## 🔄 Workflow de Développement

### Utilisation des Modules Laravel

1. **Créer un nouveau module** :
```bash
php artisan module:make NomDuModule
```

2. **Structure d'un module** :
```
Modules/NomDuModule/
├── app/
│   ├── Http/Controllers/
│   ├── Models/
│   └── Providers/
├── resources/
│   ├── js/
│   └── views/
├── routes/
├── database/
│   ├── migrations/
│   └── seeders/
├── config/
└── module.json
```

3. **Activer/Désactiver un module** :
   - Modifier `config/modules.php`
   - Ou utiliser `modules_statuses.json`

### Gestion des Commits

Tous les commits doivent être en français et suivre les conventions standard :

```bash
# Types de commits autorisés :
git commit -m "feat: ajout d'une nouvelle fonctionnalité"
git commit -m "fix: correction d'un bug"
git commit -m "docs: mise à jour de la documentation"
git commit -m "style: modifications de formatage"
git commit -m "refactor: refactorisation du code"
git commit -m "test: ajout ou modification de tests"
git commit -m "chore: tâches de maintenance"
```

### Gestion des Branches

```bash
# Créer une branche pour une fonctionnalité
git checkout -b feature/nom-fonctionnalite

# Créer une branche pour un bug fix
git checkout -b fix/nom-bug

# Merge vers main
git checkout main
git merge feature/nom-fonctionnalite
```

## 🚀 Déploiement

### Environnement de développement
```bash
npm run dev
```

### Build de production
```bash
npm run build
npm run build:ssr
```

### Cache et optimisation
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 📚 Documentation

### Spécifications Fonctionnelles Détaillées

#### 1. Introduction

##### 1.1 Contexte et Objectifs

Le système d'information "Medilog" est conçu pour informatiser l'ensemble des processus métier de l'OSIET. Il vise une transformation numérique complète pour améliorer l'efficacité, la qualité des soins et la prise de décision. Les objectifs principaux sont :

* **Centraliser l'information :** Établir une source de données unique et fiable pour la gestion des adhérents et bénéficiaires.
* **Optimiser les flux :** Fluidifier le parcours complet du patient dans les différents services, de son arrivée à sa sortie, en réduisant les temps d'attente.
* **Garantir la traçabilité :** Assurer un suivi complet de la consultation médicale, des soins dispensés, et de la délivrance des médicaments.
* **Rationaliser la logistique :** Moderniser la gestion de la pharmacie, des stocks et des fournisseurs pour éviter les ruptures et optimiser les coûts.
* **Piloter par la donnée :** Automatiser la génération de rapports réglementaires et stratégiques pour une vision claire et en temps réel de l'activité.

La solution repose sur un **identifiant unique QR Code** attribué à chaque ayant droit. Cet identifiant est la clé de voûte du système, garantissant l'authentification, la rapidité d'accès à l'information et la traçabilité de toutes les interventions.

##### 1.2 Périmètre du Projet

Le système couvrira les modules suivants, conçus pour être potentiellement développés de manière séquentielle :

* **Module A :** Gestion des sociétés adhérentes, des ayants droit et des cotisations.
* **Module B :** Parcours patient, de l'accueil à la sortie.
* **Module C :** Consultations médicales (générales et médecine du travail).
* **Module D :** Gestion des actes infirmiers, de maternité et autres soins.
* **Module E :** Gestion de la pharmacie (stocks, dispensation, fournisseurs).
* **Module F :** Administration, finances, utilisateurs et paramétrage.
* **Module G :** Pilotage et reporting automatisé.

##### 1.3 Acteurs et Profils Utilisateurs

Chaque utilisateur sera affecté à un **profil métier** disposant de droits d'accès strictement limités aux fonctionnalités nécessaires à sa mission :

* **Fichiste (accueil) :** Gère l'enregistrement et l'orientation des patients de médecine générale.
* **Major (accueil médecine du travail) :** Gère l'enregistrement et l'orientation des travailleurs pour la médecine du travail.
* **Personnel des paramètres :** Saisit les constantes vitales des patients.
* **Infirmier / Sage-femme :** Enregistre les actes de soins, de vaccination et de maternité.
* **Médecin (Généraliste ou Travail) :** Accède au dossier médical, réalise les consultations et génère les prescriptions.
* **Pharmacien / Gestionnaire de stock :** Gère le catalogue, les stocks et la dispensation des médicaments.
* **Administrateur / Superviseur / Direction :** Dispose d'un accès étendu pour la gestion financière, le paramétrage du système, la gestion des utilisateurs et la génération de tous les rapports.

---

## 2. Spécifications Fonctionnelles Détaillées par Module

---

### [[Module A – Gestion des Adhérents et des Cotisations]]

### **A.1 Sociétés Adhérentes**
* **Interface :** Fiche Société
* **Données :** Nom de la société, NIF, STAT, adresse complète, téléphone, email, nom du contact principal, date d'adhésion, statut (Actif, Inactif/Archivé).
* **Actions :** Créer, modifier, rechercher par nom/NIF, archiver.
* **Règle :** Le statut "Actif" est une condition sine qua non pour pouvoir rattacher un nouvel ayant droit ou enregistrer un paiement de cotisation pour cette société. Une société archivée est conservée pour l'historique mais n'est plus active dans les opérations courantes.

### **A.2 Ayants Droit (Salariés et Bénéficiaires)**
* **Interface :** Fiche Adhérent
* **Données :**
    * **Identité complète :** Nom, prénom, sexe, date de naissance, adresse, téléphone, email.
    * **Profession (pour les salariés) :** Poste occupé, statut d'emploi (Permanent, CDD, Temporaire), date d'entrée dans l'entreprise. **La date de fin de contrat est un champ obligatoire si le statut n'est pas "Permanent"**.
    * **Adhésion :** Type (Individuelle, Familiale, etc.), date d'adhésion à l'OSIET, numéro OSIET unique généré automatiquement par le système.
    * **Liste des bénéficiaires rattachés (pour une adhésion familiale) :** Pour chaque bénéficiaire, enregistrement du nom complet, sexe, date de naissance et lien de parenté (Conjoint, Enfant).
* **Actions :** Créer ("Embaucher"), modifier, archiver ("Débaucher"), rechercher par nom/numéro OSIET, générer et imprimer le badge QR Code individuel.
* **Historique :** Toute modification du statut, de la société de rattachement ou des informations critiques doit être journalisée avec la date et l'utilisateur responsable. Historique de Facturation directe

### **A.3 Cotisations**
* **Interface :** Paiement de cotisation
* **Données :** Sélection de la société, période de cotisation concernée (ex: T1 2024), montant versé, date de paiement, mode de paiement.
* **Règles :**
    * Le système doit gérer les **paiements partiels**. Le montant restant dû pour une période doit être clairement visible.
    * Le **statut de la société est mis à jour automatiquement** en temps réel selon les règles de retard : **Vert** (à jour), **Orange** (retard modéré, 1er mois de retard), **Rouge** (retard sévère, 2 mois et plus).
    * L'accès aux soins pour les ayants droits d'une société au statut "Rouge" est bloqué par défaut, avec une possibilité de dérogation manuelle par un administrateur.
    * Le système doit permettre la génération automatique d'un **reçu de paiement** au format PDF.

---

### [[Module B – Parcours Patient]]
### **B.1 Accueil et Enregistrement**
* **Interface :** Tableau de bord de l'accueil
* **Objectif :** Enregistrer chaque arrivée, identifier le patient, qualifier sa visite, vérifier ses droits d'accès aux soins et l'orienter correctement, tout en initiant les processus financiers si nécessaire.
* **Méthodes d'identification :**
    * **QR code (méthode primaire) :** Le scan instantané doit afficher les informations essentielles : Nom, Prénom, et un **indicateur visuel du statut de cotisation** de la société (Vert/Orange/Rouge). Si le statut est Rouge, un message de blocage clair s'affiche.
    * **Recherche manuelle (méthode secondaire) :** Par nom, prénom, ou numéro OSIET.
    * **Création patient externe :** Formulaire simplifié (Nom, Prénom, Sexe, Date de naissance, contact) pour les non-adhérents. Cette action **déclenche automatiquement la création d'une "Facture de Visite"** dans le Module E et génère un QR code temporaire pour la visite.
* **Saisie obligatoire du motif de visite standardisé :**
    * Ce champ est crucial et doit permettre de qualifier la visite dans une liste configurable (ex: `Consultation Générale`, `Visite périodique`, `CPN`, `Vaccination`, `Pansement`, `Urgence`).
    * Le système doit **indiquer si le motif de visite sélectionné est un service payant** selon la grille tarifaire (Module E).
* **Action et Orientation :**
    * Le patient est ajouté à une file d'attente virtuelle visible par le service suivant ("Paramètres", "Soins", etc.).
    * **Règle Financière :** Si le patient est externe ou si le motif de visite est payant, l'agent d'accueil doit l'informer de la nécessité de passer à la caisse. Le statut du patient dans la file d'attente doit refléter son état de paiement (ex: `En attente de paiement`, `Payé`).

### **B.2 Prise des Paramètres Vitaux**
* **Interface :** Saisie des paramètres
* **Objectif :** Saisir les constantes vitales du patient, qui seront immédiatement disponibles pour le médecin, et détecter automatiquement les urgences potentielles.
* **Données :** Poids (kg), taille (cm), température (°C), tension artérielle (systolique/diastolique en mmHg), fréquence cardiaque (bpm), saturation O2 (%), périmètre crânien (cm, pour la pédiatrie), résultat du TDR Palu (`Négatif`, `Positif`, `Non réalisé`).
* **Règles de Triage Automatique :**
    * Si la température saisie est supérieure à un seuil paramétrable (ex: 37.5°C), le dossier de la visite est automatiquement flagué avec un indicateur **"Urgence Hyperthermie"** pour le reporting et une potentielle priorisation.
    * Si la TA systolique ou diastolique dépasse des seuils paramétrables, le dossier de la visite est automatiquement flagué avec un indicateur **"Urgence Hypertension"**.
* **Interaction :** Le personnel voit le statut de paiement du patient sur son écran. Après la saisie, le patient est transféré à la file d'attente suivante (généralement, celle du médecin).

### **B.3 Enregistrement des Actes de Soins (Hors Consultation)**
* **Interface :** Formulaire de saisie d'acte de soins
* **Objectif :** Permettre au personnel infirmier et aux sages-femmes de tracer rapidement tous les actes techniques, en s'assurant que les conditions financières sont remplies.
* **Données :**
    * Le formulaire doit permettre de sélectionner un ou plusieurs actes dans une **liste exhaustive et catégorisée**, de spécifier la quantité, et d'associer l'acte au professionnel de santé (utilisateur connecté).
    * **Indication Tarifaire :** Pour chaque acte dans la liste, le système doit afficher un indicateur s'il s'agit d'un **acte payant**.
* **Spécificité de la liste d'actes :** La liste doit être configurable (Module E) et **alignée à 100% avec les libellés des rapports mensuels** (rapports "Soins 1/2", "Maternité"), incluant des items comme `Suture`, `Injection IM`, `Aérosol`, `CPN`, `VACCIN_DTC2`, `Accouchement`, etc.
* **Règles et Points de Contrôle Financier :**
    * Si un acte sélectionné est payant, le système **ajoute automatiquement cet acte à la "Facture de Visite"** du patient dans le Module E.
    * **Contrôle avant validation :** Avant de pouvoir enregistrer définitivement un acte payant, le système doit vérifier le statut de paiement du patient. Si la facture n'est pas réglée, il doit afficher une **alerte bloquante** : "Cet acte n'a pas été réglé à la caisse. Veuillez diriger le patient vers la caisse avant de procéder." Une dérogation par un superviseur doit être possible et tracée.

---

### [[Module C – Consultations Médicales]]

### **C.1 Dossier Médical**
* **Affichage :** Le système présente une vue chronologique et intégrée de l'historique complet du patient : consultations antérieures, diagnostics posés, ordonnances, résultats d'examens, actes de soins, et graphiques d'évolution des paramètres vitaux.

### **C.2 Consultation en cours**
* **Interface :** Formulaire de consultation
* **Données :** Champs structurés pour le motif de la visite, les plaintes du patient, les observations de l'examen clinique, et le(s) diagnostic(s).
* **Diagnostic :** Le champ diagnostic est un **élément clé**. Il doit proposer une **liste standardisée, obligatoire, basée sur la nomenclature du rapport RMA**. Une fonction de recherche doit faciliter la sélection. Un champ de texte libre est disponible pour ajouter des précisions, mais pas en remplacement du diagnostic standardisé.

### **C.3 Prescriptions et Documents**
* **Ordonnance :** Le médecin peut prescrire des médicaments en les sélectionnant dans le catalogue pharmacie. Il doit spécifier la posologie exacte (matin, midi, soir), la dose, la durée, et la quantité. L'ordonnance est transmise en temps réel à la pharmacie. Le document imprimé ne doit pas afficher les paramètres vitaux du patient.
* **Examens :** La prescription d'examens se fait via une sélection dans une **liste structurée par catégorie** (Biochimie, Sérologie, Imagerie...). Pour l'imagerie, la **spécification du type d'examen** (`Echo obstétricale`, `Radio du thorax`...) et du **lieu** (`Interne`, `Externe`) est obligatoire.
* **Certificats (Médecine du Travail) :** Le formulaire de génération exige la sélection du **type de visite** (`Embauche`, `Périodique`...) et du **résultat de l'aptitude** (`Apte`, `Inapte`...) dans des listes prédéfinies. Le système doit permettre la génération d'un PDF et proposer un envoi optionnel par email à l'employeur.
* **Lettres de référence :** Un éditeur de texte simple permet la rédaction de lettres de référence.

---

### [[Module D – Pharmacie]]

### **D.1 Catalogue et Stocks**
* **Interface :** Fiche article
* **Données :** Nom commercial/DCI, référence interne, unité (comprimé, flacon...), emballage (boîte de 10, flacon de 100ml...), fournisseur par défaut, et **seuil d'alerte de stock critique**.

### **D.2 Mouvements de Stock**
* **Entrée en stock :**
    * Le formulaire d'entrée doit permettre de saisir : le fournisseur, la date de réception, le numéro de lot, la date de péremption, et la quantité reçue pour chaque article.
    * Un champ booléen **"Intrant Gratuit"** est obligatoire. Si coché, un champ supplémentaire apparaît pour sélectionner le **programme de santé associé** (PEV, IST, Paludisme...).
* **Sortie de stock interne :**
    * Le formulaire doit permettre de tracer la sortie d'articles pour les services, en enregistrant : l'article, la quantité, le service demandeur, et le responsable.
* **Dispensation au patient :**
    * Le **scan du QR code** du patient au comptoir affiche instantanément ses ordonnances en attente.
    * Le pharmacien coche les médicaments qu'il délivre. Cette action de validation **décrémente automatiquement et irréversiblement le stock en temps réel**.

### **D.3 Fournisseurs**
* Gestion complète des fiches fournisseurs (contacts, adresses, conditions de paiement).
* Enregistrement des factures d'achat et suivi de leur statut (à payer, payée).
* Enregistrement des paiements effectués aux fournisseurs.

---

### [[Module E – Administration, Finances et Caisse]]

### **E.1 Dépenses de Fonctionnement**

- **Interface :** Formulaire de saisie de dépense
- **Objectif :** Tracer toutes les dépenses opérationnelles de l'OSIET qui ne sont pas des achats de stock (gérés en Module D).
- **Données :**
    - **Date de la dépense :** Date à laquelle la dépense a été effectuée.
    - **Montant :** Valeur monétaire de la dépense.
    - **Catégorie :** Sélection dans une liste configurable (ex: Salaires, Fournitures de bureau, Entretien, Déplacements).
    - **Bénéficiaire :** Nom de la personne ou de l'entreprise payée.
    - **Libellé :** Description détaillée de la nature de la dépense.
    - **Mode de paiement :** Sélection dans une liste (ex: Espèces, Virement, Chèque).
    - **Justificatif :** Fonctionnalité obligatoire pour téléverser un fichier (PDF, JPG) comme preuve (facture, reçu).
- **Règle :** Possibilité de mettre en place un workflow de validation où les dépenses dépassant un certain seuil doivent être approuvées par un superviseur avant d'être comptabilisées.

### **E.2 Gestion de la Caisse et de la Facturation Patient (Ajouté)**

- **Interfaces :** Grille Tarifaire, Facturation Patient, Interface de Caisse.
- **Objectif :** Gérer les flux financiers provenant directement des patients (externes ou pour des actes hors forfait).
- **Fonctionnalités & Données :**
    - **Grille Tarifaire (Paramétrage) :** Une section où l'administrateur peut définir le prix de vente de chaque acte, consultation ou service. Des tarifs différenciés (Tarif Adhérent, Tarif Externe) doivent être possibles.
    - **Facturation Automatisée :**
        - Pour un **patient externe**, une facture est générée à l'accueil sur la base des services de base demandés.
        - Pour **tout patient**, si un acte ou un examen payant est prescrit (Module C), il est automatiquement ajouté à la "facture de visite" du patient.
    - **Encaissement (Caisse) :**
        - Une interface permet au caissier de retrouver un patient et sa facture.
        - Saisie du montant encaissé et du mode de paiement.
        - Génération d'un reçu de paiement officiel pour le patient.

- **Règles :**
    - Le statut de paiement de la facture patient (En attente, Payé) doit être visible par les autres services.
    - Des **points de contrôle** doivent être configurables : par exemple, un acte payant ne peut être réalisé ou un médicament payant ne peut être délivré que si le statut de la facture est "Payé".

### **E.3 Administration et Paramétrage**

- **Interfaces :** Gestion des Utilisateurs, Panneau de Paramétrage.
- **Objectif :** Gérer les accès, les droits, et la configuration globale de l'application.

- **Fonctionnalités & Données :**
    - **Gestion des Utilisateurs :**
        - Créer, modifier et désactiver (archiver) des comptes utilisateurs.
        - Le rattachement d'un utilisateur à un (ou plusieurs) **services** (Maternité, Soins 1, Laboratoire...) est obligatoire pour le reporting.
        - L'affectation d'un **rôle** unique (Médecin, Infirmier, Fichiste, Pharmacien, Administrateur...) est obligatoire et définit ses permissions.
    - **Paramétrage du Système :**
        - **Gestion des Listes de Valeurs :** Interfaces dédiées pour que l'administrateur puisse gérer les options des listes déroulantes de toute l'application (diagnostics médicaux, actes de soins, motifs de visite, catégories de dépense, etc.).
        - **Configuration des Seuils :** Écran pour ajuster les valeurs numériques qui déclenchent des alertes (ex: seuil pour "Urgence Hypertension", seuil pour "Stock critique").
        - **Configuration du Calendrier :** Interface pour définir les jours fériés de l'année, utilisée par le rapport de garde.

---

### [[Module F – Reporting & État de Sortie]]

### **F.1 Tableau de bord principal**
* Affichage en temps réel de KPIs clés : Nombre de visites du jour, temps d'attente moyen, nombre de patients en file d'attente par service, chiffre d'affaires de la pharmacie (si applicable), alertes critiques (stock bas, sociétés en statut "Rouge").

### **F.2 Liste des rapports automatisés à générer**
*Le système doit générer l'ensemble des rapports ci-dessous, en respectant rigoureusement le format et les calculs des modèles Excel fournis. Les filtres par période (jour, semaine, mois, année) et l'export (PDF, Excel) sont des prérequis.*

1.  **RMA annuel :** Rapport épidémiologique sur les nouveaux cas de maladies (Tableau 4), ventilé par diagnostic, tranche d'âge et sexe, en appliquant la règle du "cas nouveau" unique par mois.
2.  **Rapport Mensuel - Laboratoire :** Quantité de chaque type d'analyse, ventilée par semaine et par profil (salariés/familles).
3.  **Rapport Mensuel - Maternité :** Quantité de chaque acte de maternité (CPN, vaccins, accouchements), agrégée par semaine.
4.  **Rapports Mensuels - Soins 1 & 2 :** Nombre de chaque type d'acte infirmier (sutures, pansements, injections), par semaine, avec identification du personnel.
5.  **Rapport Mensuel - Médecine d'entreprise :** Nombre de visites par type et par résultat d'aptitude, agrégé par semaine.
6.  **Rapports Mensuels - Paramètres 1 & 2 :** Volume de patients par service de destination, distinction travailleur/famille, et comptage des urgences détectées (fièvre, HTA).
7.  **Rapport de garde (WE / JF) :** Activité détaillée (actes, patients) réalisée pendant les jours de garde, avec identification du personnel.
8.  **Rapport Mensuel - Échographie et ECG :** Volume par type d'examen et par profil de patient.
9.  **Rapport Mensuel - Radiographie :** Volume par type d'examen, par profil de patient, et par lieu (interne/externe).
10. **Rapport sur les Cotisations :** Tableau de bord dynamique affichant le statut de paiement de chaque société, avec des alertes visuelles.
11. **Rapport d'Inventaire Pharmacie :** État des stocks en temps réel, liste des articles en alerte de stock ou de péremption.
12. **Rapport sur les Dépenses Générales :** Synthèse des dépenses, avec ventilation par catégorie et par bénéficiaire.

---

### Impact de l'Intégration du Paiement sur les Autres Modules

---

#### **1. Module A – Gestion des Adhérents**
- **Impact : Léger.**
- **Modification Nécessaire :**
    - Dans la **Fiche Adhérent**, il serait utile d'ajouter une section "Historique de Facturation Directe" pour voir rapidement si un adhérent a eu à payer des services hors forfait par le passé. Cela donne une vue financière complète du membre, au-delà de sa simple cotisation.

#### **2. Module B – Parcours Patient**
- **Impact : Élevé.** C'est le module le plus impacté.
- **Modifications Nécessaires :**
    - **À l'Accueil :**
        - Quand un patient **externe** est enregistré, le système ne doit pas seulement l'ajouter à une file d'attente, il doit aussi **automatiquement déclencher la création d'une "Facture de Visite"** dans le Module E.
        - L'agent d'accueil doit informer le patient externe qu'il doit se présenter à la caisse. Le statut du patient pourrait être "En attente de paiement à la caisse".
    - **Tout au long du parcours :**
        - Le **statut de paiement** du patient doit être un **indicateur visuel clé**, visible par le personnel à chaque étape (paramètres, file d'attente du médecin, etc.). Un code couleur (ex: icône $ rouge pour "Non payé", vert pour "Payé") pourrait être utilisé.
        - **Point de Contrôle avant Soin :** Avant qu'un infirmier ne valide un acte payant (enregistré via le formulaire "Acte de Soins"), le système doit vérifier le statut de paiement. Si la facture n'est pas réglée, il doit afficher une alerte claire : "Attention, cet acte est payant et n'a pas été réglé à la caisse. Procéder quand même ?".

#### **3. Module C – Consultations Médicales**
- **Impact : Moyen.**
- **Modifications Nécessaires :**
    - **Lors de la Prescription d'Examens/Actes :**
        - Quand un médecin sélectionne un examen ou un acte, le système doit lui **afficher en temps réel si cet acte est payant** (selon la grille tarifaire du Module E).
        - Si l'acte est payant, sa validation par le médecin doit **automatiquement ajouter une ligne à la "Facture de Visite"** du patient dans le Module E.
        - Le médecin doit informer le patient qu'il devra passer à la caisse pour régler les examens prescrits.
    - **Visibilité du Statut :** Le médecin doit voir l'indicateur visuel du statut de paiement du patient dans le dossier médical pour avoir une vue complète.

#### **4. Module D – Pharmacie**
- **Impact : Élevé.**
- **Modifications Nécessaires :**
    - **Gestion du Catalogue :** La "Fiche Article" doit être modifiée pour y inclure un champ **"Article Payant"** (oui/non) et potentiellement un prix de vente si celui-ci n'est pas géré par une grille tarifaire globale.
    - **À la Dispensation :**
        - Lorsque le pharmacien scanne le QR code du patient et que l'ordonnance s'affiche, le système doit **clairement indiquer quels médicaments sont payants**.
        - **Point de Contrôle avant Dispensation :** Pour un médicament payant, si le statut de paiement du patient n'est pas "Payé", le système doit **bloquer la validation de la dispensation** et afficher un message explicite : "Ce médicament doit être réglé à la caisse avant d'être délivré." Une dérogation par un superviseur pourrait être envisagée.

#### **5. Module F – Reporting**
- **Impact : Moyen.**
- **Modifications Nécessaires :**
    - **Création de Nouveaux Rapports Financiers :**
        - Un **"Rapport de Caisse Journalier/Mensuel"** doit être ajouté. Il listera tous les encaissements directs des patients, avec des totaux par mode de paiement.
        - Un **"Rapport sur les Services Facturés"** qui montre quels actes ou produits ont généré le plus de revenus directs.
    - **Mise à Jour de Rapports Existants :**
        - Le **Rapport Mensuel d'Activités Intégrées (RMA), Tableau 7**, doit être alimenté. Le système doit pouvoir tracer le "Mode de Paiement" (Ordonnance facture, bon de soins) pour chaque visite et l'agréger dans ce rapport.

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/nom-fonctionnalite`)
3. Commit vos changements (`git commit -m 'feat: ajout d'une nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nom-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

Pour toute question ou support, contactez l'équipe de développement à [dev@osiet.bj](mailto:dev@osiet.bj).