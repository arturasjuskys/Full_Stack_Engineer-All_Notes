# Password Authentication

# Dognation: Password Authentication
Welcome to Dognation!

Dognation is collaborative site for dogwalkers to share pictures of their buddies. People can sign in and post pictures of the dogs they walk and share them with everyone!

We were recently hired to complete a missing feature for the app! It currently doesn’t have any configuration to authenticate users. In this project, we’ll be using express-sessions, Passport’s passport-local, and bcrypt.js in order to authenticate users so they can register, login and stay, and log out of the app!

We’re provided with some boilerplate code that we’ll be modifying and adding to in order to complete this. Let’s get started!

## Express Session
1. The express-session module has been provided for you in app.js.

    In that file, implement a session with the following properties:

    | Property | Value |
    | - | - |
    | secret | A random string |
    | cookie | An object with a maxAge of your choosing |
    | saveUninitialized | false |
    | resave | false |
    | sameSite | 'none' |
    | secure | true |

## Authenticating Users with Passport.js
2. The passport strategy is yet to be configured.

    In passport.js configure a local strategy using an instance of LocalStrategy.

    Pass in a function with username, password, and the verify callback, cb, as its own parameters.
3. The verify callback in the LocalStrategy will be executed if a user is found. In order to search for a user, a helper function has been provided called helper.findByUsername().

    Make a call to helper.findByUsername() and pass in username and a function with err and user for its parameters.
4. Within the lookup function, check if an error is found.

    If an error is found, return the done() callback with the correct argument that shows an error was found.
5. Next, we need to handle the scenario where NO user is found.

    If NO user is found, return the done() callback with the correct arguments that shows NO user was found and there were NO errors.
6. After that, we need to handle the scenario where a user is found, but the password is invalid.

    If the password is invalid, return the done() callback with the correct arguments that shows NO user was found and there were NO errors.
7. Finally, we can handle the case in which we successfully found a user.

    Return the done() callback function with arguments showing that there was NO error and a user was found.

## Serialize and Deserialize Users
8. Add logic to serialize a user in passport.js using the user.id property.
9. Add logic to deserialize a user in passport.js, start by passing in an id and the done callback function.
10. In order for the deserializeUser() function to attach a user to the request handler, req.user, it must first find that user in the DB.

    Within the function body of deserializeUser(), make a call to helper.findById().

    Pass in an the key used to find the user in the DB for the first parameter, and a function with err, and done as parameters for the second one.
11. Within the function body of findById(), add an if statement that checks if an error is found.

    In that if statement, return the done() callback with one argument showing that an error was found.
12. At this point, we have found NO errors and have successfully retrieved a user.

    At the end of the function body, return the done() callback with the correct arguments.

## Initialize Passport
13. Now that Passport is configured, in app.js, add middleware to initialize passport in order to set up the functions to serialize/deserialize the user data from the request.
14. Add middleware to include the session with passport.

