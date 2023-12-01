# Discover the world - Interactive Country Information Guide

This is a web application where users type in a country name as a string, and the basic information about this country is rendered back to the user.

File Sturcture: 
```
/Countries
|-- /app                     # Frontend folder
|   |-- /src               
|   |   |-- /components      # React components
|   |   |   |-- Search.js
|   |   |   |-- ToHome.js
|   |   |
|   |   |-- /pages           # React pages
|   |   |   |-- Home.js
|   |   |   |-- Result.js
|   |   |   |-- Error.js
|   |   |
|   |   |-- /styles          # CSS files
|     
|-- /server                  # Backend folder
|   |-- server.js            # Server
|
|-- README.md
```


## Getting Started (running on localhost)

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Before you begin, ensure you have the following installed:

* Node.js and npm (Node Package Manager)
* Git (for cloning the repository)

### Installing

Follow these steps to get your development environment running

1. Clone the repository:
    ```
    git clone https://github.com/Martin19999/Countries.git
    ```
1. Make a few changes to the files:
    - Open /server/server.js, make sure you have line 13 uncommented, line 15,32,38 commented
    - Open /app/.env, make sure you have the 1st URL uncommented, and 2nd URL commented
    - Open /app/package.json, make sure line 4 is 
        ```
        "proxy": "http://localhost:5000",
        ```    
1. Install the necessary packages for the frontend::
    ```
    cd [project directory name]/client
    npm install
    ```
1. Install the necessary packages for the backend::
    ```
    cd ../server
    npm install
    ```
1. Run back-end server:
    ```
    npm run dev
    ```
1. Go to app(client) folder, run the front-end application:
    ```
    cd ../app
    npm run start
    ```
1. The application should now be running on localhost. You can access the frontend at http://localhost:3000 



## Deployment

Deploying this application involves setting up both the frontend (React.js) and the backend (Express.js) to work together in production. We're using Render for deployment. Here's how you can deploy the project:

1. Make a few changes to the files (do what is opposite to running on localhost):
    - Open /server/server.js, make sure you have line 13 commented, line 15,32,38 uncommented 
    - Open /app/.env, make sure you have the 1st URL commented, and 2nd URL uncommented
    - Open /app/package.json, make sure line 4 is 
        ```
        "proxy": "https://countries-2mn9.onrender.com",
        ```
1. Backend Deployment on Render:
    - Log in to your Render dashboard and create a new Web Service
    - Connect to your GitHub repository containing the backend code
    - Configure the build settings
    - Deploy the backend service. Render will assign a URL to the backend
1. Frontend Deployment on Render:
    - Create another new Web Service on your Render dashboard for the frontend.
    - Connect it to the repository 
    - Configure the frontend's build and settings
    - Deploy the frontend service. Render will assign a URL to the frontend


## Running the tests

For testing the application, use the following commands:

### Frontend Tests with Cypress

To run end-to-end tests for the frontend:

```
cd client
npm run cypress
```

### Backend Tests with Jest

To run automated tests for the backend:

```
cd server
npm test
```


## Built With

* React.js - The frontend framework 
* Express.js - The backend framework
* Cypress - Testing for frontend
* Jest - Testing for backend


## Authors

* **Jianhao Feng** - *Initial work* - (https://github.com/Martin19999)



## Acknowledgments

* Resource: https://restcountries.com

