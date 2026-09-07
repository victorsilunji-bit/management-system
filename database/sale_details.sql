
CREATE TABLE sale_details (
    sale_detail_id SERIAL PRIMARY KEY,
    sale_id INT NOT NULL,
    part_id INT NOT NULL,
    quantity INT NOT NULL CHECK(quantity > 0),
    selling_price DECIMAL(12,2) NOT NULL CHECK(selling_price >= 0),
    discount DECIMAL(12,2) DEFAULT 0 CHECK(discount >= 0),
    subtotal DECIMAL(12,2)
        GENERATED ALWAYS AS ((quantity * selling_price) - discount) STORED,

    CONSTRAINT fk_sd_sale
        FOREIGN KEY(sale_id)
        REFERENCES sales(sale_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_sd_part
        FOREIGN KEY(part_id)
        REFERENCES spare_parts(part_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);