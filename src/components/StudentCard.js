import React, { useReducer, useState } from 'react';    ///useReducer, 
//import '../styles/student.css';

// import type variables
import { UPDATE_TAG } from '../utils/actions';
// Import reducer from utils folder
import reducer from '../utils/reducers';

import { useStudentContext } from '../utils/StudentContext';

function StudentCard({ student }){
    const initialState = useStudentContext();
    const [dispatch] = useReducer(reducer, initialState);

    const [detail, setDetail] = useState(false);
    const [tagname, setTagname] = useState('');
    const fullName = student.firstName+` `+student.lastName;
    const calcGradeAverage = (student) => {
        const grades = student.grades;
        let gtot = 0
        for(let i=0; i<grades.length; i++){
            gtot += parseInt(grades[i]);
        }
        const gavg = gtot/grades.length;
        return gavg;
      };
    const gavg = calcGradeAverage(student);
    const studentid = student.id;
    console.log("student :" + student);
    
    /*const handleTagUpdate = (e) =>{
        e.preventDefault();
        if(tagname){
            tagUpdate(studentid,tagname);
            setTagname('');
        }
    }*/

    return(
        <div className="student-card">
            <div className="img-circle">
                <img
                    alt={fullName}
                    src={student.pic}
                />
            </div>
            <div>
                <ul > 
                <span className="header-name">{fullName}</span>
                    <li>Email : {student.email}</li>
                    <li>Company : {student.company}</li>
                    <li>Skils : {student.skill}</li>
                    <li>Average : {gavg}%</li>
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
                            payload: {id: studentid, tag: tagname},
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
    )

}

export default StudentCard;
