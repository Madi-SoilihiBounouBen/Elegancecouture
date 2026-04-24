// Le fichier server.js a pour mission de creer le serveur de l'application

// J'importe le package HTTP
const http = require("http");

// J'importe l'application app.js
const app = require("./app");

// Je cree un serveur
const serveur = http.createServer(app);

let numeroPort = Number(process.env.PORT) || 3010;

serveur.on("error", (erreur) => {
    if (erreur.code === "EADDRINUSE") {
        console.error(`Le port ${numeroPort} est deja utilise. Tentative sur le port ${numeroPort + 1}...`);
        numeroPort += 1;
        serveur.listen(numeroPort);
        return;
    }

    console.error("Erreur du serveur :", erreur);
});

serveur.listen(numeroPort, () => {
    console.log(`Le serveur est a l'ecoute sur le port ${numeroPort}`);
});
