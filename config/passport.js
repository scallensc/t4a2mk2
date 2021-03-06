require('dotenv').config()
const passport = require("passport")
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../sequelize");
const User = db.User
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = passport => {
    passport.use(
        new JWTstrategy(opts, (jwt_payload, done) => {
            console.log('Passport strategy being used')
            try {
                User.findOne({
                    where: {
                        id: jwt_payload.id
                    },
                }).then(user => {
                    if (user) {
                        console.log('user found in db in passport');
                        console.log(user)
                        done(null, user);
                    } else {
                        console.log('user not found in db');
                        done(null, false);
                    }
                });
            } catch (err) {
                done(err);
            }
        }),
    )
};

passport.serializeUser(function (user, done) {
    done(null, user);
});

// deserialize user object
passport.deserializeUser(function (user, done) {
    done(err, user);
});