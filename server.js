
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
        message: 'WELCOME TO THE COMPANY TRACKER',
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
            break;
        case 'VIEW EMPLOYEES': 
            console.log('VIEWING ALL EMPLOYEES');
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
    sql.query("SELECT * FROM departments", function (error, res) {
        console.table(res);
        startDatabase();
    });
};
