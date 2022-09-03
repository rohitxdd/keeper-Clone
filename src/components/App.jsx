import React, { useState, useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const[editData, setEditData] = useState({
    state:false,
  })

  const [notesList, setNotesList] = useState(()=>{
    let arr = localStorage.getItem("keeperList")
    if(arr){
      return JSON.parse(arr)
    }else{
      return []
    }
  })

  useEffect(()=>{
    {localStorage.setItem("keeperList", JSON.stringify(notesList))}
  }, [notesList])

  function addnotesToList(notes){
    setNotesList(prev=>{
      return ([...prev, notes])
    })
  }


  function deleteNote(id){
    setNotesList((prev)=>prev.filter((e, i)=> i !== id))
  }

  function editNote(id){
    const {title, content} = notesList[id]
    setNotesList((prev)=>prev.filter((e, i)=> i !== id))
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
      {notesList.map((element, index)=><Note key={index} id={index} title={element.title} content={element.content} deleteNote={deleteNote} editNote={editNote}/>)}
    </div>
  );
}

export default App;
