const inquirer = require('inquirer');
const mysql = require('mysql2');


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'work_db'
    },
    console.log(`Connected to the work_db database.`)
);
db.connect(
    (err) => {
        if (err) throw err
        initialPrompt();
    }
)
//initial prompt
//make everything const values
const initialPrompt = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
                name: 'initialPrompt'
            },
        ]).then(data => {
        // data.initialPrompt = undefined;
        switch (data.initialPrompt) {
                case "View All Employees":
                    displayEmployees();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "View All Roles":
                    displayRoles();
                    break;
                case "Update Employee Role":
                    updateEmployee();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    displayDepartments();
                    break;
                case "Add Department":
                    displayEmployees();
                    break;
                default:
                    break;
            }
    })
}
//const for viewing ALL of something using query and producing console.table via sql
//added filler sql terms & still need to fill out schema & seeds
const displayEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
    });
}
const displayDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
    });
}
const displayRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
    });
}
//functions for view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role