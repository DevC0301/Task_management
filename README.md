Task Management API

A secure and scalable Task Management REST API built with Node.js and Express.js.
This API supports:
User Authentication (Register, Login, Refresh Token, Logout)
Role-Based Authorization (Admin & User)
Task CRUD Operations
Task Assignment
JWT Authentication
Rate Limiting for Security

What This Project Does
The Task Management API allows users to:

Authentication
Register new accounts
Login securely
Receive Access & Refresh tokens
Refresh expired access tokens
Logout securely

Task Management

Admins can create tasks
Users can view tasks
Users can update tasks
Admins can delete tasks
Admins can assign tasks to users

Tech Stack
Node.js
Express.js
JWT (JSON Web Token)
Role-Based Access Control (RBAC)
Express Rate Limit
Middleware Architecture


Authentication Routes
Base URL: /api/auth

Method	Endpoint	Access	Description
POST	/register	Public	Register new user
POST	/login	Public	Login user
POST	/refresh	Public	Refresh access token
POST	/logout	Protected	Logout user
📋 Task Routes

Base URL: /api/tasks

All routes require authentication.

Method	Endpoint	Access	Description
POST	/	Admin	Create task
GET	/	Authenticated	Get tasks
PUT	/:id	Authenticated	Update task
DELETE	/:id	Admin	Delete task
PUT	/:id/assign	Admin	Assign task