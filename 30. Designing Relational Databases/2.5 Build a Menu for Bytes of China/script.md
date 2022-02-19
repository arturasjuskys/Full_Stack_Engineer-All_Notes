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














