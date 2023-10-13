NoteMaker Web App
The NoteMaker Web App is a feature-rich web application that allows users to create, read, update, and delete notes. It also includes user authentication features, such as signup and signin.

Getting Started
To run the program, follow these simple steps:

Step 1: Clone the Repository

Step 2: Create an Environment File
Create a .env file in the backend folder as the root. This file should contain the following environment variables:
Mongo_URI=<Your_MongoDB_Connection_String>
PORT=3002
Server_Secret=<Your_Secret_Key>
Expire_Cookies=2
Expire_Token=1d


Step 3: Install Dependencies
In two separate terminal windows, navigate to both the backend and webapp directories, and run the following command in each to install dependencies:
npm install


Step 4: Start the Backend Server
In the backend directory, start the server:
npm start

Step 5: Launch the Web App
The web app will be accessible at your chosen URL.

Features
Note Management: Create, read, update, and delete notes.
User Authentication: Sign up and sign in to manage your notes.
Directory Structure
Here's an overview of the directory structure:

backend/: Backend server code.
webapp/: Frontend web application code.
