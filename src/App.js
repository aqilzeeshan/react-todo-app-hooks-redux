// Importing the useSelector and useDispatch functions to select the required
// slices of state.
import { useSelector, useDispatch } from "react-redux";
// Importing the action creators we’ve implemented in our counter reducer.
import { addTask,deleteTask,completeTask,updateTask } from "./store/task";
// Importing the App.css file to add styling to our App component
import "./App.css";
import { useState } from "react";

function App() {

  //create local state for user input text field
  const [userInput, setUserInput] = useState("");
  //create local state for editing
  const [isEdit, setIsEdit] = useState(false)
  //create local state for id of task being edited
  const [taskId, setTaskId] = useState(0)
   // The useSelector function allows us to find the needed slices of state we require.
  const todoList = useSelector((state) => state);
  // Initiating the dispatch variable using the useDispatch function.
  const dispatch = useDispatch();
  // Event handler for submit buttion

  const handleSubmit = (event) => {
    //prevent default behaviour of form submission
    event.preventDefault();
    //dispatch user input to addTask() in reducer
    dispatch(addTask(userInput));
    //reset user input text field to "" 
    setUserInput("")
  }; 

  //It handles updates to existing task
  //by dispatching user input and task id to updateTask() in reducer
  const handleUpdate = (event) => {
    //prevent default behaviour of form submission
    event.preventDefault();
    dispatch(updateTask({userInput,taskId}))
    //set isEdit to false so user can add new tasks
    setIsEdit(false)
    //set user input field to blank
    setUserInput("")
  }

  return (
    <div className="App">
      {
      //isEdit is used to show update form 
      //If isEdit is true then show update form
      //If isEdit is false then show form to add new task
      isEdit?
        //Form to update existing task
        <form className="Form" onSubmit={handleUpdate}>
          {/*User input text field to update existing Task*/}
          <label>
          Update Task:
          <input
            type="text"
            name="update"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
          />
          </label>
          <button type="submit">Save</button>
        </form>
      :
        //Form to add new task
        <form className="Form" onSubmit={handleSubmit}>
          {/*User input text field to get new Task*/}
          <label>
          Add Task:
          <input
            type="text"
            name="add"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
          />
          </label>
          <button type="submit">Submit</button>
        </form>
      }
      {
        //loop through all the tasks in the array and show each task with
        //option to delete, update or mark it as complete
        todoList.task.map(item=>{
          return (
            <div className="container">
              <div className={item.data.completed?"options strike":"options"}>{item.data.content}</div>
              <div className="options"><button type="text" name="delete" onClick={() => dispatch(deleteTask(item.id))}>Delete</button></div>
              <div className="options"><button type="text" name="update" onClick={()=>{setIsEdit(true);setUserInput(item.data.content);setTaskId(item.id);}}>Update</button></div>
              <div className="options"><button type="text" name="complete" onClick={() => dispatch(completeTask(item.id))}>Complete</button></div>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
