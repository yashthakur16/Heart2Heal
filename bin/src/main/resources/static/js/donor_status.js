document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData || userData.role !== "DONOR") {
        alert("Access Denied! Only donors can access this page.");
        window.location.href = "index.html";
        return;
    }

    function fetchDonorStatus() {
        fetch(`https://organs-donation-website-production.up.railway.app/donor/all`)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched Donor Data:", data); // Debugging Step
    
                const userId = parseInt(userData.id, 10); // Ensure ID is a number
                const donor = data.find(d => d.user.id === userId);
                console.log("Matched Donor:", donor); // Debugging Step
    
                const statusContainer = document.getElementById("donorStatus");
    
                if (donor) {
                    statusContainer.innerHTML = `
                        <p><strong>Organ Donated:</strong> ${donor.organType}</p>
                        <p><strong>Blood Type:</strong> ${donor.bloodType}</p>
                        <p><strong>Verification Status:</strong> ${donor.status}</p>
                    `;
                } else {
                    statusContainer.innerHTML = "<p>You have not registered any organ donation.</p>";
                }
            })
            .catch(error => console.error("Error fetching donor status:", error));
    }
    
    fetch("https://organs-donation-website-production.up.railway.app/matching/all")
    .then(response => response.json())
    .then(data => {
        console.log("Fetched Matches Data:", data); // Debugging
        const donorMatches = data.filter(match => match.donor.user.id === parseInt(userData.id, 10));
        console.log("Filtered Donor Matches:", donorMatches); // Debugging
        const matchesContainer = document.getElementById("matchingUpdates");

        matchesContainer.innerHTML = donorMatches.length
            ? donorMatches.map(match => `
                <div class="match-card">
                    <p><strong>Matched Recipient:</strong> ${match.recipient.user.name}</p>
                    <p><strong>Organ:</strong> ${match.recipient.organType}</p>
                    <p><strong>Status:</strong> ${match.status}</p>
                </div>
            `).join("")
            : "<p>No matches found yet.</p>";
    })
    .catch(error => console.error("Error fetching matching updates:", error));


    // Make logout function globally accessible
    window.logout = function () {
        localStorage.removeItem("user");
        window.location.href = "index.html";
    };

    fetchDonorStatus();
    fetchMatchingUpdates();
});
