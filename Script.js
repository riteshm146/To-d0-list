const taskList = document.getElementById("task-list");
const totalTasksEl = document.getElementById("total-tasks");
const completedTasksEl = document.getElementById("completed-tasks");
const progressEl = document.getElementById("progress");

function updateSummary() {
  const totalTasks = taskList.children.length;
  const completedTasks = document.querySelectorAll(".completed").length;

  totalTasksEl.textContent = totalTasks;
  completedTasksEl.textContent = completedTasks;
  progressEl.style.width = totalTasks
    ? `${(completedTasks / totalTasks) * 100}%`
    : "0%";
}

function addTask() {
  const taskName = document.getElementById("task-name").value;
  const category = document.getElementById("category").value;
  const deadline = document.getElementById("task-deadline").value;

  if (!taskName) {
    alert("Task name cannot be empty");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `${taskName} <span class="category">${category}</span> <span class="deadline">${deadline}</span> <span onclick="removeTask(this)">✖</span>`;
  li.onclick = () => {
    li.classList.toggle("completed");
    updateSummary();
  };

  taskList.appendChild(li);
  updateSummary();
  saveTasks();
}

function removeTask(element) {
  element.parentElement.remove();
  updateSummary();
  saveTasks();
}

function filterTasks(category) {
  const tasks = taskList.children;
  for (const task of tasks) {
    if (category === "all" || task.querySelector(".category").textContent === category) {
      task.style.display = "";
    } else {
      task.style.display = "none";
    }
  }
}

function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
  taskList.innerHTML = localStorage.getItem("tasks") || "";
  updateSummary();
}

loadTasks();
