import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Name must be at least 3 characters long").required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(7, "Password must be at least 7 characters long").required("Password is required"),
  });

  const handleSubmit = async(values) => {
    try {
      const {data} = await axios.post(`http://localhost:3002/register`, values,{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
        }
     catch (error) {
console.log("error")
    }  
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="flex flex-col w-1/4 shadow-xl m-auto p-5 rounded-lg items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Signup</h1>
          <Field
            type="text"
            name="name"
            placeholder="Name"
            className="mb-4 border border-gray-300 rounded px-4 py-2"
          />
          <ErrorMessage name="name" component="div" className="text-red-500 mb-2" />
          <Field
            type="email"
            name="email"
            placeholder="Email"
            className="mb-4 border border-gray-300 rounded px-4 py-2"
          />
          <ErrorMessage name="email" component="div" className="text-red-500 mb-2" />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            className="mb-4 border border-gray-300 rounded px-4 py-2"
          />
          <ErrorMessage name="password" component="div" className="text-red-500 mb-2" />
          <p className="m-2">
            Already have an account? <NavLink className='text-blue-500 ' to='/login'>Login</NavLink>
          </p>
          <button type="submit" className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Signup
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
