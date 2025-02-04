const express = require('express');
const {v4: uuidv4} = require('uuid');
const path = require('path');
const fs = require('fs');
const { validateEmail, validateMotDePasse, validatePasswordMatch } = require('./models/User');
const { validateTitre, peutSupprimerTache } = require('./models/Task');

function getUserByEmail(email) {
  const currUsers = JSON.parse(fs.readFileSync(path.join(__dirname, './public/users.json')));
  const userEntries = Object.entries(currUsers).map(([key, value]) => ({ key, value }));
  return userEntries.find(user => user.value.email === email)?.value;
}

function addUser(email, password) {
  const currUsers = JSON.parse(fs.readFileSync(path.join(__dirname, './public/users.json')));
  const currUsersKeys = Object.values(currUsers).map(user => user.email);

  if (currUsersKeys.includes(email)) {
    return false;
  }else {
    const newUser = {
      id: uuidv4(),
      email,
      password
    };
    currUsers[newUser.id] = newUser;
    fs.writeFileSync(path.join(__dirname, './public/users.json'), JSON.stringify(currUsers));
    return true;
  }
}

function getTask(id) {
  const currTasks = JSON.parse(fs.readFileSync(path.join(__dirname, './public/tasks.json')));
  return currTasks[id];
}

function getTasks() {
  const currTasks = JSON.parse(fs.readFileSync(path.join(__dirname, './public/tasks.json')));
  return currTasks;
}

function addTask(titre, description, email) {
  const currTasks = JSON.parse(fs.readFileSync(path.join(__dirname, './public/tasks.json')));
  const currTasksKeys = Object.keys(currTasks);
  if (currTasksKeys.includes(email)) {
    return false;
  }else {
    const newTask = {
      id: uuidv4(),
      titre,
      description,
      email
    };
    currTasks[newTask.id] = newTask;
    fs.writeFileSync(path.join(__dirname, './public/tasks.json'), JSON.stringify(currTasks));
    return true;
  }
}

function deleteTask(id) {
  const currTasks = JSON.parse(fs.readFileSync(path.join(__dirname, './public/tasks.json')));
  delete currTasks[id];
  fs.writeFileSync(path.join(__dirname, './public/tasks.json'), JSON.stringify(currTasks));
}

const app = express();

app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/html/index.html'));
});

app.get('/task', (req, res) => {
  res.sendFile(path.join(__dirname, './public/html/task.html'));
});

app.get('/api/v1', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/v1/users', (req, res) => {
  const { email, password } = req.body;
  let success = true
  let message = '';
  let user = null;
  if (!validateEmail(email)) {
    success = fail,se;
    message = 'Email invalide; veuillez entrer une adresse email valide';
    res.send({ success, message, user });
    return
  } else if (!validateMotDePasse(password)) {
    success = false;
    message = 'Mot de passe invalide; veuillez entrer un mot de passe valide de 8 caractères';
    res.send({  success, message, user });
    return
  }
  
  user = getUserByEmail(email);
  if (!user) {
    addUser(email, password);
    success = true;
    message = `Nouvel utilisateur ${email} créé avec succès`;
    res.send({ success: success, message, user });
    return
  } else if (user && validatePasswordMatch(password, user.password)) {
    success = true;
    message = `Bonjour ${email}, votre mot de passe est correct`;
    console.log(user)
    res.send({ success, message, user });
    return
  } else {
    success = false;
    message = 'Mot de passe invalide; Votre mot de passe est incorrect';
    user = null;
    res.send({ success, message, user });
    return
  }
});

app.get('/api/v1/tasks', (req, res) => {
  const currTasks = getTasks();
  res.json({success: true, tasks: currTasks});
});

app.post('/api/v1/tasks', (req, res) => {
  const { titre, description, email } = req.body;
  if (validateTitre(titre)) {
    addTask(titre, description, email);
    res.json({success: true, message: "task created"})
  }
  res.json({success: false, message: "invalid task"})
});

app.delete('/api/v1/tasks', (req, res) => {
  const { id, email } = req.body;
  const targetTask = getTask(id);
console.log(targetTask);
  if (peutSupprimerTache(email, targetTask.email )) {
    deleteTask(id);
    res.json({success: true, message: "task deleted"})
  }
  res.json({success: false, message: "invalid task"})
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});