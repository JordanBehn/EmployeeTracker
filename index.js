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

//node function prompts user to select which functionality they are interested in
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
            //switch cases determine which function to run
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
                case "Exit": //if exit is selected, end the program
                    break;
            }
        });
}
//function to prompt user for new employee details and add them to table
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
            },
            {
                name: "manager_id",
                type: "input",
                message: "What is the id of this employee's manager?"
            }
        ])
        .then(function(answer) {
            connection.query(
                //inserts new employee into employeeTable with input parameters
                "INSERT INTO employeeTable SET ?", {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role,
                    manager_id: answer.manager_id
                },
                function(err) {
                    if (err) throw err;
                    console.log("Added " + answer.first_name + " " + answer.last_name + " to the employee roster");
                }
            )
            runEmployeeTracker();
        });
}
//function to prompt user for new role details and add them to table
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
                //inserts new role into roleTable with input parameters
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
//function to prompt user for new role details and add them to table
function addDepartment() {
    inquirer
        .prompt([{
            name: "name",
            type: "input",
            message: "What is the department name?"
        }])
        .then(function(answer) {
            connection.query(
                //inserts new department into departmentTable with input parameters
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
//function that returns table of employees, their roles, and departments
function viewEmployees() {
    //Return relevant information from each of the three tables, joining tables by role and department ID
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
//function that returns table of roles and their departments
function viewRoles() {
    //Return relevant role and department information, joining tables by department ID
    const query = `SELECT roleTable.role_id, roleTable.title, departmentTable.department_name FROM roleTable 
    INNER JOIN departmentTable ON (departmentTable.department_id = roleTable.department_id)
    ORDER BY roleTable.role_id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log('\n');
        runEmployeeTracker();
    });
}
//function that returns table of departments
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
//function to change an employee's role
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
            //updates a specified employee's role to a new role id
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