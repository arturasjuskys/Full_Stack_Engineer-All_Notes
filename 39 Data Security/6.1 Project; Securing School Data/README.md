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
