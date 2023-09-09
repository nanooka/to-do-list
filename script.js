const plus = document.querySelector(".plus");
const container = document.querySelector(".container");
const list = document.querySelector(".list-item");
const newTodo = document.querySelector(".add-new-todo");
const newInput = document.querySelector(".new-input");
const addBtn = document.querySelector(".add-btn");
const label = list.querySelector("label");

const toDoList = [];

const storedTodos = localStorage.getItem("todos");
if (storedTodos) {
  const parsedTodos = JSON.parse(storedTodos);
  toDoList.push(...parsedTodos);

  parsedTodos.forEach((todoText) => {
    const listItem = createTodoItem(todoText);
    container.appendChild(listItem);
  });
}

plus.addEventListener("click", (event) => {
  event.preventDefault();
  newTodo.classList.add("visible");
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (newInput.value.trim() !== "") {
    toDoList.push(newInput.value);

    const listItem = createTodoItem(newInput.value);
    container.appendChild(listItem);

    updateLocalStorage();

    newInput.value = "";
    newTodo.classList.remove("visible");
    newTodo.classList.add("hidden");
  }
});

function createTodoItem(text) {
  const listItem = document.createElement("div");
  listItem.className = "list-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList = "checkbox";

  const styledCheckbox = document.createElement("div");
  styledCheckbox.className = "styled-checkbox";

  const label = document.createElement("label");
  label.textContent = text;

  const remove = document.createElement("button");
  remove.classList = "remove";
  remove.textContent = "Delete";

  listItem.append(checkbox, label, remove, styledCheckbox);

  remove.addEventListener("click", (e) => {
    e.preventDefault();
    const index = toDoList.indexOf(text);
    if (index !== -1) {
      toDoList.splice(index, 1);
      updateLocalStorage();
    }
    listItem.remove();
  });

  return listItem;
}

function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(toDoList));
}
