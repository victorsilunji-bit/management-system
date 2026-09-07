requireRole([
    "Administrator",
    "Manager",
    "Salesperson"
]);

console.log("Payments JS Loaded");

async function loadPayments() {

    try {

        const response = await fetch("/payments/pending");

        const sales = await response.json();

        const table = document.querySelector("#paymentsTable tbody");

        table.innerHTML = "";

        sales.forEach(sale => {

            table.innerHTML += `

                <tr>

                    <td>${sale.invoice_number}</td>

                    <td>${sale.customer_name}</td>

                    <td>ZMW ${Number(sale.total_amount).toFixed(2)}</td>

                    <td>ZMW ${Number(sale.amount_paid).toFixed(2)}</td>

                    <td>ZMW ${Number(sale.balance).toFixed(2)}</td>

                    <td>${sale.payment_status}</td>

                    <td>

                        <button
                            class="receive-payment-btn"
                            onclick="openPayment(
                                ${sale.sale_id},
                                '${sale.customer_name}',
                                ${sale.balance}
                            )">

                            Receive Payment

                        </button>

                    </td>

                </tr>

            `;

        });

    } catch (error) {

        console.error(error);

        alert("Failed to load payments.");

    }

}


// Open Payment Form

function openPayment(sale_id, customer, balance) {

    document.getElementById("paymentForm").style.display = "block";

    document.getElementById("sale_id").value = sale_id;

    document.getElementById("customer_name").value = customer;

    document.getElementById("balance").value = balance;

    document.getElementById("payment_amount").value = "";

}


// Save Payment

async function savePayment() {

    try {

        const sale_id = document.getElementById("sale_id").value;

        const amount = Number(
            document.getElementById("payment_amount").value
        );

        if (amount <= 0) {

            alert("Enter a valid payment amount.");

            return;

        }

        const response = await fetch(

            `/payments/${sale_id}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    amount_paid: amount

                })

            }

        );

        const result = await response.json();

        alert(result.message);

        document.getElementById("paymentForm").style.display = "none";

        loadPayments();

    } catch (error) {

        console.error(error);

        alert("Failed to save payment.");

    }

}


loadPayments();