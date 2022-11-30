
import React, { useContext, useState, useRef } from 'react'
import noteContext from "../context/notes/noteContext";

function AddNote() {
    const context = useContext(noteContext);
    const ref = useRef(null)
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setnote({ title: "", description: "", tag: "" })
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h4>Add Your Note</h4>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" minLength={5} className="form-control" value={note.title} name="title" id="title" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Description</label>
                    <input type="text" minLength={5} className="form-control" value={note.description} name="description" id="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" name="tag" value={note.tag} id="tag" onChange={onChange} />
                </div>
                <input type="submit" disabled={note.title.length<5 || note.description.length<5} value="submit" className="btn btn-success" onClick={handleClick} />
            </form>
        </div>
    )
}

export default AddNote