# Plexxis Interview Exercise
## Requirements
Create a simple but __impressive__ (looks good, works well, has intuitive design, etc.) CRUD application that can do the following:

1) Retrieve employees from a REST API  (Done)
2) Display the employees in a React application  (Done)
3) Has UI mechanisms for creating and deleting employees  (Done)
4) Has API endpoints for creating and deleting employees  (Done)

*Read over the `Bonus` objectives and consider tackling those items as well*

## Bonus (Highly Encouraged)

1) Use a relational database to store the data (SQLite, MariaDB, Postgres)   (Done)
2) UI mechanisms to edit/update employee data (Done)
3) Add API endpoint to update employee data  (Done)
4) Use [React Table](https://react-table.js.org)  (Done)

## React Front End
- Material UI - Using the open source Material UI library and utilizing it's cool components I was able to create a simple but pretty
nice, intuitive UI. As well as utilizing the table component, I was able to create a data table.
- I focused on mainly the user experience. I wanted to create a easy to use UI. The employee list is in table listed in a table, with
a multi select option to delete multiple users.
- I created an edit button at the end of each table entry to edit a record. As well as added a Add employee button in the header
of the table.
- Using dialogs component from the library, I was able to create an easy way to add or edit employees.
- For the color picker, I wanted to create a visual way to see the color the user can see visually what color they want.
- On update or add, the list will refresh easily for the latest up to date list of employees
- Created search to lookup by name of employee

## Node.js Backend
- During the testing phase, I had initially used the provided json to add, edit or delete from the JSON file.
- After the testing phase I moved on to integrating MariaDB onto the backend
- One module called db.js will create a connection to the database, create the database, as well as a single table, called 'users', if
the table does not exist, likewise with the database
- No need to set the database and table up yourself.
- All that is needed by setup is really just making sure you have MariaDB, and changing the host, username, password accordingly
- Created basic CRUD on backend to delete, edit and add employees

## Getting Started
This project was bootstrapped with Create React App. The front-end app runs off localhost:3000. The REST API is located in the /server folder and runs off localhost:8080. The data is being served from a JSON file located in the /server/data folder. Run npm start to start both servers.
