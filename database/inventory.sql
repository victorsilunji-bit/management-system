CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    part_id INT NOT NULL UNIQUE,
    current_stock INT NOT NULL DEFAULT 0 CHECK (current_stock >= 0),
    reserved_stock INT DEFAULT 0 CHECK (reserved_stock >= 0),
    available_stock INT GENERATED ALWAYS AS (current_stock - reserved_stock) STORED,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_inventory_part
        FOREIGN KEY (part_id)
        REFERENCES spare_parts(part_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);