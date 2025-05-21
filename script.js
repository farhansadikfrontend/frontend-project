// pageSwitchingAndTodoPage
function pageSwitchingAndTodoPage() {
  const cardElems = document.querySelectorAll(".elem");
  const fullElems = document.querySelectorAll(".full_elem");
  const closeButtons = document.querySelectorAll(".close");

  const taskInput = document.querySelector(".inp_task");
  const detailInput = document.querySelector(".inp_details");
  const importantCheckbox = document.querySelector("#checkbox");
  const todoForm = document.querySelector("#todoForm");
  const todoContainer = document.querySelector(".right");

  let todos = [];

  // Utility: Save todos to localStorage
  const saveTodos = () => {
    localStorage.setItem("task", JSON.stringify(todos));
  };

  // Utility: Create unique ID
  const generateId = () => Date.now().toString();

  // Add todo to DOM
  const addTodoToDOM = (todo) => {
    const todoElement = document.createElement("div");
    todoElement.className = "todo_tasks";
    todoElement.dataset.id = todo.id;

    todoElement.innerHTML = `
      <div class="rapper">
        <h3>
          ${todo.task}
          <span class="imp" style="display: ${
            todo.isImportant ? "inline" : "none"
          };">imp</span>
        </h3>
        <div class="btn todoSetAsCom">Set as completed</div>
      </div>
      <p class="details">
        ${todo.detail ? `Details: ${todo.detail}` : "No details on this Task"}
      </p>
    `;

    todoElement.querySelector(".todoSetAsCom").addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      saveTodos();
      todoElement.remove();
    });

    todoContainer.appendChild(todoElement);
  };

  // Load todos from localStorage
  const loadTodos = () => {
    const stored = localStorage.getItem("task");
    if (stored) {
      todos = JSON.parse(stored);
      todos.forEach(addTodoToDOM);
    }
  };

  // Handle card open
  cardElems.forEach((card) => {
    card.addEventListener("click", () => {
      const index = parseInt(card.id);
      if (fullElems[index]) {
        fullElems[index].style.display = "block";
      }
    });
  });

  // Handle card close
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.id);
      if (fullElems[index]) {
        fullElems[index].style.display = "none";
      }
    });
  });

  // Handle form submission
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = taskInput.value.trim();
    const detail = detailInput.value.trim();
    const isImportant = importantCheckbox.checked;

    if (!task) return;

    const newTodo = {
      id: generateId(),
      task,
      detail,
      isImportant,
    };

    todos.push(newTodo);
    saveTodos();
    addTodoToDOM(newTodo);

    // Reset form
    taskInput.value = "";
    detailInput.value = "";
    importantCheckbox.checked = false;
  });

  // Initialize on page load
  window.addEventListener("DOMContentLoaded", loadTodos);
}
pageSwitchingAndTodoPage();

// dailyPlannerPage
function dailyPlannerPage() {
  const LOCAL_STORAGE_KEY = "plannerData";
  const START_HOUR = 4;
  const TOTAL_SLOTS = 24;

  // Convert 24-hour time to 12-hour format with AM/PM
  const to12HourFormat = (hour) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12}:00 ${suffix}`;
  };

  // Generate time slots from 4:00 AM to 3:00 AM next day
  const generateTimeSlots = () =>
    Array.from({ length: TOTAL_SLOTS }, (_, i) => {
      const start = (i + START_HOUR) % 24;
      const end = (i + START_HOUR + 1) % 24;
      return `${to12HourFormat(start)} - ${to12HourFormat(end)}`;
    });

  // Render the planner
  const renderPlanner = () => {
    const container = document.querySelector(".daily_planner_container");
    const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
    const timeSlots = generateTimeSlots();

    container.innerHTML = timeSlots
      .map(
        (label, index) => `
        <div class="plan">
          <span>${label}</span>
          <input 
            type="text" 
            class="inputPlan" 
            data-index="${index}" 
            value="${savedData[index] || ""}" 
            placeholder="..." 
          />
        </div>
      `
      )
      .join("");

    // Handle input updates
    document.querySelectorAll(".inputPlan").forEach((input) => {
      input.addEventListener("input", () => {
        savedData[input.dataset.index] = input.value;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedData));
      });
    });
  };

  // Initialize
  renderPlanner();
}
dailyPlannerPage();
