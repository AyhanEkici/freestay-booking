-- Create extensions
CREATE EXTENSION IF NOT EXISTS timescaledb;

-- Users table with role-based access
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'customer',
    permissions JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User environments table
CREATE TABLE user_environments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    dashboard_config JSONB DEFAULT '{}',
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vendors table
CREATE TABLE vendors (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    assigned_vouchers_count INTEGER DEFAULT 0,
    sales_performance JSONB DEFAULT '{}',
    commission_rate DECIMAL(5,2) DEFAULT 0.10,
    territory VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vouchers table
CREATE TABLE vouchers (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    validity_start TIMESTAMP NOT NULL,
    validity_end TIMESTAMP NOT NULL,
    usage_limit INTEGER DEFAULT 1,
    current_uses INTEGER DEFAULT 0,
    assigned_to_vendor INTEGER REFERENCES users(id),
    created_by_admin INTEGER REFERENCES users(id),
    purchased_by_user INTEGER REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'active',
    voucher_type VARCHAR(50) DEFAULT 'single_use',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    hotel_id VARCHAR(100) NOT NULL,
    voucher_used INTEGER REFERENCES vouchers(id),
    net_price DECIMAL(10,2) NOT NULL,
    commission_amount DECIMAL(10,2) DEFAULT 0,
    markup_amount DECIMAL(10,2) DEFAULT 0,
    booking_fee DECIMAL(10,2) DEFAULT 9.95,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    adults INTEGER DEFAULT 1,
    children INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_vouchers_code ON vouchers(code);
CREATE INDEX idx_vouchers_status ON vouchers(status);
CREATE INDEX idx_vouchers_validity ON vouchers(validity_start, validity_end);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
