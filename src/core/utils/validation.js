export const isValidEmail = (email) => {
    // Professional Regex pattern for checking if a string is a valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
