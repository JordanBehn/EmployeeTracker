const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
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
                    updateEmployeeRole();
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
            message: "What is employee's role id?"
        }])
        .then(function(answer) {
            connection.query(
                "INSERT INTO employeeTable SET ?", {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role
                },
                function(err) {
                    if (err) throw err;
                    console.log("Added " + answer.first_name + " " + answer.last_name + " to the employee roster");
                }
            )
            runEmployeeTracker();
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
            connection.query(
                "INSERT INTO roleTable SET ?", {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
                function(err) {
                    if (err) throw err;
                    console.log("Added " + answer.title + " to the role table");
                }
            )
            runEmployeeTracker();
        });
}

function addDepartment() {
    inquirer
        .prompt([{
            name: "name",
            type: "input",
            message: "What is the department name?"
        }])
        .then(function(answer) {
            connection.query(
                "INSERT INTO departmentTable SET ?", {
                    department_name: answer.name
                },
                function(err) {
                    if (err) throw err;
                    console.log("Added " + answer.name + " to department list");
                }
            )
            runEmployeeTracker();
        });
}

function viewEmployees() {
    const query = `SELECT employeeTable.employee_id, employeeTable.first_name, employeeTable.last_name, roleTable.title, departmentTable.department_name FROM employeeTable 
    INNER JOIN roleTable ON (roleTable.role_id = employeeTable.role_id)
    INNER JOIN departmentTable ON (departmentTable.department_id = roleTable.department_id)
    ORDER BY employeeTable.employee_id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log('\n');
        runEmployeeTracker();
    });
}

function viewRoles() {
    const query = `SELECT roleTable.title, departmentTable.department_name FROM roleTable 
    INNER JOIN departmentTable ON (departmentTable.department_id = roleTable.department_id)
    ORDER BY roleTable.role_id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log('\n');
        runEmployeeTracker();
    });
}

function viewDepartments() {
    const query = `SELECT * FROM departmentTable 
    ORDER BY departmentTable.department_id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log('\n');
        runEmployeeTracker();
    });
}

function updateEmployeeRole() {
    inquirer
        .prompt([{
            name: "id",
            type: "input",
            message: "What is the ID of the employee to update?"
        }, {
            name: "role",
            type: "input",
            message: "What is employee's new role ID?"
        }]).then(function(answer) {
            connection.query(`UPDATE employeeTable 
        SET role_id = ${answer.role}
        WHERE employee_id = ${answer.id}`, function(err) {
                if (err) throw err;
                console.log('Role updated')
                runEmployeeTracker();
            });
        })
};

runEmployeeTracker()