import React, { useState } from "react";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useNotesContext } from "../Store/Context";
import { NavLink } from "react-router-dom";

function Thumbnail({_id,title,description}) {
  const [focus, setfocus] = useState(false);
  const { closeModal,setIsAuthenticated, showModal, notes, addNote, deleteNote, editNote } =
  useNotesContext();
  
  const loadUser=async()=>{
    try{
      const {data}=await axios.get("http://localhost:3002/loaduser",{
      withCredentials:true,
    })
    setIsAuthenticated(data.response);
    }
    catch(error){
      console.log(error);
    }
    // console.log(data);
  }
  const mouseIn = () => {
    setfocus(true);
  };
  const mouseOut = () => {
    setfocus(false);
  };
  const DeleteNote=async(_id)=>{
    try{console.log(_id,"id")
    const { data } = await axios.delete(`http://localhost:3002/delete/${_id}`, {
  withCredentials: true,
});
    console.log(data);
    loadUser();
  }
  catch(error){
    console.log(error);
  }
  }
  
  return (
    <div
      className="w-60 h-60 border m-2 overflow-hidden  relative rounded-xl py-10  bg-gray-400 "
      onMouseEnter={mouseIn}
      onMouseLeave={mouseOut}
    >
      {focus && (
        <span className="flex absolute top-12 w-full justify-end px-3 ">
        <NavLink to={`/edit/${_id}`}>  <AiTwotoneEdit 
            className={` edit-icon text-black rounded-full cursor-pointer mr-3 bg-white w-8 h-8 `}
          /></NavLink>
          <AiFillDelete onClick={()=>DeleteNote(_id)}
            className={` text-black edit-icon rounded-full cursor-pointer bg-white w-8 h-8`}
          />
        </span>
      )}
      <div className=" w-[100%] h-[100%]  text-ellipsis bg-slate-100   overflow-hidden border border-black  ">
        <p className="ml-1">{description}</p>
      </div>
      <h3 className="ml-1 font-medium text-lg">{title}</h3>
    </div>
  );
}

export default Thumbnail;
