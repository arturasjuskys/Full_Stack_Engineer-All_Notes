// Import packages
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");

// App config
app.set("trust proxy", 1);
const PORT = process.env.PORT || 4001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
// Import Passport config
require("./config/passport");

// 1. Session Config
app.use(
  session({
    secret: 'fgfdweasd',
    cookie: {
      maxAge: 100000000
    },
    saveUninitialized: false,
    resave: false,
    sameSite: 'none',
    secure: true
  })
);
// Passport Config
// 13.
app.use(passport.initialize());

// 14.
app.use(passport.session());

// Routes
app.use(require("./routes/index.routes"));

app.get("/", (req, res) => {
  // const user = null || "Guest";
  // 22.
  const user = req.user || "Guest";
  res.render("home", { user });
});


app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
