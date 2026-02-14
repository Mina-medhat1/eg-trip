-- 1. Check if database exists, create it if not
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'eg-trip')
BEGIN
    CREATE DATABASE [eg-trip];
END
GO

-- 2. Switch to the database
USE [eg-trip];
GO

-- User Entity
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        user_id INT PRIMARY KEY IDENTITY(1,1),
        f_name VARCHAR(50),
        l_name VARCHAR(50),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        role VARCHAR(20),
        phone VARCHAR(20),
        address TEXT,
        birthday DATE,
        image_path VARCHAR(255)
    );
END

-- Trip Entity
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'trip')
BEGIN
    CREATE TABLE trip (
        trip_id INT PRIMARY KEY IDENTITY(1,1),
        trip_name VARCHAR(100),
        details TEXT,
        cost DECIMAL(10, 2),
        destination_info TEXT
    );
END

-- Plan Entity (Wrapped in brackets because 'plan' is a keyword)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'plan')
BEGIN
    CREATE TABLE [plan] (
        plan_id INT PRIMARY KEY IDENTITY(1,1),
        plan_description TEXT,
        cost DECIMAL(10, 2),
        offer_price DECIMAL(10, 2)
    );
END

-- Review Entity
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'review')
BEGIN
    CREATE TABLE review (
        review_id INT PRIMARY KEY IDENTITY(1,1),
        rating INT,
        description TEXT,
        created_at DATETIME DEFAULT GETDATE()
    );
END

-- Gallery Plan
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'gallery_plan')
BEGIN
    CREATE TABLE gallery_plan (
        image_path VARCHAR(255) PRIMARY KEY,
        plan_id INT,
        FOREIGN KEY (plan_id) REFERENCES [plan](plan_id)
    );
END

-- Gallery Trip
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'gallery_trip')
BEGIN
    CREATE TABLE gallery_trip (
        image_path VARCHAR(255) PRIMARY KEY,
        trip_id INT,
        FOREIGN KEY (trip_id) REFERENCES trip(trip_id)
    );
END

-- Payment Entity
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'payment')
BEGIN
    CREATE TABLE payment (
        payment_id INT PRIMARY KEY IDENTITY(1,1),
        payment_method VARCHAR(50),
        payment_status VARCHAR(50),
        amount DECIMAL(10, 2),
        created_at DATETIME DEFAULT GETDATE()
    );
END

-- Booking Table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'booking')
BEGIN
    CREATE TABLE booking (
        booking_id INT PRIMARY KEY IDENTITY(1,1),
        booking_status VARCHAR(50),
        start_date DATE,
        end_date DATE,
        destination VARCHAR(100),
        cost DECIMAL(10, 2),
        user_id INT,
        plan_id INT,
        trip_id INT,
        payment_id INT,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (plan_id) REFERENCES [plan](plan_id),
        FOREIGN KEY (trip_id) REFERENCES trip(trip_id),
        FOREIGN KEY (payment_id) REFERENCES payment(payment_id)
    );
END