const inquirer = require('inquirer');
const mysql = require('mysql2');
//puts "view all" in table format on console
require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'factory_db'
    },
    console.log(`Connected to the factory_db database.`)
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
                addDepartment();
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
        initialPrompt();
    });
}
const displayDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        initialPrompt();
    });
}
const displayRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        initialPrompt();
    });
}
//functions for view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the New Department?',
                name: 'newdepartment'
            }
        ]).then(data => {
        db.query(`INSERT INTO department (name) VALUES ('${data.newdepartment}');`, function (err, results) {
            // console.table(results);
            initialPrompt();
        })
    })
}

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
        db.query(`INSERT INTO role (role_title, department_id, salary) VALUES ('${data.newrole}', '${data.newroledepartment}', '${data.newsalary}');`, function (err, results) {
            // console.table(results);
            initialPrompt();
        })
    })
}

const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the first name of the new employee?',
                name: 'firstname'
            },
            {
                type: 'input',
                message: 'What is the last name of the new employee?',
                name: 'lastname'
            },
            {
                type: 'input',
                message: 'What is the role of the new employee?',
                name: 'newemployeeid'
            },
            {
                type: 'input',
                message: 'What is the manager of the new employee?',
                name: 'employeemanager'
            }
        ]).then(data => {
        //insert into employee table
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.firstname}', '${data.lastname}', '${data.newemployeeid}', '${data.newemployeemanager}');`, function (err, results) {
            console.table(results);
            initialPrompt();
        })
    })
}

const updateEmployee = () => {
    // select * from existing employee table
    db.query(`SELECT * FROM employee`, (err, res, employee) => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Which employee would you like to update?',
                    //choices needs to include method to pick up all employee's first and last names
                    choices: employee.map(employee => ({name: `${employee.first_name} ${employee.last_name}`, value: employee.id})),
                    name: 'getemployeelist'
                },
                {
                    type: 'input',
                    message: "What is the new role of the employee?",
                    name: 'employeenewrole'
                }
            ]).then(data => {

            const updateEmployee = {
                employeeNewRole: data.employeenewrole,
            }
            //db query back into employee table then revert back to initial prompt function
            db.query(`UPDATE employee SET role_id=${data.employeenewrole} WHERE role_id=employee`, function (err, results) {
                initialPrompt();
            })
        })
    })
}