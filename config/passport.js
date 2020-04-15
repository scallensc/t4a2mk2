require('dotenv').config()
const passport = require("passport")
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../sequelize");
const User = db.User
// Switched out mongo for SQL
// const User = mongoose.model("users");
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = passport => {
    passport.use(
        new JWTstrategy(opts, (jwt_payload, done) => {
            try {
                User.findOne({
                    where: {
                        id: jwt_payload.id
                    },
                }).then(user => {
                    if (user) {
                        console.log('user found in db in passport');
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
    //place user's id in cookie
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    //retrieve user from database by id
    User.findByPk(id, function (err, user) {
        done(err, user);
    });
});