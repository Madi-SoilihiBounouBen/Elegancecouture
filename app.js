const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
    res.render("eleganceCouture");
});

app.get("/accueil", (_req, res) => {
    res.render("accueil");
});

app.get("/vitrine", (_req, res) => {
    res.render("vitrine");
});

app.get("/service", (_req, res) => {
    res.render("service");
});

module.exports = app;
