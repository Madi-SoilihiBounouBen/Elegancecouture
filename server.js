const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "views", "eleganceCouture.html"));
});

app.get("/accueil", (_req, res) => {
    res.sendFile(path.join(__dirname, "views", "accueil.html"));
});

app.get("/vitrine", (_req, res) => {
    res.sendFile(path.join(__dirname, "views", "vitrine.html"));
});

app.listen(PORT, () => {
    console.log(`Elegance Couture disponible sur http://localhost:${PORT}`);
});
