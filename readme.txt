/$$$$$$                                           /$$     /$$
|_  $$_/                                          | $$    |__/
 | $$   /$$$$$$$  /$$    /$$ /$$$$$$  /$$$$$$$  /$$$$$$   /$$  /$$$$$$
 | $$  | $$__  $$|  $$  /$$//$$__  $$| $$__  $$|_  $$_/  | $$ /$$__  $$
 | $$  | $$  \ $$ \  $$/$$/| $$$$$$$$| $$  \ $$  | $$    | $$| $$  \ $$
 | $$  | $$  | $$  \  $$$/ | $$_____/| $$  | $$  | $$ /$$| $$| $$  | $$
/$$$$$$| $$  | $$   \  $/  |  $$$$$$$| $$  | $$  |  $$$$/| $$|  $$$$$$/
|______/|__/  |__/    \_/    \_______/|__/  |__/   \___/  |__/ \______/

Before using:
*Make sure you have node installed
*Make sure you have MySQL server instaleld
*Start MySQL server with "sudo service mysql start" (on bash in windows at least)
*Create a DB called "warehouseTest" (or anything you want, but you'll have to change the name in the index.js file
*Create the table 
CREATE TABLE products(
    product_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(100), 
    category VARCHAR(100), 
    weight INT, 
    description VARCHAR(255)
);
*I would suggest downloading nodemon as it will restart the server on a detected change or when "rs" is called
	in the cmd (sudo npm install nodemon -g)

Using:
*Navigate to the main directory(Inventio)
*Either start the server with node index.js or nodemon <-- better
*Once started, go to localhost:3000