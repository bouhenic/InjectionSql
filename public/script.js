document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupérer les valeurs des champs d'entrée
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Envoi de la requête de connexion au serveur
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erreur lors de la connexion');
        }
    })
    .then(function(data) {
        // Gérer la réponse du serveur après la connexion réussie
        console.log(data);
        // Rediriger vers une autre page, afficher un message, etc.
    })
    .catch(function(error) {
        // Gérer les erreurs
        console.error(error);
        // Afficher un message d'erreur à l'utilisateur, par exemple
    });
});
