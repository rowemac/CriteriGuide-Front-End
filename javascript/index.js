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
            console.log(event.target)
            const filmCardDiv = document.getElementsByClassName(".film-card")

        }

        if (event.target.matches("#favorited-link")) {
            console.log(event.target)
        }

        if (event.target.matches("#unwatched-link")) {
            console.log(event.target)
        }

        if (event.target.matches(".film-image")) {
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
