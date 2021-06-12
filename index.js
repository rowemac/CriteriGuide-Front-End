document.addEventListener("click", event => { console.log("You just clicked on:", event.target) })

const API_URL = "http://localhost:3000/films"

document.addEventListener("DOMContentLoaded", function(){ console.log("DOM Content Loaded")


    const renderFilm = (film) => {
        const filmCardDiv = document.createElement("div")
        filmCardDiv.classList.add("filmCard")
        filmCardDiv.setAttribute("data-id", film.id)
        filmCardDiv.id = film.id

        filmCardDiv.innerHTML = `
            <img src=${film.image} class="film-image">
            <p>${film.title} | ${film.director} | ${film.year}</p>
            <button data-id="${film.id} class="watched-btn">Watched</button>
            <button data-id="${film.id} class="favorite-btn">Favorite</button>
        `
        const filmCollectionDiv = document.querySelector("#film-collection")
        filmCollectionDiv.append(filmCardDiv)
    }

    const renderAllFilms = (allFilms) => {
        allFilms.forEach( film => { renderFilm(film) } ) 
    }

    fetch(API_URL).then(response => response.json() )
    .then( filmsArray => { console.log(filmsArray);
        renderAllFilms(filmsArray) 
    })




})
