# Portfolio Backend Setup Guide

## 🚀 Quick Start

### 1. Set Up Neon Database

```bash
# Install Neon CLI if you haven't already
npm install -g neonctl

# Initialize a new Neon project
npx neonctl@latest init

# Or create a new project manually
npx neonctl projects create --name portfolio-db

# Get your connection string
npx neonctl connection-string --database-name portfolio
```

### 2. Configure Environment

```bash
cd backend

# Copy environment template
cp .env.example .env

# Edit .env with your Neon connection string
# DATABASE_URL=postgresql://username:password@hostname/database_name?sslmode=require
```

### 3. Install & Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Server will start on http://localhost:3001
# API Docs: http://localhost:3001/api-docs
```

## 📚 API Endpoints

### Blogs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | Get all blogs (with filters) |
| GET | `/api/blogs/:id` | Get blog by ID |
| GET | `/api/blogs/slug/:slug` | Get blog by slug |
| GET | `/api/blogs/categories` | Get all categories |
| POST | `/api/blogs` | Create new blog |
| PUT | `/api/blogs/:id` | Update blog |
| DELETE | `/api/blogs/:id` | Delete blog |

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check API status |

### Documentation

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api-docs` | Swagger UI documentation |

## 🔧 Environment Variables

```env
DATABASE_URL=postgresql://...  # Neon connection string
PORT=3001                       # Server port
```

## 📝 Frontend Integration

Add to your frontend `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🎨 Features

- ✅ Neon Serverless PostgreSQL
- ✅ RESTful API endpoints
- ✅ Swagger UI documentation
- ✅ CORS enabled
- ✅ Auto database initialization
- ✅ Category & tag support
- ✅ Published/draft status

## 🚢 Production Deployment

### Deploy Backend
1. Set `DATABASE_URL` to production Neon database
2. Deploy to Vercel, Railway, or Render
3. Update frontend `NEXT_PUBLIC_API_URL`

### Neon Production Setup
1. Create production branch in Neon
2. Use production connection string
3. Set up connection pooling for serverless