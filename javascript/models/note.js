class Note {

    static all = []

    constructor (id, title, content, timeStamp, filmID) {
        this.id = id
        this.title = title
        this.content = content
        this.timeStamp = timeStamp
        this.filmID = filmID

        Note.all.push(this)
    }


}