# 🚀 Open Claw API

A modular **NestJS backend system** for managing users, agents, work items, and transfer cases with JWT authentication and scope-based authorization (RBAC).

---

## 📌 Description

This project extends the NestJS starter and provides a real-world backend system with:

- User management
- Agent context system
- Work item workflow
- Transfer case handling
- JWT authentication
- Scope-based authorization
- Docker support
- Audit Logging (tracks API requests, responses, errors for monitoring & debugging)

---

## 🏗️ Tech Stack

- NestJS
- MySQL
- JWT (Passport)
- Swagger
- Docker
- TypeORM

---

## 📖 Swagger Docs
- /docs

## 🔑 Auth

### Login
- `POST /auth/login`



## 📡 API Endpoints

### Users
- `GET /users`
- `POST /users`

### Agent
- `GET /api/internal/openclaw/v1/agent`
- `GET /api/internal/openclaw/v1/agent/context?agentName=`

### Work Items
- `GET /api/internal/openclaw/v1/work-items`
- `POST /api/internal/openclaw/v1/work-items`

### Transfer Cases
- `GET /api/internal/openclaw/v1/transfer-cases`


# ⚙️ Environment Variables

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306V
DB_USERNAME=admin
DB_PASSWORD=your_password
DB_DATABASE=open_claw

JWT_SECRET=your_secret
```

## 🚀 Setup
```bash
npm install
npm run start:dev
```

## 📦 Seeder
```bash
npm run seed
```

## 🐳 Docker
```bash
docker build -t open-claw-api .
docker run -p 3000:3000 --env-file .env open-claw-api
```

## 📁 Project Structure
```bash
src/
 ├── auth/
 ├── users/
 ├── agent/
 ├── work-items/
 ├── transfer-cases/
```