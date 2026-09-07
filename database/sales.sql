CREATE TABLE sales (
    sale_id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(30) UNIQUE NOT NULL,
    customer_id INT,
    employee_id INT NOT NULL,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(30),
    status VARCHAR(20) DEFAULT 'Completed'
        CHECK(status IN ('Completed','Pending','Cancelled')),
    total_amount DECIMAL(12,2) DEFAULT 0 CHECK(total_amount >= 0),

    CONSTRAINT fk_sale_customer
        FOREIGN KEY(customer_id)
        REFERENCES customers(customer_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_sale_employee
        FOREIGN KEY(employee_id)
        REFERENCES employees(employee_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);