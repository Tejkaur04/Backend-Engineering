const form = document.getElementById("addtask");
const filterbuttons = document.getElementById("filter");
const todoContainer = document.getElementById("todo-container");

getAllTodos(); //when script load this will run

form.addEventListener("submit",async(e)=>{
    e.preventDefault(); //stops page refresh
    // const list = form.children   return list of child elements
    const input = form.children[0];
    const task = input.value ; //input value of what user have written
    const res = await axios.post("http://localhost:4000/addTask",{task});
    input.value = "" //input will get empty after todo is created
    getAllTodos();

})

async function filterTodo(filterName){
    let res = await axios.get("http://localhost:4000/filter",{
        params:{
            filterName:filterName
        }
    })
    renderTools(res.data.todos);
}

async function clearCompleted(){
    let res = await axios.delete("  ")
}

filterbuttons.addEventListener("click",(e) => {
    const button= e.target.id;
    // console.log(button);
    if(!button) return;
    if(button == "all"){
        e.target.className = "active";
        filterTodo("all");
    }
    if(button == "active"){
        e.target.className = "active";
        filterTodo("active");
    }
    if(button == "completed"){
        e.target.className = "active";
        filterTodo("completed");
    }
    
    
});

async function getAllTodos(){
    let res = await axios.get("http://localhost:4000/all");
    let todos = res.data.todos;
    renderTools(todos);
}

function renderTools(todos){
    todoContainer.innerHTML=""; //sirf new data will get added , will prevent duplicacy
    for(let todo of todos){
        const div = document.createElement("div");
        div.className = "todo";
        div.innerHTML = `<h4>${todo.task}</h4>
        <div class="cont" id=${todo._id}>
        <button class="status">${todo.status?"Undo":"Complete"}</button> 
        <button class="delete">Delete</button>
        </div>`;
        todoContainer.prepend(div);
    }
}

// const todos = document.getElementsByClassName("todo");  this will not work as todo is created by virtual DOM manupulation

todoContainer.addEventListener("click",async(e)=>{
    const btnClass = e.target.className;
    if(btnClass !="delete" && btnClass !="status") return;
    const todoId = e.target.parentElement.id;
    if(btnClass=="delete"){
        await axios.delete(`http://localhost:4000/deleteTask/${todoId}`);
    }

    if(btnClass=="status"){
        await axios.put(`http://localhost:4000/updateTask/${todoId}`);
    }
    getAllTodos(); //to refresh

})