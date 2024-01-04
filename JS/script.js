// API KEY : ca8ab1ed698f69ca11fac78b5fd79602
// ACCESS TOKEN AUTH : eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYThhYjFlZDY5OGY2OWNhMTFmYWM3OGI1ZmQ3OTYwMiIsInN1YiI6IjY1OTZhMzE0ZDdhNzBhMTIyZTY5ZWYwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eN8ciSR6MPZkQCBvEyvjiJ2zYZpKWZepQCQ3TrDAVl4


////// --1ER FETCH -- //////
async function loadFetch() {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYThhYjFlZDY5OGY2OWNhMTFmYWM3OGI1ZmQ3OTYwMiIsInN1YiI6IjY1OTZhMzE0ZDdhNzBhMTIyZTY5ZWYwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eN8ciSR6MPZkQCBvEyvjiJ2zYZpKWZepQCQ3TrDAVl4'
        }
    };

    fetch('https://api.themoviedb.org/3/trending/movie/day?language=fr-FR', options)
        .then(response => response.json())
        .then(response => {
            console.log(response);

            // attraper la section pour y mettre les Elements fiches films
            const sectionFilms = document.querySelector(".section-films");

            // boucle for pour parcourir tous les films dans la réponse
            for (let i = 0; i < response.results.length; i++) {
                const movie = response.results[i];

                // création Element fiche film
                const ficheMovie = document.createElement("article");

                // récupération des données à mettre dans les éléments créés
                const imageMovie = document.createElement("img");
                imageMovie.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                imageMovie.classList.add("img")

                const titreMovie = document.createElement("h3");
                titreMovie.innerText = movie.original_title;

                const descriptionMovie = document.createElement("p");
                descriptionMovie.innerText = movie.overview;

                const noteMovie = document.createElement("p");
                noteMovie.innerText = movie.vote_average + " / 10";

                // attacher les éléments à la fiche film
                ficheMovie.appendChild(imageMovie);
                ficheMovie.appendChild(titreMovie);
                ficheMovie.appendChild(descriptionMovie);
                ficheMovie.appendChild(noteMovie);

                // attacher la fiche film à la section
                sectionFilms.appendChild(ficheMovie);
            }
            //appel de la fonction créer la div avec les infos supplémentaires
            createFicheFilm();
        })
        .catch(err => console.error(err));

}
//appel dela fonction asynchrone loadFetch();
loadFetch();

////// --2EME FETCH -- //////
async function loadDescriptionFetch() {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYThhYjFlZDY5OGY2OWNhMTFmYWM3OGI1ZmQ3OTYwMiIsInN1YiI6IjY1OTZhMzE0ZDdhNzBhMTIyZTY5ZWYwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eN8ciSR6MPZkQCBvEyvjiJ2zYZpKWZepQCQ3TrDAVl4'
        }
    };

    fetch('https://api.themoviedb.org/3/trending/movie/day?language=fr-FR', options)
        .then(response => response.json())
        .then(response => {

            for (let i = 0; i < response.results.length; i++) {
                const movie = response.results[i];

                const titreMovie = document.createElement("h3");
                titreMovie.innerText = movie.original_title;
                console.log(titreMovie)
            }
        })

        .catch(err => console.error(err));
}
loadDescriptionFetch();






// Fonction créer la div qui contient les infos du film
function createFicheFilm() {
    const images = document.querySelectorAll(".img");

    images.forEach(img => {
        img.addEventListener("click", function () {
            const ficheFilm = document.querySelector(".fiche-film")
            ficheFilm.classList.toggle("active")
        });
    });
}




////////////// CODE REMY

/*2éme*/
function showMovieDetails(movieId) {
    const apiKey = '5625a36de6999a47caf957bc36076c59';
    // Utilisation de "append_to_response" pour obtenir les crédits et d'autres informations en une seule requête
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr-FR&append_to_response=credits`;

    fetch(url)
        .then(response => response.json())
        .then(movie => {
            const detailsDiv = document.getElementById('movie-details');
            detailsDiv.innerHTML = '';

            const closeButton = document.createElement('button');
            closeButton.textContent = 'X';
            closeButton.classList.add('close-btn');
            closeButton.onclick = function () {
                detailsDiv.style.display = 'none';
            };
            detailsDiv.appendChild(closeButton);

            // Image du film
            const movieImage = document.createElement('img');
            movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            movieImage.alt = `Affiche du film : ${movie.title}`;
            movieImage.style.maxWidth = '100px'; // Vous pouvez ajuster la taille comme nécessaire
            detailsDiv.appendChild(movieImage);

            // Titre
            const title = document.createElement('h2');
            title.textContent = movie.title;
            detailsDiv.appendChild(title);

            // Description longue
            const longDescription = document.createElement('p');
            longDescription.textContent = movie.overview;
            detailsDiv.appendChild(longDescription);

            // Date de sortie
            const releaseDate = document.createElement('p');
            releaseDate.textContent = `Date de sortie : ${movie.release_date}`;
            detailsDiv.appendChild(releaseDate);

            // Réalisateurs
            const directors = movie.credits.crew.filter(person => person.job === 'Director');
            const directorsParagraph = document.createElement('p');
            directorsParagraph.textContent = 'Réalisateur(s) : ' + directors.map(person => person.name).join(', ');
            detailsDiv.appendChild(directorsParagraph);

            // Compositeurs de musique
            const composers = movie.credits.crew.filter(person => person.job === 'Original Music Composer');
            const composersParagraph = document.createElement('p');
            composersParagraph.textContent = 'Compositeur(s) de musique : ' + composers.map(person => person.name).join(', ');
            detailsDiv.appendChild(composersParagraph);

            detailsDiv.style.display = 'block';

        })
        .catch(error => {
            console.error('Erreur lors de la récupération des détails du film :', error);
        });
}