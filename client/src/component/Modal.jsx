import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useNotesContext } from "../Store/Context";
import axios from "axios";
import { useNavigate,useParams } from 'react-router-dom';

const Modal = ({action}) => {
  const [note,setNote]=useState({
    id:2,title:"",description:""
  });
  const navigate = useNavigate();
  const params = useParams();
console.log(params,"params")
const { id } = params; 

  const [Error, setError] = useState(false)
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef(null);
  const { closeModal,setIsAuthenticated, showModal, notes, addNote, deleteNote, editNote } =
    useNotesContext();
   const fetchNotes=async()=>{
      const {data}=await axios.get(`http://localhost:3002/get/${id}`,{
        withCredentials:true
      });
      console.log(data,data);
      setNote(data.response[0]);
    }
   useEffect(()=>{
    if(action=="Edit"){
      fetchNotes();
    }
   },[])
   
   
   
   
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
       
  const openModal = () => {
    setIsVisible(true);
  };

  const closeModalfun = () => {
    setIsVisible(false);
  };
  const handleChange=(e)=>{
    e.preventDefault();
      setNote({
        ...note,[e.target.name]:e.target.value
      })
  }
  const submitForm = async(e) => {
    setError(false);

    e.preventDefault();
    if(note.title&&note.description){
      console.log(note,"hello");
      if(action=="Add"){
        const { data } = await axios.post('http://localhost:3002/create', note, {
          withCredentials: true,
        });
        

        loadUser();
        navigate(-1);
      }
      else{
        try{
          const{data}=await axios.put(`http://localhost:3002/edit/${id}`,note,{
      withCredentials: true,
    
          });
          loadUser();
          navigate(-1);
        }
        catch(error){
          console.log(error);
        }
      }



    }
    else{
      setError(true);
    }
  
  };
  const goBack=()=>{
    navigate(-1);
  }
  useEffect(() => {
    document.addEventListener("click", (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
        
      }
    });

    return () => {
      document.removeEventListener("click", (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          closeModal();
        }
      });
    };
  }, [isVisible]);
  return (
    <div className="z-80 ">
      <div
        className="modal overflow-hidden absolute top-0 backdrop-blur-md h-screen w-full "
        ref={modalRef}
        onClick={closeModal}
      ></div>
      <div className="modal-content absolute top-[20%] left-[30%] justify-evenly h-[40%] w-[40%] border border-black bg-slate-200 rounded-md flex flex-col p-5 center">
        <h1 className="text-center text-lg">{action} form</h1>
        <input
          type="text"
          className="mb-4  border-none rounded px-4 py-2"
          placeholder="Title"
          name="title"
          value={note.title}
          onChange={handleChange}
        />
        <textarea
          type="text"
          className="mb-4  border-none rounded px-4 py-2"
          placeholder="Enter description"
          name="description"
          value={note.description}
          onChange={handleChange}
        />
        <div className=" flex justify-end modal-buttons">
          <button
            className="mr-3 px-4 py-3 bg-slate-100 rounded-md "
            onClick={goBack}
          >
            Back
          </button>
          <button
            className="px-6 py-3 bg-black text-white rounded-md"
            onClick={submitForm}
          >
          {action}
          </button>
        </div>
      </div>
    </div>
  );
};



export default Modal;
