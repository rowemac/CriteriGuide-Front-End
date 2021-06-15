class Film {

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


        this.renderFilm()
    }

    renderFilm() {
        const filmCollectionDiv = document.querySelector(".grid-container")
        const filmCardDiv = document.createElement("div")

        filmCardDiv.classList.add("film-card")
        filmCardDiv.dataset.id = this.id
        filmCardDiv.id = this.id
        filmCardDiv.innerHTML += this.filmHTML()
        filmCollectionDiv.appendChild(filmCardDiv)
    }

    filmHTML() {
        return `
            <img src=${this.image} class="film-image">
            <p class="film-info-el"><b>${this.title}</b><br>
            <i>${this.director}</i>, ${this.year}</p>
            <button data-id="${this.id}" class="watched-btn">Watched</button>
            <button data-id="${this.id}" class="favorite-btn">Favorite</button>
        `
    }

    

}