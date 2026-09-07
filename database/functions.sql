CREATE OR REPLACE FUNCTION get_inventory_value()
RETURNS DECIMAL(15,2)
LANGUAGE plpgsql
AS $$
DECLARE
    total_value DECIMAL(15,2);
BEGIN
    SELECT SUM(i.current_stock * sp.purchase_price)
    INTO total_value
    FROM inventory i
    JOIN spare_parts sp
    ON i.part_id = sp.part_id;

    RETURN COALESCE(total_value,0);
END;
$$;

CREATE OR REPLACE FUNCTION get_low_stock_count()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    total INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO total
    FROM inventory i
    JOIN spare_parts sp
    ON i.part_id = sp.part_id
    WHERE i.current_stock <= sp.minimum_stock;

    RETURN total;
END;
$$;

CREATE OR REPLACE FUNCTION get_total_sales()
RETURNS DECIMAL(15,2)
LANGUAGE plpgsql
AS $$
DECLARE
    total DECIMAL(15,2);
BEGIN
    SELECT SUM(total_amount)
    INTO total
    FROM sales;

    RETURN COALESCE(total,0);
END;
$$;

CREATE OR REPLACE FUNCTION get_total_purchases()
RETURNS DECIMAL(15,2)
LANGUAGE plpgsql
AS $$
DECLARE
    total DECIMAL(15,2);
BEGIN
    SELECT SUM(total_amount)
    INTO total
    FROM purchases;

    RETURN COALESCE(total,0);
END;
$$;

CREATE OR REPLACE FUNCTION get_employee_count()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    total INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO total
    FROM employees;

    RETURN total;
END;
$$;