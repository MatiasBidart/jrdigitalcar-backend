const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt; 
const passport = require('passport');
const {jwtSecret} = require('../config');
const { getUserById } = require('../users/user.controller')

    const options = {
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret
    }
    passport.use(
        new JwtStrategy(options, (decoded, done) => {
            getUserById(decoded.id)
                .then((user) => {
                    if(user){
                        done(null, user) //? Caso Exitoso, porque el usuario si existe
                    } else {
                        done(null, false) //? Caso fallido, en el que no genera error, pero no existe el usuario
                    }
                })
                .catch((err) => {
                    done(err, false) //? Caso fallido, en el que si genera un error
                })}
            ))

module.exports = passport