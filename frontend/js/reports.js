requireRole([
    "Administrator",
    "Manager"
]);

const API_URL = "http://localhost:3000";

console.log("Reports JS Loaded");

// -------------------- Inventory Summary --------------------

async function loadInventorySummary() {

    try {

        const response = await fetch(`${API_URL}/reports/inventory-summary`);

        const data = await response.json();

        document.getElementById("totalParts").textContent =
            data.total_parts ?? 0;

        document.getElementById("totalStock").textContent =
            data.total_stock ?? 0;

        document.getElementById("lowStock").textContent =
            data.low_stock_items ?? 0;

    } catch (error) {

        console.error("Inventory summary failed:", error);

    }

}

// -------------------- Sales Summary --------------------

async function loadSalesSummary() {

    try {

        const response = await fetch(`${API_URL}/reports/sales-summary`);

        const data = await response.json();

        document.getElementById("totalSales").textContent =
            "ZMW " + Number(data.total_sales || 0).toFixed(2);

    } catch (error) {

        console.error("Sales summary failed:", error);

    }

}

// -------------------- Low Stock --------------------

async function loadLowStock() {

    try {

        const response = await fetch(`${API_URL}/reports/low-stock`);

        const parts = await response.json();

        const table =
            document.querySelector("#lowStockTable tbody");

        table.innerHTML = "";

        parts.forEach(part => {

            table.innerHTML += `
                <tr>
                    <td>${part.part_number}</td>
                    <td>${part.description}</td>
                    <td>${part.available_stock}</td>
                    <td>${part.minimum_stock}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error("Low stock report failed:", error);

    }

}

// -------------------- Best Selling --------------------

async function loadBestSelling() {

    try {

        const response = await fetch(`${API_URL}/reports/best-selling`);

        const parts = await response.json();

        const table =
            document.querySelector("#bestSellingTable tbody");

        table.innerHTML = "";

        parts.forEach(part => {

            table.innerHTML += `
                <tr>
                    <td>${part.part_number}</td>
                    <td>${part.description}</td>
                    <td>${part.quantity_sold}</td>
                </tr>
            `;

        });

    } catch (error) {

        console.error("Best selling report failed:", error);

    }

}

// -------------------- Load Reports --------------------

loadInventorySummary();
loadSalesSummary();
loadLowStock();
loadBestSelling();