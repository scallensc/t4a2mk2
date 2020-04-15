const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};
    
    // If field is empty, make an empty string for validator functions
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    
    // Name checks
    if (Validator.isEmpty(data.firstName)) {
        console.log('From validation/register.js : No first name entered')
        errors.firstName = "Name field is required";
    }
    if (Validator.isEmpty(data.lastName)) {
        console.log('From validation/register.js : No last name entered')
        errors.lastName = "Name field is required";
    }
    
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
        console.log('From validation/register.js : No email entered')
    } else if (!Validator.isEmail(data.email)) {
        console.log('From validation/register.js : Email is invalid')
        errors.email = "Email is invalid";
    }
    
    // Password checks
    if (Validator.isEmpty(data.password)) {
        console.log('From validation/register.js : No password entered')
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.password2)) {
        console.log('From validation/register.js : No password confirmation entered')
        errors.password2 = "Confirm password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        console.log('From validation/register.js : Password too short')
        errors.password = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.password, data.password2)) {
        console.log('From validation/register.js : Password/Confirmation mismatch')
        errors.password2 = "Passwords must match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};