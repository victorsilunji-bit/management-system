let editingUserId = null;

requireRole(["Administrator"]);

const API_URL = "http://localhost:3000";

// ===================== LOAD USERS =====================

async function loadUsers() {

    try {

        const response = await fetch(`${API_URL}/users`);

        const users = await response.json();

        const table = document.querySelector("#usersTable tbody");

        table.innerHTML = "";

        users.forEach(user => {

            table.innerHTML += `
                <tr>
                    <td>${user.first_name} ${user.last_name}</td>
                    <td>${user.username}</td>
                    <td>${user.role_name}</td>
                    <td>${user.is_active ? "Active" : "Inactive"}</td>
                    <td class="actions">
                        <button onclick="editStaff(${user.user_id})">
                            Edit
                        </button>

                        <button onclick="toggleStatus(${user.user_id}, ${user.is_active})">
                            ${user.is_active ? "Deactivate" : "Activate"}
                        </button>

                        <button onclick="resetPassword(${user.user_id}, '${user.username}')">
                            Reset Password
                        </button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        alert("Failed to load staff members.");

    }

}

// ===================== SHOW FORM =====================

document.getElementById("showUserForm")
.addEventListener("click", function () {

    cancelStaffForm();

    document.getElementById("userForm").style.display = "block";

});

// ===================== LOAD ROLES =====================

async function loadRoles() {

    const response = await fetch(`${API_URL}/roles`);

    const roles = await response.json();

    const select = document.getElementById("role_id");

    select.innerHTML = `<option value="">Select Role</option>`;

    roles.forEach(role => {

        select.innerHTML += `
            <option value="${role.role_id}">
                ${role.role_name}
            </option>
        `;

    });

}

// ===================== ADD STAFF =====================

async function addStaff() {

    const staff = {

        first_name: document.getElementById("first_name").value,

        last_name: document.getElementById("last_name").value,

        phone: document.getElementById("phone").value,

        email: document.getElementById("email").value,

        position: document.getElementById("position").value,

        role_id: Number(document.getElementById("role_id").value),

        username: document.getElementById("username").value,

        password: document.getElementById("password").value,

        is_active: document.getElementById("is_active").checked

    };

    const response = await fetch(`${API_URL}/staff`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(staff)

    });

    const result = await response.json();

    alert(result.message);

    cancelStaffForm();

    loadUsers();

}

// ===================== EDIT STAFF =====================

async function editStaff(userId) {

    editingUserId = userId;

    const response = await fetch(`${API_URL}/staff/${userId}`);

    const staff = await response.json();

    document.getElementById("userForm").style.display = "block";

    document.getElementById("first_name").value = staff.first_name;
    document.getElementById("last_name").value = staff.last_name;
    document.getElementById("phone").value = staff.phone || "";
    document.getElementById("email").value = staff.email || "";
    document.getElementById("position").value = staff.position || "";
    document.getElementById("username").value = staff.username;
    document.getElementById("role_id").value = staff.role_id;
    document.getElementById("is_active").checked = staff.is_active;

    document.getElementById("password").value = "";

    document.getElementById("passwordField").style.display = "none";

    document.getElementById("saveButton").textContent =
        "Update Staff";

}

// ===================== SAVE STAFF =====================

async function saveStaff() {

    if (editingUserId === null) {

        addStaff();

        return;

    }

    const staff = {

        first_name: document.getElementById("first_name").value,

        last_name: document.getElementById("last_name").value,

        phone: document.getElementById("phone").value,

        email: document.getElementById("email").value,

        position: document.getElementById("position").value,

        username: document.getElementById("username").value,

        role_id: Number(document.getElementById("role_id").value),

        is_active: document.getElementById("is_active").checked

    };

    const response = await fetch(`${API_URL}/staff/${editingUserId}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(staff)

    });

    const result = await response.json();

    alert(result.message);

    cancelStaffForm();

    loadUsers();

}

// ===================== CANCEL FORM =====================

function cancelStaffForm() {

    editingUserId = null;

    document.getElementById("userForm").style.display = "none";

    document.getElementById("saveButton").textContent =
        "Save Staff Member";

    document.getElementById("passwordField").style.display =
        "block";

    [
        "first_name",
        "last_name",
        "phone",
        "email",
        "position",
        "username",
        "password"
    ].forEach(id => {

        document.getElementById(id).value = "";

    });

    document.getElementById("role_id").selectedIndex = 0;

    document.getElementById("is_active").checked = true;

}

// ===================== TOGGLE STATUS =====================

async function toggleStatus(userId, currentStatus) {

    const action = currentStatus ? "deactivate" : "activate";

    if (!confirm(`Are you sure you want to ${action} this staff member?`)) {

        return;

    }

    const response = await fetch(`${API_URL}/staff/status/${userId}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            is_active: !currentStatus

        })

    });

    const result = await response.json();

    alert(result.message);

    loadUsers();

}

// ===================== RESET PASSWORD =====================

async function resetPassword(userId, username) {

    const newPassword =
        prompt(`Enter new password for ${username}:`);

    if (!newPassword) return;

    if (!confirm("Are you sure you want to reset this password?")) {

        return;

    }

    const response = await fetch(`${API_URL}/staff/password/${userId}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            password: newPassword

        })

    });

    const result = await response.json();

    alert(result.message);

}

// ===================== INITIAL LOAD =====================

loadUsers();
loadRoles();