//import logo from './logo.svg';
import React, { useEffect } from 'react';
import { StudentProvider } from './utils/StudentContext';
import StudentList from './components/StudentList';

import './App.css';

function App() {
  const title = "Student Data listing";
  useEffect(() =>{
    document.title = title;
  },[]);

  return (
    <div className="App">
      <h4 style={{color:'lightgreen'}}>{title}</h4>
      <StudentProvider>
        <StudentList />
      </StudentProvider>
    </div>
  );
}

export default App;
