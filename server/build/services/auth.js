"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = require("passport-local");
var User = mongoose_1.default.model('user');
// SerializeUser is used to provide some identifying token that can be saved
// in the users session.  We traditionally use the 'ID' for this.
passport_1.default.serializeUser(function (user, done) {
    done(null, user.id);
});
// The counterpart of 'serializeUser'.  Given only a user's ID, we must return
// the user object.  This object is placed on 'req.user'.
passport_1.default.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
// Instructs Passport how to authenticate a user using a locally saved email
// and password combination.  This strategy is called whenever a user attempts to
// log in.  We first find the user model in MongoDB that matches the submitted email,
// then check to see if the provided password matches the saved password. There
// are two obvious failure points here: the email might not exist in our DB or
// the password might not match the saved one.  In either case, we call the 'done'
// callback, including a string that messages why the authentication process failed.
// This string is provided back to the GraphQL client.
passport_1.default.use(new passport_local_1.Strategy({ usernameField: 'email' }, function (email, password, done) {
    User.findOne({ email: email.toLowerCase() }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Invalid Credentials' });
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false, { message: 'Invalid credentials.' });
        });
    });
}));
// Creates a new user account.  We first check to see if a user already exists
// with this email address to avoid making multiple accounts with identical addresses
// If it does not, we save the existing user.  After the user is created, it is
// provided to the 'req.logIn' function.  This is apart of Passport JS.
// Notice the Promise created in the second 'then' statement.  This is done
// because Passport only supports callbacks, while GraphQL only supports promises
// for async code!  Awkward!
function signup(_a) {
    var email = _a.email, password = _a.password, req = _a.req;
    var user = new User({ email: email, password: password });
    if (!email || !password) {
        throw new Error('You must provide an email and password.');
    }
    return User.findOne({ email: email })
        .then(function (existingUser) {
        if (existingUser) {
            throw new Error('Email in use');
        }
        return user.save();
    })
        .then(function (user) {
        return new Promise(function (resolve, reject) {
            req.logIn(user, function (err) {
                if (err) {
                    reject(err);
                }
                resolve(user);
            });
        });
    });
}
exports.signup = signup;
// Logs in a user.  This will invoke the 'local-strategy' defined above in this
// file. Notice the strange method signature here: the 'passport.authenticate'
// function returns a function, as its indended to be used as a middleware with
// Express.  We have another compatibility layer here to make it work nicely with
// GraphQL, as GraphQL always expects to see a promise for handling async code.
function login(_a) {
    var email = _a.email, password = _a.password, req = _a.req;
    return new Promise(function (resolve, reject) {
        passport_1.default.authenticate('local', function (err, user) {
            if (!user) {
                reject(new Error('Invalid credentials.'));
            }
            req.login(user, function () { return resolve(user); });
        })({ body: { email: email, password: password } });
    });
}
exports.login = login;
function logout(_a) {
    var req = _a.req;
    return new Promise(function (resolve) {
        var user = req.user;
        req.logout();
        resolve(user);
    });
}
exports.logout = logout;
