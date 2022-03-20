# OAuth 2.0

# OAuth 2.0 in Express

## Introduction to OAuth
OAuth is an authorization framework that provides specific authorization flows which allow unrelated servers to access authenticated resources without sharing any passwords. It works by allowing applications to authenticate with third-party services in exchange for an access token which can be passed with an HTTP request to access protected content.

In this lesson, we will learn how to implement OAuth 2.0, which is a rewrite of OAuth 1.0 that simplifies the process and introduces the following four OAuth Roles:
* Resource Owner: the user who authorizes an application to an account
* Resource Server: the API server that accepts access tokens and verifies their validity
* Authorization Server: the server that issues access tokens
* Client: the application that requests the access tokens

![](./img/roles.png)

## Installing oauth2-server
OAuth describes a protocol for authentication, and there are many open-source and commercial libraries for various programming languages to help implement it. We will use the [oauth2-server module](https://www.npmjs.com/package/oauth2-server) to implement an OAuth 2.0 provider in Node.js utilizing the client credentials grant type to demonstrate obtaining an access token and using it in request.

The package can be installed in the terminal using npm with the command:
```
npm install oauth2-server
```

From here, we instantiate the oauth2-server module and store it in a variable like below:
```JS
const OAuth2Server = require('oauth2-server');
```

## Creating an OAuth 2.0 Server Instance
Inside app.js, where we have included the oauth2-server package, we’ll create an instance of the [OAuth2Server object](https://oauth2-server.readthedocs.io/en/latest/api/oauth2-server.html) and store it in a variable named oauth.
```JS
const oauth = new OAuth2Server();
```

The OAuth2Server object requires a model object which contains functions to access, store, and validate our access tokens. We’ll be writing them separately in a file named model.js.

Inside the constructor of OAuth2Server, pass an object with an attribute named model, and we’ll import model.js using the require() function as the value.
```JS
const oauth = new OAuth2Server({
  model: require('./model.js')
});
```

OAuth2Server can be supplied with additional options in the constructor. To pass tokens inside the URL, we’ll set the allowBearerTokensInQueryString attribute to true:
```JS
const oauth = new OAuth2Server({
  model: require('./model.js'),
  allowBearerTokensInQueryString: true
})
```

The access token lifetime can also be configured as an option using the accessTokenLifetime attribute. The lifetime is set in seconds, and we can set the access token lifetime to one hour like this:
```JS
const oauth = new OAuth2Server({
  model: require('./model.js'),
  allowBearerTokensInQueryString: true,
  accessTokenLifetime: 60 * 60
})
```

## Registering Client to Application
OAuth defines [two types of clients](https://www.oauth.com/oauth2-servers/client-registration/client-id-secret/) — confidential clients and public clients.
* Public clients are NOT able to store credentials securely and can only use grant types that do not use their client secret.
* Confidential clients are applications that can be registered to an authorization server using credentials. Those credentials, a client ID and a client secret, can be secured without exposing them to a third party. They require a backend server to store the credentials. A client’s ability to securely store credentials determines which type of OAuth authorization flows should be used.

We’ll be implementing the Client Credentials flow to obtain an access token for authentication. When a developer registers a client in an OAuth application, they’ll need:
* A Client ID: a public identifier for apps that is unique across all clients and the authorization server.
* A Client Secret: a secret key known only to the application and the authorization server.

OAuth 2.0 is flexible in which databases to use, and the oauth2-server package implicitly allows Postgres, MongoDB, and Redis. For our example application, we use an in-memory database defined in db.js. Inside db.js, we use modules.exports to create a module to hold our confidential client credentials and access tokens.

We can register an application to the list of confidentialClients in db.js. Inside the module.exports object, we create an attribute named confidentialClients and set it equal to an array. Within the array, we create an object with the clientId and clientSecret, and specify 'client_credentials' in our array of grant types.
```JS
module.exports = {
  confidentialClients: [{
    clientId: 'secretapplication',
    clientSecret: 'topsecret',
    grants: [
      'client_credentials'
    ]
  }]
}
```

In our database, we’ll create a location to store access tokens. Within the module.exports object, we create another property named tokens and set it equal to an empty array.
```JS
module.exports = {
  // Confidential Clients Settings
 
  tokens: []
}
```

In the workspace to the right there is a sample database file named sample_database.js.

## getClient()
OAuth2Server requires certain functions implemented in the model regardless of the authorization flow used. The getClient() function is an example of a required model function for all flows. The function is used to retrieve a client using a Client ID and/or a Client Secret combination.

The [getClient() function](https://oauth2-server.readthedocs.io/en/latest/model/spec.html#model-getclient) takes two arguments: clientId and clientSecret. We must write a database query to match the provided arguments and its implementation will vary depending on the type of database used. Since we are using JavaScript as our in-memory database, we can use the .filter() method to evaluate if the clientId and clientSecret match any confidential clients in db.js and return the matching client.
```JS
const getClient = (clientId, clientSecret) => {
  let confidentialClients = db.confidentialClients.filter((client)=>{
    return client.clientId === clientId && client.clientSecret === clientSecret
  });
  return confidentialClients[0];
}
```

In the above code example we iterate over each element in the confidentialClients array inside db.js. Each element’s clientId and clientSecret is tested to match against the clientId and clientSecret of the client that is passed and will return the client that matches both values in an array. Finally, the getClient() function returns the first element in confidentialClients.

Finally, we export the function from model.js so that it can be used from other files. We can do this using module.exports object.
```JS
module.exports = {
  getClient: getClient
}
```

## saveToken()
The [saveToken() function](https://oauth2-server.readthedocs.io/en/latest/model/spec.html#savetoken-token-client-user-callback) must be implemented for all grant types in the model used by OAuth2Server. This function stores the access token as an object to a database when an access token is obtained.

The saveToken() function is implemented with three arguments: token, client, and user. We set the token.client equal an object in which the id attribute is equal to the passed client’s clientId. The client is formatted like below:
```JS
const saveToken = (token, client, user) => {
  token.client = {
    id: client.clientId
  }
}
```

The token.user is set equal to an object with the username attribute. We set the username attribute equal to the username of the passed user object. The username is formatted like below:
```JS
token.user = {
  username: user.username
}
```

With the token formatted, we can save the token to our database by pushing the token to our db.tokens array and returning the token.
```JS
db.tokens.push(token);
return token;
```

Our final saveToken() function looks like:
```JS
const saveToken = (token, client, user) => {
  token.client = {
    id: client.clientId
  }
  token.user = {
    username: user.username
  }
  db.tokens.push(token);
  return token;
}
```

We’ll also export the saveToken() function from models.js using module.exports.

## getUserFromClient()
Certain grant types have specific functions that must be implemented for them to work. The Client Credentials grant type must have the getUserFromClient() function implemented to be used.

The [getUserFromClient() function](https://oauth2-server.readthedocs.io/en/latest/model/spec.html?highlight=token#getuserfromclient-client-callback) is invoked to retrieve the user associated with the specified client. We are not using a user in our application so we can return an empty object. However, leaving out this function declaration will throw an error when using the Client Credentials grant type!
```JS
const getUserFromClient = (client) => {
  return {};
}
```

Finally, we export the function from model.js so that it can be used from other files. We can do this using module.exports object.
```JS
module.exports = {
  // Other modules to export
  getUserFromClient: getUserFromClient
}
```

## Obtaining Token Handler
Now that our model functions for generating and saving access tokens are implemented in model.js, we need to create a callback function to handle obtaining the access token whenever a URL is requested in our application. Within app.js, we create a function named obtainToken() that takes the HTTP request and HTTP response as arguments—req and res.

Inside obtainToken(), we create a new variable named request and set it to a new instance of OAuth2Server.Request(), passing the HTTP request, req, as the argument:
```JS
let request = new OAuth2Server.Request(req);
```

We’ll also create a new variable named response and set it to a new instance of OAuth2Server.Response(), taking in res as the argument:
```JS
let response = new OAuth2Server.Response(res);
```

The [.token()](https://oauth2-server.readthedocs.io/en/latest/api/oauth2-server.html#oauth2server-token) method of the oauth object returns the access token. The method passes the OAuth2Server‘s request and response stored in response and request variables. We use the .then() method to return a promise. If the token method is successful, we will send the access token back to the client using the .json() Express method.
```JS
const obtainToken = (req, res) => {
  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res);
 
  return oauth.token(request, response)
      .then((token) => {
          res.json(token);
      })
}
```

We’ll chain the .catch() method to handle any errors if the .token() method fails. If the .token() method returns an error code or an HTTP 500 status, the error can be sent back to the client using the .json() method.
```JS
.catch((err) => {
  res.status(err.code || 500).json(err);
});
```

Note, must declare our function expressions before they can be used. To make use of our obtainToken() function, we can define a new route and pass obtainToken() as a callback function. We use the [.all() method](https://expressjs.com/en/4x/api.html#app.all) to handle all types of HTTP requests since we will eventually use a POST request on the route. The route name can be anything we’d like—we’ll use /auth for our example.
```JS
app.all('/auth', obtainToken);
```
Now the client can make an HTTP request with the Client Secret to /auth and receive an access token.

## getAccessToken()
Now that we’ve written the code to obtain an access token, we can use it to restrict access to content unless a user is authenticated with a valid access token. Inside model.js, we implement the [getAccessToken() function](https://oauth2-server.readthedocs.io/en/latest/model/spec.html#getaccesstoken-accesstoken-callback) to retrieve existing tokens that were previously saved when the saveToken() function is invoked.

The getAccessToken() function is required when the [.authenticate()](https://oauth2-server.readthedocs.io/en/latest/api/oauth2-server.html#authenticate-request-response-options-callback) method is used on an OAuth2Server instance. getAccessToken() is declared with one parameter—accessToken.

When the function is invoked the accessToken is checked against the tokens stored inside the db.js to see if there is a match. We can use JavaScript’s .filter() method to each token in the database against the access token that is passed. If there is a match, the access token can be returned. The resulting getAccessToken() will look something like this:
```JS
const getAccessToken = (accessToken) => {
  let tokens = db.tokens.filter((savedToken)=>{
    return savedToken.accessToken === accessToken;
  })
  return tokens[0];
}
```

In the above example code, the getAccessToken() function expression is called with an access token as an argument. The .filter() method is used to check each token saved in the tokens array in the database to match the access token passed to the function. Finally, we return the matching access token from the array.

We export the function from model.js so that it can be used from other files. We can do this using module.exports object.
```JS
module.exports = {
  // Exported functions
  getAccessToken: getAccessToken
}
```

## Authentication Middleware
With the model function for checking access tokens implemented, let’s create a middleware function to handle authenticating access tokens inside our application. Inside app.js, we will create a function named authenticateRequest() that takes three arguments: req, res, next.

Inside the function, we create a new variable named request and set it to a new instance of OAuth2Server.Request(), taking in the HTTP request, req, as the argument.
```JS
let request = new OAuth2Server.Request(req);
```

We’ll create a new variable named response and set it to a new instance of OAuth2Server.Response(), passing in the HTTP response, res.
```JS
let response = new OAuth2Server.response(res);
```

We then return .authenticate() method, that is provided by the OAuth2Server object, on oauth, passing in response and request. The method returns a Promise that resolves to the access token object returned from the .getAccessToken() method we defined in model.js. We’ll use a promise chain to handle the flow.

We use the .then() method, and if the access token is valid, we can call the next() function to call the next function. We’ll chain the .catch() method to handle an error or if the access token is invalid. Inside .catch() method, we can send a response back to the client using the .send() method.
```JS
const authenticateRequest = (req, res, next) => {
 
  let request = new OAuth2Server.Request(req);
  let response = new OAuth2Server.Response(res);
 
  return oauth.authenticate(request, response)
    .then(()=>{
      next();
    })
    .catch((err) => {
      res.send(err);
    })
}
```

Finally, we can add authenticateRequest as a middleware function to a route to restrict access. Now the client must include the bearer token in the header when making a request to the route to gain authenticated access.
```JS
app.get('/secret', authenticateRequest, function(req, res){
  res.send("Welcome to the secret area!");
});
```

## Testing Endpoints with HTTP
Great job! We’ve implemented the Client Credentials OAuth 2.0 flow in our application! The handling of access tokens is done with HTTP requests. We can make an HTTP POST request to the /auth route to obtain an access token.
```
POST http://localhost:4001/auth
Content-Type: application/x-www-form-urlencoded
Authorization: Basic Y29kZWNhZGVteTpjb2RlY0BkZW15
 
grant_type=client_credentials
```

In the HTTP header, we set Authorization to Basic and the base64 encoded Client ID and Client Secret. In the POST request data, we provide grant_type=client_credentials. The server will respond with an access token that looks like this:
```JS
{
  "accessToken":" "<access token>",
  "accessTokenExpiresAt":"2021-06-17T01:02:37.272Z",
  "client": {
    "id": "codecademy",
    "user":{}
  }
}
```

To use the access token while requesting authenticated content, we pass the bearer token in the Authentication request header, replacing <Access Token> with the token returned from the request to /auth like so:
```
GET http://localhost:4001/secret
Authorization: Bearer <Access Token>
```
