# Securing School Data: Data Security
A local elementary school’s database was recently hacked. While the administration believes sensitive information of the students was not the target of this breach, they do not want similar incidents to occur in the future. You and a group of other cybersecurity engineers decide to volunteer your time to secure the school’s Postgres database.

Volunteers were shocked to find that the current configuration of Postgres allowed anyone to connect to the school’s database! The group tasked you to update the broken authentication and access control.

Volunteers also discovered that the school wrote some scripts to generate demographic data. The school shares these scripts with the rest of the schools in the district through a public repository. These scripts, however, contain sensitive data such as API keys for both its local and district database servers. You need to make sure that sensitive information is no longer exposed to the public.

## Setup Postgres Roles
1. The first thing we need to do is manage the roles and permissions. Create the following four permission roles:
    * p_students_read: permission to read the students table
    * p_teachers_read: permission to read the teachers table
    * p_students_write: permission to write to the students table
    * p_teachers_write: permission to write to the teachers table
2. Give the roles, p_students_read and p_teachers_read, permission to SELECT items in the students and teachers tables, respectively.
3. Give the roles, p_students_write and p_teachers_write, permission to SELECT, INSERT, UPDATE, and DELETE items in the students and teachers tables, respectively.
4. Create two group roles
    * g_school: group for the school employees
    * g_district: group for the district employees
5. Grant the permission roles, p_students_read and p_teachers_read, to the group g_school.
6. Grant the permission roles, p_students_write and p_teachers_write, to the group g_district.
7. Create three user account roles that can log in: u_principal_skinner, u_teacher_hodge, and u_it_sonia.
8. Add the user role u_principal_skinner to the group g_district and the user roles, u_teacher_hodge and u_it_sonia, to the group g_school.
9. Lastly, add default-deny permissions. Remove all public permissions for the tables, students and teachers.

`Commands ranned in CLI`
```SQL
-- 1.
CREATE ROLE p_students_read;
CREATE ROLE p_teachers_read;
CREATE ROLE p_students_write;
CREATE ROLE p_teachers_write;

-- 2.
GRANT SELECT ON students TO p_students_read;
GRANT SELECT ON teachers TO p_teachers_read;

-- 3.
GRANT SELECT, INSERT, UPDATE, DELETE on students TO p_students_write;
GRANT SELECT, INSERT, UPDATE, DELETE on teachers TO p_teachers_write;

-- 4.
CREATE ROLE g_school;
CREATE ROLE g_district;

-- 5.
GRANT p_students_read TO g_school;
GRANT p_teachers_read TO g_school;

-- 6.
GRANT p_students_write TO g_district;
GRANT p_teachers_write TO g_district;

-- 7.
CREATE ROLE u_principal_skinner WITH LOGIN;
CREATE ROLE u_teacher_hodge WITH LOGIN;
CREATE ROLE u_it_sonia WITH LOGIN;

-- 8.
GRANT u_principal_skinner TO g_district;
GRANT u_teacher_hodge TO g_school;
GRANT u_it_sonia TO g_school;

-- 9.
REVOKE ALL ON students FROM PUBLIC;
REVOKE ALL ON teachers FROM PUBLIC;
```

## Configure Postgres Settings
10. Next, we need to make sure the Postgres server does not accept connections from every IP address. Edit postgresql.conf to change the listen_addresses parameter so that the server only accepts connections from the school network ( localhost) and the district network (235.84.86.65).
11. The server currently listens on port 5432, which is very dangerous because it’s the default Postgres port. Change the port parameter to 61342,
12. Enable SSL on the server.
13. Now that the server settings are configured, move to pg_hba.conf. Add a rule to allow members of the g_school group on the school’s local network to access the students database. SSL is not necessary. We should use SHA-256 password authentication.
14. Add another rule using the same configuration as the last rule but change the database to teachers.
15. Add a rule for the principal’s account, u_principal_skinner, to access all databases from any address. Use SSL and SHA-256 password authentication.
16. Add a rule for the members of the school district in the group, g_district, to access all databases from the district’s network, 235.84.86.65. Use SSL and SHA-256 password authentication.
17. Finally, add a default-deny rule to deny all other connections.

## Implementing Environment Variables
18. As you can see in demographics.js, API keys are hardcoded. Let’s change that! In .env, make two environmental variables, POSTGRES_API_KEY and DISTRICT_API_KEY, and assign them to gVvzJqrWLL6MXLzHeHERnKp and zsi9DeEcewB7MsgzPy2zxsp respectively.
19. In demographics.js, import the dotenv npm package and use it to inject your environment variables into process.env.
20. In demographic.js, replace the hard-coded API keys on the lines:
    ```JS
    const student_data = getData("student", "gVvzJqrWLL6MXLzHeHERnKp");
    ```

    and
    ```JS
    const teacher_data = getData("teacher", "zsi9DeEcewB7MsgzPy2zxsp");
    ```

    with the corresponding environment variables. Student data uses POSTGRES_API_KEY and teacher data uses DISTRICT_API_KEY.

## Prevent Uploading Sensitive Information
21. Lastly, we need to make sure the Postgres configuration files and the environment variables are not uploaded to the public repository. Using .gitignore, ignore the following files: .env, pg_hba.conf, and postgresql.conf.
22. Double-check the files we ignored will not be uploaded to the public repository by running git status.
