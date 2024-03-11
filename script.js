document.addEventListener('DOMContentLoaded', () => {  /*!LOADING TASKS TO PAGE WHEN PARSED*/
    loadTasks();
});

const clearFormBtn = document.getElementById('clearFormBtn');  /*to the function clearForm*/
clearFormBtn.addEventListener('click', clearForm);

//THE SAVE BUTTON THAT WAS NOTE IN THIS CODE
const saveTaskBtn = document.getElementById('saveTaskBtn');
saveTaskBtn.addEventListener('click', saveTask);

function saveTask() {                                        /*to save the tasks*/
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.getElementById('timeInput');

    const task = taskInput.value;
    const date = dateInput.value;
    const time = timeInput.value;

    if (task.trim() === '' || date === '' || time === '') {  /*to make sure filling form*/
        alert('Please fill in all fields');
        return;
    }

    const taskObject = { task, date, time };                        /*add tasks to page n clear form*/
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.push(taskObject);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    addTaskToPage(taskObject);
    clearForm();
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        if (task.completed) {
            // Apply strikethrough to completed tasks
            const note = createTaskNoteElement(task);
            taskList.appendChild(note);
            toggleStrikethrough(note.querySelector('p'));
        } else {
            addTaskToPage(task);
        }
    });
}

// NOTES maybe FROM HERE

function addTaskToPage(task) {
    const taskList = document.getElementById('taskList');

/*THE NOTES*/
    const note = createTaskNoteElement(task);   /*to the function*/           

    taskList.appendChild(note);
    fadeIn(note);
}

//THE STRIKE THROUGH X BUTTON

function toggleStrikethrough(element) {
    element.classList.toggle('strikethrough');
}

function createTaskNoteElement(task) {
    const note = document.createElement('div');
    note.classList.add('task-note');

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '&#10006;';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        deleteTask(note, task);
    });

    const strikethroughButton = document.createElement('button');
    strikethroughButton.innerHTML = '&#10008;';
    strikethroughButton.classList.add('strikethrough-button');
    strikethroughButton.style.display = 'none'; // Hide initially
    strikethroughButton.addEventListener('click', () => {
        toggleStrikethrough(taskText);
    });

    note.appendChild(deleteButton);
    note.appendChild(strikethroughButton);

    const taskText = document.createElement('p');
    taskText.textContent = task.task;

    const dateTime = document.createElement('p');
    dateTime.textContent = `${task.date} - ${task.time}`;
    dateTime.classList.add('date-time');

    note.appendChild(taskText);
    note.appendChild(dateTime);

    // Show/hide strikethrough button on mouseover/mouseout
    note.addEventListener('mouseover', () => {
        strikethroughButton.style.display = 'inline-block';
    });

    note.addEventListener('mouseout', () => {
        strikethroughButton.style.display = 'none';
    });

    return note;
}


//creates task notes element end here

function deleteTask(note, task) {      /*deleting the notes*/
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(t => JSON.stringify(t) !== JSON.stringify(task));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    note.remove();
}

function fadeIn(element) {     /*the notes appearing in fade in*/
    element.style.opacity = 0;

    const fadeInInterval = setInterval(() => {
        if (element.style.opacity < 1) {
            element.style.opacity = parseFloat(element.style.opacity) + 0.1;
        } else {
            clearInterval(fadeInInterval);
        }
    }, 100);
}

// THE NOTES maybe STOP HERE

function clearForm() {
    document.getElementById('taskInput').value = '';
    document.getElementById('dateInput').value = '';
    document.getElementById('timeInput').value = '';
}

