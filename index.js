const listContainer = document.querySelector(".todo__list")
const submitForm = document.querySelector('.todo__input')
const submitButton = document.querySelector('.todo-list__submit')
const inputTextBox = document.querySelector('.todo-list__textbox')
const completedSection = document.querySelector('.todo__list__completed')
const incompleteSection = document.querySelector('.todo__list__incomplete')



submitForm.addEventListener("submit", (e) => {
    e.preventDefault()
    handleSubmit(inputTextBox.value);
    inputTextBox.value = ""
})

function displayTasks() {
    fetch("http://localhost:3000/todos")
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            if(element.completed === true) {
                completedSection.innerHTML +=                 
                `
                <article class="todo__list__task">
                    <p class="todo__list__title task--completed">${element.title}</p>
                    <button class="btn edit-button" id="edit-${element.id}" onclick="() => console.log("clicked")"><svg class="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg></button>
                    <button class="btn delete-button" id="delete-${element.id}"><svg class="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg></button>
                </article>
                `
            }
            else {
                incompleteSection.innerHTML +=                 
            `
            <article class="todo__list__task">
                <p class="todo__list__title">${element.title}</p>
                <button class="btn edit-button" id="edit-${element.id}"><svg class="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg></button>
                <button class="btn delete-button" id="delete-${element.id}"><svg class="icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg></button>
            </article>
            `
            }
        })
    })
}


function handleSubmit(task) {
    fetch("http://localhost:3000/todos", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": task,
            "completed": false
          })
    })
    displayTasks()
}

function handleEdit(id, newTitle){
    fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": newTitle
          })
    })
}

function handleComplete(id, completeStatus) {
    fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": newTitle,
            "complete": completeStatus
          })
    })
}

function handleDelete(id) {
    fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

(() => {
    displayTasks()
})()