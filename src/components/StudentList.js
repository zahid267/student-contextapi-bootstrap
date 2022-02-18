import React, { useReducer, useState } from 'react';
//import StudentCard from './StudentCard';
//import reducer from '../utils/reducers';

// import type variables
import { UPDATE_TAG } from '../utils/actions';
// Import reducer from utils folder
import reducer from '../utils/reducers';

import { useStudentContext } from '../utils/StudentContext';

//import '../styles/student.css';

function StudentList(){
    const initialState = useStudentContext();
    console.log("initstate : " + initialState);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');

    //const { students } =initialState;
    console.log("student-list : " + state);
    


    const [detail, setDetail] = useState(false);
    const [tagname, setTagname] = useState('');
   // const fullName = student.firstName+` `+student.lastName;
    const calcGradeAverage = (student) => {
        const grades = student.grades;
        let gtot = 0
        for(let i=0; i<grades.length; i++){
            gtot += parseInt(grades[i]);
        }
        const gavg = gtot/grades.length;
        return gavg;
      };
    //const gavg = calcGradeAverage(student);
    //const studentid = student.id;
    //console.log("student :" + student);





    return(
        (state.students ? 
            (
        <div>
            <div className="student-card">
            <input
                value={name}
                name="name"
                id="name"
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Search by name"
                size="100"
                style={{fontSize:'14px'}}
                />
            </div>
            <div className="student-card">
            <input
                value={tag}
                name="tag"
                id="tag"
                onChange={(event) => setTag(event.target.value)}
                type="text"
                placeholder="Search by Tag"
                size="100"
                style={{fontSize:'14px'}}
                />
            </div>

            
            {state.students.map((student) =>(
               ((name === "" || (name !== "" && ((student.firstName +' '+student.lastName).toLowerCase().includes(name.toLowerCase())))) &&
                (tag === "" || (tag !== "" && student.hasOwnProperty("tags") && (student.tags).join().toLowerCase().includes(tag.toLowerCase())))  ?
              
                <div key={student.id}>



<div className="student-card">
            <div className="img-circle">
                <img
                    alt={student.firstName+` `+student.lastName}
                    src={student.pic}
                />
            </div>
            <div>
                <ul > 
                <span className="header-name">{student.firstName+` `+student.lastName}</span>
                    <li>Email : {student.email}</li>
                    <li>Company : {student.company}</li>
                    <li>Skils : {student.skill}</li>
                    <li>Average : {calcGradeAverage(student)}%</li>
                    {student.tags ?
                        <li className="card-body bg-light">Tags : {(student.tags).join(', ')}</li>
                    : ''}
                    
                </ul>
                {detail ?
                    (<ul>
                        {student.grades.map((grade, index) => (
                            <li>Test {index+1} : {grade}%</li>
                        ))}
                    </ul>)
                 : ''}

               <form>
                <input
                    value={tagname}
                    name="tag"
                    id="tag"
                   onChange={(event) => setTagname(event.target.value)}
                    type="text"
                    placeholder="Add a Tag"
                    size="20"
                    style={{fontSize:'14px'}}
                />
                <button
                    type="submit"
                    onClick={() =>{
                        console.log("StudentCard : dispatched UPDATE_TAG");
                        return dispatch({
                            type: UPDATE_TAG,
                            payload: {id: student.id, tag: tagname},
                        });
                    }}

                >Add Tag</button>
              </form>


            </div>
            <button onClick={(event) => setDetail(!detail)}
                style={{
                    display: 'inline-flex',
                    fontFamily: 'helvetica',
                    flexDirection: 'row',
                    alignItems: 'flex-right',
                    justifyContent: 'flex-end',
                    border:'none',
                    fontSize : '3rem',
                    fontWeight : 'bold'
                   
                  }}
            >{detail ? (<span>&#8722;</span>) : (<span>&#43;</span>)}</button>
        </div>



                
                </div>
                 : "")
            ))}
        </div>
            )
            : (state.isLoading ? <div>Loading ...</div> : <div>No student data available</div>))
    )

}

export default StudentList;