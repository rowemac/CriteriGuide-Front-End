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

    static addNotes(filmID) {
        fetch(`http://localhost:3000/films/${filmID}/notes`)
        .then(response => response.json())
        .then( notes => {
            notes.forEach( note => {
                const { id, title, content, time_marker, film_id} = note
                new Note ( id, title, content, time_marker, film_id)
            })
        })
    }
}