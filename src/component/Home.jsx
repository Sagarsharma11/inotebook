import React from "react";
import AddNote from "./AddNote";
import Notes from "./Notes"

export default function Home(props) {
    const {showAlert} = props
    return (
        <>
            <div>
                <div className="container my-3">
                    <Notes showAlert={showAlert} />
                </div>
            </div>
        </>
    )
}