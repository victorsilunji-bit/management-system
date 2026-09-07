document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageEl = document.getElementById("message");

    messageEl.textContent = "";

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "index.html";
        } else {
            messageEl.textContent = data.message;
        }
    } catch (error) {
        messageEl.textContent = "Unable to connect to server. Make sure the backend is running.";
    }
});

if (localStorage.getItem("user")) {
    window.location.href = "index.html";
}
