requireLogin();

const API_URL = "http://localhost:3000";

async function loadDashboard() {

    try {

        // Inventory Summary
        const inventoryResponse = await fetch(`${API_URL}/reports/inventory-summary`);
        const inventoryData = await inventoryResponse.json();

        document.getElementById("totalParts").textContent =
            inventoryData.total_parts ?? 0;

        document.getElementById("lowStock").textContent =
            inventoryData.low_stock_items ?? 0;


        // Sales Summary
        const salesResponse = await fetch(`${API_URL}/reports/sales-summary`);
        const salesData = await salesResponse.json();

        document.getElementById("totalSales").textContent =
            "ZMW " + Number(salesData.total_sales || 0).toFixed(2);


        // Purchase Summary
        const purchaseResponse = await fetch(`${API_URL}/reports/purchase-summary`);
        const purchaseData = await purchaseResponse.json();

        document.getElementById("totalPurchases").textContent =
            "ZMW " + Number(purchaseData.total_purchases || 0).toFixed(2);


        // Customers
        const customerResponse = await fetch(`${API_URL}/dashboard/customers`);
        const customerData = await customerResponse.json();

        document.getElementById("totalCustomers").textContent =
            customerData.total_customers ?? 0;


        // Suppliers
        const supplierResponse = await fetch(`${API_URL}/dashboard/suppliers`);
        const supplierData = await supplierResponse.json();

        document.getElementById("totalSuppliers").textContent =
            supplierData.total_suppliers ?? 0;


        // Today's Sales
        const todayResponse = await fetch(`${API_URL}/dashboard/today-sales`);
        const todayData = await todayResponse.json();

        document.getElementById("todaySales").textContent =
            "ZMW " + Number(todayData.today_sales || 0).toFixed(2);

    } catch (error) {

        console.error("Dashboard load failed:", error);

    }

}


async function loadRecentInventory() {

    try {

        const response = await fetch(`${API_URL}/dashboard/recent-inventory`);

        const inventory = await response.json();

        const tableBody =
            document.querySelector("#inventoryTable tbody");

        tableBody.innerHTML = "";

        inventory.slice(0, 10).forEach(item => {

            const status =
                item.available_stock <= item.minimum_stock

                    ? `<span class="low-stock">LOW STOCK</span>`

                    : `<span class="available">AVAILABLE</span>`;

            tableBody.innerHTML += `

                <tr>

                    <td>${item.part_number}</td>

                    <td>${item.description || "—"}</td>

                    <td>${item.unit || "—"}</td>

                    <td>ZMW ${Number(item.selling_price || 0).toFixed(2)}</td>

                    <td>${item.available_stock}</td>

                    <td>${status}</td>

                </tr>

            `;

        });

    } catch (error) {

        console.error("Recent inventory load failed:", error);

    }

}


function displayLoggedInUser() {

    const user = getLoggedInUser();

    if (!user) return;

    const welcomeEl =
        document.getElementById("welcomeUser");

    const roleEl =
        document.getElementById("userRole");

    if (welcomeEl) {

        welcomeEl.textContent =
            "Welcome, " + user.username;

    }

    if (roleEl) {

        roleEl.textContent =
            "Role: " + user.role;

    }

}


loadDashboard();

loadRecentInventory();

displayLoggedInUser();