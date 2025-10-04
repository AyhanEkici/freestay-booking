# freestay-booking
Advanced hotel booking platform with voucher management system

# Freestay Booking Platform

Advanced hotel booking platform with voucher management system.

## Features
- Hotel search and booking
- Advanced voucher system with dynamic pricing
- Commission removal functionality
- Vendor management system
- Individual user environments
- Competitor price monitoring
- Role-based access control

## Getting Started

### Prerequisites
- Docker Desktop installed
- Git installed

### Installation
1. Clone this repository
2. Create .env file from .env.example
3. Run: `docker-compose up --build`
4. Access the application at http://localhost:3000

### Environment Variables
Create a .env file with:
- SUNHOTELS_API_KEY: Your SunHotels API key
- STRIPE_SECRET_KEY: Your Stripe secret key
- STRIPE_PUBLISHABLE_KEY: Your Stripe publishable key
- JWT_SECRET: Your JWT secret key
- DATABASE_URL: PostgreSQL connection string
- REDIS_URL: Redis connection string

## Architecture
- Frontend: React.js with Material-UI
- Backend: Node.js with Express
- Database: PostgreSQL with TimescaleDB
- Cache: Redis
- Deployment: Docker containers
