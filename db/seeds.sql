USE factory_db;

INSERT into department ( name)
VALUES
    ( "Sales"),
    ( "Human Resources"),
    ( "IT");

INSERT into role ( role_title, department_id, salary)
VALUES
    ("Manager", 1, 10.25),
    ("Intern", 2, 10.25),
    ("Engineer", 3, 10.25);

INSERT into employee ( first_name, last_name, role_id, role_title, manager_id)
VALUES
    ( "Tyler", "Miles", 1, "Manager", 1),
    ( "Richard", "Scott", 2, "Engineer", 1),
    ( "Ray", "Charles", 3, "Engineer", 1),
    ( "Nikki", "Minaj", 1,"Engineer", 1),
    ( "Taylor", "Murphy", 2,"Engineer", 1),
    ( "Ludkin", "Allen", 3,"Intern", 3);