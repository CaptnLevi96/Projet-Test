// src/models/User.js
function validateEmail(email) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMotDePasse(motDePasse) {
    return motDePasse && motDePasse.length >= 8;
}

function validatePasswordMatch(password, confirmPassword) {
    return password === confirmPassword;
}

module.exports = {
    validateEmail,
    validateMotDePasse,
    validatePasswordMatch
};