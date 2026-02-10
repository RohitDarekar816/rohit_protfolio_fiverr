# Portfolio Backend API

This is the backend API for Rohit Darekar's portfolio website, built with Express.js and Neon Serverless PostgreSQL.

## Features

- 📝 Blog management (CRUD operations)
- 🗄️ Neon Serverless PostgreSQL database
- 📚 Swagger UI API documentation
- 🔍 Search and filter blogs
- 🏷️ Category and tag support
- 🚀 RESTful API endpoints

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and update it with your Neon database credentials:

```bash
cp .env.example .env
```

Update `.env` with your Neon connection string:
```env
DATABASE_URL=postgresql://username:password@hostname/database_name?sslmode=require
PORT=3001
```

### 3. Set Up Neon Database

1. Go to [Neon](https://neon.tech) and create an account
2. Create a new project
3. Get your connection string from the dashboard
4. Add it to your `.env` file

### 4. Initialize Database

The database tables will be created automatically when you start the server for the first time.

### 5. Run the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:3001/api-docs

## API Endpoints

### Blogs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | Get all blogs |
| GET | `/api/blogs/:id` | Get blog by ID |
| GET | `/api/blogs/slug/:slug` | Get blog by slug |
| GET | `/api/blogs/categories` | Get all categories |
| POST | `/api/blogs` | Create new blog |
| PUT | `/api/blogs/:id` | Update blog |
| DELETE | `/api/blogs/:id` | Delete blog |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check API status |

## Query Parameters

### GET /api/blogs

- `published` (boolean): Filter by published status
- `category` (string): Filter by category
- `limit` (integer): Number of items to return (default: 10)
- `offset` (integer): Number of items to skip (default: 0)

Example:
```
GET /api/blogs?published=true&category=DevOps&limit=5
```

## Blog Schema

```json
{
  "id": 1,
  "title": "Getting Started with Docker",
  "slug": "getting-started-with-docker",
  "excerpt": "A comprehensive guide to Docker containers",
  "content": "Full blog content here...",
  "author": "Rohit Darekar",
  "category": "DevOps",
  "tags": ["docker", "containers", "devops"],
  "featured_image": "https://example.com/image.jpg",
  "published": true,
  "created_at": "2026-02-10T10:00:00Z",
  "updated_at": "2026-02-10T10:00:00Z"
}
```

## Neon CLI Commands

Initialize Neon project:
```bash
npx neonctl@latest init
```

Create a new branch:
```bash
npx neonctl branches create --name my-branch
```

Get connection string:
```bash
npx neonctl connection-string --database-name mydb
```

## Development

The backend will automatically:
- Initialize the database on first run
- Create the `blogs` table if it doesn't exist
- Handle connection pooling with Neon serverless

## Production Deployment

1. Set up environment variables on your hosting platform
2. Use the production Neon database connection string
3. Deploy the backend
4. Update your frontend to use the production API URL