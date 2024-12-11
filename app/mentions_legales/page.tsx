import PageForUser from "@/components/PageForUser"

const MentionsLegales = () => {
    return (<PageForUser title="Mentions Légales" id="section_mentions_legales">
        <h3>1. Conditions Générales d'Utilisation (CGU)</h3>
        <div>
            <h4>Préambule</h4>
            <p>Les présentes Conditions Générales d'Utilisation (ci-après "CGU") définissent les conditions dans lesquelles Agriguilder (ci-après "le Service") est mis à disposition des utilisateurs, qu'ils soient administrateurs ou membres, dans le cadre de la gestion et de l'échange d'outils mutualisés au sein des collectifs, en particulier des CUMA. En utilisant le Service, l'Utilisateur accepte expressément les CGU et s'engage à les respecter.</p>                        
            <h4>1. Objet</h4>
            <p>Le Service permet aux collectifs :</p>
            <ul>
                <li>De gérer leurs outils (création, personnalisation).</li>
                <li>De gérer leurs membres (création de comptes "admin" et "membre").</li>
                <li>De suivre les interventions réalisées sur les outils mutualisés.</li>
                <li>De contester ou valider des interventions.</li>
            </ul>                       
            <h4>2. Définitions</h4>
            <ul>
                <li><strong>Service :</strong> L’application SaaS Agriguilder.</li>
                <li><strong>Admin :</strong> Utilisateur ayant des droits de gestion complets sur une Guilde (outils, utilisateurs, interventions, contestations).</li>
                <li><strong>Membre :</strong> Utilisateur disposant de droits restreints (déclaration et contestation d’interventions).</li>
                <li><strong>Guilde :</strong> Regroupement d'utilisateurs correspondant à une CUMA.</li>
            </ul>                       
            <h4>3. Création de compte</h4>
            <p>Les Admins peuvent inviter d'autres membres à rejoindre une Guilde. Chaque Utilisateur doit fournir une adresse email valide et un mot de passe sécurisé pour créer son compte. L'Utilisateur est responsable de la confidentialité de ses identifiants.</p>
            <h4>4. Fonctionnalités</h4>
            <h5>Côté Admin :</h5>
            <ul>
                <li>Gestion des outils mutualisés (ajout, suppression, modification).</li>
                <li>Inscription de nouveaux utilisateurs (Admin ou Membre).</li>
                <li>Consultation des interventions réalisées par les membres.</li>
                <li>Gestion des contestations (validation ou rejet).</li>
            </ul>
            <h5>Côté Membre :</h5>
            <ul>
                <li>Déclaration d'interventions effectuées avec les outils.</li>
                <li>Contestation d'interventions si nécessaire.</li>
                <li>Mise à jour des informations personnelles (email, mot de passe).</li>
            </ul>
            <h4>5. Engagements des utilisateurs</h4>
            <p>Les utilisateurs doivent :</p>
            <ul>
                <li>Fournir des informations exactes et les mettre à jour en cas de changement.</li>
                <li>Utiliser le Service conformément à la loi et aux présentes CGU.</li>
                <li>Respecter les autres utilisateurs (absence de propos diffamatoires ou comportements abusifs).</li>
            </ul>
            <h4>6. Responsabilité</h4>
            <h5>Responsabilité de Agriguilder :</h5>
            <ul>
                <li>Fournir un accès continu au Service, sous réserve des interruptions nécessaires à la maintenance.</li>
                <li>Assurer la sécurité des données collectées dans les limites de l’état de l’art.</li>
                <li>Ne pas être tenu responsable des décisions prises par les Admins ou des litiges entre utilisateurs.</li>
            </ul>
            <h5>Responsabilité des utilisateurs :</h5>
            <ul>
                <li>Garantir l'exactitude des informations saisies.</li>
                <li>Ne pas détourner le Service de son usage prévu.</li>
            </ul>
            <h4>7. Contestations</h4>
            <p>Les Admins sont seuls responsables de la gestion des contestations. Agriguilder ne joue aucun rôle de médiateur entre utilisateurs. Mais en cas d'erreur, les admins pourront faire une requête auprès du gérant du Service, Romain Fouillaron, à l'adresse mail romain.fouillaron@gmx.fr.</p>
            <h4>8. Résiliation</h4>
            <p>Les Admins peuvent demander la suppression de leur Guilde à tout moment, ce qui entraînera la suppression des données associées au maximum 30 jours après la requête. Agriguilder se réserve le droit de suspendre ou supprimer un compte en cas de non-respect des CGU.</p>
            <h4>9. Modifications</h4>
            <p>Les CGU peuvent être modifiées à tout moment. Les Utilisateurs seront notifiés des changements via leur adresse email.</p>
            <h4>10. Loi applicable</h4>
            <p>Les présentes CGU sont régies par la loi française. Tout litige sera soumis aux tribunaux compétents.</p>
        </div>
        <h3>2. Politique de Confidentialité</h3>
        <div>
            <h4>1. Données collectées</h4>
            <ul>
                <li>Email et mot de passe (lors de la création du compte).</li>
                <li>Données liées aux interventions (déclarations, contestations).</li>
                <li>Rôles des utilisateurs (Admin ou User).</li>
            </ul>
            <h4>2. Finalité de la collecte</h4>
            <p>Les données collectées servent à :</p>
            <ul>
                <li>Fournir et améliorer le Service.</li>
                <li>Permettre aux Admins de gérer leur Guilde.</li>
                <li>Générer des statistiques anonymisées pour améliorer les fonctionnalités.</li>
            </ul>
            <h4>3. Sécurité</h4>
            <p>Les mots de passe sont stockés sous forme cryptée, par un algorithme de cryptage des données. Les données sont hébergées par MongoDB Atlas, conforme aux normes de sécurité en vigueur.</p>
            <h4>4. Droits des utilisateurs</h4>
            <ul>
                <li>Accès : Consulter ses données personnelles.</li>
                <li>Rectification : Corriger les informations inexactes.</li>
                <li>Suppression : Demander la suppression de son compte.</li>
                <li>Portabilité : Exporter ses données dans un format lisible.</li>
            </ul>
            <h4>5. Conservation des données</h4>
            <p>Les données sont conservées tant que la Guilde reste active, et pendant une durée maximale de 1 mois après la suppression d’une Guilde.</p>
            <h4>6. Partage des données</h4>
            <p>Les données ne sont partagées avec aucun tiers, sauf obligation légale.</p>
            <h4>7. Garanties</h4>
            <p>Agriguilder est fourni "tel quel" sans garantie explicite ou implicite. Bien que nous fassions de notre mieux pour garantir la disponibilité et l'exactitude des données, nous ne pouvons être tenus responsables des pertes ou dommages résultant de l'utilisation du Service.</p>
        </div>       
    </PageForUser>);
};

export default MentionsLegales;
