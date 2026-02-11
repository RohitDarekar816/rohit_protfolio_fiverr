# Docker Deployment Guide

This project is fully dockerized with multi-stage builds for optimized production deployment.

## 🐳 Architecture

- **Frontend**: Next.js 16 with standalone output (193MB)
- **Backend**: Node.js + Express + Neon PostgreSQL (158MB)
- **Network**: Custom bridge network for service communication

## 📁 Docker Files Structure

```
.
├── Dockerfile                     # Frontend multi-stage build
├── .dockerignore                  # Frontend docker ignore
├── docker-compose.yml             # Orchestration
├── .env.docker.example            # Docker env template
├── next.config.ts                 # Next.js config with standalone output
└── backend/
    ├── Dockerfile                 # Backend multi-stage build
    └── .dockerignore              # Backend docker ignore
```

## 🚀 Quick Start

### 1. Environment Setup

Copy and configure your environment files:

```bash
# Backend environment
cp backend/.env.example backend/.env
# Edit backend/.env and add your DATABASE_URL

# Frontend environment
cp .env.local .env.local
# Edit .env.local and set:
# NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 2. Build and Run

```bash
# Build and start all services
docker compose up --build -d

# Or without rebuilding
docker compose up -d
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api-docs

### 4. View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f frontend
docker compose logs -f backend
```

### 5. Stop Services

```bash
# Stop gracefully
docker compose down

# Stop and remove volumes
docker compose down -v
```

## 🔧 Docker Commands

### Build Images

```bash
# Build frontend
docker build -t portfolio-frontend . --target runner

# Build backend
docker build -t portfolio-backend ./backend --target runner

# Build all with compose
docker compose build
```

### Run Containers

```bash
# Run frontend
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:3001 portfolio-frontend

# Run backend
docker run -p 3001:3001 --env-file backend/.env portfolio-backend
```

### View Image Sizes

```bash
docker images | grep portfolio
```

### Clean Up

```bash
# Remove containers
docker compose down

# Remove images
docker rmi portfolio-frontend portfolio-backend

# Remove all unused data
docker system prune -a
```

## 📊 Multi-Stage Build Benefits

### Frontend (Next.js)
- **Stage 1 (deps)**: Install dependencies
- **Stage 2 (builder)**: Build the application with all dev dependencies
- **Stage 3 (runner)**: Production image with only runtime files
- **Final Size**: ~193MB (vs ~1GB+ without optimization)

### Backend (Node.js)
- **Stage 1 (deps)**: Install production dependencies
- **Stage 2 (builder)**: Copy application code
- **Stage 3 (runner)**: Production image with only necessary files
- **Final Size**: ~158MB (vs ~500MB+ without optimization)

## 🔒 Security Features

- Non-root user execution (nodejs/nextjs)
- Minimal attack surface (only production files)
- Health checks for backend service
- No sensitive data in images (uses env files)

## 🌐 Environment Variables

### Backend
```env
DATABASE_URL=postgresql://username:password@hostname/database?sslmode=require
PORT=3001
```

### Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🔍 Troubleshooting

### Port Conflicts
If ports 3000 or 3001 are in use:
```bash
# Change in docker-compose.yml
ports:
  - "3002:3000"  # Frontend on port 3002
  - "3003:3001"  # Backend on port 3003
```

### Database Connection Issues
Ensure your Neon database allows connections from Docker containers.

### Build Failures
```bash
# Clear Docker cache
docker builder prune -f

# Rebuild without cache
docker compose build --no-cache
```

## 📦 Production Deployment

For production deployment:

1. Use proper secrets management (Docker Swarm, Kubernetes, or cloud provider)
2. Set up a reverse proxy (nginx, traefik) with SSL
3. Configure monitoring and logging
4. Use Docker Registry for image storage

Example with nginx proxy:
```yaml
# Add to docker-compose.yml
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
```

## 📈 Monitoring

Check container health:
```bash
# Backend health
curl http://localhost:3001/api/health

# Container status
docker compose ps

# Resource usage
docker stats
```

## 📝 Notes

- Images use Alpine Linux for minimal size
- Node.js 20 LTS for stability
- Health checks ensure backend availability
- Frontend waits for backend to be healthy before starting
