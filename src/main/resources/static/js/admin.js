document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData || userData.role !== "ADMIN") {
        alert("Access restricted to admins.");
        window.location.href = "index.html";
        return;
    }

    const pendingDonorsDiv = document.getElementById("pendingDonors");
    const pendingRecipientsDiv = document.getElementById("pendingRecipients");

    function fetchPendingUsers() {
        fetch("http://localhost:8080/donor/all")
            .then(response => response.json())
            .then(donors => {
                pendingDonorsDiv.innerHTML = donors
                    .filter(donor => donor.status === "PENDING")
                    .map(donor => `
                        <div class="user-card">
                            <p>Name: ${donor.user.name}</p>
                            <p>Organ: ${donor.organType}</p>
                            <button onclick="verifyDonor(${donor.id})">Verify</button>
                            <button onclick="rejectDonor(${donor.id})">Reject</button>
                        </div>
                    `).join("");
            })
            .catch(error => console.error("Error fetching donors:", error));

        fetch("http://localhost:8080/recipient/all")
            .then(response => response.json())
            .then(recipients => {
                pendingRecipientsDiv.innerHTML = recipients
                    .filter(recipient => recipient.status === "PENDING")
                    .map(recipient => `
                        <div class="user-card">
                            <p>Name: ${recipient.user.name}</p>
                            <p>Organ Needed: ${recipient.organType}</p>
                            <button onclick="verifyRecipient(${recipient.id})">Verify</button>
                            <button onclick="rejectRecipient(${recipient.id})">Reject</button>
                        </div>
                    `).join("");
            })
            .catch(error => console.error("Error fetching recipients:", error));
    }

    function verifyDonor(donorId) {
        fetch(`http://localhost:8080/admin/verify/donor/${donorId}`, { method: "PUT" })
            .then(response => response.text())
            .then(message => {
                alert(message);
                fetchPendingUsers();
            })
            .catch(error => console.error("Error verifying donor:", error));
    }

    function rejectDonor(donorId) {
        fetch(`http://localhost:8080/admin/reject/donor/${donorId}`, { method: "PUT" })
            .then(response => response.text())
            .then(message => {
                alert(message);
                fetchPendingUsers();
            })
            .catch(error => console.error("Error rejecting donor:", error));
    }

    function verifyRecipient(recipientId) {
        fetch(`http://localhost:8080/admin/verify/recipient/${recipientId}`, { method: "PUT" })
            .then(response => response.text())
            .then(message => {
                alert(message);
                fetchPendingUsers();
            })
            .catch(error => console.error("Error verifying recipient:", error));
    }

    function rejectRecipient(recipientId) {
        fetch(`http://localhost:8080/admin/reject/recipient/${recipientId}`, { method: "PUT" })
            .then(response => response.text())
            .then(message => {
                alert(message);
                fetchPendingUsers();
            })
            .catch(error => console.error("Error rejecting recipient:", error));
    }

    function logout() {
        localStorage.removeItem("user");
        window.location.href = "index.html";
    }

    fetchPendingUsers();
});
