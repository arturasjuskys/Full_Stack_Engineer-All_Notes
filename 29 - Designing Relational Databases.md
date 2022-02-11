# Index

* Introduction: Designing Relational Databases
* Inreoduction to Database Design
* Designing a Database

# Designing a Database

## Introduction
In this lesson, we will learn about relationships between tables and how to use this knowledge to enhance our database. This lesson is built upon prior knowledge of database keys in the Database Keys lesson.

On the right is a sample database schema diagram. Let’s take a look at what it entails. There are seven tables in this diagram and most of them are related to each other with the exception of a standalone table, popular_books. In each table, primary keys are bolded. The lines between tables connect foreign keys and primary keys.

What are relationships? A database relationship establishes the way in which connected tables are dependent on one another.

What are the different types of database relationships? There are three types: one-to-one, one-to-many and many-to-many. We will delve into each one in the upcoming exercises. Let’s get started.

<img src="./img/books_large.webp">

## One-to-One Relationship

In a one-to-one relationship, a row of table A is associated with exactly one row of table B and vice-versa. For example, a person may only have one passport assigned to them. Conversely, a passport may only be issued to one person. A car may only have one vehicle identification number assigned to it and vice-versa. A driver may only have one driver’s license issued to them in their home state.

Let’s elaborate on the last example further. Let’s say we have a driver table with the following columns:
* name
* address
* date_of_birth
* license_id

We also have a license table with the following columns:
* id
* state_issued
* date_issued
* date_expired

In the driver table, the primary key that uniquely identifies a driver would be the license_id. Similarly, the primary key that uniquely identifies a driver’s license in the license table would be the id itself. To establish a one-to-one relationship in PostgreSQL between these two tables, we need to designate a foreign key in one of the tables. We can pick the license_id from driver to be the foreign key in the license table. However, doing this is not enough to ensure that duplicate rows will not exist in the license table.

To enforce a strictly one-to-one relationship in PostgreSQL, we need another keyword, UNIQUE. By appending this keyword to the declaration of the foreign key, we should be all set.
```SQL
license_id char(20) REFERENCES driver(license_id) UNIQUE
```

<img src="./img/license_driver.webp">

The full PostgreSQL script for creating these two tables is as follows:
```SQL
CREATE TABLE driver (
    license_id char(20) PRIMARY KEY,
    name varchar(20),
    address varchar(100),
    date_of_birth date
);      
 
CREATE TABLE license (
    id integer PRIMARY KEY,
    state_issued varchar(20),
    date_issued date,
    date_expired  date,
    license_id char(20) REFERENCES driver(license_id) UNIQUE
);
```

### Exercise

```SQL

```