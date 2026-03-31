# English Tutor Resource Center (web_project_eng_tutor)

Full stack web application built with node.js, react.js, mongodb both REST and graphql. 

This project serves as a comprehensive platform for finding English tutors, booking lessons, and managing content via an admin panel. It adheres to a strict Separation of Concerns (SoC) principle by maintaining a distinct three-tier architecture.

---

## Key Features

* **Role-Based Access Control:** Supports three distinct user roles: `student`, `tutor`, and `admin`.
* **Dual API Integration:** The frontend seamlessly interacts with the backend using both traditional REST API (via `axios`) and GraphQL (via `@apollo/client`).
* **Secure Authentication:** Features password hashing using `bcryptjs`, JWT-based authorization, and email confirmation via `nodemailer`.
* **Admin Dashboard:** Comprehensive CRUD operations for managing users and bookings. Updates to the UI happen dynamically via AJAX without page reloads.
* **Data Validation:** Client-side validation using regular expressions and `libphonenumber-js`, combined with robust server-side Mongoose schema validation.
* **Security Measures:** Protected against common vulnerabilities using `helmet` and `express-mongo-sanitize`.

---

## Project Structure
```
web_project_eng_tutor/
├── client/                 # React Frontend
│   ├── public/             
│   ├── src/
│   │   ├── api/            # Apollo Client and Axios configurations, GraphQL queries
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Main application views (AdminPanel, Register, etc.)
│   │   └── App.jsx         # App routing and layout
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── controllers/    # REST API logic (auth, admin, etc.)
│   │   ├── graphql/        # GraphQL type definitions and resolvers
│   │   ├── models/         # Mongoose database schemas
│   │   ├── routes/         # Express router configurations
│   │   ├── uploads/        # Local storage for user-uploaded media (must be created)
│   │   └── server.js       # Entry point
│   └── package.json
└── README.md
```
---

## Tech Stack

### Frontend (Client)
* **Core:** React.js (v19)
* **Routing:** `react-router-dom`
* **State Management & API:** `@apollo/client`, `axios`
* **Styling & UI:** Bootstrap, `react-phone-input-2`

### Backend (Server)
* **Core:** Node.js, Express
* **GraphQL:** `@apollo/server`, `graphql`
* **Database:** MongoDB, Mongoose
* **Utilities:** `multer` (file uploads), `nodemailer` (emails)

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd web_project_eng_tutor
```

### 2. Backend Setup

```bash
cd server
npm install
```

### Environment Variables (.env)
Create a .env file in the root of the server directory. The application relies on dotenv to load these variables. Add the following configurations:

```.env
SELECT_API = 
PORT =
MONGODB_URI =
EMAIL_USERNAME =
EMAIL_PASS =
NODE_ENV =
CLIENT_URL =
JWT_SECRET =
```

### The uploads Directory
The application uses multer to handle image uploads. You must manually create a directory to store these files, as empty folders might not be tracked by Git.
Make sure the following path exists: server/src/uploads/.

### Start a server
```bash
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm start
```

*This project was developed as a university coursework demonstrating Full Stack development skills with React, Node.js, REST and GraphQL.*