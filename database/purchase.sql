CREATE TABLE purchases (
    purchase_id SERIAL PRIMARY KEY,
    purchase_number VARCHAR(30) UNIQUE NOT NULL,
    supplier_id INT NOT NULL,
    employee_id INT NOT NULL,
    invoice_number VARCHAR(50),
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Received'
        CHECK (status IN ('Pending', 'Received', 'Cancelled')),
    total_amount DECIMAL(12,2) DEFAULT 0 CHECK (total_amount >= 0),

    CONSTRAINT fk_purchase_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(supplier_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_purchase_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(employee_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);