const todoForm= document.querySelector('form');
const todoInput =  document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');
const todoDeleteItem = document.querySelector('delete-button');


//Get Todos from Local Storage
const getTodos = () =>{
    const todos=  localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}

//Delete todo
const deleteTodoItem = (todoIndex) =>{
    allTodos = allTodos.filter((_,i)=> i !== todoIndex);
    saveTodos();
    updateTodoList();
}

//Create a Todo
const createTodoItem = (todo,todoIndex) =>{
    const todoId =  "todo-"+todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className ="todo";
    todoLI.innerHTML = `<input type="checkbox" id="${todoId}">
                <label class="custom-checkbox" for="${todoId}">
                    <svg  fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label for="${todoId}" class="todo-text">${todoText}</label>
                <button class="edit-button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                </button>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>`;
    const deleteButton =  todoLI.querySelector('.delete-button');
    deleteButton.addEventListener('click',()=>{
        deleteTodoItem(todoIndex);
    })
    const checkbox =  todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked =  todo.completed;

    const editButton =   todoLI.querySelector('.edit-button');    
    
    editButton.addEventListener("click",()=>{
        todoLI.innerHTML = `<input type="checkbox" id="${todoId}">
        <label class="custom-checkbox" for="${todoId}">
            <svg  fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <input for="${todoId}" id="input-text" value=${todoText}></input>
        <button class="save-button">
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160v212q-19-8-39.5-10.5t-40.5.5v-169L647-760H200v560h240v80H200Zm0-640v560-560ZM520-40v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-260L643-40H520Zm300-263-37-37 37 37ZM580-100h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19ZM240-560h360v-160H240v160Zm240 320h4l116-115v-5q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/></svg>
        </button>`;

        const saveButton = todoLI.querySelector('.save-button');
        const editedText =  todoLI.querySelector('#input-text');
        saveButton.addEventListener("click",()=>{
        allTodos[todoIndex].text = editedText.value;
        saveTodos();
        todoLI.innerHTML = `<input type="checkbox" id="${todoId}">
        <label class="custom-checkbox" for="${todoId}">
            <svg  fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <input for="${todoId}" id="input-text" value=${ allTodos[todoIndex].text}></input>
        <button class="edit-button">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
        </button>
        <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>`;
        
        })

    })

    

    return todoLI;
}

//Update todo
const updateTodoList = () =>{
    todoListUL.innerHTML = "";
    allTodos.forEach((todo,todoIndex)=>{
        todoItem =  createTodoItem(todo,todoIndex);
        todoListUL.append(todoItem);
    })
}


//Get all todos
let allTodos = getTodos();  
updateTodoList();

//Save todo
const saveTodos = () =>{
    const todoJson =  JSON.stringify(allTodos);
    localStorage.setItem("todos",todoJson);
}

//Add a ToDo
const addTodo = () =>{
    const todoText =  todoInput.value.trim();
    if(todoText.length > 0){
        const todoObject  =  {
            text : todoText,
            completed : false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value="";
    }
}

todoForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    addTodo();
})



