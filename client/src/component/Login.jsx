import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink,useNavigate } from "react-router-dom";
import axios from "axios";

import { useNotesContext } from "../Store/Context";
const Login = () => {
  const { isAuthenticated,setIsAuthenticated,showModal, addNote, deleteNote, editNote ,openModal} = useNotesContext();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(7, "Password must be at least 7 characters long").required("Password is required"),
  });

  const handleSubmit = async (values) => {
    // Perform the login logic here, e.g., make an API request to authenticate the user.

    try {
      const {email,password}=values
      const {data} = await axios.post(`http://localhost:3002/login`,values,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      
    });
    if(data.success){
      console.log("hi be");

      setIsAuthenticated(data.response);
      console.log("hi");
      navigate('/profile');
    }       
        }
     catch (error) {
      console.log("error")
    }
    console.log(values); // Replace this with your login logic.
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col w-1/4 shadow-xl m-auto border-2 p-5 rounded-lg items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Login</h1>
          <Field
            type="email"
            name="email"
            placeholder="Email"
            className="mb-4 border-none rounded px-4 py-2"
          />
          <ErrorMessage name="email" component="div" className="text-red-500 mb-2" />

          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="mb-4 border-none rounded px-4 py-2"
          />
          <ErrorMessage name="password" component="div" className="text-red-500 mb-2" />

          <p className="m-2">
            Not having an account? <NavLink className='text-blue-500 ' to='/signup'>Signup</NavLink>
          </p>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
