# Create a E-Commerce App (Part Two)

## Overview
For this project, you will continue building an e-commerce application using your knowledge of full-stack web development. E-commerce applications are ubiquitous online and make up the back-bone of online business, making the skills used to build them invaluable for any budding entrepreneur. This project requires that you build a fully-functioning e-commerce application that allows users to register an account, browse products for sale, and complete a purchase.

### Project Objectives:
* Build a functioning e-commerce application using React, Node.js, and Postgres by extending your existing e-commerce REST API with an interactive client
* Use Git version control
* Use command line
* Develop locally on your computer
* Enable users to create a personal account
* Enable users to create an account with a third-party service (Google, Facebook, etc)
* Enable users to browse products
* Enable users to complete a purchase using a payment processor (Stripe recommended)
* Enable users to view order history
* Publish the application to Heroku

### Prerequisites:
* JavaScript
* Git and GitHub
* Command line
* HTML
* CSS
* React



## Project Tasks
* [ ] Plan your project - Visualize your end result. What is it built with? What can it do? Make sure that it satisfies all of the project objectives. The following tasks will help you identify natural break points.
* [ ] Set up the React project - Set up the necessary folders and files for building your React frontend.
* [ ] Set up React Router - Set up React Router to be able to navigate between different pages of your app.
* [ ] Build the registration page - The registration page should allow the user to create a new account using a username and password. It should also include a link to the login page if the user already has an existing account.
* [ ] Build the login page - The login page should allow the user to sign in using either a username and password or a third-party service like Google or Facebook. It should also include a link to the register page if the user does not have an existing account.
* [ ] Set up third-party login - Add the logic for handling login using a third-party service.
* [ ] Enable session support - Enable session support for your application in order to maintain login state.
* [ ] Add logout functionality - Allow users to log out of their account from any page if they are signed in.
* [ ] Build the products listing page - The products listing page will be the place for users to browse through the products available for sale. Each product should display a name, description, and image.
* [ ] Build the product details page - Each product in the listings page should link to a details page containing more information about that product. The product details page should also provide functionality allowing users to add the detailed item to their carts.
* [ ] Track cart items - On each product details page, there should be a button that allows users to add that item to their cart. Keep track of which items have been added to cart.
* [ ] Build the checkout flow - The checkout page should display the current cart items and allow users to complete their purchase.
* [ ] Allow access to protected resources - Some features on your site should only be accessible after the user logs in, such as the ability to add items to the cart or complete an order. Make sure to redirect users to the login page if they are trying to perform these tasks and are not signed in.
* [ ] Set up order history - Users should be able to access their order history when they are logged in, including details about the order status and purchased items.
* [ ] Deploy to Heroku - Congratulations on building your own e-commerce app! Deploy your application to Heroku and share it with the world.
* [ ] Next Steps - You’re welcome to expand your app beyond these project tasks and get creative!

## Setup
### Going off platform

You will be doing this project outside of the Codecademy platform, on your own computer.

For this particular project, you will be using your own text editor (we suggest VSCode) and Git version control. If you need a refresher on how to work with Git for version control, [review the Git lesson](https://www.codecademy.com/learn/learn-git) or look at this [cheat sheet](https://education.github.com/git-cheat-sheet-education.pdf). You’ll also want to have Node set up locally to be able to run your application.

In addition, make sure you have the [Heroku Command Line Interface (CLI)](https://devcenter.heroku.com/articles/heroku-cli) for deployment.


## Resources
### Debugging Tips
Feeling stuck? Try the following:
* Google your question: oftentimes, someone has had the same question as you! Check out websites like StackOverflow and Dev.to to see how other folks have found solutions.
* Read the documentation: make sure to carefully read through the documentation for any languages and libraries that you are using. Often times they’ll have examples of what you’re looking for!
* Rubber ducking: try to explain a problem to a friend or co-worker. Oftentimes you’ll figure out the solution as you’re trying to explain it. And if not, getting another pair of eyes on your code can be helpful.

### Helpful Resources
Check out these helpful resources:
* [Thinking About Errors in Your Code Differently](https://www.codecademy.com/content-items/673d70052fe5627f2222ab7840b4c5db)
* [Debugging JavaScript Code](https://www.codecademy.com/content-items/e8a7f4f36eae1c4ee642af3cea4bfb4a/exercises/debugging-overview)
* [React Developer Tools](https://www.codecademy.com/paths/build-web-apps-with-react/tracks/bwa-intro-to-react/modules/ravenous-part-one/informationals/ready-react-developer-tools)
* [Stripe Documentation](https://stripe.com/docs)

### Example Code
What to see an example of how someone else has completed this project? Click this link to [download](https://static-assets.codecademy.com/Paths/full-stack-career-path/portfolio-projects/e-commerce-pern-app/codecademy-ecommerce-pern-app-master.zip) a zip file containing one example solution to this project. Remember: your project doesn’t have to look anything like this! It should be unique to your vision.

