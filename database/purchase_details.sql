CREATE TABLE purchase_details (
    purchase_detail_id SERIAL PRIMARY KEY,
    purchase_id INT NOT NULL,
    part_id INT NOT NULL,
    quantity INT NOT NULL CHECK(quantity > 0),
    unit_price DECIMAL(12,2) NOT NULL CHECK(unit_price >= 0),
    subtotal DECIMAL(12,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,

    CONSTRAINT fk_pd_purchase
        FOREIGN KEY (purchase_id)
        REFERENCES purchases(purchase_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_pd_part
        FOREIGN KEY (part_id)
        REFERENCES spare_parts(part_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
