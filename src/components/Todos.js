import React, { useState, useEffect } from 'react';




    const getTodosFromLocal = () => {

        let list = localStorage.getItem('items');

        if(list){
            return JSON.parse(localStorage.getItem('items'))
        }
        else{
            return [];
        }
    }

function Todos() {
    
    const [todo, setTodo] = useState('');
    const [todoList, setTodoList] = useState(getTodosFromLocal());


    // fetching the data from localStorage
    
    // adding a todo
    const addTodo = () => {
    
        if(!todo){
            window.alert("Please add a todo");
        }
        else{

            const newTodoData = { id : new Date().getTime().toString(), name: todo }
            setTodoList([...todoList, newTodoData]);
            setTodo("");
            // console.log(todoList)
        }
    
    }

    // deleting a todo

   const deleteTodo = (id) => {

        // console.log(id);
        
        const updatedTodoList = todoList.filter((cval) => {

            return id !== cval.id;
        })

        setTodoList(updatedTodoList);
   }

   // adding a data to local storage

   useEffect(() => {

    localStorage.setItem("items", JSON.stringify(todoList));

   },[todoList])

  

    return (

        <div className='mainDiv'>
            <h1>Felix TODO's</h1>
            <div className='addInput'>
                <input type={"text"} 
                value={todo}
                placeholder={"Add your Todo's Here"}
                onChange={(e) => setTodo(e.target.value)}
                
                 />

                <button onClick={addTodo}><i className="fas fa-plus"></i></button>
            </div>
            <div className='todoLisOuter'>

                {
                 

                    todoList.map((cval) => {

                        return(
                            <>
                                <div className='todosList' key={cval.id}>
                                    <ul>
                                        <li>{cval.name}</li>
                                        <i className="fa-sharp fa-solid fa-trash"  onClick={() => {deleteTodo(cval.id)}}></i>
                                        
                                        
                                    </ul>
                                </div>
                            </>
                        );
                    })
                    }
                
            </div>
        </div>


    )
}

export default Todos;