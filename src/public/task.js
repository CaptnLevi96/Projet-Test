function displayTasks() {
    fetch('/api/v1/tasks')
    .then(response => response.json())
    .then(data => {
        const tasks = Object.entries(data.tasks);
        console.log(tasks);
        const taskElement = document.getElementById('task-container');
        for (let i = 0; i < tasks.length; i++) {
            const taskCard = document.createElement('div');
            const task = tasks[i];
            taskCard.classList.add('task-card');
            taskCard.innerHTML = `
                    <div class="task-card-header">
                        <h3 class="task-card-title">${task[1].titre}</h3>
                        <p class="task-card-description">${task[1].description}</p>
                    </div>
                    <div class="task-card-actions">
                        <button class="task-card-action" onclick="deleteTask('${task[0]}')">Supprimer</button>
                    </div>
            `;
            taskElement.appendChild(taskCard);
        }
    })
}

displayTasks();

function deleteTask(id) {
    const email = localStorage.getItem('userEmail');
    console.log(email, id);
    fetch('/api/v1/tasks', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id,
            email
        })
    }).then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/task';
        }
    })
    return false;
}