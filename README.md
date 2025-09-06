## Bazar Solidário
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Badge"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Badge"> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Badge"> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Badge">

This is a complete web application for a Charity Bazaar, built with the MERN stack (MongoDB, Express, React, Node.js). The application allows users to register, log in, and then donate or buy items.

🚀 Key Features
- User Authentication: Secure registration and login with credential validation.

- Item Management: View, create, and manage items for sale or donation.

- Image Uploads: Users can upload images to showcase items.

- Data Storage: Utilizes MongoDB for robust data persistence.

- Secure API: Authentication of protected routes via JWT (JSON Web Tokens).
---
💻 Tech Stack
- Backend: Node.js, Express, Mongoose, JWT, bcryptjs, Multer

- Frontend: React, Axios

- Database: MongoDB

- Containerization: Docker and Docker Compose
---
⚙️ How to Run the Project
Follow these steps to get the complete application running on your local machine.

## Prerequisites
Make sure you have the following installed:

- <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Badge"> Node.js (version 14+)

- <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="NPM Badge"> npm

- <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Badge"> Docker and Docker Compose

## Start the Database
Open your terminal in the project's root directory (/bazar_solidario) and run:

```bash

docker-compose up -d
```
## Configure and Start the Backend
Open a new terminal and navigate to the backend folder.

Install dependencies:

```bash

npm install

```
## Configure environment variables: Create a .env file in the backend folder with the following variables:
```bash
MONGO_URI=mongodb://localhost:27017/bazar_solidario
JWT_SECRET=your_secret_key_here
PORT=5000
```
## Create the uploads folder:

```bash

mkdir uploads
```
## Start the server:

```bash

npm run dev
```
## Start the Frontend
Open a third terminal and navigate to the frontend folder.

Install dependencies:

```bash

npm install
```
## Start the application:


```bash

npm start
```
The application will start and open in your browser, usually at ```bash http://localhost:3000.```

