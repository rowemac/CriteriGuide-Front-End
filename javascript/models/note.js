class Note {

    static all = []

    constructor (id, title, content, timeMarker, filmID) {
        this.id = id
        this.title = title
        this.content = content
        this.timeMarker = timeMarker
        this.filmID = filmID

        Note.all.push(this)
    }

    renderNote() {

    }

    noteHTML() {

    }


}