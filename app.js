// اختيار العناصر
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// تحميل المهام من localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// إضافة مهمة جديدة
addTaskButton.addEventListener('click', addTask);

// إضافة مهمة جديدة
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const taskItem = createTaskElement(taskText);
  taskList.appendChild(taskItem);

  saveTaskToLocalStorage(taskText);
  taskInput.value = ''; // إعادة تعيين حقل الإدخال
}

// إنشاء عنصر مهمة
function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </div>
  `;

  li.querySelector('.edit').addEventListener('click', editTask);
  li.querySelector('.delete').addEventListener('click', deleteTask);

  return li;
}

// تعديل مهمة
function editTask(e) {
  const taskItem = e.target.closest('.task-item');
  const taskText = taskItem.querySelector('span').textContent;
  const newTaskText = prompt('Edit your task:', taskText);

  if (newTaskText !== null && newTaskText.trim() !== '') {
    taskItem.querySelector('span').textContent = newTaskText.trim();
    updateTaskInLocalStorage(taskText, newTaskText.trim());
  }
}

// حذف مهمة
function deleteTask(e) {
  const taskItem = e.target.closest('.task-item');
  const taskText = taskItem.querySelector('span').textContent;

  taskItem.remove();
  deleteTaskFromLocalStorage(taskText);
}

// حفظ المهمة في localStorage
function saveTaskToLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// حذف المهمة من localStorage
function deleteTaskFromLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// تحديث المهمة في localStorage
function updateTaskInLocalStorage(oldTaskText, newTaskText) {
  let tasks = getTasksFromLocalStorage();
  const taskIndex = tasks.indexOf(oldTaskText);
  if (taskIndex > -1) {
    tasks[taskIndex] = newTaskText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// الحصول على المهام من localStorage
function getTasksFromLocalStorage() {
  return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

// تحميل المهام عند تحميل الصفحة
function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(taskText => {
    const taskItem = createTaskElement(taskText);
    taskList.appendChild(taskItem);
  });
}
