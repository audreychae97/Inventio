/$$$$$$                                           /$$     /$$
|_  $$_/                                          | $$    |__/
 | $$   /$$$$$$$  /$$    /$$ /$$$$$$  /$$$$$$$  /$$$$$$   /$$  /$$$$$$
 | $$  | $$__  $$|  $$  /$$//$$__  $$| $$__  $$|_  $$_/  | $$ /$$__  $$
 | $$  | $$  \ $$ \  $$/$$/| $$$$$$$$| $$  \ $$  | $$    | $$| $$  \ $$
 | $$  | $$  | $$  \  $$$/ | $$_____/| $$  | $$  | $$ /$$| $$| $$  | $$
/$$$$$$| $$  | $$   \  $/  |  $$$$$$$| $$  | $$  |  $$$$/| $$|  $$$$$$/
|______/|__/  |__/    \_/    \_______/|__/  |__/   \___/  |__/ \______/


Warehouse management system

==How to use:==

#Before:#
-Make sure you have MySQL Server up and running
-Create a new database using CREATE Database <name> (mine is called firsttestdb,
  so if you call it anything else you have to change that in the code in testForm.js
  @ line 10)
-Select that database by using USE <name_of_db>
-Create a book table:

CREATE TABLE books(
id int(10) unsigned NOT NULL AUTO_INCREMENT,
title varchar(255) NOT NULL,
author varchar(255) NOT NULL,
price decimal(10,2) NOT NULL,
PRIMARY KEY (id)
)

Insert some stuff into it
INSERT INTO books (id, title, author, price) VALUES (1, 'GoodBook', 'BadAuthor', 9.99)
...

-Make sure you have node installed and can call it through your system(type node
  into bash or terminal to make sure you have it installed)
-yee

==Using testForm.js==
Currently the only semi working hacked together pos

-Again, make sure you have MySQL server running
-Navigate to the folder where you downloaded the dev branch and call
 node formTest.js
-Go to web browser and type in localhost:3000 and you should be displayed with
 the index.html with 4 textboxes and 2 buttons
 -Currently the submit is hardcoded at line 48, line 46 is what we want to get working
 -Other button reads everything currently in the books table and posts it in JSON form
