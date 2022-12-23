
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
            newDepartment();
            break;
        case 'ADD A ROLE': 
            console.log('ADDING ROLE');
            newRole();
            break;
        case 'ADD AN EMPLOYEE': 
            console.log('ADDING EMPLOYEE');
            newEmployee();
            break;
        case 'FINISHED': 
            console.log('ENDING DATABASE');
            sql.end();
            break;
    }   
};



function displayDepartments() {
    sql.query("SELECT * FROM departments", function (error, data) {
        console.table(data);
        startDatabase();
    });
};

function newDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'departmentTitle',
        message: 'WHAT IS THE TITLE OF THE NEW DEPARTMENT',
    }]).then(function (data) {
        sql.query("INSERT INTO departments SET ?", {
            department_name: data.departmentTitle
        }, function(error, result) {
            if (error) {
                console.log(error)
            } else {
                console.log("ADDED NEW DEPARTMENT");
                startDatabase();
            }
        });
})
    };

function displayRoles() {
    sql.query("SELECT * FROM roles", function (error, data) {
        console.table(data);
        startDatabase();
    });
};

function newRole() {
        inquirer.prompt([{
            type: 'input',
            name: 'role',
            message: 'WHAT IS THE NEW ROLE TITLE',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'WHAT IS THE SALARY OF THE NEW ROLE',
        },
        {
            type: 'input',
            name: 'department',
            message: 'WHAT DEPARTMENT DOES THE ROLE BELONG TO',
        },

        ]).then(function (data) {
            sql.query("INSERT INTO roles SET ?", {
                role_title: data.role,
                salary_number: data.salary,
                department_id: data.department
        }, function(error, result) {
            if (error) {
                console.log(error)
            } else {
                console.log("ADDED NEW ROLE");
                startDatabase();
            }
        });
    });
};

function displayEmployees() {
    sql.query("SELECT * FROM employees", function (error, data) {
        console.table(data);
        startDatabase();
    });
};

function newEmployee() {
        inquirer.prompt([{
            type: 'input',
            name: 'first',
            message: 'WHAT IS THE EMPLOYEES FIRST NAME?',
        },
        {
            type: 'input',
            name: 'last',
            message: 'WHAT IS THE EMPLOYEES LAST NAME?',
        },
        {
            type: 'input',
            name: 'role',
            message: 'WHAT IS THEIR ROLE?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'WHAT IS THEIR SALARY?',
        },
        {
            type: 'input',
            name: 'department',
            message: 'WHAT DEPARTMENT ARE THEY IN?',
        },
        {
            type: 'input',
            name: 'manager',
            message: 'WHOS THEIR MANAGER?',
        }

        ]).then(function (data) {
            sql.query("INSERT INTO employees SET ?", {
                first_name: data.first,
                last_name: data.last,
                role_title: data.role,
                salary_number: data.salary,
                department_id: data.department,
                manager_id: data.manager
            }, function(error, result) {
                if (error) {
                    console.log(error)
                } else {
                    console.log("ADDED NEW EMPLOYEE");
                    startDatabase();
                }
            });
        });
    };

