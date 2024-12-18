const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Configuration de la connexion à la base de données MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ciel',
    password: 'ciel2',
    database: 'users',
    port: 3306
});

// Établir la connexion à la base de données
connection.connect(function(err) {
    if (err) {
        console.error('Erreur de connexion à la base de données: ' + err.stack);
        return;
    }

    console.log('Connecté à la base de données MySQL');
});

// Définir le chemin du répertoire "public"
const publicPath = path.join(__dirname, 'public');

// Servir les fichiers statiques depuis le répertoire "public"
app.use(express.static(publicPath));

// Route pour la connexion
app.post('/login', function(req, res) {
    console.log("ok");
    const username = req.body.username;
    const password = req.body.password;
    console.log(username + password);

    // Requête SQL VULNÉRABLE à l'injection SQL
const query = "SELECT * FROM credentials WHERE username = '" + username + "' AND password = '" + password + "'";
console.log(query); // Affiche la requête SQL

//Avec username=snir' or 1=1--' ou ' OR 1=1-- - ou ' OR TRUE-- - ou ' OR 1=SLEEP(4)-- - (pour détecter que c'est du sql dérrière)
connection.query(query, function(err, results) {
    if (err) {
        console.error('Erreur lors de l\'exécution de la requête: ' + err.stack);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
        return;
    }

    if (results.length > 0) {
        // Authentification réussie
        res.json({ message: 'Authentification réussie' });
    } else {
        // Informations d'identification invalides
        res.status(401).json({ message: 'Informations d\'identification invalides' });
    }
});

    // Requête SQL pour vérifier les informations d'identification
//const query = "SELECT * FROM credentials WHERE username = ? AND password = ?";
//console.log(query);
// Remplace les placeholders par les variables sécurisées
/*connection.query(query, [username, password], function(err, results) {
   if (err) {
        console.error('Erreur lors de l\'exécution de la requête: ' + err.stack);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
        return;
    }

    if (results.length > 0) {
        // Authentification réussie
        res.json({ message: 'Authentification réussie' });
    } else {
        // Informations d'identification invalides
        res.status(401).json({ message: 'Informations d\'identification invalides' });
    }
});*/

});

// Toutes les autres routes redirigent vers la page d'index.html
app.get('*', function(req, res) {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Démarrer le serveur
app.listen(3000, function() {
    console.log('Serveur démarré sur le port 3000');
});
