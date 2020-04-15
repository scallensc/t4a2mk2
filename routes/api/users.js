require('dotenv').config()

const jwt_decode = require("jwt-decode")
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const db = require("../../sequelize");
const User = db.User

// Post route to api/users/register, basic JWT token
router.post("/register", (req, res) => {

    console.log('Registration endpoint receiving data')
    console.log('Headers: ', req.headers)
    console.log('Request body: ', req.body)

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Check db for account already registered to given email address
    db.User.findOne({ where: {email: req.body.email }}).then(user => {
        console.log(user);
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err;
                    db.User.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash
                    }).then(result => {
                        console.log(result);
                        res.json(result)
                        return;
                    });
                });
            });
        }
    });
});

// Post route to api/users/login, basic JWT token
router.post("/login", (req, res) => {

    console.log('Login endpoint receiving data')
    console.log(req.headers)

    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ where: {email: req.body.email }}).then(user => {

        // Check if user exists by searching for email in db
        if (!user) {
            console.log('Email not found')
            return res.status(404).json({ emailnotfound: "Email not found" });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {

                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    email: user.email
                };

                // Sign token
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: 604800 // set expiry for 7 days
                    },
                    (err, token) => {
                        console.log(token);
                        res.json({
                            success: true,
                            token: token
                        }); console.log(jwt_decode(token))
                    } 
                );
            } else {

                // Return password mismatch
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;