import React, { useState } from "react";

function CreateArea(props) {
  const [notes, setNotes] = useState({
    title:"",
    content:""
  })

  function handleChange(event){
    const{name, value} = event.target;
    setNotes(prev=>{
      return ({
        ...prev,
        [name]: value
      })
    })
  }

  function handleAddClick(event){
    event.preventDefault();
    if(notes.title==="" || notes.content ===""){
      return
    }
    props.addnotesToList(notes)
    setNotes({
      title:"",
      content:""
    })
  }

  return (
    <div>
      <form className="create-note">
        <input name="title" value={notes.title} placeholder="Title" onChange={handleChange} />
        <textarea name="content" value={notes.content} placeholder="Take a note..." rows="3" onChange={handleChange} />
        <button onClick={handleAddClick}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
