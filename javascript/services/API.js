class API {

    static addFilms() {
        fetch("http://localhost:3000/films")
        .then(response => response.json())
        .then(films => {
            films.forEach( film => {
                const { id, title, director, year, synopsis, runtime, image, favorited, watched, genre } = film
                new Film( id, title, director, year, synopsis, runtime, image, favorited, watched, genre )
            })
        })
    }
}