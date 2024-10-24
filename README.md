# Project Title: Full-Stack Application with React, Node.js, and MongoDB

This is a full-stack application built using **React (TypeScript with SWC and Vite)** on the client side and **Node.js** (with TypeScript) on the server side. The database used for data storage is **MongoDB**. This application performs CRUD operations using REST APIs, role-based access control for User/Admin without login, and a sync button to fetch data back to its original API.

## Table of Contents
- [Project Title: Full-Stack Application with React, Node.js, and MongoDB](#project-title-full-stack-application-with-react-nodejs-and-mongodb)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
    - [Client (React)](#client-react)
    - [Server (Node.js)](#server-nodejs)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Setup](#environment-setup)
  - [Folder Structure](#folder-structure)
  - [Features](#features)
    - [Front-end (React)](#front-end-react)
    - [Back-end (Node.js)](#back-end-nodejs)
  - [Available Scripts](#available-scripts)
    - [Client](#client)
    - [Server](#server)
  - [API Endpoints](#api-endpoints)
    - [CRUD Operations](#crud-operations)
    - [Sync Button Endpoint](#sync-button-endpoint)
  - [Role-based Access](#role-based-access)

## Technologies Used
### Client (React)
- React (TypeScript, SWC)
- Vite (as build tool)
- TailwindCSS (for styling)

### Server (Node.js)
- Node.js (with TypeScript)
- Express.js (for REST APIs)
- MongoDB (database)
- Mongoose (MongoDB object modeling)

## Getting Started
### Prerequisites
- Node.js and npm installed on your system
- MongoDB server running locally or accessible remotely

### Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies for both the client and server:
   ```sh
   # Client
   cd client
   npm install

   # Server
   cd ../server
   npm install
   ```

### Environment Setup
Create a `.env` file in the `server` directory to specify the following variables:
```env
MONGO_URI=<your-mongodb-connection-string>
PORT=5000
```

## Folder Structure
```
project-root/
├── client/               # React front-end (Vite setup)
│   ├── src/
│   ├── public/
│   ├── tsconfig.json
│   └── ...
│
├── server/               # Node.js back-end
│   ├── src/
│   │   ├── controllers/  # CRUD logic for each route
│   │   ├── models/       # Mongoose models for MongoDB
│   │   ├── routes/       # API routes
│   │   └── ...
│   ├── tsconfig.json
│   └── ...
│
└── README.md
```

## Features
### Front-end (React)
- Built using **React with TypeScript** for type safety.
- **Role-based Access** with random assignment of User/Admin roles without login.
- **SWC and Vite** used for fast bundling and compilation.
- A **Sync Button** to sync the database with an external API, refilling the database.
- **CRUD Operations** to create, update, and delete records in the database.

### Back-end (Node.js)
- Node.js server built using **Express.js** and **TypeScript**.
- **CRUD APIs**:
  - **Get** API to retrieve data from the database.
  - **Post** API to add new data to the database.
  - **Put** API to update existing records.
  - **Delete** API to remove records.
- **MongoDB** used for data storage, with Mongoose as the ODM.

## Available Scripts
### Client
In the `client` directory, you can run:
```sh
npm run dev      # Start the development server
npm run build    # Build the application for production
npm run preview  # Preview the production build
```

### Server
In the `server` directory, you can run:
```sh
npm run dev      # Start the server in development mode
npm run build    # Compile TypeScript to JavaScript
npm run start    # Start the compiled server
```

## API Endpoints
### CRUD Operations
- **GET /api/data**: Retrieve all records from the database.
- **POST /api/data**: Add a new record to the database.
- **PUT /api/data/:id**: Update a specific record in the database.
- **DELETE /api/data/:id**: Delete a specific record from the database.

### Sync Button Endpoint
- **GET /api/sync**: Sync the database back to its original state by fetching data from the original API.

## Role-based Access
- **Random Role Assignment**: On the client side, a random button click will assign either **User** or **Admin** roles.
- **Role Functionality**:
  - **User**: Can view data.
  - **Admin**: Can view, add, edit, and delete data.
- The assigned role will be passed down to the back-end API to restrict the access accordingly.



