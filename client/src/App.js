import './App.css';
import Footer from './component/Footer';
import Profile from './pages/Profile';
import Login from './component/Login';
import Navbar from './component/Navbar';
import Signup from './component/SignUp';
import { Provider, useEffect } from 'react';
import Thumbnail from './component/Thumbnail';
import { useNotesContext } from './Store/Context';
import { Route, Routes } from "react-router-dom";
import Modal from './component/Modal';
import axios from "axios";
axios.defaults.withCredentials = true;
function App() {
  
  const { isAuthenticated,setIsAuthenticated,showModal,notes, addNote, deleteNote, editNote } = useNotesContext();
 console.log(showModal,"modal in app");

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
  useEffect(()=>{
    if(isAuthenticated.name==""){
      loadUser();
    }
  },[]);

  return (
    <  >
    <div className='background index-0 h-full w-screen'>
      
      </div>
    <div className="border border-red-300 flex flex-col  index-10 App h-screen">
      <Navbar/>
    <Routes>
    <Route path="/" element={<Login/>} />

    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/profile" element={<Profile/>} />
    <Route path="/create" element={<Modal action={"Add"}/>} />
    <Route path="/edit/:id" element={<Modal action={"Edit"}/>} />
    
    </Routes>
    {/* <Footer /> */}
    </div>
    </>
  );
}

export default App;
