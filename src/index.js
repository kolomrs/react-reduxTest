import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import configureStore from "./store/store";
import {titleChange, taskDelete, completeTask, getTasks} from './store/task'

const store = configureStore()

const App = (params) => {
    const [state, setState] = useState(store.getState())

    useEffect(() => {
        store.dispatch(getTasks())
        store.subscribe(() => {
            setState(store.getState())

        })
    }, [])

    const changeTitle = (taskId) => {
        store.dispatch(titleChange(taskId))

    }
    const deleteTask = (taskId) => {
        store.dispatch(taskDelete(taskId))
    }


    return <><h1>App</h1>

        <ul>{state.map(el => <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => store.dispatch(completeTask(el.id))}>Completed
            </button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button onClick={() => deleteTask(el.id)}>Delete</button>
            <hr/>
        </li>)}
        </ul>
    </>
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
    <App/>
</React.StrictMode>);

