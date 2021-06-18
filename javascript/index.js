let watchedFilm = false
let favoritedFilm = false
let displayNoteForm = false

document.addEventListener("DOMContentLoaded", function(){ console.log("DOM Content Loaded")
    
    API.addFilms()

    document.addEventListener("click", event => { event.preventDefault()

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

        if (event.target.matches("#logo-home-link")) {
            const filmCollectionDiv = document.querySelector(".grid-container")
            filmCollectionDiv.innerHTML = ""
            API.addFilms()
        }

        if (event.target.matches(".film-image")) {
            const indFilm = event.target.closest(".film-card")
            const filmModalImage = indFilm.querySelector(".film-image").src
            const filmModalInfo = indFilm.querySelector(".film-info-el").innerHTML
            const filmModalSynopsis = indFilm.querySelector(".film-synopsis-el").textContent
            const filmModalGenre = indFilm.querySelector(".film-genre-el").textContent
            const filmModalRuntime = indFilm.querySelector(".film-runtime-el").textContent
            const filmModal = document.querySelector(".film-modal")
            const modal = document.getElementById("modal")
            
            const filmModalContent = document.createElement("div")
            filmModalContent.classList.add("film-modal-content")
            filmModalContent.dataset.id = indFilm.id

            filmModalContent.innerHTML = `
            <span class="close">&times;</span>
            <img src=${filmModalImage} class="film-modal-image">
            <p class="film-modal-info">${filmModalInfo}</p>
            <p class="film-modal-synopsis">${filmModalSynopsis}</p>
            <p class="film-modal-genre">${filmModalGenre}</p>
            <p class="film-modal-runtime">${filmModalRuntime}</p>
            <br><br>
            <button data-id="${indFilm.id}" class="add-notes-btn">Add Notes</button>
            `
            filmModal.appendChild(filmModalContent)

            modal.style.display = "block"
        }

        if (event.target.matches(".add-notes-btn")) {
            const noteForm = document.getElementById("note-form")

            function openForm() {
                noteForm.style.display = "block"
            }
            
            openForm()

            noteForm.addEventListener("click", event => { event.preventDefault()
                console.log(event.target)
                if (event.target.matches(".submit-btn")) {
                    const filmModalContent = document.querySelector(".film-modal-content")
                    const filmID = filmModalContent.dataset.id
                    // const filmModalNotes = filmModalContent.createElement("div")
                    // filmModalNotes.classList.add("film-modal-notes")
                    // filmModalNotes.dataset.id = filmModalContent.id 

                    const noteTitle = document.querySelector(".input-text-title").value
                    const noteContent = document.querySelector(".input-text-content").value
                    const noteTimeMarker = document.querySelector(".input-text-time-marker").value

                    fetch(`http://localhost:3000/films/${filmID}/notes`, {
                        
                        method: "POST",
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify({
                            title: noteTitle,
                            content: noteContent,
                            time_marker: noteTimeMarker,
                            film_id: filmID
                        })                       
                    })
                    .then(response => response.json())
                    .then( newNote => {
                        console.log(newNote)
                    })
        
                    // filmModalNotes.innerHTML =  `
                    // <p></p>
                    // <p></p>
                    // <p></p>
                    // <button class="delete-btn">Delete</button>
                    // `
        
                }
            })

        }

        if (event.target.matches(".close")) {
            const noteForm = document.getElementById("note-form")
            const filmModal = document.getElementById("modal")

            function closeForm() {
                noteForm.style.display = "none"
            }
            closeForm()

            function closeModal() {
                filmModal.style.display = "none"
                filmModal.innerHTML = ""
            }
            closeModal()
        }

    })

})
