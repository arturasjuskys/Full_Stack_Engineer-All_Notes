# Task Group 1: Create Tables and Primary Keys

1. 
```SQL
CREATE TABLE restaurant (
  id integer PRIMARY KEY,
  name varchar(20),
  description varchar(100),
  rating decimal,
  telephone char(10),
  hours varchar(100)
);

CREATE TABLE address (
  id integer PRIMARY KEY,
  street_number varchar(10),
  street_name varchar(20),
  city varchar(20),
  state varchar(15),
  google_map_link varchar(50)
);
```

2. 
```SQL
-- Validating restrictions
SELECT
  constraint_name,
  table_name,
  column_name
FROM information_schema.key_column_usage
WHERE table_name = 'restaurant';

SELECT
  constraint_name,
  table_name,
  column_name
FROM information_schema.key_column_usage
WHERE table_name = 'address';
```

3. 
```SQL
CREATE TABLE category (
  id char(2),
  name varchar(20),
  description varchar(200)
);
```

4. 
```SQL
CREATE TABLE dish (
  id integer,
  name varchar(50),
  description varchar(200),
  hot_and_spicy boolean
);
```

5. 
```SQL
CREATE TABLE review (
  id integer,
  rating decimal,
  description varchar(100),
  date date
);
```

# Task Group 2: Define Relationships and Foreign Keys
6. There are three types of database relationships: one-to-one, one-to-many and many-to-many. Of the five tables you have created, identify the relationships between any pair of tables.

    A one-to-one relationship exists when one row in a table links to exactly one row in another table and vice-versa. Which two tables in our schema perfectly address a one-to-one relationship between them?
  
    After identifying the two tables that exhibit a one-to-one relationship between them, implement this relationship by adding a foreign key in one of the tables. Write a query to validate the existence of this foreign key.
```SQL
ALTER TABLE restaurant
ADD address_id integer REFERENCES address(id) UNIQUE;

ALTER TABLE address
ADD restaurant_id integer REFERENCES restaurant(id) UNIQUE;

SELECT
  constraint_name,
  table_name,
  column_name
FROM information_schema.key_column_usage
WHERE table_name IN ('restaurant', 'address');
```

7. A one-to-many relationship exists when one row in a table links to many rows in another table. Which two tables perfectly address a one-to-many relationship between them? After identifying the two tables that exhibit a one-to-many relationship between them, implement this relationship by adding a foreign key in one of the tables. Write a query to validate the existence of this foreign key.
```SQL
ALTER TABLE review
ADD restaurant_id integer REFERENCES restaurant(id);

SELECT
  constraint_name,
  table_name,
  column_name
FROM information_schema.key_column_usage
WHERE table_name IN ('restaurant', 'address', 'review');
```

8. A many-to-many relationship comprises two one-to-many relationships. Which two tables perfectly address a many-to-many relationship between them?

    How would you implement this relationship? To implement a many-to-many relationship, a third cross-reference table is required that contains two foreign keys referencing the primary keys of the member tables as well as a composite primary key from these two keys.

    If you identify the category and dish tables as having a many-to-many relationship between them, you would be correct. A menu category consists of many dishes, however, the same dish may belong to more than one category. Hence, these two tables, category and dish exhibit a many-to-many relationship between them.

    Create a third cross-reference table, categories_dishes, to implement this relationship and assign the appropriate primary and foreign keys that are needed in this table. In addition to the keys mentioned above, add a price column of type money in this table. The price column is needed in this table because the cost of a dish depends on its category. For example, Chicken with Broccoli costs $6.95 as a main dish but $8.95 if it is part of Luncheon Specials which includes side dishes.
```SQL
ALTER TABLE category
ADD PRIMARY KEY (id);
ALTER TABLE dish
ADD PRIMARY KEY (id);

CREATE TABLE categories_dishes (
  category_id char(2) REFERENCES category(id),
  dish_id integer REFERENCES dish(id),
  price money,
  PRIMARY KEY (category_id, dish_id)
);

SELECT
  constraint_name,
  table_name,
  column_name
FROM information_schema.key_column_usage
WHERE table_name IN ('restaurant', 'address', 'review', 'category', 'categories_dishes');
```

# Task Group 3: Insert Sample Data
9. Congratulations on defining the restaurant menu schema. Now, it’s time to populate the schema with our sample data.

    Open projectdata.sql. Study the various INSERT statements to populate the various tables. Copy the content from projectdata.sql and paste it to the end of script.sql and click SAVE to populate the tables.

    If you didn’t make your tables exactly as described, you might get a syntax error when copying and pasting these INSERT statements. However, this is perfectly alright. Should you get a syntax error when trying to insert data, try the following tips:
    * Inspect the error message.
    * Inspect the data you’re trying to insert.
    * Inspect the table schema to match the data you’re inserting.
```SQL
-- Copy over all INSERT statments from `projectdata.sql`
```

# Task Group 4: Make Sample Queries
