CREATE OR REPLACE FUNCTION increase_inventory()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN

UPDATE inventory
SET current_stock=current_stock+NEW.quantity,
    last_updated=CURRENT_TIMESTAMP
WHERE part_id=NEW.part_id;

RETURN NEW;

END;
$$;

CREATE TRIGGER trg_purchase_inventory
AFTER INSERT ON purchase_details
FOR EACH ROW
EXECUTE FUNCTION increase_inventory();

CREATE OR REPLACE FUNCTION decrease_inventory()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN

UPDATE inventory
SET current_stock=current_stock-NEW.quantity,
    last_updated=CURRENT_TIMESTAMP
WHERE part_id=NEW.part_id;

RETURN NEW;

END;
$$;

CREATE TRIGGER trg_purchase_inventory
AFTER INSERT ON purchase_details
FOR EACH ROW
EXECUTE FUNCTION increase_inventory();

CREATE OR REPLACE FUNCTION decrease_inventory()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN

UPDATE inventory
SET current_stock=current_stock-NEW.quantity,
    last_updated=CURRENT_TIMESTAMP
WHERE part_id=NEW.part_id;

RETURN NEW;

END;
$$;

CREATE TRIGGER trg_sale_inventory
AFTER INSERT ON sale_details
FOR EACH ROW
EXECUTE FUNCTION decrease_inventory();

CREATE OR REPLACE FUNCTION check_stock()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
    stock INTEGER;
BEGIN

SELECT current_stock
INTO stock
FROM inventory
WHERE part_id=NEW.part_id;

IF stock < NEW.quantity THEN
    RAISE EXCEPTION 'Insufficient stock. Available: %, Requested: %',
        stock, NEW.quantity;
END IF;

RETURN NEW;

END;
$$;

CREATE TRIGGER trg_check_stock
BEFORE INSERT ON sale_details
FOR EACH ROW
EXECUTE FUNCTION check_stock();

CREATE OR REPLACE FUNCTION log_sale()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN

INSERT INTO stock_movements(
part_id,
employee_id,
movement_type,
quantity,
reference_type,
reference_id,
remarks
)

SELECT
NEW.part_id,
s.employee_id,
'Sale',
NEW.quantity,
'Sale',
NEW.sale_id,
'Automatic Sale'
FROM sales s
WHERE s.sale_id=NEW.sale_id;

RETURN NEW;

END;
$$;

CREATE TRIGGER trg_log_sale
AFTER INSERT ON sale_details
FOR EACH ROW
EXECUTE FUNCTION log_sale();