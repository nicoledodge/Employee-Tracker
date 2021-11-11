const inquirer = require('inquirer');
const mysql = require('mysql2');
//puts "view all" in table format on console
require('console.table');

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'factory_db'
    },
    console.log(`Welcome to the Employee Tracker Database!`)
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
        let addDept = [data.newdepartment];
        db.query(
            "INSERT INTO department (name) VALUES (?)",addDept,(err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log('Department Added!');
                initialPrompt();
            }
        );
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
        ]).then(data => {
        const addRole = [data.title, data.salary];
        // searches the db for a list of deparments the role can be assigned too
        let query = db.query(`SELECT name, id
                              FROM department`, (err, result) => {
            const departmentTable = result.map(({id, name}) => ({name: name, value: id}));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: "Select the new role's department",
                    choices: departmentTable
                }
            ]).then(data => {
                const department = data.department;
                addRole.push(department);
                // console.log(addRole);
                db.query(`INSERT INTO role (title, salary, department_id)
                          VALUES (?, ?, ?)`, addRole, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('Role Added!');
                    initialPrompt()
                });
            })
        })
    });
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
    db.query(`SELECT * FROM employee`, (err, res) => {
        inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Which employee would you like to update?',
                    //choices needs to include method to pick up all employee's first and last names
                    choices: res.map(employee => `${employee.first_name} ${employee.last_name}`),
                    name: 'getemployeelist'
                },
                {
                    type: 'input',
                    message: "What is the new role of the employee?",
                    name: 'employeenewrole'
                }
            ]).then(data => {
            //db query back into employee table then revert back to initial prompt function
            db.query(`UPDATE employee SET role_title=${data.employeenewrole} WHERE role_title=employee`, function (err, results) {
                initialPrompt();
            })
        })
    })
}