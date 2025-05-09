document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem("user"));
    
    if (!userData || userData.role !== "RECIPIENT") {
        alert("Only recipients can access this page.");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("organRequestForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const organType = document.getElementById("organType").value;
        const bloodType = document.getElementById("bloodType").value;

        const requestBody = {
            organType: organType,
            bloodType: bloodType
        };

        // js/request_organ.js
document.getElementById('organType').addEventListener('change', function() {
    const organIcons = {
        'Kidney': 'https://cdn-icons-png.flaticon.com/512/3059/3059518.png',
        'Liver': 'https://cdn-icons-png.flaticon.com/512/3059/3059529.png',
        'Heart': 'https://cdn-icons-png.flaticon.com/512/3059/3059545.png',
        'Lung': 'https://cdn-icons-png.flaticon.com/512/3059/3059539.png'
    };
    document.getElementById('dynamicOrganIcon').src = organIcons[this.value];
});

// Initialize with default organ icon
document.getElementById('dynamicOrganIcon').src = 'https://cdn-icons-png.flaticon.com/512/3059/3059518.png';

        fetch(`http://localhost:8080/recipient/request?userId=${userData.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            window.location.href = "dashboard.html";
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error submitting request.");
        });
    });
});
