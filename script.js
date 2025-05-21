const elems = document.querySelectorAll(".elem");
const fullElems = document.querySelectorAll(".full_elem");
const closeButtons = document.querySelectorAll(".close");

const taskInput = document.querySelector(".inp_task");
const detailInput = document.querySelector(".inp_details");
const importantCheckbox = document.querySelector("#checkbox");
const todoForm = document.querySelector("#todoForm");
const rightContainer = document.querySelector(".right");

let todos = [];

// Show the full page on card click
elems.forEach((elem) => {
  elem.addEventListener("click", () => {
    const id = parseInt(elem.id);
    fullElems[id].style.display = "block";
  });
});

// Close the full page
closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = parseInt(btn.id);
    fullElems[id].style.display = "none";
  });
});

// Load existing todos from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("task");
  if (saved) {
    todos = JSON.parse(saved);
    todos.forEach(addTodoToDOM);
  }
});

// Handle form submission
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = taskInput.value.trim();
  const detail = detailInput.value.trim();
  const isImportant = importantCheckbox.checked;

  if (!task) return;

  const todo = {
    task,
    detail,
    isImportant,
  };

  todos.push(todo);
  localStorage.setItem("task", JSON.stringify(todos));

  addTodoToDOM(todo);

  // Reset form
  taskInput.value = "";
  detailInput.value = "";
  importantCheckbox.checked = false;
});

// Add todo to DOM
function addTodoToDOM(todo) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "todo_tasks";

  taskDiv.innerHTML = `
    <div class="rapper">
      <h3>${todo.task} 
        <span class="imp" style="display: ${
          todo.isImportant ? "inline" : "none"
        };">imp</span>
      </h3>
      <div class="btn todoSetAsCom">Set as completed</div>
    </div>
    <p class="details">
      ${todo.detail ? "Details: " + todo.detail : "No details on this Task"}
    </p>
  `;

  taskDiv.querySelector(".todoSetAsCom").addEventListener("click", () => {
    taskDiv.remove(); // Remove task from UI
    todos = todos.filter((t) => t.task !== todo.task); // Optional: remove from memory
    localStorage.setItem("task", JSON.stringify(todos));
  });

  rightContainer.appendChild(taskDiv);
}
