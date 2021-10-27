USE work_db;

INSERT into department ( name)
VALUES
    ( "Sales"),
    ( "Management"),
    ( "HR");

INSERT into role ( role_title, department_id, salary)
VALUES
    ("Manager", 1, 10.25),
    ("Intern", 2, 10.25),
    ("Engineer", 3, 10.25);

INSERT into employee ( first_name, last_name, role_id, manager_id)
VALUES
    ( "Tyler", "Miles", 1, 1),
    ( "Richard", "Scott", 2, 1),
    ( "Ray", "Charles", 3, 1);