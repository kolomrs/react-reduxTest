import {createAction, createSlice} from "@reduxjs/toolkit";
import todosService from "../service/todos.service";

const initialState = []


const taskSlice = createSlice({
    name: 'task', initialState, reducers: {
        recived(state, action) {
            return action.payload
        },
        update(state, action) {
            const elementIndex = state.findIndex(el => el.id === action.payload.id)
            state[elementIndex] = {...state[elementIndex], ...action.payload}
        },
        remove(state, action) {
            return state.filter(({id}) => id !== action.payload.id)
        }
    }
})
const {actions, reducer: taskReducer} = taskSlice
const {update, remove, recived} = actions

const taskRequested = createAction('task/requested')
const taskRequestedFailed = createAction('task/requestFailed')

export const getTasks = () => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(recived(data))
    } catch (e) {
        dispatch(taskRequestedFailed())
    }
}

export const completeTask = (id) => (getState, dispatch) => {
    dispatch(update({id, completed: true}))
}


export function titleChange(id) {
    return update({id, title: `New title for ${id}`})
}

export function taskDelete(id) {
    return remove({id})
}


export default taskReducer