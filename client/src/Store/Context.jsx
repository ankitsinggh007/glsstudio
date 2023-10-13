import { createContext, useContext, useState } from "react";

const NotesContext = createContext();

export const useNotesContext = () => {
  return useContext(NotesContext);
};

export const NotesProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState({
    name:"",
    email:"",
    notes:[],
  });
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addNote = (note) => {
    setIsAuthenticated({...isAuthenticated,notes:[note,...isAuthenticated.notes]});
  };

  const deleteNote = (id) => {
    const updatedNotes = isAuthenticated.notes.filter((note) => note.id !== id);
    setIsAuthenticated({...isAuthenticated,notes:[...updatedNotes]});
    
  };

  const editNote = (id, newNote) => {
    const updatedNotes = isAuthenticated.notes.map((note) =>
      note.id === id ? newNote : note
    );
    setIsAuthenticated({...isAuthenticated,notes:[...updatedNotes]});
  };

  return (
    <NotesContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        showModal,
        openModal,
        closeModal, // Make sure to include closeModal in the context value
        addNote,
        deleteNote,
        editNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
