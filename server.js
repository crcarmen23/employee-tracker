const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


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
        .then(chosen) => {
    const {choices} = chosen;
    if (choices === 'View All Departments') {
        viewAllDepts();
    } else if (choices === 'View All Roles') {
        viewAllRoles(); 
    } else if (choices === 'View Employees') {
        viewAllEmps();
    }  else if (choices === 'Add a Department') {
        addDept(); 
    } else if (choices === 'Add a Role') {
        addRole();
    } else if (choices === 'Add an Employee') {
        addEmp(); 
    } else if (choices === 'Update an Employee Role') {
        updateRole();
    }

    const viewAllDepts =

    

    // const viewAllRoles = 

    // const viewAllEmps = 

    // const addDept = 

    // const addRole = 

    // const addEmp =

    // const updateRole = 

}














app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});