//import { useReducer } from 'react';
import { UPDATE_TAG } from './actions';

export default function reducer(state, action){
    switch (action.type){
        case UPDATE_TAG:{
            console.log('UPDATE_TAG dispatched');
            

            const selIndex = state.students.findIndex((student) => student.id === action.payload.id);
            const selStudent = state.students[selIndex];
            const tags = (selStudent.tags && selStudent.tags !== "" ? selStudent.tags:[]);
            tags.push(action.payload.tag);
            selStudent.tags = tags;
            const copyStudents = [...state.students];
            copyStudents[selIndex] = selStudent;
            //setState(copyStudents);
            return {
                ...state,
                students: copyStudents,
            };
        }
        default:
            return state;
    }
}
/*export function studentReducer(initialState){
    return useReducer(reducer, initialState);
}*/