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
10. Once you have successfully imported the sample data in projectdata.sql, you can start making queries to the database. The SELECT, AS, FROM, WHERE, ORDER BY, HAVING and GROUP BY keywords will be useful here as well as a couple of functions.

    In script.sql. Type in a query that displays the restaurant name, its address (street number and name) and telephone number. Then, click SAVE to run the query.
```SQL
SELECT
  restaurant.name,
  address.street_number,
  address.street_name,
  restaurant.telephone
FROM restaurant
JOIN address
ON restaurant.id = address.restaurant_id;
```

| name | street_number | street_name | telephone |
| ---- | ------------- | ----------- | --------- |
| Bytes of China | 2020| Busy Street | 6175551212 |

11. In script.sql, write a query to get the best rating the restaurant ever received. Display the rating as best_rating. Then, click SAVE to run the query.
```SQL
SELECT MAX(rating) AS best_rating FROM review;
```

| best_rating |
| ----------- |
| 5.0 |

12. Open script.sql. Write a query to display a dish name, its price and category sorted by the dish name. Your results should have the following header:

    | dish_name | price | category |
    | --------- | ----- | -------- |

    You should get 8 rows of results.
```SQL
SELECT
  dish.name AS dish_name,
  categories_dishes.price AS price,
  category.name AS category
FROM dish
INNER JOIN categories_dishes
ON dish.id = categories_dishes.dish_id
INNER JOIN category
ON category.id = categories_dishes.category_id
ORDER BY 1;
```

| dish_name | price | category |
| --------- | ----- | -------- |
| Beef with Garlic Sauce | $8.95 | Luncheon Specials |
| Chicken Wings | $6.95 | Chicken |
| Chicken with Broccoli | $6.95 | Chicken |
| Chicken with Broccol | 	$8.95 | Luncheon Specials |
| Fresh Mushroom with Snow Peapods and Baby Corns | $8.95 | Luncheon Specials |
| Hunan Special Half & Half | $17.95 | House Specials |
| Sesame Chicken | $15.95 | House Specials |
| Special Minced Chicken | $16.95 | House Specials |

13. Instead of sorting the results by dish name, type in a new query to display the results as follows, sorted by category name.
    | category | dish_name | price |
    | -------- | --------- | ----- |

```SQL
SELECT
  category.name AS category,
  dish.name AS dish_name,
  categories_dishes.price AS price
FROM dish
INNER JOIN categories_dishes
ON dish.id = categories_dishes.dish_id
INNER JOIN category
ON category.id = categories_dishes.category_id
ORDER BY 1;
```

| category | dish_name | price |
| -------- | --------- | ----- |
| Chicken | Chicken with Broccoli | $6.95 |
| Chicken | Chicken Wings | $6.95 |
| House Specials | Hunan Special Half & Half	 | 17.95 |
| House Specials | Sesame Chicken	 | 15.95 |
| House Specials | Special Minced Chicken	 | 16.95 |
| Luncheon Specials | Chicken with Broccoli | $8.95 |
| Luncheon Specials | Beef with Garlic Sauce | $8.95 |
| Luncheon Specials | Fresh Mushroom with Snow Peapods and Baby Corns | $8.95 |

14. Next, type a query in script.sql that displays all the spicy dishes, their prices and category. The header should look like this:

    | spicy_dish_name | category | price |
    | --------------- | -------- | ----- |

    You should get 3 rows of results.

```SQL
SELECT
  dish.name AS spicy_dish_name,
  category.name AS category,
  categories_dishes.price AS price
FROM dish
INNER JOIN categories_dishes
ON dish.id = categories_dishes.dish_id
INNER JOIN category
ON category.id = categories_dishes.category_id
WHERE dish.hot_and_spicy = true
ORDER BY 1;
```

| spicy_dish_name | category | price |
| --------------- | -------- | ----- |
| Beef with Garlic Sauce | Luncheon Specials | $8.95 |
| Chicken Wings | Chicken | $6.95 |
| Hunan Special Half & Half | House Specials | $17.95 |

15. In a complete menu, there will be dishes that belong to more than one category. In our sample menu, only Chicken with Brocolli is assigned to two different categories - Luncheon Specials and Chicken. How do we query the database to find dishes that span multiple categories?

    We could use a database function, COUNT(column_name) to help us. For instance if we have a table whose non-primary key column appears multiple times in results, we can count how many times the row appears.

    Write a query that displays the dish_id and COUNT(dish_id) as dish_count from the categories_dishes table. When we are displaying dish_id along with an aggregate function such as COUNT(), we have to also add a GROUP BY clause which includes dish_id.

```SQL
SELECT
  dish_id,
  COUNT(dish_id) AS dish_count
FROM categories_dishes
GROUP BY dish_id;
```

| dish_id | dish_count |
| ------- | ---------- |
| 3 | 1 |
| 5 | 1 |
| 4 | 1 |
| 6 | 1 |
| 7 | 1 |
| 1 | 2 |
| 8 | 1 |

16. Great work! Try to adjust the previous query to display only the dish(es) from the categories_dishes table which appears more than once. We can use the aggregate function, COUNT() as a condition. But instead of using the WHERE clause, we use the HAVING clause together with COUNT().
```SQL
SELECT
  dish_id,
  COUNT(dish_id) AS dish_count
FROM categories_dishes
GROUP BY dish_id
HAVING COUNT(dish_id) > 1;
```

| category_id | dish_count |
| ----------- | ---------- |
| 1 | 2 |

17. Excellent! The previous two queries only give us a dish_id which is not very informative. We should write a better query which tells us exactly the name(s) of the dish that appears more than once in the categories_dishes table. Write a query that incorporates multiple tables that display the dish name as dish_name and dish count as dish_count.
```SQL
SELECT
  dish.name AS dish_name,
  COUNT(categories_dishes.dish_id) AS dish_count
FROM categories_dishes, dish
GROUP BY
  categories_dishes.dish_id,
  dish.name,
  dish.id
HAVING
  COUNT(categories_dishes.dish_id) > 1
  AND categories_dishes.dish_id = dish.id;
```

| dish_name | dish_count |
| ---- | ---------- |
| Chicken with Broccoli | 2 |

18. Our last task is an improvement on Task 11 which was to display the highest rating from the review table using an aggregate function, MAX(column_name). Since the result returned only one column, it is not very informative.
    | best_rating |
    | ----------- |
    | 5.0 |
    | (1 row) |

    It would be better if we can also see the actual review itself. Write a query that displays the best rating as best_rating and the description too. In order to do this correctly, we need to have a nested query or subquery. We would place this query in the WHERE clause.
    ```SQL
    SELECT column_one, column_two
    FROM table_name
    WHERE  column_one = ( SELECT MAX(column_one) from table_name );
    ```
    
    Type your last query in script.sql.

    You have completed this project by writing tables, defining constraints and relationships between tables. You have populated the tables and written interesting and challenging queries to the database.

```SQL
SELECT
  rating,
  description
FROM review
WHERE  rating = (
  SELECT MAX(rating) from review
);
```

| rating | description |
| ------ | ----------- |
| 5.0 | Would love to host another birthday party at Bytes of China! |
