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
Base URL: /auth

Method	Endpoint	Access	Description
POST	https://task-management-732l.onrender.com/auth/register	Public	Register new user
POST	https://task-management-732l.onrender.com/auth/login	Public	Login user
POST	https://task-management-732l.onrender.com/auth/refresh	Public	Refresh access token
POST	https://task-management-732l.onrender.com/auth/logout	Protected	Logout user
📋 Task Routes

Base URL: /tasks

All routes require authentication.

Method	Endpoint	Access	Description
POST	https://task-management-732l.onrender.com/tasks  	        Admin	Create task
GET	    https://task-management-732l.onrender.com/tasks 	        Authenticated	Get tasks
PUT	    https://task-management-732l.onrender.com/tasks/:id	        Authenticated	Update task
DELETE	https://task-management-732l.onrender.com/tasks/:id	        Admin	Delete task
PUT	    https://task-management-732l.onrender.com/tasks/:id/assign	Admin	Assign task