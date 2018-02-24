<<<<<<< HEAD
/$$$$$$                                           /$$     /$$
|_  $$_/                                          | $$    |__/
 | $$   /$$$$$$$  /$$    /$$ /$$$$$$  /$$$$$$$  /$$$$$$   /$$  /$$$$$$
 | $$  | $$__  $$|  $$  /$$//$$__  $$| $$__  $$|_  $$_/  | $$ /$$__  $$
 | $$  | $$  \ $$ \  $$/$$/| $$$$$$$$| $$  \ $$  | $$    | $$| $$  \ $$
 | $$  | $$  | $$  \  $$$/ | $$_____/| $$  | $$  | $$ /$$| $$| $$  | $$
/$$$$$$| $$  | $$   \  $/  |  $$$$$$$| $$  | $$  |  $$$$/| $$|  $$$$$$/
|______/|__/  |__/    \_/    \_______/|__/  |__/   \___/  |__/ \______/
=======
  ____                       _              _   ______                                     
 |  _ \                     | |            | | |  ____|                                    
 | |_) |_ __ __ _ _ __   ___| |__   ___  __| | | |__ _ __ ___  _ __ ___                    
 |  _ <| '__/ _` | '_ \ / __| '_ \ / _ \/ _` | |  __| '__/ _ \| '_ ` _ \                   
 | |_) | | | (_| | | | | (__| | | |  __/ (_| | | |  | | | (_) | | | | | |                  
 |____/|_|  \__,_|_| |_|\___|_| |_|\___|\__,_| |_|__|_|  \___/|_| |_| |_| 
                  
 |  __ \(_)                ( )                 |_   _|                                     
 | |  | |_  ___  __ _  ___ |/ ___   ___  ___     | |                                       
 | |  | | |/ _ \/ _` |/ _ \  / __| / __|/ _ \    | |                                       
 | |__| | |  __/ (_| | (_) | \__ \ \__ \ (_) |  _| |_                                      
 |_____/|_|\___|\__, |\___/  |___/ |___/\___/  |_____|                                     
                 __/ |                                                                     
      _         |___/ _     _                    _      _ _              _   _ _      _    
     | |           ( ) |   | |                  | |    (_) |            | \ | (_)    | |   
   __| | ___  _ __ |/| |_  | |__  _ __ ___  __ _| | __  _| |_   ______  |  \| |_  ___| | __
  / _` |/ _ \| '_ \  | __| | '_ \| '__/ _ \/ _` | |/ / | | __| |______| | . ` | |/ __| |/ /
 | (_| | (_) | | | | | |_  | |_) | | |  __/ (_| |   <  | | |_           | |\  | | (__|   < 
  \__,_|\___/|_| |_|  \__| |_.__/|_|  \___|\__,_|_|\_\ |_|\__|          |_| \_|_|\___|_|\_\

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
>>>>>>> backDev
