import React, { useState, useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
import "./App.css";
import axios from "axios";

export default function App() {
  const[editData, setEditData] = useState({
    state:false,
    title:'',
    content:''
  })

  const [notesList, setNotesList] = useState(()=>{
    return ([])
  })

  useEffect(()=>{
    axios.get("http://localhost:5000/")
    .then(response=>{
      setNotesList(response.data)
    }).catch(err=>console.log(err))
  }, [notesList])

  function addnotesToList(notes){
    setNotesList([])
  }


  function deleteNote(id){
    axios.delete(`http://localhost:5000/api/${id}`)
    .then(response=>console.log(response))
    .catch(err=>console.log(err))
    setNotesList([])
  }

  function editNote(id){
    const {title, content} = notesList.filter(e=> e._id === id)[0];
    console.log({title, content})
    deleteNote(id)
    setEditData({
      state:true,
      title:title,
      content:content
    })
  }

  return (
    <div>
      <Header />
      <CreateArea addnotesToList={addnotesToList} editMode={editData}/>
      {notesList.map((element, index)=><Note key={index} id={element._id.valueOf()} title={element.title} content={element.content} deleteNote={deleteNote} editNote={editNote}/>)}
    </div>
  );
}

