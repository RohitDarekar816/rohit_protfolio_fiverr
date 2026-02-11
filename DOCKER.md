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
├── docker-compose.yml             # Orchestration with Buildx support
├── docker-compose.buildx.yml      # Multi-platform production builds
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

---

## 🏗️ Docker Buildx & ARM Support

This project includes full Docker Buildx support for building multi-platform images that work on ARM servers (Raspberry Pi, AWS Graviton, Apple Silicon, etc.).

### Supported Platforms

- **linux/amd64** - Standard x86_64 servers
- **linux/arm64** - ARM64 servers (AWS Graviton, Apple Silicon)
- **linux/arm/v7** - ARMv7 32-bit (Raspberry Pi 3/4)

### Quick Start with Buildx

#### 1. Create a Buildx Builder (First Time Only)

```bash
# Create a new builder instance with multi-platform support
docker buildx create --name multiplatform --use --bootstrap

# Verify builder supports your platforms
docker buildx inspect --bootstrap
```

#### 2. Build for Current Platform (Development)

```bash
# Standard docker compose build (uses Buildx automatically)
docker compose up --build -d
```

#### 3. Build for Specific Platform (ARM Server)

```bash
# Build specifically for ARM64
docker buildx bake -f docker-compose.yml --set *.platform=linux/arm64

# Or build for multiple platforms locally
PLATFORM=linux/arm64 docker compose build
```

#### 4. Build and Push Multi-Platform Images (Production)

```bash
# Build and push to registry for all platforms
docker buildx bake -f docker-compose.buildx.yml --push

# With custom registry and version
DOCKER_REGISTRY=your-registry.com VERSION=v1.0.0 \
  docker buildx bake -f docker-compose.buildx.yml --push
```

### Buildx Commands Reference

```bash
# Build for current platform only
docker compose build

# Build for specific platform
docker buildx build --platform linux/arm64 -t portfolio-backend ./backend

# Build for multiple platforms
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 \
  -t portfolio-backend ./backend

# Build and load to local Docker (single platform only)
docker buildx build --platform linux/arm64 --load -t portfolio-backend ./backend

# Build and push to registry (multi-platform)
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 \
  --push -t your-registry.com/portfolio-backend ./backend
```

### Docker Compose with Buildx

#### Using docker-compose.yml (Local Development)

The main `docker-compose.yml` includes buildx configuration:

```yaml
services:
  backend:
    build:
      platforms:
        - linux/amd64
        - linux/arm64
        - linux/arm/v7
      cache_from:
        - type=local,src=/tmp/.buildx-cache-backend
      cache_to:
        - type=local,dest=/tmp/.buildx-cache-backend,mode=max
```

#### Using docker-compose.buildx.yml (Production)

For production builds with registry push:

```bash
# Set your registry
export DOCKER_REGISTRY=your-registry.com
export VERSION=v1.0.0
export NEXT_PUBLIC_API_URL=https://api.yourdomain.com

# Build and push all platforms
docker buildx bake -f docker-compose.buildx.yml --push
```

### ARM Server Deployment

#### Option 1: Build on ARM Server (Recommended)

```bash
# On your ARM server, clone the repo
git clone <your-repo>
cd rohit_protfolio_fiverr

# Setup environment
cp backend/.env.example backend/.env
# Edit backend/.env with your DATABASE_URL

cp .env.local.example .env.local
# Edit .env.local with your API_URL

# Build and run (automatically uses ARM architecture)
docker compose up --build -d
```

#### Option 2: Cross-Build on x86, Deploy on ARM

```bash
# On your x86 development machine:
# Build multi-platform images and push to registry
docker buildx bake -f docker-compose.buildx.yml --push

# On your ARM server:
# Pull and run pre-built images
docker pull your-registry.com/portfolio-backend:latest
docker pull your-registry.com/portfolio-frontend:latest

# Update docker-compose.yml to use pre-built images
docker compose -f docker-compose.prod.yml up -d
```

### Platform-Specific Optimizations

#### For Raspberry Pi (ARMv7/ARM64)

```bash
# Use buildx with cache to speed up builds on slower devices
docker buildx build \
  --platform linux/arm/v7 \
  --cache-from type=local,src=/tmp/.buildx-cache \
  --cache-to type=local,dest=/tmp/.buildx-cache,mode=max \
  -t portfolio-backend ./backend
```

#### For AWS Graviton (ARM64)

```bash
# Optimized for ARM64 with better performance
docker buildx build \
  --platform linux/arm64 \
  --build-arg BUILDKIT_INLINE_CACHE=1 \
  -t portfolio-backend ./backend
```

### Troubleshooting Buildx

#### Error: "Multiple platforms feature is currently not supported for docker driver"

```bash
# Create a builder with docker-container driver
docker buildx create --name multiplatform --driver docker-container --use --bootstrap

# Now build with multiple platforms
docker buildx build --platform linux/amd64,linux/arm64 -t test .
```

#### Slow Builds on ARM

```bash
# Use cache mounts in Dockerfile
RUN --mount=type=cache,target=/root/.npm \
    npm install

# Or use Buildx cache
docker buildx build --cache-from type=local,src=/tmp/cache --cache-to type=local,dest=/tmp/cache .
```

#### Verify Image Platform

```bash
# Check what platform an image supports
docker manifest inspect portfolio-backend:latest

# Or after pulling
docker inspect portfolio-backend:latest | grep Architecture
```

### CI/CD with Buildx

#### GitHub Actions Example

```yaml
name: Build and Push Multi-Platform Images

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up QEMU
      uses: docker/setup-qemu-action@v2
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to Registry
      uses: docker/login-action@v2
      with:
        registry: your-registry.com
        username: ${{ secrets.REGISTRY_USERNAME }}
        password: ${{ secrets.REGISTRY_PASSWORD }}
    
    - name: Build and Push
      run: |
        docker buildx bake -f docker-compose.buildx.yml --push
```

### Performance Comparison

| Platform | Build Time | Image Size | Notes |
|----------|-----------|------------|-------|
| linux/amd64 | ~60s | 193MB | Standard x86_64 |
| linux/arm64 | ~90s | 187MB | AWS Graviton, M1/M2 Macs |
| linux/arm/v7 | ~120s | 185MB | Raspberry Pi 3/4 |

### Best Practices for ARM

1. **Use Native Builds When Possible**: Build directly on ARM servers for faster builds
2. **Leverage Caching**: Use Buildx cache to speed up subsequent builds
3. **Test on Target Platform**: Always test images on the actual ARM device
4. **Use Specific Tags**: Tag images with platform info (e.g., `backend:arm64-v1.0.0`)
5. **Monitor Resource Usage**: ARM devices often have less RAM, adjust Node.js memory limits if needed

### Resources

- [Docker Buildx Documentation](https://docs.docker.com/buildx/working-with-buildx/)
- [Multi-platform Builds](https://docs.docker.com/build/building/multi-platform/)
- [Docker Bake](https://docs.docker.com/build/bake/)
