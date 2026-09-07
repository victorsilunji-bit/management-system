requireRole([
    "Administrator",
    "Manager",
    "Storekeeper"
]);

const API_URL = "http://localhost:3000";

let purchaseItems = [];

// -------------------- Load Suppliers --------------------

async function loadSuppliers() {

    const response = await fetch(`${API_URL}/suppliers`);
    const suppliers = await response.json();

    const select = document.getElementById("supplier_id");

    select.innerHTML = "";

    suppliers.forEach(supplier => {

        select.innerHTML += `
            <option value="${supplier.supplier_id}">
                ${supplier.supplier_name}
            </option>
        `;

    });

}

// -------------------- Load Employees --------------------

async function loadEmployees() {

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

}

// -------------------- Load Spare Parts --------------------

async function loadParts() {

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

}

// -------------------- Load Initial Data --------------------

loadSuppliers();
loadEmployees();
loadParts();

// -------------------- Create Purchase --------------------

document.getElementById("purchaseForm")
.addEventListener("submit", async function (e) {

    e.preventDefault();

    const purchase = {

        supplier_id: document.getElementById("supplier_id").value,

        employee_id: document.getElementById("employee_id").value,

        invoice_number: document.getElementById("invoice_number").value,

        status: document.getElementById("status").value

    };

    const response = await fetch(`${API_URL}/purchases`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(purchase)

    });

    const result = await response.json();

    alert(result.message);

    localStorage.setItem(
        "currentPurchaseId",
        result.purchase.purchase_id
    );

    console.log(
        "Current Purchase:",
        result.purchase.purchase_id
    );

});

// -------------------- Add Purchase Item --------------------

document.getElementById("itemForm")
.addEventListener("submit", async function (e) {

    e.preventDefault();

    const purchase_id = localStorage.getItem("currentPurchaseId");

    if (!purchase_id) {

        alert("Create a purchase first.");

        return;

    }

    const item = {

        purchase_id: Number(purchase_id),

        part_id: Number(document.getElementById("part_id").value),

        quantity: Number(document.getElementById("quantity").value),

        unit_price: Number(document.getElementById("unit_price").value)

    };

    const response = await fetch(`${API_URL}/purchase-items`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(item)

    });

    const result = await response.json();

    alert(result.message);

    purchaseItems.push({

        part: document.getElementById("part_id").options[
            document.getElementById("part_id").selectedIndex
        ].text,

        quantity: item.quantity,

        unit_price: item.unit_price

    });

    displayPurchaseItems();

});

// -------------------- Display Purchase Items --------------------

function displayPurchaseItems() {

    const table = document.querySelector("#purchaseItemsTable tbody");

    table.innerHTML = "";

    let total = 0;

    purchaseItems.forEach(item => {

        const itemTotal = item.quantity * item.unit_price;

        total += itemTotal;

        table.innerHTML += `
            <tr>
                <td>${item.part}</td>
                <td>${item.quantity}</td>
                <td>ZMW ${item.unit_price.toFixed(2)}</td>
                <td>ZMW ${itemTotal.toFixed(2)}</td>
            </tr>
        `;

    });

    document.getElementById("totalAmount").textContent =
        total.toFixed(2);

    updatePurchaseTotal(total);

}

// -------------------- Update Purchase Total --------------------

async function updatePurchaseTotal(total) {

    const purchase_id = localStorage.getItem("currentPurchaseId");

    await fetch(`${API_URL}/purchases/${purchase_id}/total`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            total_amount: total

        })

    });

}