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
