# Adopt a Pet!
### React Router

In this project, you will have the opportunity to practice using React Router to add client-side routing to a React Application. Specifically, you will be building a pet adoption website that allows users to view all the adoptable pets of a particular species and view the profiles of specific adoptable pets.

Currently, the app renders a HomePage component that fetches and displays all adoptable pets (you can view the code for this page in src/pages/home/index.js). We have also built a PetDetailsPage to display the details for a particular pet (src/pages/detail/index.js), but this component will not render until you create a route to display it.

Your tasks will be to add client-side routing to the application using React Router so that:
* The HomePage component responds to the browser’s current URL by displaying only pets of the species the user wishes to view.
* The PetDetailsPage page displays when the browser’s current URL includes a specific pet’s id.
* The PetDetailsPage displays data for the correct pet based on the id in the URL parameters’ values.
* When the user searches for a pet in the search bar, they are redirected to the SearchPage, which uses the query parameter called query to filter pets by name.
* When a user clicks a pet whose details are not available, they are redirected to a PetNotFoundPage.
* From the PetNotFound page, users can click “Go Back” button that will take them to page they were previously on.

Before you get started, spend some time familiarizing yourself with the project’s starting code. In particular, in the src/ folder, take note of the components that you’ll be primarily working with:
* src/App.js (App)
* src/pages/home/index.js (HomePage)
* src/pages/detail/index.js (PetDetailsPage)
* src/pages/search/index.js (SearchPage)
* src/pages/petNotFound/index.js (PetDetailsNotFound)

This lesson uses [Mock Service Worker](https://mswjs.io/docs/) (MSW) to replicate the functionality of an external API. To use MSW, you’ll want to use Google Chrome and [enable third-party cookies](https://support.google.com/chrome/answer/95647).

## Setup Instructions
This project should be completed on your own computer instead of on Codecademy. You can download what you’ll need by clicking the “Download” button below. If you need help setting up your computer, read our [article about setting up a text editor for HTML/CSS development](https://www.codecademy.com/articles/visual-studio-code).

Once you’ve downloaded the project, open up the project folder in your text editor. Then, make sure to install all of the dependencies by running the command below:
```
npm install
```

Finally, you can start the application locally by running the command below:
```
npm start
```

As you can see, the project has been started for you! Take a look at src/App.js where you can see the Navigation and HomePage components being rendered. However, while you can click on the various links in the website, the application isn’t set up to handle those changing routes. Now, it is up to you to add React Router to this project.

Note: This application was created using [Create React App](https://www.codecademy.com/articles/how-to-create-a-react-app).

# Instructions

1. Install react-router-dom so that you can use React Router components in your project. Use the command below:
```
npm install --save react-router-dom@5.2.0
```

Jan 2022 Update: This project is meant to be written using [React Router v5](https://v5.reactrouter.com/). React Router v6 introduces breaking changes and your project will not work using these instructions if you install v6 via the default command npm install react-router-dom. Check out the docs to learn more about [upgrading from v5 to v6](https://reactrouter.com/docs/en/v6/upgrading/v5).

To check that you were successful, ensure that react-router-dom appears in the "dependencies" object located within your project’s package.json file.

2. In src/App.js, import React Router’s BrowserRouter component and alias it to Router.

3. In src/App.js, wrap your applications contents in a Router so that your components can use React Router’s components and hooks.

## Creating Your First Route

4. Great job! Now that you’ve wrapped your application in a Router, you are ready to start adding Routes.

Before you can use the Route component, you need to add it to the list of imports from react-router-dom.

5. First, you will create a Route that renders the HomePage component which displays the list of animals available for adoption. This component should appear when the path matches /:type, where :type corresponds to one of the species of pets (in which case the home page should render only pets of the given species).

Wrap your HomePage component in a Route component. The Route should have a path prop of /:type so that the home page will render the species specified by the value of the URL parameter. To test that your code works, try clicking on a particular species or navigating to /cat or /dog.

Note that if you click on the “All Pets” button, the HomePage doesn’t render. We’ll be fixing that in the next task.

6. We still want the HomePage to render even if no type is specified in the URL path. This means that type should be an optional URL parameter in the path that renders the HomePage component. Make type optional for the Route that renders the HomePage.

Test that your code works by clicking on the “All Pets” link in the navigation menu – the homepage should still display since the new URL’s path (/) now matches the path of theRoutethat rendersHomePage`.

## Using URL Parameters in Your Reasct Components

7. Notice that even after you navigate to /cats, the HomePage component still renders all the pets (not just the cats). Your next task is to fix that by building on the code we’ve provided for the HomePage component. Remember, the useParams() hook can be used to give a component access to the values of the URL parameters in the current URL.

In src/pages/home/index.js, import the useParams() hook from react-router-dom.

