# University Management System

A comprehensive University Management System built using Node.js, Express.js, and Mongoose.

## Table of Contents

- [Introduction](#introduction)
- [Project Requirements](#project-requirements)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Resources](#resources)

## Introduction

This University Management System is designed to streamline various administrative and academic tasks within a university. It offers functionalities like student and faculty management, course scheduling, grade tracking, and more.

## Project Requirements

The following requirements were considered during the development of this system:

- **Node.js:** This project is built using Node.js as the runtime environment.
- **Express.js:** Express.js is used for handling server-side logic and routing.
- **Mongoose:** Mongoose is employed as an ODM (Object-Document Mapping) library for MongoDB.
- **MongoDB:** MongoDB is used as the database to store university-related data.
- **Authentication:** Implement user authentication for secure access to the system.
- **Authorization:** Define user roles and permissions for different system features.
- **API Documentation:** Provide clear API documentation for developers to understand how to interact with the system.

## Dependencies

To run this project, you need to have the following dependencies installed on your system:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm (Node Package Manager): Included with Node.js installation
- MongoDB: [Download MongoDB](https://www.mongodb.com/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/0xNaim/university-management.git
   ```

2. **Navigate to the project directory:**

    ```bash
    cd university-management
    ```

3. **Install Node.js dependencies:**

    ```bash
    npm install
    ```

4. **Configure Environment Variables:**

    - Create a `.env` file in the root directory.
    - Define environment variables such as database connection URL, Node Environment, default Student password, Bcrypt salt rounds etc.

    Note: Check `.env.example` file for all required environments.

## Usage

1. **Run the Application:**

    ```bash
    npm start
    ```

2. **Access the Application:**

    Open your web browser and visit http://localhost:4000 to access the University Management System.

## Resources

Requirement Analysis: [Notion.so](https://www.notion.so/0xnaim/University-Management-System-9f103a026db04aa086c8f74c45ad8678?pvs=4)

ER Diagram: [Draw.io](https://drive.google.com/file/d/1X2TZPuwIFKoqubz3fHX6PPl24XtIgZft/view?usp=sharing)

Swagger API Docs: [Swagger.io](https://app.swaggerhub.com/apis/Brain-Trust/University-Mangement-System/1.0.0)
