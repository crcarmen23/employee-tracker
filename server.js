const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config()

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the employees_db database.`)
);

const selectOption = () => {
    inquirer.prompt([
        {
            name: 'options',
            type: 'list',
            message: 'Please select one of the following options:',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
            ]
        }
    ])
        .then(chosen => {
            const { options } = chosen;
            console.log(options)
            if (options === 'View All Departments') {
                viewAllDepts();
            } else if (options === 'View All Roles') {
                viewAllRoles();
            } else if (options === 'View All Employees') {
                viewAllEmps();
            } else if (options === 'Add a Department') {
                addDept();
            } else if (options === 'Add a Role') {
                addRole();
            } else if (options === 'Add an Employee') {
                addEmp();
            } else if (options === 'Update an Employee Role') {
                updateRole();
            }
        })
}



const viewAllDepts = () => {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        selectOption();
    });
}

const viewAllRoles = () => {
    db.query('SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.department_id=department.id', function (err, results) {
        console.table(results);
        selectOption();
    });
}

const viewAllEmps = () => {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.salary, role.title, department.name, manager.first_name AS Manager FROM employee JOIN role ON role.id=employee.role_id JOIN department ON role.department_id=department.id JOIN employee manager ON manager.manager_id=employee.id', function (err, results) {
        console.table(results);
        selectOption();
    });
}

const addDept = () => {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Please enter the name of the new department.',
        }
    ]).then(answer => {
        db.query('INSERT INTO department SET ?', answer, function (err, results) {
            console.table(results);
            selectOption();
        });

    })
}

const addRole = () => {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.log(err)
        }
        console.log(results);
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Please enter the title of the new role.',
            }, {
                name: 'salary',
                type: 'input',
                message: 'Please enter the salary for this new role.',
            }, {
                name: 'name',
                type: 'list',
                message: 'Please enter the department this role belongs to.',
                choices: results.map((dept) => {
                    return { name: dept.name, value: dept.id }
                })
            }
        ]).then(answer => {
            console.log(answer)
            db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', [answer.title, answer.salary, answer.name], function (err, results) {
                if (err) {
                    console.log(err)
                }
                console.table(results);
                selectOption();
            });

        })
    })

}

const addEmp = () => {
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) {
            console.log(err)
        }
        console.log(results);

        db.query('SELECT * FROM role', (err, results2) => {
            if (err) {
                console.log(err)
            }
            console.log(results2); 

        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'Please enter the first name of your new employee.',
            }, {
                name: 'last_name',
                type: 'input',
                message: 'Please enter the last name of your new employee.',
            }, {
                name: 'role_id',
                type: 'list',
                message: 'Please enter the title of your new employee.',
                choices: results2.map((role)=> {
                    return {name: role.title ,value: role.id }
                })
            }, {
                name: 'manager_id',
                type: 'list',
                message: 'Please enter the manager that this employee will report to.',
                choices: results.map((emp) => {
                    return { name: `${emp.first_name} ${emp.last_name}`, value: emp.id }
                })
            }
        ]).then(answer => {
            console.log(answer)
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], function (err, results) {
                if (err) {
                    console.log(err)
                }
                console.table(results);
                selectOption();
            });
        })
        })
    })

}

const updateRole = () => {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'Please enter the id of the employee.',
        }, {
            name: 'role_id',
            type: 'input',
            message: 'Please enter the new role of the employee.',
        },
    ]).then(answer => {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.role_id, answer.id], function (err, results) {
            console.table(results);
            selectOption();
        });

    })
}







selectOption();

