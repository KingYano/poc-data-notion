document.getElementById('monFormulaire').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêcher l'envoi standard du formulaire

    // Récupérer les valeurs du formulaire
    var age = document.getElementById('age').value;
    var ville = document.getElementById('ville').value;

    // Configuration de la requête à l'API Notion
    var data = {
        parent: { database_id: 'ID_DATA_BASE_NOTION' }, // Remplacez  ID réel de la bddNotion
        properties: {
            'Age': { // Doit correspond exactement au nom de la propriété dans Notion
                number: parseInt(age)
            },
            'Ville': {
                title: [
                    {
                        text: {
                            content: ville
                        }
                    }
                ]
            }
        }
    };

    // Utilisation proxy CORS pour le développement (seulement en local)
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var targetUrl = 'https://api.notion.com/v1/pages';

    fetch(proxyUrl + targetUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer TOKEN_SECRET`, // Utiliser vrai token
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(`${response.status} ${response.statusText}: ${text}`) });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

});
