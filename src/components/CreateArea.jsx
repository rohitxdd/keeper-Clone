import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';



function CreateArea(props) {
  const [notes, setNotes] = useState({
    title: "",
    content: ""
  })

  const [checked, setChecked] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target;
    setNotes(prev => {
      return ({
        ...prev,
        [name]: value
      })
    })
  }

  function handleAddClick(event) {
    event.preventDefault();
    if (notes.title === "" || notes.content === "") {
      return
    }
    props.addnotesToList(notes)
    setNotes({
      title: "",
      content: ""
    })
    setChecked(false)
  }

  function handleCheck(){
    setChecked(true)
  }

  return (
    <div>
      <form className="create-note">
        {checked && <input name="title" value={notes.title} placeholder="Title" onChange={handleChange} />}

        <textarea name="content" value={notes.content} placeholder="Take a note..." rows={checked?3:1} onChange={handleChange} onClick={handleCheck} />

        <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
        <Fab onClick={handleAddClick}><AddIcon /></Fab>
        </Zoom>
        
      </form>
    </div>
  );
}

export default CreateArea;
