// document.addEventListener("click", event => { console.log("You just clicked on:", event.target) })

// const API_DATABASE_URL = "http://localhost:3000/films"
let watchedFilm = false
let favoritedFilm = false

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

    // fetch(API_DATABASE_URL).then(response => response.json() )
    // .then( filmsArray => { console.log(filmsArray);
    //     renderAllFilms(filmsArray) 
    // })

    

    document.addEventListener("click", event => { event.preventDefault();
        
        

        if(event.target.matches(".watched-btn")) {
            console.log(event.target)
            watchedFilm = !watchedFilm
            const filmImgTag = event.target.closest(".filmCard").querySelector("img")
            const filmWatchedBtnTag = event.target.closest(".filmCard").querySelector(".watched-btn")
            
            if(watchedFilm) {
                filmImgTag.style.opacity = 0.3
                filmWatchedBtnTag.textContent = "Watched ✓"
            } else {
                filmImgTag.style.opacity = 1
                filmWatchedBtnTag.textContent = "Watched"
            }

            const id = event.target.dataset.id
            const filmObj = {
                watched: watchedFilm
            }

            fetch(`${API_DATABASE_URL}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filmObj)
            })
            .then(response => response.json())
            .then(updatedFilm => {
                console.log(updatedFilm)
            })

        }

        if(event.target.matches(".favorite-btn")) {
            console.log(event.target)
            const favoriteBtnTag = event.target.closest(".filmCard").querySelector(".favorite-btn")
            favoritedFilm = !favoritedFilm
            
            if(favoritedFilm) {
                favoriteBtnTag.style.backgroundColor = "#e21d1d"
            } else {
                favoriteBtnTag.style.backgroundColor = "#808080"
            }

            const id = event.target.dataset.id
            const filmObj = {
                favorited: favoritedFilm
            }

            fetch(`${API_DATABASE_URL}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filmObj)
            })
            .then(response => response.json())
            .then(updatedFilm => {
                console.log(updatedFilm)
            })


        }

    })

})
