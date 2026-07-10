# CodeLens

An AI-powered and rule-based Code Review System that analyzes source code and GitHub repositories to identify code quality issues, security vulnerabilities, and best practice violations. The application provides automated code analysis, review reports, and an interactive dashboard for tracking review statistics.

## Features

### Authentication

* User Registration & Login
* JWT-based Authentication
* Google OAuth 2.0 Login
* GitHub OAuth 2.0 Login *(In Progress)*
* Protected API Routes
* Password Hashing using Werkzeug

### Code Review

* Upload source code files for analysis
* Analyze public GitHub repositories
* Multi-language support:

  * Python
  * Java
  * JavaScript
  * TypeScript
  * C
  * C++
  * C#
  * Go
* AI-based code quality analysis
* Security issue detection
* Code quality scoring
* Severity-based issue classification

### Dashboard

* Total Reviews
* Average Code Quality Score
* Total Issues Found
* Critical Issues Count
* Review History

### Security

* JWT Authentication
* OAuth 2.0 Authentication
* Password Hashing
* Rate Limiting using Flask-Limiter
* CORS Protection
* Environment Variable Configuration

---

# Tech Stack

## Backend

* Python
* Flask
* SQLAlchemy ORM
* SQLite *(PostgreSQL migration planned)*
* JWT
* OAuth 2.0
* Flask-Limiter
* GitPython

## Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios

---

# Project Structure

```text
Backend/
│
├── database/
│   ├── database.py
│   └── create_tables.py
│
├── models/
│   ├── user.py
│   └── review.py
│
├── routes/
│   ├── auth.py
│   ├── review.py
│   └── dashboard.py
│
├── services/
│   ├── auth_service.py
│   ├── oauth_service.py
│   ├── review_service.py
│   ├── analysis_service.py
│   └── dashboard_service.py
│
├── utils/
│   ├── jwt_handler.py
│   └── auth_decorator.py
│
├── app.py
├── requirements.txt
└── .env
```

---

# API Endpoints

## Authentication

| Method | Endpoint         | Description                              |
| ------ | ---------------- | ---------------------------------------- |
| POST   | `/auth/register` | Register a new user                      |
| POST   | `/auth/login`    | Login with email & password              |
| POST   | `/auth/google`   | Login using Google OAuth                 |
| POST   | `/auth/github`   | Login using GitHub OAuth *(Coming Soon)* |

---

## Reviews

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| POST   | `/reviews/upload`       | Upload source code        |
| POST   | `/reviews/github`       | Analyze GitHub repository |
| POST   | `/reviews/analyze/<id>` | Analyze uploaded review   |
| GET    | `/reviews`              | Fetch user reviews        |

---

## Dashboard

| Method | Endpoint     | Description                |
| ------ | ------------ | -------------------------- |
| GET    | `/dashboard` | Fetch dashboard statistics |

---

# Installation

## Clone Repository

```bash
git clone https://github.com/ASCU4/code-reviewer-sys.git
cd code-reviewer-sys
```

## Backend Setup

```bash
cd Backend

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file:

```env
SECRET_KEY=your_secret_key

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Run the server:

```bash
python app.py
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# Authentication Flow

### Email & Password

```text
User
   │
Login
   │
Password Verification
   │
JWT Generation
   │
Protected APIs
```

### Google OAuth

```text
User
   │
Google Login
   │
Google Authentication
   │
Backend Token Verification
   │
JWT Generation
   │
Protected APIs
```

---

# Future Improvements

* PostgreSQL Migration
* Docker Containerization
* CI/CD with GitHub Actions
* Swagger/OpenAPI Documentation
* Alembic Database Migrations
* Unit & Integration Testing
* AI-powered Review Suggestions
* Pull Request Review Integration
* Email Notifications
* Repository Analysis History
* Admin Dashboard

---

# Contributors

* **Dhruv Sharma**
* **Shivansh Thakur**

---

# License

This project is developed for educational and learning purposes.
