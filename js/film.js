class Film {
    
    static all = []

    constructor (title, director, year, synopsis, genre, runtime, image) {
        this.title = title,
        this.director = director, 
        this.year = year,
        this.synopsis = synopsis, 
        this.genre = genre,
        this.runtime = runtime,
        this.image = image

        Film.all.push(this)
    }

}