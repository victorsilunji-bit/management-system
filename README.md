# Scania Spare Parts Management System

A web-based inventory and sales management system designed to help manage the day-to-day operations of a spare parts business.

The system provides functionality for managing spare parts, inventory, purchases, sales, customers, suppliers, staff accounts, payments, and reports.

---

## 📌 Project Overview

The Scania Spare Parts Management System was developed to replace manual stock and sales record keeping with a centralized digital system.

The system allows authorized users to:

* Manage spare parts and inventory
* Record purchases and automatically update stock
* Record sales and automatically reduce stock
* Manage customers and suppliers
* Manage staff accounts and roles
* Track pending and unpaid customer sales
* Receive and record customer payments
* Monitor stock levels
* Generate inventory and sales reports
* Control access based on user roles

---

## 🚀 Main Features

### 1. Dashboard

The dashboard provides an overview of the business, including:

* Total spare parts
* Total stock
* Low-stock items
* Total sales
* Total purchases
* Total customers
* Total suppliers
* Today's sales
* Recent inventory

---

### 2. Inventory Management

The inventory module allows users to:

* Add spare parts
* Edit spare parts
* View available stock
* Monitor minimum stock levels
* Track warehouse locations
* Manage selling and purchase prices
* Store spare part numbers
* Store barcodes
* Track stock availability

The system also helps identify items that are running low.

---

### 3. Purchase Management

The purchase module allows authorized users to:

* Create purchases
* Select suppliers
* Select employees
* Add spare parts to purchases
* Enter quantities
* Enter purchase prices
* Calculate purchase totals

Purchases are connected to inventory so that stock can be updated when new parts are received.

---

### 4. Sales Management

The sales module allows users to:

* Create sales
* Select customers
* Select employees
* Select spare parts
* Enter quantities
* Enter selling prices
* Apply discounts
* Calculate sale totals
* Track sale status
* Record payment methods

Sales are connected to inventory so that stock is reduced when parts are sold.

---

### 5. Customer Credit / Pending Sales

The system supports customers who take spare parts before making full payment.

A sale can be marked as pending and tracked using:

* Total amount
* Amount paid
* Balance
* Payment status

Example:

```text
Total Amount:   ZMW 5,000
Amount Paid:    ZMW 2,000
Balance:        ZMW 3,000
Status:         Partially Paid
```

---

### 6. Payments Management

The Payments module allows staff to manage outstanding customer balances.

Users can:

* View unpaid sales
* View partially paid sales
* See customer balances
* Receive payments
* Update amount paid
* Automatically calculate remaining balance
* Mark a sale as Paid when the balance reaches zero

Payment status can include:

```text
Unpaid
Partially Paid
Paid
```

---

### 7. Staff Management

Administrators can manage system users.

Features include:

* Add staff members
* Edit staff information
* Assign roles
* Activate users
* Deactivate users
* Reset passwords
* Manage usernames
* Control access to system modules

---

### 8. Role-Based Access Control

The system uses different user roles to restrict access to features.

Current roles include:

* **Administrator**
* **Manager**
* **Storekeeper**
* **Salesperson**

Each role has different permissions depending on the responsibilities of the user.

---

## 🔐 Security

The system includes:

* User authentication
* Role-based access control
* Active/inactive user accounts
* Password authentication
* Protected system pages
* Restricted administrative functionality

Deactivated users are prevented from logging into the system.

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### Development Tools

* Visual Studio Code
* pgAdmin
* Postman
* Git
* GitHub

---

## 📂 Project Structure

A simplified project structure is:

```text
scania-spare-parts-system/
│
├── frontend/
│   │
│   ├── index.html
│   ├── inventory.html
│   ├── sales.html
│   ├── purchases.html
│   ├── payments.html
│   ├── reports.html
│   ├── staff_management.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       ├── dashboard.js
│       ├── inventory.js
│       ├── sales.js
│       ├── purchases.js
│       ├── payments.js
│       ├── reports.js
│       └── users.js
│
├── backend/
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── database/
│   └── database.sql
│
└── README.md
```

> The exact folder structure may differ depending on the current project organization.

---

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project directory:

```bash
cd scania-spare-parts-system
```

---

### 2. Install backend dependencies

Move into the backend directory:

```bash
cd backend
```

Install the required packages:

```bash
npm install
```

---

### 3. Configure PostgreSQL

Create a PostgreSQL database.

For example:

```text
scania_spare_parts_db
```

Import the project's SQL/database script into PostgreSQL.

Make sure the database contains all required tables, relationships, functions, triggers, and sample data.

---

### 4. Configure environment variables

Create a `.env` file inside the backend directory.

Example:

```env
DB_USER=your_database_user
DB_HOST=localhost
DB_NAME=scania_spare_parts_db
DB_PASSWORD=your_database_password
DB_PORT=5432
PORT=3000
JWT_SECRET=your_secret_key
```

Do not upload the real `.env` file or database password to GitHub.

Add `.env` to `.gitignore`:

```text
.env
node_modules/
```

---

### 5. Start the backend

From the backend directory:

```bash
node server.js
```

The server should start on:

```text
http://localhost:3000
```

You should see:

```text
Server running on http://localhost:3000
```

---

### 6. Run the frontend

The frontend can be opened using a local development server such as VS Code Live Server.

For example:

```text
http://127.0.0.1:5500/
```

Make sure the backend is running at the same time.

---

## 🔄 System Workflow

The main business workflow is:

```text
Supplier
   ↓
Purchase
   ↓
Inventory Stock
   ↓
Customer
   ↓
Sale
   ↓
Payment
   ↓
Paid / Partially Paid
```

For example:

```text
Purchase 10 Brake Pads
        ↓
Inventory increases by 10
        ↓
Customer buys 3 Brake Pads
        ↓
Inventory decreases by 3
        ↓
Customer owes money
        ↓
Payment is recorded
        ↓
Balance becomes 0
        ↓
Sale becomes Paid
```

---

## 📊 Reporting

The reporting module provides information such as:

* Inventory summary
* Total stock
* Low-stock items
* Sales summary
* Best-selling spare parts
* Other business performance information

---

## 🧪 Testing

The system has been tested for:

* User login
* Role-based access
* User activation/deactivation
* Password changes
* Staff management
* Inventory management
* Purchase recording
* Sales recording
* Stock updates
* Customer management
* Supplier management
* Payment tracking
* Reports
* Navigation between system pages

The system is currently functioning as a local development application.

---

## 🌐 Deployment

The application currently runs locally using:

```text
Frontend → Local development server
Backend  → Node.js / Express
Database → PostgreSQL
```

For production deployment, the frontend, backend, and PostgreSQL database will need to be hosted using suitable production infrastructure.

Before deployment, the following should be configured:

* Production database
* Environment variables
* Secure database credentials
* Secure JWT secret
* Production API URL
* HTTPS
* Database backups
* Production frontend hosting
* Backend hosting

---

## 🔮 Future Improvements

Possible future improvements include:

* Automatic low-stock notifications
* PDF invoices
* Printable receipts
* Customer statements
* Payment history
* Purchase history
* Advanced reporting
* Barcode scanning
* Better inventory search and filtering
* Automatic backups
* Audit logs
* Production deployment
* Mobile application
* Multi-branch support

---

## 👨‍💻 Project Purpose

This project was developed as a practical spare parts management solution to improve inventory control, sales tracking, purchasing, customer management, and payment tracking.

The goal is to provide a reliable digital system that can reduce manual record keeping and make business information easier to access and manage.

---

## 📄 License

This project is currently intended for educational and business-use purposes.

Additional licensing information can be added when the project is formally released.
