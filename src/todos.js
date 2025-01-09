import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo = { text: action.text, id: Date.now() };
      return [newTodo, ...state];
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);

    default:
      return state;
  }
};

const addTodo = (text) => {
  todoStore.dispatch({ type: "ADD_TODO", text });
};

const deleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  todoStore.dispatch({ type: "DELETE_TODO", id });
};
const todoStore = createStore(reducer);

todoStore.subscribe(() => console.log(todoStore.getState()));

const paintTodo = () => {
  const todos = todoStore.getState();
  ul.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DELETE";
    btn.addEventListener("click", deleteToDo);
    li.id = todo.id;
    li.innerText = todo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

todoStore.subscribe(paintTodo);

const onSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  input.value = "";
  addTodo(todo);
};

form.addEventListener("submit", onSubmit);
