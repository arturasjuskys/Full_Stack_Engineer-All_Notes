const express = require('express');
const partials = require('express-partials');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
// Require csurf package here

const PORT = 4001;

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(partials());

app.use(cookieParser());

app.set('trust proxy', 1) 

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "/public")));

// Configure csurf middleware here

// Use csrf middleware at application level here

// Configure error message middleware here

// Use error message middleware at application level here

app.get('/', (req, res) => {
  // Send CSRF token to form
  res.render('order')
})


app.get('/contact', (req, res) => {
  // Send CSRF token to form
  res.render('contact')
})

app.post('/submit', (req, res) => {
  res.render('success');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`) );
