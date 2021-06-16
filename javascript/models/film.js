class Film {

    static all = []

    constructor (id, title, director, year, synopsis, runtime, image, favorited, watched, genre) {
        this.id = id
        this.title = title
        this.director = director
        this.year = year
        this.synopsis = synopsis
        this.runtime = runtime
        this.image = image
        this.favorited = favorited
        this.watched = watched
        this.genre = genre

        Film.all.push(this)
        this.renderFilm()
    }

    renderFilm() {
        const filmCollectionDiv = document.querySelector(".grid-container")
        const filmCardDiv = document.createElement("div")

        filmCardDiv.classList.add("film-card")
        filmCardDiv.dataset.id = this.id
        filmCardDiv.id = this.id
        filmCardDiv.innerHTML += this.filmHTML()
        
        const filmImgTag = filmCardDiv.querySelector("img")
        const filmWatchedBtnTag = filmCardDiv.querySelector(".watched-btn")
        const favoriteBtnTag = filmCardDiv.querySelector(".favorite-btn")


        if(this.watched === true) {
            filmImgTag.style.opacity = 0.3
            filmWatchedBtnTag.textContent = "Watched ✓"
        } else {
            filmImgTag.style.opacity = 1
            filmWatchedBtnTag.textContent = "Watched"
        }

        if(this.favorited === true) {
            favoriteBtnTag.style.backgroundColor = "#e21d1d"
        } else {
            favoriteBtnTag.style.backgroundColor = "#808080"
        }

        filmCollectionDiv.appendChild(filmCardDiv)

    }

    filmHTML() {
        return `
            <img src=${this.image} class="film-image">
            <p class="film-info-el"><b>${this.title}</b><br>
            <i>${this.director}</i>, ${this.year}</p>
            <p class="film-synopsis-el" hidden>${this.synopsis}</p>
            <p class="film-genre-el" hidden>${this.genre}</p>
            <p class="film-runtime-el" hidden>${this.runtime}</p>
            <button data-id="${this.id}" class="watched-btn">Watched</button>
            <button data-id="${this.id}" class="favorite-btn">Favorite</button>
            <br><br>
        `
    }

}