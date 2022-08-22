import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

  const [notesList, setNotesList] = useState(()=>{
    let arr = localStorage.getItem("keeperList")

    return JSON.parse(arr)
  })


  function addnotesToList(notes){
    setNotesList(prev=>{
      return ([...prev, notes])
    })
    console.log(notesList)
  }

  function deleteNote(id){
    setNotesList((prev)=>prev.filter((e, i)=> i !== id))
  }

  return (
    <div>
      <Header />
      <CreateArea addnotesToList={addnotesToList}/>
      {localStorage.setItem("keeperList", JSON.stringify(notesList))}
      {notesList.map((element, index)=><Note key={index} id={index} title={element.title} content={element.content} deleteNote={deleteNote} />)}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
