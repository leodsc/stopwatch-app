import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import routes from "./src/apis/server/routes.js";

const app = express();

const dirname = new URL("./dist", import.meta.url).pathname;
app.set("port", process.env.PORT || 3000);
app.set("trust proxy", 1);

app.use(
  session({
    secret: "keyboard",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(express.static(dirname));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use("/api/signup", routes.signup);
app.use("/api/login", routes.login);

const server = app.listen(app.get("port"), () => {
  console.log("listening on port ", server.address().port);
});
