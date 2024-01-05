// API KEY: ca8ab1ed698f69ca11fac78b5fd79602
// ACCESS TOKEN AUTH: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYThhYjFlZDY5OGY2OWNhMTFmYWM3OGI1ZmQ3OTYwMiIsInN1YiI6IjY1OTZhMzE0ZDdhNzBhMTIyZTY5ZWYwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eN8ciSR6MPZkQCBvEyvjiJ2zYZpKWZepQCQ3TrDAVl4

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

            const sectionFilms = document.querySelector(".section-films");

            for (let i = 0; i < response.results.length; i++) {
                const movie = response.results[i];

                const ficheMovie = document.createElement("article");

                const imageMovie = document.createElement("img");
                imageMovie.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                imageMovie.classList.add("img");
                imageMovie.setAttribute("data-movie-id", movie.id);

                const titreMovie = document.createElement("h3");
                titreMovie.innerText = movie.original_title;

                const descriptionMovie = document.createElement("p");
                descriptionMovie.innerText = movie.overview;

                const noteMovie = document.createElement("p");
                noteMovie.innerText = movie.vote_average + " / 10";

                ficheMovie.appendChild(imageMovie);
                ficheMovie.appendChild(titreMovie);
                ficheMovie.appendChild(descriptionMovie);
                ficheMovie.appendChild(noteMovie);

                sectionFilms.appendChild(ficheMovie);
            }

            createFicheFilm();
        })
        .catch(err => console.error(err));

}
loadFetch();

////// --2EME FETCH -- //////
async function loadDescriptionFetch(movieId) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYThhYjFlZDY5OGY2OWNhMTFmYWM3OGI1ZmQ3OTYwMiIsInN1YiI6IjY1OTZhMzE0ZDdhNzBhMTIyZTY5ZWYwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eN8ciSR6MPZkQCBvEyvjiJ2zYZpKWZepQCQ3TrDAVl4'
        }
    };

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR`, options)
        .then(response => response.json())
        .then(movieInfo => {
            console.log(movieInfo); // Check the movie information in the console

            const ficheFilm = document.querySelector(".fiche-film");

            ficheFilm.innerHTML = '';

            const title = document.createElement("h3");
            title.innerText = movieInfo.original_title;

            const overview = document.createElement("p");
            overview.innerText = movieInfo.overview;

            const releaseDate = document.createElement("p");
            releaseDate.innerText = "Release Date: " + movieInfo.release_date;

            const genres = document.createElement("p");
            genres.innerText = "Genres: " + movieInfo.genres.map(genre => genre.name).join(", ");

            const closeButon = document.createElement("button")
            closeButon.innerText = "fermer"
            closeButon.addEventListener("click", function () {
                ficheFilm.style.display = "none"
            })

            ficheFilm.appendChild(closeButon);
            ficheFilm.appendChild(title);
            ficheFilm.appendChild(overview);
            ficheFilm.appendChild(releaseDate);
            ficheFilm.appendChild(genres);

            ficheFilm.style.display = "block"; // Show the fiche-film element
        })
        .catch(err => console.error(err));
}

// Fonction créer la fiche film avec infos du film ciblé
function createFicheFilm() {
    const images = document.querySelectorAll(".img");

    images.forEach(img => {
        img.addEventListener("click", function () {
            console.log("Image clicked"); // Check if the click event is being triggered

            const ficheFilm = document.querySelector(".fiche-film");
            ficheFilm.innerHTML = ''; // Clear existing content

            const movieId = img.getAttribute("data-movie-id");
            console.log("Movie ID:", movieId); // Check if the movieId is correct
            loadDescriptionFetch(movieId);

            ficheFilm.style.display = "block"; // Show the fiche-film element
        });
    });
}
