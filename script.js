document.addEventListener("DOMContentLoaded", () => {
    
    const addButton = document.getElementById("add-task-btn");
    const taskInput  = document.getElementById("task-input");
    const taskList   = document.getElementById("task-list");

    
    let tasks = [];


    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }


    function renderTasks() {
       
        taskList.innerHTML = '';

        
        tasks.forEach((taskText, index) => {
            const li = document.createElement('li');

            // Task text (use a span so button doesn't overwrite it)
            const span = document.createElement('span');
            span.textContent = taskText;
            li.appendChild(span);

            // Remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.className = 'remove-btn';

            // Remove the task at this index when clicked, then re-save & re-render
            removeBtn.addEventListener('click', () => {
                removeTask(index);
            });

            li.appendChild(removeBtn);
            taskList.appendChild(li);
        });
    }

    // Load tasks from Local Storage into the in-memory `tasks` array, then render
    function loadTasks() {
        const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
        if (Array.isArray(stored)) {
            tasks = stored;
        } else {
            tasks = [];
        }
        renderTasks();
    }

    /**
     * Add a task.
     * - If taskText is provided, uses that value; otherwise reads the input field.
     * - If `save` is true, the task is pushed into the in-memory array and saved to Local Storage.
     * - If `save` is false, the function will only render (this option is useful in other patterns).
     */
    function addTask(taskText = null, save = true) {
        const text = (taskText !== null) ? taskText : taskInput.value.trim();

        if (text === '') {
            alert('Please enter a task!');
            return;
        }

        if (save) {
            // Update in-memory array and persist
            tasks.push(text);
            saveTasks();
        }

        // Re-render the list so indexes and handlers are correct
        renderTasks();

        // Clear input if the call originated from the input field
        if (taskText === null) {
            taskInput.value = '';
            taskInput.focus();
        }
    }

    // Remove a task by index, update storage and re-render
    function removeTask(index) {
        if (index >= 0 && index < tasks.length) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    }

    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

  
    loadTasks();
});
