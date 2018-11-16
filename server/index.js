const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const employees = require('./data/employees.json');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers',  'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/api/employees',  (req, res) => {
  console.log('/api/employees');
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.send(JSON.stringify(employees, null, 2));
});



app.post('/api/add/employees', (req, res) => {
  console.log('Adding new employee: ', req.body.name);
  const data = req.body;
  const id = employees.length + 1;
  const code = `F1${(id - 1) > 9 ? (id - 1) : '0' + (id - 1)}`;

  employees.push({
      id,
      name: data.name,
      code,
      color: data.color,
      profession: data.profession,
      city: data.city,
      branch: data.branch,
      assigned: data.assigned});

  res.status(200).json(employees);

});

app.put('/api/edit/employees/:id', (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  console.log(`Editing employee with id: ${id}`);
  const index = employees.findIndex(g => g.id === parseInt(id, 10));
  console.log(index);
  employees[index].name = req.body.name;
  employees[index].profession = req.body.profession;
  employees[index].color = req.body.color;
  employees[index].city = req.body.city;
  employees[index].branch = req.body.branch;
  employees[index].assigned = req.body.assigned;

  res.status(200).json(employees);
});

app.post('/api/delete/employees', (req, res) => {
  console.log('Deleting employees', req.body);
  const employeeIds = req.body.ids;
  for (let i = 0; i < employeeIds.length; i++) {
    const index = employees.findIndex(g => g.id === employeeIds[i]);
    employees.splice(index, 1);
  }
  res.status(200).json(employees);
});

app.listen(8080, () => console.log('Job Dispatch API running on port 8080!'))