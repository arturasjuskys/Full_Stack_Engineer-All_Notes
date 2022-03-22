# Codey's Confectionery: Preventing Cross-Site Request Forgery (CSRF) Attacks

![](./public/img/CSRF%20Form.PNG)

A bakery owner uses a website to let customers make orders on desserts. Recently there have been kids pranking the website and taking advantage of CSRF’s, tricking adults into ordering big batches.

Fix the CSRF vulnerabilities on the Ordering form and the Contact form.

Note: The way that the workspace interacts with stored cookies may be affected by your browser’s security settings. Please try using Chrome or Firefox for best results.

## Configure `csurf` Package
2. Codey’s Confectioneries website uses web forms that are vulnerable to CSRF attacks. In order to use the csurf library to implement CSRF tokens, require csurf at the top of app.js.
3. Next, configure a middleware named csrfMiddleware inside app.js and set it equal to csurf(), passing an object as an option.

    The object should have a property named cookie, and the value of cookie set to an object.

    Inside the cookie object the maxAge property to 3000, the secure property to true, and the sameSite property to 'none'.
4. After setting the value of the middleware, configure the app to use the middleware function at the application level inside app.js.

## Adding Error-Handling
5. We should let the user know if there is an error validating the CSRF token.

    Declare a middleware function named errorMessage that takes four arguments, err, req, res, and next.
6. Next create an if-else statement in the function you just declared that checks if err.code is equal to "EBADCSRFTOKEN".

    If the statement is true, then render the view file named csrfError. If the error code does not match, then call the next() function.
7. Configure the app to use the errorMessage() middleware at the application level using app.use().

## Adding CSRF Middleware to Two Different Routes
8. In order to use a CSRF token inside a web form, the token must be sent as a local variable with the view file. Inside the res.render() function in the / route in app,js, send the CSRF token generated with req.csrfToken() in an object with csrfToken as the property name.
9. Each web form should use a CSRF token to prevent CSRF attacks. Inside the res.render() function in the /contact route in app,js, generate a CSRF token with req.csrfToken() and send it with the template file inside an object with the key of csrfToken.

## Adding the CSRF Token to the Two Views
10. Finally, add the CSRF token to the form in views/order.ejs as a hidden input element. Set the name of the input as "_csrf" and the value to "<%= csrfToken %>".
11. Next, add the CSRF token to the form in views/contact.ejs as a hidden input element. Like in the order form, set the name of the input as "_csrf" and the value to "<%= csrfToken %>".

## Trying Out the Form!
12. Great work! The website now has secure forms that are protected by CSRF tokens. Throughout the project you practiced:
    * Requiring csurf
    * Configuring the csurf cookie
    * Set up a middleware function
    * Pass the CSRF token to the template
    * Use the CSRF token inside a form
    
    Restart the web server and then test out the form! Try opening a new terminal and using submitting a cURL request without a CSRF token:
    ```
    curl -X POST http://localhost:4001/submit
    ```
