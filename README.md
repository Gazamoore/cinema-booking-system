# cinema-booking-system

A simple cinema booking system created in: 

- React.js
- php 8.2.30
- sql

# why I chose these technologies

- I used Ampps instead of a LAMP stack because I was developing on Windows as opposed to Linux
- I used php 8.2 as it is still getting support, whereas 7.1 is no longer getting support

# some best practices I used

- I used password hashing to protect stored passwords in the database
- I used prepared statements with PDO to help prevent SQL injection

# installation and running instructions

- You will need to install Ampps at: https://www.ampps.com/downloads/
- you will then need to clone the repository with:
 ```bash
git clone https://github.com/Gazamoore/cinema-booking-system.git
cd cinema-booking-system
```
- You will then need to move the cloned cinema-booking-system directory inside AMPPS web root (this is usually www)
- Then you will need to cd into the frontend and run: 
```bash
cd frontend
npm install
```

- You will then need to import the database from the cinema_booking_system.sql file into http://localhost/phpmyadmin
- You will then need to configure your database connection in a .env file

- The frontend and backend should use these addresses: 
- **Frontend:** `http://localhost:5173`
- **PHP API:** `http://localhost/cinema-booking-system/backend/api/`
- ensure that the fetch() calls in the frontend match the location of where Apache serves the project

- Then to run this project, you will need to have AMPPS running
- You will then need to run the frontend by doing: 
```bash
cd frontend
npm run dev
```


