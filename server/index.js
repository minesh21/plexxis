const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const employees = require('./data/employees.json');
const conn = require('./db');

conn.connect(err => {
  if (err) {
    console.log('Cannot connect to database');
  } else {
    console.log('Connected to the database');
  }
});

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers',  'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// GET list of employees
app.get('/api/employees',  (req, res) => {
  console.log('/api/employees');
  conn.query('SELECT * FROM plexxis.users', (err, employees) => {
    if (err) {
      return res.status(400).json({status: 'bad', error: err});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(JSON.stringify(employees, null, 2));
  })

});

// Create new employee
app.post('/api/add/employees', (req, res) => {
  console.log('Adding new employee: ', req.body.name);
  const data = req.body;

  conn.query(`INSERT INTO plexxis.users (name, profession, color, city, branch, assigned) VALUES (
    '${data.name}',
    '${data.profession}',
    '${data.color}',
    '${data.city}',
    '${data.branch}',
    ${data.assigned === 'true' ? 1 : 0});`, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({status: 'bad', error: err});
      }
      conn.query(`UPDATE plexxis.users 
      SET code='F1${data.insertId - 1 > 9 ? data.insertId  - 1 : '0' + (data.insertId - 1)}' 
      WHERE id=${data.insertId }`, (err, data) => {
        if  (err) {
          return res.status(400).json({status: 'bad', error: err});
        }

        conn.query(`SELECT * FROM plexxis.users`, (err, employees) => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200);
          res.send(JSON.stringify(employees, null, 2));
        })
      })
  });
});

// Edit Employee
app.put('/api/edit/employees/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log(`Editing employee with id: ${id}`);

  conn.query(`UPDATE plexxis.users
  SET name='${req.body.name}', profession='${req.body.profession}', color='${req.body.color}', city='${req.body.city}', branch='${req.body.branch}', assigned=${req.body.assigned === "true" ? 1 : 0}
  WHERE id=${id}`, err => {
    if (err) {
      console.log(err);
      return res.status(400).json({status: 'bad', error: err});
    }
    conn.query(`SELECT * FROM plexxis.users`, (err, employees) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(employees, null, 2));
    })
  });
});

// Delete employees
app.post('/api/delete/employees', (req, res) => {
  console.log('Deleting employees', req.body);
  const employeeIds = req.body.ids.sort();
  conn.query(`DELETE FROM plexxis.users WHERE (id) IN (${employeeIds.join(',')})`,  (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({status: 'bad', error: err});
    }

    conn.query(`SELECT * FROM plexxis.users`, (err, employees) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200);
      res.send(JSON.stringify(employees, null, 2));
    })
  });
});

app.listen(8080, () => console.log('Job Dispatch API running on port 8080!'))