-- ============================================
-- View: Inventory
-- ============================================

CREATE OR REPLACE VIEW vw_inventory AS
SELECT
    sp.part_id,
    sp.part_number,
    sp.part_name,
    c.category_name,
    b.brand_name,
    i.current_stock,
    i.reserved_stock,
    i.available_stock,
    sp.purchase_price,
    sp.selling_price,
    sp.minimum_stock
FROM spare_parts sp
JOIN categories c
    ON sp.category_id = c.category_id
JOIN brands b
    ON sp.brand_id = b.brand_id
JOIN inventory i
    ON sp.part_id = i.part_id;

    -- ============================================
-- View: Low Stock
-- ============================================

CREATE OR REPLACE VIEW vw_low_stock AS
SELECT
    sp.part_number,
    sp.part_name,
    i.current_stock,
    sp.minimum_stock
FROM spare_parts sp
JOIN inventory i
    ON sp.part_id = i.part_id
WHERE i.current_stock <= sp.minimum_stock;

-- ============================================
-- View: Sales Report
-- ============================================

CREATE OR REPLACE VIEW vw_sales_report AS
SELECT
    s.invoice_number,
    c.customer_name,
    CONCAT(e.first_name, ' ', e.last_name) AS employee,
    s.sale_date,
    s.payment_method,
    s.total_amount
FROM sales s
LEFT JOIN customers c
    ON s.customer_id = c.customer_id
JOIN employees e
    ON s.employee_id = e.employee_id;
    