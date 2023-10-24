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
                'Add a Deparment',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
            ]
        }
    ])
        .then
}














app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});