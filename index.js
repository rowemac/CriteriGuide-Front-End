document.addEventListener("click", event => { console.log("You just clicked on:", event.target) })

const API_DATABASE_URL = "http://localhost:3000/films"

document.addEventListener("DOMContentLoaded", function(){ console.log("DOM Content Loaded")


    const renderFilm = (film) => {
        const filmCardDiv = document.createElement("div")
        filmCardDiv.classList.add("filmCard")
        filmCardDiv.setAttribute("data-id", film.id)
        filmCardDiv.id = film.id

        filmCardDiv.innerHTML = `
            <img src=${film.image} class="film-image">
            <p class="film-info-el"><b>${film.title}</b><br>
            <i>${film.director}</i>, ${film.year}</p>
            <button data-id="${film.id}" class="watched-btn">Watched</button>
            <button data-id="${film.id}" class="favorite-btn">Favorite</button>
        `
        const filmCollectionDiv = document.querySelector(".grid-container")
        filmCollectionDiv.append(filmCardDiv)
    }

    const renderAllFilms = (allFilms) => {
        allFilms.forEach( film => { renderFilm(film) } ) 
    }

    fetch(API_DATABASE_URL).then(response => response.json() )
    .then( filmsArray => { console.log(filmsArray);
        renderAllFilms(filmsArray) 
    })

    document.addEventListener("click", event => { event.preventDefault();
        
        if(event.target.matches("watched-btn")) {
            console.log(event.target)
        }
    
    })

    document.addEventListener("click", event => { event.preventDefault();
        
        if(event.target.matches("favorite-btn")) {
            console.log(event.target)
        }
    
    })





})
