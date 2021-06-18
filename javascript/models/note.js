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

    // renderNote() {
    //     const filmModalContent = document.querySelector(".film-modal-content")
    //     const filmModalNotes = filmModalContent.createElement("div")
        
    //     filmModalNotes.classList.add("film-modal-notes")
    //     filmModalNotes.dataset.id = filmModalContent.id
    //     filmModalNotes.id = this.id
    //     filmModalNotes.innerHTML += this.noteHTML()

    //     filmModalContent.appendChild(filmModalNotes)
    // }

    // noteHTML() {
    //     return `
    //     <p></p>
    //     <p></p>
    //     <p></p>
    //     <button class="delete-btn">Delete</button>
    //     `
    // }


}