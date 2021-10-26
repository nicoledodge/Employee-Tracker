const inquirer = require('inquirer');
const mysql = require('mysql2');
// require('console.table')

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
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
        console.log(results);
        initialPrompt();
    });
}
const displayDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
        initialPrompt();
    });
}
const displayRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        console.log(results);
        initialPrompt();
    });
}
//functions for view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the New Role?',
                name: 'newrole'
            },
            {
                type: 'input',
                message: 'What is the salary of the New Role?',
                name: 'newsalary'
            },
            {
                type: 'input',
                message: 'What department does the New Role belong to?',
                name: 'newroledepartment'
            }
        ]).then(data => {

            const newrole = {
                role_title : data.newrole,
                department_id : data.newroledepartment,
                salary : data.newsalary
            }
            db.query
    })
}

const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the new employee?'
                name: 'newrole'
            },
            {
                type: 'input',
                message: 'What is the name of the new employee?'
                name: 'newrole'
            },
            {
                type: 'input',
                message: 'What is the name of the new employee?'
                name: 'newrole'
            },
            {
                type: 'input',
                message: 'What is the name of the new employee?'
                name: 'newrole'
            }
        ]).then(data => {

        const newrole = {

        }
        db.query
    })
}

const updateEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the New Role?'
                name: 'newrole'
            }
        ]).then(data => {

        const newrole = {

        }
        db.query
    })
}