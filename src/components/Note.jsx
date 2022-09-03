import React from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

function Note(props) {

  function handleDeleteClick(id){
    props.deleteNote(id)
  }

  function handleEditClick(id){
    props.editNote(id)
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={()=>{
        handleDeleteClick(props.id)
      }}>< DeleteForeverIcon /></button>

      <button onClick={()=>{
        handleEditClick(props.id)
      }}>< EditIcon /></button>
    </div>
  );
}

export default Note;
