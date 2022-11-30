import { React, useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  const getNotes = async () => {
    //api call
    const response = await fetch(`http://localhost:5000/api/note/fetchallnotes`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
    });
    const json = await response.json();
    setNotes(json)
  }

  // add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`http://localhost:5000/api/note/addnote`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
   
    setNotes(notes.concat({title,description,tag}))
  }
  // delete a note

  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}/api/note/deleteNote/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    });
    const json = await response.json();
    const newNote =  notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }

  //update a note

  const editNote = async (id, title, description, tag) => {
    let newNote = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      } 
    }
    setNotes(newNote)

    //api call
    const response = await fetch(`${host}/api/note/updateNote/${id}`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    console.log(note)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;