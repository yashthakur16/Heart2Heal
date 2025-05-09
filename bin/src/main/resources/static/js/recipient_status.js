document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData || userData.role !== "RECIPIENT") {
        alert("Access Denied! Only recipients can access this page.");
        window.location.href = "index.html";
        return;
    }

    const statusContainer = document.getElementById("recipientStatus");
    const matchesContainer = document.getElementById("matchingUpdates");

    function showLoading(container) {
        container.innerHTML = "<p>Loading...</p>";
    }

    function fetchRecipientStatus() {
        showLoading(statusContainer);

        fetch("https://organs-donation-website-production.up.railway.app/recipient/all")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched Recipient Data:", data); // Debugging Step
                const recipient = data.find(r => r.user.id === parseInt(userData.id, 10));

                if (recipient) {
                    statusContainer.innerHTML = `
                        <p><strong>Organ Requested:</strong> ${recipient.organType}</p>
                        <p><strong>Blood Type:</strong> ${recipient.bloodType}</p>
                        <p><strong>Verification Status:</strong> ${recipient.status}</p>
                    `;
                } else {
                    statusContainer.innerHTML = "<p>You have not made any organ requests.</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching recipient status:", error);
                statusContainer.innerHTML = "<p>Error fetching data.</p>";
            });
    }

    function fetchMatchingUpdates() {
        showLoading(matchesContainer);

        fetch("https://organs-donation-website-production.up.railway.app/matching/all")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched Matching Data:", data); // Debugging Step
                const recipientMatches = data.filter(match => match.recipient.user.id === parseInt(userData.id, 10));

                matchesContainer.innerHTML = recipientMatches.length
                    ? recipientMatches.map(match => `
                        <div class="match-card">
                            <p><strong>Matched Donor:</strong> ${match.donor.user.name}</p>
                            <p><strong>Organ:</strong> ${match.donor.organType}</p>
                            <p><strong>Status:</strong> ${match.status}</p>
                        </div>
                    `).join("")
                    : "<p>No matches found yet.</p>";
            })
            .catch(error => {
                console.error("Error fetching matching updates:", error);
                matchesContainer.innerHTML = "<p>Error fetching matches.</p>";
            });
    }

    // Auto-refresh matching updates every 5 seconds
    setInterval(fetchMatchingUpdates, 5000);

    // Make logout function globally accessible
    window.logout = function () {
        localStorage.removeItem("user");
        window.location.href = "index.html";
    };

    fetchRecipientStatus();
    fetchMatchingUpdates();
});
