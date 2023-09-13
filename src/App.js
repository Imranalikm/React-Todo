import React, {useState, useEffect} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckAll} from 'react-icons/bs';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App () {
  const [allTodos, setAllTodos] = useState ([]);
  const [newTodoTitle, setNewTodoTitle] = useState ('');
  const [newDescription, setNewDescription] = useState ('');
  const [completedTodos, setCompletedTodos] = useState ([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState (false);

  const handleAddNewToDo = () => {
    if (newTodoTitle.trim() !== '' && newDescription.trim() !== '') {
     
      const isDuplicate = allTodos.some(
        (todo) =>
          todo.title.toLowerCase() === newTodoTitle.toLowerCase() &&
          todo.description.toLowerCase() === newDescription.toLowerCase()
      );
  
      if (!isDuplicate) {
        let newToDoObj = {
          title: newTodoTitle,
          description: newDescription,
        };
  
        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newToDoObj);
  
        setAllTodos(updatedTodoArr);
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
        setNewDescription('');
        setNewTodoTitle('');

        toast.success('Todo added successfully', {position: toast.POSITION.TOP_CENTER,
          autoClose:2000,
        });
      } else {
        
        toast.warning('A todo with the same Title and Description already exists', {position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    } else {
      toast.warning('Please fill in both Title and Description fields', {position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };
  
  

  useEffect (() => {
    let savedTodos = JSON.parse (localStorage.getItem ('todolist'));
    let savedCompletedToDos = JSON.parse (
      localStorage.getItem ('completedTodos')
    );
    if (savedTodos) {
      setAllTodos (savedTodos);
    }

    if (savedCompletedToDos) {
      setCompletedTodos (savedCompletedToDos);
    }
  }, []);

  const handleToDoDelete = index => {
    
    let updatedTodoArr = [...allTodos];
  
   
    updatedTodoArr.splice(index, 1);
  
    
    setAllTodos(updatedTodoArr);
  
    
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
  };
  

  const handleCompletedTodoDelete = index => {
   
    let updatedCompletedTodos = [...completedTodos];
  
 
    updatedCompletedTodos.splice(index, 1);
  
    
    setCompletedTodos(updatedCompletedTodos);
  
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
  };
  

  const handleComplete = index => {
    const date = new Date();
    const finalDate= `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    
    let filteredTodo = {
      ...allTodos[index],
      completedOn: finalDate,
    };



    let updatedCompletedList = [...completedTodos, filteredTodo];
    console.log (updatedCompletedList);
    setCompletedTodos (updatedCompletedList);
    localStorage.setItem (
      'completedTodos',
      JSON.stringify (updatedCompletedList)
    );
    

    handleToDoDelete (index);
  };

  return (
    <div className="App">
     
      <h1>My Todos </h1>

      <ToastContainer />

      <div className="todo-wrapper">

        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              value={newTodoTitle}
              onChange={e => setNewTodoTitle (e.target.value)}
              placeholder="What's the title of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={e => setNewDescription (e.target.value)}
              placeholder="What's the description of your To Do?"
            />
          </div>
          <div className="todo-input-item">
            <button
              className="primaryBtn"
              type="button"
              onClick={handleAddNewToDo}
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn1 ${isCompletedScreen === false && 'active'}`}
            onClick={() => setIsCompletedScreen (false)}
          >
            To Do
          </button>
          <button
            className={`secondaryBtn2 ${isCompletedScreen === true && 'active'}`}
            onClick={() => setIsCompletedScreen (true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">

          {isCompletedScreen === false &&
            allTodos
            .map ((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                </div>
                <div>
                  <AiOutlineDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleToDoDelete (index)}
                  />
                  <BsCheckAll
                    title="Completed?"
                    className=" check-icon"
                    onClick={() => handleComplete (index)}
                  />
                </div>
              </div>
            ))}

          {isCompletedScreen === true &&
            completedTodos.map ((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p id="complete"> <i>Completed at: {item.completedOn}</i></p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleCompletedTodoDelete (index)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;