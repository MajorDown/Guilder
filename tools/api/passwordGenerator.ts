/**
 * Génère un mot de passe aléatoire
 * @returns {string} Le mot de passe généré
 */
function generatePassword(): string {
    const consonnes = 'bcdfghjklmnpqrstvwxyz';
    const voyelles = 'aeiou';
    const consonnesMaj = 'BCDFGHJKLMNPQRSTVWXYZ';
    const voyellesMaj = 'AEIOU';
    const chiffres = '0123456789';
    const caracteresSpeciaux = '*$%@';
    const allChars = consonnes + voyelles + consonnesMaj + voyellesMaj + chiffres + caracteresSpeciaux;

    let password = '';
    password += consonnes[Math.floor(Math.random() * consonnes.length)];
    password += voyelles[Math.floor(Math.random() * voyelles.length)];
    password += consonnesMaj[Math.floor(Math.random() * consonnesMaj.length)];
    password += voyellesMaj[Math.floor(Math.random() * voyellesMaj.length)];
    password += chiffres[Math.floor(Math.random() * chiffres.length)];
    password += caracteresSpeciaux[Math.floor(Math.random() * caracteresSpeciaux.length)];

    while (password.length < 12) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return password.split('').sort(() => 0.5 - Math.random()).join('');
}

export default generatePassword;
