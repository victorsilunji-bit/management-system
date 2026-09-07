-- =====================================================
-- SAMPLE DATA
-- Scania Spare Parts Management System
-- =====================================================

---------------------------------------------------------
-- ROLES
---------------------------------------------------------
INSERT INTO roles (role_name, description)
VALUES
('Administrator','Full system access'),
('Manager','Business management'),
('Salesperson','Handles sales'),
('Storekeeper','Manages inventory');

---------------------------------------------------------
-- EMPLOYEES
---------------------------------------------------------
INSERT INTO employees(first_name,last_name,phone,email,position)
VALUES
('Victor','Silunji','0977000001','victor@scania.com','Administrator'),
('John','Banda','0977000002','john@scania.com','Manager'),
('Mary','Zulu','0977000003','mary@scania.com','Salesperson'),
('Peter','Phiri','0977000004','peter@scania.com','Storekeeper');

---------------------------------------------------------
-- USERS
---------------------------------------------------------
INSERT INTO users(employee_id,role_id,username,password_hash)
VALUES
(1,1,'admin','admin123'),
(2,2,'manager','manager123'),
(3,3,'mary','mary123'),
(4,4,'peter','peter123');

---------------------------------------------------------
-- CATEGORIES
---------------------------------------------------------
INSERT INTO categories(category_name,description)
VALUES
('Engine','Engine components'),
('Brake System','Brake components'),
('Cooling System','Cooling system parts'),
('Filters','Oil, fuel and air filters'),
('Electrical','Electrical components');

---------------------------------------------------------
-- BRANDS
---------------------------------------------------------
INSERT INTO brands(brand_name,country)
VALUES
('Scania Genuine','Sweden'),
('Bosch','Germany'),
('SKF','Sweden'),
('Mahle','Germany'),
('WABCO','Germany');

---------------------------------------------------------
-- SUPPLIERS
---------------------------------------------------------
INSERT INTO suppliers
(supplier_name,contact_person,phone,email,city,country)
VALUES
('Scania Zambia','David Mumba','0977111111','sales@scania.co.zm','Lusaka','Zambia'),
('Bosch Zambia','Paul Chileshe','0977222222','info@bosch.co.zm','Lusaka','Zambia'),
('SKF Zambia','Joseph Banda','0977333333','sales@skf.co.zm','Kitwe','Zambia');

---------------------------------------------------------
-- CUSTOMERS
---------------------------------------------------------
INSERT INTO customers
(customer_name,company_name,phone,email)
VALUES
('Patrick Mwila','PM Logistics','0977444444','patrick@gmail.com'),
('Innocent Phiri','IP Transport','0977555555','innocent@gmail.com'),
('Brian Zulu','BZ Haulage','0977666666','brian@gmail.com');

---------------------------------------------------------
-- SPARE PARTS
---------------------------------------------------------
INSERT INTO spare_parts
(part_number,part_name,category_id,brand_id,purchase_price,selling_price,minimum_stock)
VALUES
('SC1001','Oil Filter',4,4,180.00,250.00,10),
('SC1002','Fuel Filter',4,4,220.00,300.00,10),
('SC1003','Brake Pad',2,2,600.00,850.00,5),
('SC1004','Brake Disc',2,2,1200.00,1500.00,3),
('SC1005','Air Filter',4,4,350.00,450.00,8),
('SC1006','Fan Belt',1,1,180.00,260.00,8),
('SC1007','Wheel Bearing',1,3,850.00,1100.00,5),
('SC1008','Alternator',5,2,3200.00,3900.00,2);

---------------------------------------------------------
-- INVENTORY
---------------------------------------------------------
INSERT INTO inventory(part_id,current_stock,reserved_stock)
VALUES
(1,40,2),
(2,30,0),
(3,20,1),
(4,15,0),
(5,25,0),
(6,18,0),
(7,10,0),
(8,5,0);

---------------------------------------------------------
-- PURCHASES
---------------------------------------------------------
INSERT INTO purchases
(purchase_number,supplier_id,employee_id,invoice_number,total_amount)
VALUES
('PUR001',1,2,'INV1001',12900.00),
('PUR002',2,2,'INV1002',9500.00);

---------------------------------------------------------
-- PURCHASE DETAILS
---------------------------------------------------------
INSERT INTO purchase_details
(purchase_id,part_id,quantity,unit_price)
VALUES
(1,1,20,180),
(1,2,20,220),
(1,3,10,600),
(2,4,5,1200),
(2,8,2,3200);

---------------------------------------------------------
-- SALES
---------------------------------------------------------
INSERT INTO sales
(invoice_number,customer_id,employee_id,payment_method,total_amount)
VALUES
('SAL001',1,3,'Cash',1350),
('SAL002',2,3,'Mobile Money',1500);

---------------------------------------------------------
-- SALE DETAILS
---------------------------------------------------------
INSERT INTO sale_details
(sale_id,part_id,quantity,selling_price,discount)
VALUES
(1,1,2,250,0),
(1,3,1,850,0),
(2,4,1,1500,0);

---------------------------------------------------------
-- STOCK MOVEMENTS
---------------------------------------------------------
INSERT INTO stock_movements
(part_id,employee_id,movement_type,quantity,reference_type,reference_id,remarks)
VALUES
(1,2,'Purchase',20,'Purchase',1,'Initial stock'),
(2,2,'Purchase',20,'Purchase',1,'Initial stock'),
(3,2,'Purchase',10,'Purchase',1,'Initial stock'),
(4,2,'Purchase',5,'Purchase',2,'Initial stock'),
(1,3,'Sale',2,'Sale',1,'Customer purchase'),
(3,3,'Sale',1,'Sale',1,'Customer purchase'),
(4,3,'Sale',1,'Sale',2,'Customer purchase');