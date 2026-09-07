CREATE TABLE spare_parts (
    part_id SERIAL PRIMARY KEY,
    part_number VARCHAR(50) NOT NULL UNIQUE,
    part_name VARCHAR(150) NOT NULL,
    category_id INT NOT NULL,
    brand_id INT NOT NULL,
    description TEXT,
    unit VARCHAR(20) DEFAULT 'Piece',
    purchase_price DECIMAL(12,2) NOT NULL CHECK (purchase_price >= 0),
    selling_price DECIMAL(12,2) NOT NULL CHECK (selling_price >= 0),
    minimum_stock INT DEFAULT 5 CHECK (minimum_stock >= 0),
    warehouse_location VARCHAR(50),
    barcode VARCHAR(100),

    CONSTRAINT fk_part_category
        FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_part_brand
        FOREIGN KEY (brand_id)
        REFERENCES brands(brand_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);