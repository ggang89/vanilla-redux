import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { text: action.text, id:Date.now() }];
    case "DELETE_TODO":
      return [];

    default:
      return state;
  }
};

const todoStore = createStore(reducer);

todoStore.subscribe(() => console.log(todoStore.getState()));

const paintTodo = () => {
  const todos = todoStore.getState();
  todos.forEach(todo => {
    
    const li = document.createElement("li");
    li.id = todo.id;
    li.innerText = todo.text;
    ul.appendChild(li);
  })

};

todoStore.subscribe(paintTodo);


const addTodo = (text) => {
  todoStore.dispatch({ type: "ADD_TODO", text });
}

const onSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  input.value = "";
  addTodo(todo);  
};

form.addEventListener("submit", onSubmit);
