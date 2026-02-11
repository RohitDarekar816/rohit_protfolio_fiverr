#!/bin/bash

# Docker Buildx Helper Script for Multi-Platform Builds
# Supports: AMD64, ARM64, ARMv7

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BUILDER_NAME="portfolio-builder"
COMPOSE_FILE="docker-compose.yml"
BUILDX_FILE="docker-compose.buildx.yml"

# Functions
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker Buildx is available
check_buildx() {
    if ! docker buildx version &> /dev/null; then
        print_error "Docker Buildx is not installed"
        echo "Please install Docker Desktop or enable Buildx plugin"
        exit 1
    fi
    print_info "Docker Buildx is available"
}

# Create Buildx builder if not exists
create_builder() {
    if docker buildx ls | grep -q "$BUILDER_NAME"; then
        print_info "Builder '$BUILDER_NAME' already exists"
    else
        print_info "Creating new builder: $BUILDER_NAME"
        docker buildx create --name "$BUILDER_NAME" --driver docker-container --use --bootstrap
        print_info "Builder created successfully"
    fi
}

# Use the builder
use_builder() {
    docker buildx use "$BUILDER_NAME"
    print_info "Using builder: $BUILDER_NAME"
}

# Show available platforms
show_platforms() {
    print_info "Available platforms:"
    docker buildx inspect "$BUILDER_NAME" | grep "Platforms" | head -1
}

# Build for current platform only
build_local() {
    print_info "Building for current platform..."
    docker compose -f "$COMPOSE_FILE" build
    print_info "Build completed!"
}

# Build for specific platform
build_platform() {
    local platform=$1
    print_info "Building for platform: $platform"
    
    docker buildx bake -f "$COMPOSE_FILE" --set "*.platform=$platform"
    print_info "Build completed for $platform!"
}

# Build for ARM64 (common for ARM servers)
build_arm64() {
    build_platform "linux/arm64"
}

# Build for all platforms and push to registry
build_all_push() {
    print_info "Building for all platforms and pushing to registry..."
    
    # Check if registry is set
    if [ -z "$DOCKER_REGISTRY" ]; then
        print_warn "DOCKER_REGISTRY not set. Using 'localhost'"
        export DOCKER_REGISTRY="localhost"
    fi
    
    # Set default version if not set
    if [ -z "$VERSION" ]; then
        export VERSION="latest"
    fi
    
    docker buildx bake -f "$BUILDX_FILE" --push
    print_info "Multi-platform build and push completed!"
    print_info "Images pushed to: $DOCKER_REGISTRY"
}

# Build all platforms locally (no push)
build_all_local() {
    print_info "Building for all platforms (local only)..."
    docker buildx bake -f "$BUILDX_FILE"
    print_info "Multi-platform build completed!"
}

# Show help
show_help() {
    cat << EOF
Docker Buildx Helper Script for Portfolio Project

Usage: $0 [COMMAND] [OPTIONS]

Commands:
    setup               Create and configure Buildx builder
    platforms           Show available platforms
    local               Build for current platform only
    arm64               Build specifically for ARM64
    arm                 Build specifically for ARMv7
    amd64               Build specifically for AMD64
    all                 Build for all platforms locally
    push                Build and push all platforms to registry
    clean               Remove builder and cache
    help                Show this help message

Environment Variables:
    DOCKER_REGISTRY     Docker registry URL (default: localhost)
    VERSION             Image version tag (default: latest)
    NEXT_PUBLIC_API_URL API URL for frontend builds

Examples:
    # Setup buildx builder
    $0 setup

    # Build for current platform
    $0 local

    # Build for ARM64 server
    $0 arm64

    # Build and push to registry
    DOCKER_REGISTRY=your-registry.com VERSION=v1.0.0 $0 push

    # Build for all platforms locally
    $0 all

EOF
}

# Clean up
clean() {
    print_info "Removing builder: $BUILDER_NAME"
    docker buildx rm "$BUILDER_NAME" 2>/dev/null || print_warn "Builder not found"
    
    print_info "Cleaning build cache..."
    docker builder prune -f
    
    print_info "Cleanup completed!"
}

# Main command handler
main() {
    case "${1:-help}" in
        setup)
            check_buildx
            create_builder
            use_builder
            show_platforms
            ;;
        platforms)
            check_buildx
            show_platforms
            ;;
        local)
            check_buildx
            build_local
            ;;
        arm64)
            check_buildx
            create_builder
            use_builder
            build_arm64
            ;;
        arm)
            check_buildx
            create_builder
            use_builder
            build_platform "linux/arm/v7"
            ;;
        amd64)
            check_buildx
            create_builder
            use_builder
            build_platform "linux/amd64"
            ;;
        all)
            check_buildx
            create_builder
            use_builder
            build_all_local
            ;;
        push)
            check_buildx
            create_builder
            use_builder
            build_all_push
            ;;
        clean)
            clean
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
