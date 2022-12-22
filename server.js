
const inquirer = require('inquirer');
const sql = require('./db/mysql');
const consTable = require('console.table');

sql.connect(function (error) {
    if (error) console.log(error);
    startDatabase();
})

function startDatabase() {
    inquirer.prompt({
        type: 'list',
        message: 'WELCOME TO THE COMPANY TRACKER',
        name: 'prompt',
        choices: [
            'VIEW DEPARTMENTS',
            'VIEW ROLES',
            'VIEW EMPLOYEES',
            'ADD A DEPARTMENT',
            'ADD A ROLE',
            'ADD AN EMPLOYEE'
        ]
        
    })
}
   

function displayDepartments() {
    sql.query("SELECT * FROM departments", function (error, res) {
        console.table(res);
        startDatabase();
    });
};

displayDepartments();