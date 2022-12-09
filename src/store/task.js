//Import reduxjs toolkit
import { createSlice } from "@reduxjs/toolkit";

//Define and initialise initial state 
/*************** Note for Reviwer *******************
Initial state provided in task description is confusing so 
quesiton has been posted on https://discord.com/channels/1034069063888015380/1036343149313937588
At the time of developing this solution it is not clear that 
why such a complicated way to maintain state has been asked when
it can be done in a clean, clear and simple way.
****************************************************/
const initialState = [
    {
        id: 1,
        data:
        {
            content: 'Content 1',
            completed: false
        }
    }
]

//Create task slice to handle state of task globally using redix
export const taskSlice = createSlice({
    // This is the name of the slice of state that we will implement in our
    // empty store.
    name: "task",

    // This is the initial state for slice of task. 
    initialState: initialState,

    // As indicated before. The reducer is used to manipulate the initial
    // state or current state.
    reducers: {
        //It adds new task to state by first creating an object containing
        //all the information about task and pushing it to state
        addTask: (state,action) => {
            let newTask = {
                id: Math.floor(Math.random() * 1000),
                data:
                {
                    content: action.payload,
                    completed: false
                }
            }
            state.push(newTask)
        },
        //It loops through all the tasks in state and deletes it
        //only if id of task matches with the id in the payload
        deleteTask: (state,action) => {
            let i = 0
            state.forEach((item)=>{
                if(item.id === action.payload){
                    state.splice(i,1)
                }
                i+=1
            })            
        },
        //It loops through all the tasks in state and marks it complete
        //id of task matches with the id in the payload
        completeTask: (state,action) =>{
            let i = 0
            state.forEach((item)=>{
                if(item.id === action.payload){
                    state[i].data.completed = true
                }
                i+=1
            })              
        },
        //It loops through all the tasks in state and updates only if 
        //id of task matches with the id in the payload
        updateTask: (state,action) => {
            let i = 0
            state.forEach((item)=>{
                if(item.id === action.payload.taskId){
                    state[i].data.content = action.payload.userInput
                }
                i+=1
            })
        },
    },
});

// Action creators are generated for each case reducer function.
export const { addTask,deleteTask,completeTask,updateTask } = taskSlice.actions;

// Exporting the reducer function that needs to be implemented into store.
export default taskSlice.reducer;