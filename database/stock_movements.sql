CREATE TABLE stock_movements (
    movement_id SERIAL PRIMARY KEY,
    part_id INT NOT NULL,
    employee_id INT,
    movement_type VARCHAR(20)
        CHECK(movement_type IN
        ('Purchase','Sale','Return','Adjustment','Damaged','Lost')),
    quantity INT NOT NULL,
    reference_type VARCHAR(30),
    reference_id INT,
    movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remarks TEXT,

    CONSTRAINT fk_sm_part
        FOREIGN KEY(part_id)
        REFERENCES spare_parts(part_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_sm_employee
        FOREIGN KEY(employee_id)
        REFERENCES employees(employee_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);