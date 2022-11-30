import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (<>
        <div className='col-md-3'>
            <div className="card" style={{ width: "15rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p className="card-text">{note.description}</p>
                    <p className="card-link">#{note.tag}</p>
                    <p className="card-link">{note.date}</p>
                    <button className="btn btn-success" onClick={() => { updateNote(note); }} >Edit</button>
                    <button className='btn btn-primary' onClick={() => { deleteNote(note._id); props.showAlert("You are successfully deleted", "success") }} >Delete</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default NoteItem