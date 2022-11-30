import React, { useContext,useState, useEffect, useRef} from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
    const context = useContext(noteContext);
    const { notes, addNote, getNotes , editNote} = context;
    const [note, setnote] = useState({ id:"",etitle: "", edescription: "", etag: "" })
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("token"))
        {
            getNotes()
        }else{
            navigate("/login")
        }
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const updateNote = (currentNote) => {
        ref.current.click();
        setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }
    const handleClick = (e) => {
        editNote(note.id,note.etitle , note.edescription , note.etag);
        refClose.current.click()
        props.showAlert("You are successfully updated", "success");
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />
            <button style={{display:"none"}} type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container my-3">
                                <h4>Add Your Note</h4>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input minLength={5} type="text" value={note.etitle} className="form-control" name="etitle" id="etitle" onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="desc" className="form-label">Description</label>
                                        <input type="text" minLength={5} value={note.edescription} className="form-control" name="edescription" id="edescription" onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" value={note.etag} className="form-control" name="etag" id="etag" onChange={onChange} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">

               { notes.length ===0 && 'NO Notes To Display ' }
               </div>
                {notes.map((note) => {
                    return <NoteItem showAlert={props.showAlert} key={note._id}  updateNote={updateNote} note={note} />;
                })}
            </div>
        </>

    );
}