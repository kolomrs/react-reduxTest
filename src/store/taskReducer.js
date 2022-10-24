import {taskDelete, taskUpdate} from "./actionTypes";

export function taskReducer(state = [], action) {
    switch (action.type) {
        case taskUpdate: {
            const newArray = [...state]
            const elementIndex = newArray.findIndex(el => el.id === action.payload.id)
            newArray[elementIndex] = {...newArray[elementIndex], ...action.payload}
            return newArray
        }
        case taskDelete: {
            return state.filter(({id}) => id !== action.id)
        }

        default:
            return state
    }
}