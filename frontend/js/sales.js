requireRole([
    "Administrator",
    "Manager",
    "Salesperson"
]);

const API_URL = "http://localhost:3000";

console.log("Sales JS Loaded");

let saleItems = [];

// ===================== LOAD CUSTOMERS =====================

async function loadCustomers() {

    try {

        const response = await fetch(`${API_URL}/customers`);

        const customers = await response.json();

        const select = document.getElementById("customer_id");

        select.innerHTML = `
            <option value="">
                Select Customer
            </option>
        `;

        customers.forEach(customer => {

            select.innerHTML += `
                <option value="${customer.customer_id}">
                    ${customer.customer_name}
                </option>
            `;

        });

    } catch (error) {

        console.error("Error loading customers:", error);

    }

}

// ===================== LOAD EMPLOYEES =====================

async function loadEmployees() {

    try {

        const response = await fetch(`${API_URL}/employees`);

        const employees = await response.json();

        const select = document.getElementById("employee_id");

        select.innerHTML = "";

        employees.forEach(employee => {

            select.innerHTML += `
                <option value="${employee.employee_id}">
                    ${employee.first_name} ${employee.last_name}
                </option>
            `;

        });

    } catch (error) {

        console.error("Error loading employees:", error);

    }

}

// ===================== LOAD PARTS =====================

async function loadParts() {

    try {

        const response = await fetch(`${API_URL}/spare-parts`);

        const parts = await response.json();

        const select = document.getElementById("part_id");

        select.innerHTML = "";

        parts.forEach(part => {

            select.innerHTML += `
                <option value="${part.part_id}">
                    ${part.part_number} - ${part.description}
                </option>
            `;

        });

    } catch (error) {

        console.error("Error loading spare parts:", error);

    }

}

// ===================== INITIAL LOAD =====================

loadCustomers();
loadEmployees();
loadParts();

// ===================== SHOW CUSTOMER FORM =====================

function showCustomerForm() {

    document.getElementById("newCustomerForm").style.display = "block";

}

// ===================== ADD CUSTOMER =====================

async function addCustomer() {

    const customer = {

        customer_name: document.getElementById("customer_name").value,

        company_name: document.getElementById("company_name").value,

        phone: document.getElementById("phone").value,

        email: document.getElementById("email").value,

        address: document.getElementById("address").value

    };

    const response = await fetch(`${API_URL}/customers`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(customer)

    });

    const result = await response.json();

    alert(result.message);

    await loadCustomers();

    document.getElementById("newCustomerForm").style.display = "none";

}

// ===================== CREATE SALE =====================

document.getElementById("saleForm")
.addEventListener("submit", async function (e) {

    e.preventDefault();

    const sale = {

        customer_id: document.getElementById("customer_id").value,

        employee_id: document.getElementById("employee_id").value,

        payment_method: document.getElementById("payment_method").value,

        status: document.getElementById("status").value

    };

    const response = await fetch(`${API_URL}/sales`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(sale)

    });

    const result = await response.json();

    alert(result.message);

    localStorage.setItem(
        "currentSaleId",
        result.sale.sale_id
    );

    console.log("Sale ID:", result.sale.sale_id);

});

// ===================== ADD SALE ITEM =====================

document.getElementById("saleItemForm")
.addEventListener("submit", async function (e) {

    e.preventDefault();

    const sale_id = localStorage.getItem("currentSaleId");

    if (!sale_id) {

        alert("Create a sale first.");

        return;

    }

    const item = {

        sale_id: Number(sale_id),

        part_id: Number(document.getElementById("part_id").value),

        quantity: Number(document.getElementById("quantity").value),

        selling_price: Number(document.getElementById("selling_price").value),

        discount: Number(document.getElementById("discount").value)

    };

    const response = await fetch(`${API_URL}/sale-items`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(item)

    });

    const result = await response.json();

    alert(result.message);

    saleItems.push({

        part: document.getElementById("part_id").options[
            document.getElementById("part_id").selectedIndex
        ].text,

        quantity: item.quantity,

        selling_price: item.selling_price,

        discount: item.discount

    });

    displaySaleItems();

});

// ===================== DISPLAY SALE ITEMS =====================

function displaySaleItems() {

    const table =
        document.querySelector("#saleItemsTable tbody");

    table.innerHTML = "";

    let total = 0;

    saleItems.forEach(item => {

        const subtotal =
            (item.quantity * item.selling_price) - item.discount;

        total += subtotal;

        table.innerHTML += `
            <tr>
                <td>${item.part}</td>
                <td>${item.quantity}</td>
                <td>ZMW ${item.selling_price.toFixed(2)}</td>
                <td>ZMW ${item.discount.toFixed(2)}</td>
                <td>ZMW ${subtotal.toFixed(2)}</td>
            </tr>
        `;

    });

    document.getElementById("saleTotal").textContent =
        total.toFixed(2);

    updateSaleTotal(total);

}

// ===================== UPDATE SALE TOTAL =====================

async function updateSaleTotal(total) {

    const sale_id = localStorage.getItem("currentSaleId");

    await fetch(`${API_URL}/sales/${sale_id}/total`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            total_amount: total

        })

    });

}