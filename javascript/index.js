let watchedFilm = false
let favoritedFilm = false

document.addEventListener("DOMContentLoaded", function(){ console.log("DOM Content Loaded");
    
    API.addFilms();

    document.addEventListener("click", event => { event.preventDefault();

        if(event.target.matches(".watched-btn")) {
            watchedFilm = !watchedFilm
            const filmImgTag = event.target.closest(".film-card").querySelector("img")
            const filmWatchedBtnTag = event.target.closest(".film-card").querySelector(".watched-btn")
            
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

            fetch(`http://localhost:3000/films/${id}`, {
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
            const favoriteBtnTag = event.target.closest(".film-card").querySelector(".favorite-btn")
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

            fetch(`http://localhost:3000/films/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filmObj)
            })
            .then(response => response.json())
            .then(updatedFilm => {
                console.log(updatedFilm)
            })
        }

        if (event.target.matches("#watched-link")) {
            const filmCollectionDiv = document.querySelector(".grid-container")
            filmCollectionDiv.innerHTML = ""
            fetch("http://localhost:3000/films")
            .then(response => response.json())
            .then(films => {
                films.forEach( film => {
                    if(film.watched === true) {
                        const { id, title, director, year, synopsis, runtime, image, favorited, watched, genre } = film
                        new Film( id, title, director, year, synopsis, runtime, image, favorited, watched, genre )
                    }
                })
            })
        }   

        if (event.target.matches("#favorited-link")) {
            const filmCollectionDiv = document.querySelector(".grid-container")
            filmCollectionDiv.innerHTML = ""
            fetch("http://localhost:3000/films")
            .then(response => response.json())
            .then(films => {
                films.forEach( film => {
                    if(film.favorited === true) {
                        const { id, title, director, year, synopsis, runtime, image, favorited, watched, genre } = film
                        new Film( id, title, director, year, synopsis, runtime, image, favorited, watched, genre )
                    }
                })
            })
        }

        if (event.target.matches("#unwatched-link")) {
            const filmCollectionDiv = document.querySelector(".grid-container")
            filmCollectionDiv.innerHTML = ""
            fetch("http://localhost:3000/films")
            .then(response => response.json())
            .then(films => {
                films.forEach( film => {
                    if(film.watched === false) {
                        const { id, title, director, year, synopsis, runtime, image, favorited, watched, genre } = film
                        new Film( id, title, director, year, synopsis, runtime, image, favorited, watched, genre )
                    }
                })
            })
        }

        if (event.target.matches(".film-image")) {
            const indFilm = event.target.closest(".film-card")
            const filmModalInfo = indFilm.querySelector(".film-info-el").innerHTML
            console.log(indFilm)

            const filmModal = document.querySelector(".film-modal")
            const filmModalContent = document.createElement("div")
            filmModalContent.classList.add("film-modal-content")
            filmModalContent.dataset.id = indFilm.id


            filmModalContent.innerHTML = `
            <span class="close">&times;</span>
            <img src=${filmModalImage} class="film-modal-image">
            <p class="film-modal-info">${filmModalInfo}</p>
            <p>Synopsis: ${indFilm.synopsis}</p>
            <p>Genre: ${indFilm.genre}</p>
            <p>Runtime: ${indFilm.runtime}</p> 
            <button data-id="${indFilm.id}" class="add-notes-btn">Add Notes</button>
            `
            filmModal.appendChild(filmModalContent)
            
            const modal = document.getElementById("modal")
            const span = document.getElementsByClassName("close")[0]

            modal.style.display = "block";
            
            span.onclick = function() {
                modal.style.display = "none";
            }
            
            window.onclick = function(event) {
                if (event.target == modal) {
                  modal.style.display = "none";
                }
            }
        }
    })
})
