import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useContext } from "react";
import { useNotesContext } from "../Store/Context";
import {IoIosAddCircle} from "react-icons/io"
import { formateProfileName } from "../utils";
export const Setting = () => {
  const [Hidden, setHidden] = useState(true);
  
  const { isAuthenticated,setIsAuthenticated,showModal, addNote, deleteNote, editNote ,openModal} = useNotesContext();
 const Logout=async()=>{

 }
  console.log(Hidden,"h")
  return (
    <div className="relative cursor-pointer h-20 w-16 flex flex-col border border-black">
    <span className="bg-black px-3.5 py-3 text-center   text-[#F3F5FB] font-medium rounded-full" onClick={()=>{ setHidden(!Hidden)}}>{formateProfileName(isAuthenticated.name)}</span>
      <li className={Hidden?"inline mt-2  absolute z-40 top-10 ":"hidden"}>
    <hr className="border border-black"/>
        
        <ul onClick={Logout} className="text-xl" >Logout</ul>
      </li>
    </div>
  );
};
// text-black  bg-white list-none text-center right-4 top-9 border border-black rounded-md  w-28
const Navbar = () => {
  const { isAuthenticated,setIsAuthenticated,showModal, addNote, deleteNote, editNote ,openModal} = useNotesContext();
console.log(isAuthenticated,"auth");
  const handleLogout = () => {
    setIsAuthenticated({});
  };
  // console.log(is)

  return (
    <nav className="flex items-center w-98  mb-2 shadow-md backdrop-blur-md justify-between p-4">
      <NavLink to="/" className="flex items-center">
        <img src={Logo} alt="Logo" className="w-12 h-12" />
        <h1 className="ml-4 text-[1.5rem] font-bold">Inkwell</h1>
      </NavLink>
      <div className="flex items-center">
        {isAuthenticated.name=="" &&<NavLink
          to="/login"
          className="btn bg-neutral-950 text-white border font-medium border-white px-5 py-2 rounded-md"
        >
           Login
        </NavLink>}
        {
          isAuthenticated.name!=="" &&
          <Setting/>
        }
      </div>
    </nav>
  );
};

export default Navbar;
