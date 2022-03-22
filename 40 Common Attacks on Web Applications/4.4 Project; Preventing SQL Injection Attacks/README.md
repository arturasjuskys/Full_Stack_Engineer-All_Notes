# Codey's Confectionery: Preventing SQL Injection Attacks
Codey’s Confectionery added a new page on their website where visitors can enter their customer ID number to see the information that the bakery has on file. A clever hacker discovered that the form is vulnerable to a SQL injection where submitting malicious code to the form will display all of the customer information.

Throughout this project you will harden the web form to validate that the submission is a number, as well as convert the SQL query to a prepared statement preventing a SQL injection attack.

## Adding Validator
3. The SQL query needs a customer ID number to find the customer information. If we validate the form input field and require it to be an integer, we could avoid an injection here. We can use the validator package to validate the body of the form. At the top of app.js require the validator package.

## Validating the Web Form
4. The code to handle the form submission for customer information is inside the route to /track. Inside the callback function, we want to run SQL query if the form input is a valid integer type. Create an if statement in the callback function to test if req.body.customerId is an integer using validator.isInt() and run the SQL query if it is true.
5. If the form submission is not a valid integer, then send an error back. Create an else statement inside the callback function in /track and use the res.json() function and send a JSON object with a property named message and the value "Invalid customer ID."

## Prepared Statements in the Backend Code
6. Locate the SQL query inside the if statement in the callback function to /track. Restructure the query to use a prepared statement so that the query is not constructed directly from the form submission by replacing the expression with a named placeholder variable.
7. Next, pass the value from the form body as an option in an object. The property of the object should be the placeholder and the value should be the value from the form.

## Trying Out the Same Payloads
8. Now, test out the form on the customer info page with different values. First, submit a non integer value. Then, try to submit an SQL injection!

    Great job! Now Codey’s Confectionery’s website is protected against SQL injection attacks! Throughout the project you practiced different methods of securing web forms:
    * Using Validator.js to validate form values
    * Using prepared SQL statements
