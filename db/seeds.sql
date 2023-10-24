INSERT INTO department (department_name)
VALUES("Administration"), ("Sales"), ("Accounting"), ("Human Resources"), ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES("Sales Representative", 70000, 1),("Accountant", 76500, 2), ("Project Manager", 135500, 3), ("Chief Marketing Officer", 200000, 4), ("CEO", 350000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Carmen', 'Regina', 1, 2), ('Justin', 'Bieber', 1, null), ('Jack', 'Harlow', 1, 2), ('Mad', 'Miller', 2, null), ('Post', 'Malone', 4, null);