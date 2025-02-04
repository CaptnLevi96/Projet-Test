const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const message = document.getElementById('message');

function setMessage(message) {
    document.getElementById('message').innerHTML = message;
}

function displayEmail() {
    const email = localStorage.getItem('userEmail');
    if (email) {
        document.getElementById('user-email').innerHTML = email

    }
}

displayEmail();

function login(form, event) {
    event.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    fetch('/api/v1/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(response => response.json())
    .then(data => {
        console.log(data, 'data');
        setMessage(data.message);
        if (data.success) {
            localStorage.setItem('userEmail', data.user.email);
            window.location.href = '/task';
        }
    })
    return false;
}

function addTask(form, event) {
    event.preventDefault();
    const titre = form.titre.value;
    const description = form.description.value;
    const email = localStorage.getItem('userEmail');
    fetch('/api/v1/tasks', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titre,
            description,
            email
        })
    }).then(response => response.json())
    .then(data => {
        console.log(data, 'data');
        if (data.success) {
            window.location.href = '/task';
        }
    })
    return false;
}