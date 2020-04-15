const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};
    
    // If field is empty, make an empty string for validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    
    // Email checks
    if (Validator.isEmpty(data.email)) {
        console.log('From validation/login.js : No email entered')
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        console.log('From validation/login.js : Invalid email')
        errors.email = "Email is invalid";
    }
    
    // Password checks
    if (Validator.isEmpty(data.password)) {
        console.log('From validation/login.js : No password entered')
        errors.password = "Password field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};