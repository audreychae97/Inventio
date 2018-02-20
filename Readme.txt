Create a directory/folder on your local drive

Copy the clone URL for audreychae97/inventio/backendDiego (should be the same clone URL as master branch)

Clone all of the files to the directory made earlier ...




Go to the folder that contains the .json files and run 'npm install' (without the quotes). This will download all of the 
npm dependencies for you.

In atom (or whatever), open up the folder that contains everything. In no particular folder, create a new file and name it .env

in .env, copy paste this: 

 NODE_ENV=DEVELOPMENT

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=   PUT YOUR VAUES HERE
DB_NAME= PUT YOUR DB NAME HERE 


This is because the db.js configuration uses information from the .env file during the database connection. Good practice!

Then, create a MySQL database based on the schema written in the schema.txt file you pulled from the repository.

npm start -> localhost:3000 -> register -> check your DB to see if registration was succesful -> login

:) Contact Diego if you have any questions.



Common errors:
Durng npm install, you may get a few ERR! Just ignore it for now, complete the steps above... and if you still get errors, chec again.


TBD: 
May need to donwload a passport library? Not sure yet. TBD 

