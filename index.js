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
                "Update employee role",
                "Exit"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case "Add an employee":
                    break;
                case "Add a role":
                    break;
                case "Add a department":
                    break;
                case "View employees":
                    break;
                case "View roles":
                    break;
                case "View departments":
                    break;
                case "Update employee role":
                    break;
                case "Exit":
                    break;
            }
        });
}
runEmployeeTracker()