
const inquirer = require('inquirer');
const sql = require('./db/mysql');
const consTable = require('console.table');

sql.connect(function (error) {
    if (error) console.log(error);
    startDatabase();
})

async function startDatabase() {
   const answers = await inquirer.prompt([
    {
        type: 'list',
        message: 'COMPANY TRACKER',
        name: 'prompt',
        choices: ['VIEW DEPARTMENTS', 'VIEW ROLES', 'VIEW EMPLOYEES', 'ADD A DEPARTMENT', 'ADD A ROLE', 'ADD AN EMPLOYEE', 'FINISHED']
        
    }
]);

    switch (answers.prompt) {
        case 'VIEW DEPARTMENTS':
            console.log('VIEWING ALL DEPARTMENTS');
            displayDepartments();
            break;
        case 'VIEW ROLES': 
            console.log('VIEWING ALL ROLES');
            displayRoles();
            break;
        case 'VIEW EMPLOYEES': 
            console.log('VIEWING ALL EMPLOYEES');
            displayEmployees();
            break;
        case 'ADD A DEPARTMENT': 
            console.log('ADDING DEPARTMENT');
            break;
        case 'ADD A ROLE': 
            console.log('ADDING ROLE');
            break;
        case 'ADD AN EMPLOYEE': 
            console.log('ADDING EMPLOYEE');
            break;
        case 'FINISHED': 
            console.log('ENDING DATABASE');
            break;
    }   
};



function displayDepartments() {
    sql.query("SELECT * FROM departments", function (error, data) {
        console.table(data);
        startDatabase();
    });
};


function displayRoles() {
    sql.query("SELECT * FROM roles", function (error, data) {
        console.table(data);
        startDatabase();
    });
};


function displayEmployees() {
    sql.query("SELECT * FROM employees", function (error, data) {
        console.table(data);
        startDatabase();
    });
};