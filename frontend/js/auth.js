function getLoggedInUser() {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
}

function requireLogin() {
    if (!getLoggedInUser()) {
        window.location.href = "login.html";
    }
}

function requireRole(allowedRoles) {
    const user = getLoggedInUser();

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    if (!allowedRoles.includes(user.role)) {
        alert("You are not authorized to access this page.");
        window.location.href = "index.html";
    }
}

function setupNavigation() {
    const user = getLoggedInUser();
    if (!user) return;

    const role = user.role;
    const hide = (id) => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    };

    if (role === "Administrator") return;

    if (role === "Manager") {
        hide("inventoryLink");
    }

    if (role === "Salesperson") {
        hide("inventoryLink");
        hide("purchasesLink");
        hide("reportsLink");
    }

    if (role === "Storekeeper") {
        hide("salesLink");
        hide("reportsLink");
    }

    if (role !== "Administrator") {
        hide("usersLink");
    }
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("currentSaleId");
    localStorage.removeItem("currentPurchaseId");
    window.location.href = "login.html";
}

if (document.getElementById("inventoryLink") || document.getElementById("usersLink")) {
    setupNavigation();
}
