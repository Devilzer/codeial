const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const MongoStore = require("connect-mongo")(session);
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");
const passportGoogle = require("./config/passport-google-oauth2-strategy");

//setting up scss
app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);

app.use(express.urlencoded());
app.use(cookieParser());

//creating layouts
app.use(expressLayouts);
// extract script and style from subPages of layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setting up static files routes
app.use(express.static("./assets"));

//make the upload path avaiable to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//Mongo store is uesd to store the session cookies
app.use(
  session({
    name: "codeial",
    secret: "randomsecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disable",
      },
      (err) => {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//flash message setup
app.use(flash());
app.use(customMware.setFlash);

//routing to express router
app.use("/", require("./routes"));

//starting the Server
app.listen(port, (err) => {
  if (err) {
    console.log(`error in starting server:${err}`);
  }
  console.log(`Server is up and running at ${port}`);
});
