import React, { useState } from "react";
import Thumbnail from "../component/Thumbnail";
import { useNotesContext } from '../Store/Context';
import {IoIosAddCircle} from "react-icons/io"

import Modal from "../component/Modal";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const { isAuthenticated,showModal,notes, addNote, deleteNote, editNote } = useNotesContext();
 console.log(showModal,"showmodal in ")
  return (
    <div className=" z-40  ">
    <div className="ml-24 text-xl w-36">
    <span className="bg-slate-200 ">
        hi,ankit 👍
    </span>
    <br/>
    <NavLink to="/create" className="flex place-items-center cursor-pointer"><IoIosAddCircle/>Add New</NavLink>
    </div>
    <div className="container flex border m-auto justify-center h-[30rem] overflow-auto border-black p-4 flex-wrap">
    {
      !isAuthenticated.notes.length==0
&&
      isAuthenticated.notes.map((obj,index)=>{
        return(
          <Thumbnail {...obj}/>
        )
      })
    }
    {
      isAuthenticated.notes.length==0
      &&
      <h1>Empty</h1>
    }
    </div>
    

  </div>
  )
}



export default Profile;

