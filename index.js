// Build a command - line application that at a minimum allows the user to:
//     Add departments, roles, employees
//     View departments, roles, employees
//     Update employee roles

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employee_trackerDB"
});

function runEmployeeTracker() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add an employee",
                "Add a role",
                "Add a department",
                "View employees",
                "View roles",
                "View departments",
                "Update employee role", "Exit"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case "Add an employee":
                    addEmployee();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "View employees":
                    viewEmployees();
                    break;
                case "View roles":
                    viewRoles();
                    break;
                case "View departments":
                    viewDepartments();
                    break;
                case "Update employee role":
                    updateEmployee();
                    break;
                case "Exit":
                    break;
            }
        });
}

function addEmployee() {
    inquirer
        .prompt([{
            name: "first_name",
            type: "input",
            message: "What is employee's first name?"
        }, {
            name: "last_name",
            type: "input",
            message: "What is employee's last name?"
        }, {
            name: "role",
            type: "input",
            message: "What is employee's role?"
        }])
        .then(function(answer) {
            var query = connection.query(
                "INSERT INTO employeeTable SET ?", {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role
                },
                function(err, res) {
                    if (err) throw err;
                    console.log("Added " + answer.first_name + " " + answer.last_name + " to the employee roster");
                }
            )
        });
}

function addRole() {
    inquirer
        .prompt([{
            name: "title",
            type: "input",
            message: "What is the role's title?"
        }, {
            name: "salary",
            type: "input",
            message: "What is this role's annual salary?"
        }, {
            name: "department_id",
            type: "input",
            message: "What is this role's department number?"
        }])
        .then(function(answer) {
            var query = connection.query(
                "INSERT INTO roleTable SET ?", {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
                function(err, res) {
                    if (err) throw err;
                    console.log("Added " + answer.title + " to the role table");
                }
            )
        });
}

function addDepartment() {
    inquirer
        .prompt([{
            name: "first_name",
            type: "input",
            message: "What is employee's first name?"
        }, {
            name: "last_name",
            type: "input",
            message: "What is employee's last name?"
        }, {
            name: "role",
            type: "input",
            message: "What is employee's role?"
        }])
        .then(function(answer) {
            var query = connection.query(
                "INSERT INTO employeeTable SET ?", {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role
                },
                function(err, res) {
                    if (err) throw err;
                    console.log("Added " + answer.first_name + " " + answer.last_name + " to the employee roster");
                }
            )
        });
}

function viewEmployees() {
    inquirer
        .prompt([{
            name: "first_name",
            type: "input",
            message: "What is employee's first name?"
        }, {
            name: "last_name",
            type: "input",
            message: "What is employee's last name?"
        }, {
            name: "role",
            type: "input",
            message: "What is employee's role?"
        }])
        .then(function(answer) {
            var query = connection.query(
                "INSERT INTO employeeTable SET ?", {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role
                },
                function(err, res) {
                    if (err) throw err;
                    console.log("Added " + answer.first_name + " " + answer.last_name + " to the employee roster");
                }
            )
        });
}

function viewRoles() {
    inquirer
        .prompt([{
            name: "first_name",
            type: "input",
            message: "What is employee's first name?"
        }, {
            name: "last_name",
            type: "input",
            message: "What is employee's last name?"
        }, {
            name: "role",
            type: "input",
            message: "What is employee's role?"
        }])
        .then(function(answer) {
            var query = connection.query(
                "INSERT INTO employeeTable SET ?", {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role
                },
                function(err, res) {
                    if (err) throw err;
                    console.log("Added " + answer.first_name + " " + answer.last_name + " to the employee roster");
                }
            )
        });
}

function viewDepartments() {
    inquirer
        .prompt([{
            name: "first_name",
            type: "input",
            message: "What is employee's first name?"
        }, {
            name: "last_name",
            type: "input",
            message: "What is employee's last name?"
        }, {
            name: "role",
            type: "input",
            message: "What is employee's role?"
        }])
        .then(function(answer) {
            var query = connection.query(
                "INSERT INTO employeeTable SET ?", {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role
                },
                function(err, res) {
                    if (err) throw err;
                    console.log("Added " + answer.first_name + " " + answer.last_name + " to the employee roster");
                }
            )
        });
}

function updateEmployee() {
    inquirer
        .prompt([{
            name: "first_name",
            type: "input",
            message: "What is employee's first name?"
        }, {
            name: "last_name",
            type: "input",
            message: "What is employee's last name?"
        }, {
            name: "role",
            type: "input",
            message: "What is employee's role?"
        }])
        .then(function(answer) {
            var query = connection.query(
                "INSERT INTO employeeTable SET ?", {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role
                },
                function(err, res) {
                    if (err) throw err;
                    console.log("Added " + answer.first_name + " " + answer.last_name + " to the employee roster");
                }
            )
        });
}

runEmployeeTracker()