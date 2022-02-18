import React, { createContext, useContext, useEffect, useState } from 'react';
/////  , useState, useEffect
import axios from 'axios';
const { REACT_APP_BASEURL } = process.env;
//import search from '../utils/API';
// Initialize new context for students
const StudentContext = createContext();

// We create a custom hook to provide immediate usage of the student context value (students) in other components
export const useStudentContext = () => useContext(StudentContext);

// The privider is responsible for createing our state, updating the state and persisting values to the children
export const StudentProvider = ({children}) => {
   
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
   
   // const searchStudent = async () => {
        /*search()
            .then((res) => this.setState({students:res.data.students}))
            .catch((err) => console.log(err));*/
    /*    
            const response = await search();
            if(response){
                const { students } = response.data.students;
                state.students = students;
            }
            if(!response.ok){
                throw new Error('Cannot get student data')
            }
        
    };*/
    // Fetch data
  useEffect(() => {
   
    axios.get(`${REACT_APP_BASEURL}`)
      .then(function(response) {
        //  console.log("after get : " + response);
          const { students } = response.data.students;
        setStudents(students);
        
        setIsLoading(false);
        console.log(response.data.students);
      })
      .catch((error) => console.log(error));
  }, []);


    // The value prop expects an initial state object
    return (
        <StudentContext.Provider value={{ students, isLoading }}>
            {/* We render children in our components so that any descendent can access the value from the provider */}
            {children}
        </StudentContext.Provider>
    )


}