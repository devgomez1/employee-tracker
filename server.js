const inquirer = require("inquirer");
const sql = require("./db/mysql");
const consTable = require("console.table");

sql.connect((err) => {
  if (err) console.log(err);
  startDatabase();
});

function startDatabase() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "COMPANY TRACKER",
        name: "prompt",
        choices: [
          "VIEW DEPARTMENTS",
          "VIEW ROLES",
          "VIEW EMPLOYEES",
          "ADD A DEPARTMENT",
          "ADD A ROLE",
          "ADD AN EMPLOYEE",
          "UPDATE EMPLOYEE ROLE",
          "FINISHED",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.prompt) {
        case "VIEW DEPARTMENTS":
          console.log("VIEWING ALL DEPARTMENTS");
          displayDepartments();
          break;
        case "VIEW ROLES":
          console.log("VIEWING ALL ROLES");
          displayRoles();
          break;
        case "VIEW EMPLOYEES":
          console.log("VIEWING ALL EMPLOYEES");
          displayEmployees();
          break;
        case "ADD A DEPARTMENT":
          console.log("ADDING DEPARTMENT");
          newDepartment();
          break;
        case "ADD A ROLE":
          console.log("ADDING ROLE");
          newRole();
          break;
        case "ADD AN EMPLOYEE":
          console.log("ADDING EMPLOYEE");
          newEmployee();
          break;
        case "UPDATE EMPLOYEE ROLE":
          console.log("UPDATING EMPLOYEE ROLE");
          updateRole();
          break;
        case "FINISHED":
          console.log("ENDING DATABASE");
          sql.end();
          break;
      }
    });
}

function displayDepartments() {
  sql.query("SELECT * FROM departments", (err, data) => {
    console.table(data);
    startDatabase();
  });
}

function newDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentTitle",
        message: "WHAT IS THE TITLE OF THE NEW DEPARTMENT",
      },
    ])
    .then((input) => {
      sql.query(
        "INSERT INTO departments SET ?",
        {
          department_name: input.departmentTitle,
        },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("ADDED NEW DEPARTMENT");
            startDatabase();
          }
        }
      );
    });
}

function displayRoles() {
  sql.query("SELECT * FROM roles", (error, data) => {
    console.table(data);
    startDatabase();
  });
}

function newRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "WHAT IS THE NEW ROLE TITLE",
      },
      {
        type: "input",
        name: "salary",
        message: "WHAT IS THE SALARY OF THE NEW ROLE",
      },
      {
        type: "input",
        name: "department",
        message: "WHAT DEPARTMENT DOES THE ROLE BELONG TO",
      },
    ])
    .then((input) => {
      sql.query(
        "INSERT INTO roles SET ?",
        {
          role_title: input.role,
          salary_number: input.salary,
          department_name: input.department,
        },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("ADDED NEW ROLE");
            startDatabase();
          }
        }
      );
    });
}

function displayEmployees() {
  sql.query("SELECT * FROM employees", (err, data) => {
    console.table(data);
    startDatabase();
  });
}

function newEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first",
        message: "WHAT IS THE EMPLOYEES FIRST NAME?",
      },
      {
        type: "input",
        name: "last",
        message: "WHAT IS THE EMPLOYEES LAST NAME?",
      },
      {
        type: "input",
        name: "role",
        message: "WHAT IS THEIR ROLE?",
      },
      {
        type: "input",
        name: "salary",
        message: "WHAT IS THEIR SALARY?",
      },
      {
        type: "input",
        name: "department",
        message: "WHAT DEPARTMENT ARE THEY IN?",
      },
      {
        type: "input",
        name: "manager",
        message: "WHOS THEIR MANAGER?",
      },
    ])
    .then((input) => {
      sql.query(
        "INSERT INTO employees SET ?",
        {
          first_name: input.first,
          last_name: input.last,
          role_title: input.role,
          salary_number: input.salary,
          department_name: input.department,
          manager_name: input.manager,
        },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("ADDED NEW EMPLOYEE");
            startDatabase();
          }
        }
      );
    });
}

function updateRole() {
   
    inquirer
      .prompt([
        {
          type: "input",
          name: "role",
          message: "WHAT IS THE NEW ROLE TITLE",
        },
        {
          type: "input",
          name: "id",
          message: "WHAT IS THE ID OF THE EMPLOYEE",
        },
      ])
      .then((input) => {
        sql.query(
          "update employees set role_title = ? where id = ?;",
          [input.role,input.id],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log("ADDED NEW ROLE");
              startDatabase();
            }
          }
        );
      });
  }