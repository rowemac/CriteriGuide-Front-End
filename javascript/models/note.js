class Note {

    static all = []

    constructor (id, title, content, time_marker, film_id) {
        this.id = id
        this.title = title
        this.content = content
        this.time_marker = time_marker
        this.film_id = film_id

        Note.all.push(this)
        this.renderNote()
    }

    renderNote() {
        const filmModalContent = document.querySelector(".film-modal-content")
        const filmModalNotes = document.createElement("div")

        
        filmModalNotes.classList.add("film-modal-notes")
        filmModalNotes.dataset.id = filmModalContent.id
        filmModalNotes.id = this.id
        filmModalNotes.innerHTML += this.noteHTML()

        filmModalNotes.addEventListener("click", event => {
            const id = this.id
            const filmID = this.film_id

            if(event.target.matches(".delete-btn")) {
                console.log(id)
                console.log(filmID)
                fetch(`http://localhost:3000/films/${filmID}/notes/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                })
                .then(response => response.json())
                .then(filmModalNotes.remove())
            }
        })

        filmModalContent.appendChild(filmModalNotes)
    }

    noteHTML() {
        return `
        <p>${this.title}</p>
        <p>${this.content}</p>
        <p>${this.time_marker}</p>
        <br>
        <button class="delete-btn">Delete</button>
        `
    }


}





