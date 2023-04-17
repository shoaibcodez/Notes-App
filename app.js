const main = document.querySelector('#main');
const addBtn = document.querySelector('.addBtn');

const saveNotes = () => {
    const notes = document.querySelectorAll('.note textarea')
    console.log(notes)
    const data = []
    notes.forEach((note) => {
        data.push(note.value)
    })
    if (notes.length === 0) {
        localStorage.removeItem('notes')
    }
    else {
        localStorage.setItem('notes', JSON.stringify(data))
    }
}

addBtn.addEventListener('click', () => {
    addNote();
})

const addNote = (text = "") => {
    const note = document.createElement('div')
    note.classList.add('note')
    note.innerHTML = `
    <div class="toolBar">
    <i class="save fa-solid fa-floppy-disk"></i>
    <i class="delete fa-solid fa-trash"></i>
    </div>
    <textarea>${text}</textarea>`

    note.querySelector('.delete').addEventListener('click', () => {
        note.remove();
        saveNotes();
    })

    note.querySelector('.save').addEventListener('click', () => {
        saveNotes();
    })

    note.querySelector('textarea').addEventListener('focusout', () => {
        saveNotes();
    })

    main.append(note)
    saveNotes();
}

function refresh() {
    const lsNotes = JSON.parse(localStorage.getItem('notes'));
    if (lsNotes === null) {
        addNote()
    }
    else {
        lsNotes.forEach((lsNote) => {
            addNote(lsNote)
        })
    }
}
refresh();