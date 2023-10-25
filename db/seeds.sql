INSERT INTO department (name)
VALUES("Administration"), ("Sales"), ("Accounting"), ("Human Resources"), ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES("Sales Representative", 70000, 2),("Accountant", 76500, 3), ("Project Manager", 135500, 1), ("Chief Marketing Officer", 200000, 5), ("CEO", 350000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Carmen', 'Regina', 5, null), ('Justin', 'Bieber', 3, 1), ('Jack', 'Harlow', 2, 2), ('Mac', 'Miller', 1, 3), ('Post', 'Malone', 4, 4);