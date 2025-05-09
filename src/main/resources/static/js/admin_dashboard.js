// admin_dashboard.js - Fully Updated with Dummy Hospital Integration

document.addEventListener("DOMContentLoaded", function () {
  const userData = localStorage.getItem("user");
  if (!userData) {
    alert("You must log in first.");
    window.location.href = "index.html";
    return;
  }
  const user = JSON.parse(userData);
  if (user.role !== "ADMIN") {
    alert("Access Denied! Only admins can access this page.");
    window.location.href = "index.html";
    return;
  }
  document.getElementById("adminName").innerText = user.name;

  function fetchAllUsers() {
    fetch("http://localhost:8080/api/users/all")
      .then(response => response.json())
      .then(users => {
        const tbody = document.getElementById('usersTableBody');
        tbody.innerHTML = users.length > 0
          ? users.map(user => `
            <tr>
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.role}</td>
            </tr>
          `).join('')
          : `<tr><td colspan="4">No registered users found</td></tr>`;
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        document.getElementById('usersTableBody').innerHTML = `
          <tr><td colspan="4">Error loading users: ${error.message}</td></tr>
        `;
      });
  }

  function fetchDonorRequests() {
    fetch("http://localhost:8080/donor/all")
      .then(response => response.json())
      .then(data => {
        const pendingDonors = data.filter(donor => donor.status.toLowerCase() === "pending");
        document.getElementById("pendingDonorCount").innerText = pendingDonors.length;
        const donorContainer = document.getElementById("donorRequests");
        donorContainer.innerHTML = pendingDonors.length > 0
          ? pendingDonors.map(donor => `
              <div class="donor-card" id="donor-${donor.donorId}">
                <p><strong>Name:</strong> ${donor.user.name}</p>
                <p><strong>Organ:</strong> ${donor.organType}</p>
                <p><strong>Blood Type:</strong> ${donor.bloodType}</p>
                <button onclick="verifyDonor(${donor.donorId})">Verify</button>
                <button onclick="rejectDonor(${donor.donorId})">Reject</button>
              </div>
            `).join("")
          : "<p>No pending donor verifications.</p>";
      })
      .catch(error => console.error("Error fetching donor requests:", error));
  }

  function fetchRecipientRequests() {
    fetch("http://localhost:8080/recipient/all")
      .then(response => response.json())
      .then(data => {
        const pendingRecipients = data.filter(recipient => recipient.status.toLowerCase() === "pending");
        document.getElementById("pendingRecipientCount").innerText = pendingRecipients.length;
        const recipientContainer = document.getElementById("recipientRequests");
        recipientContainer.innerHTML = pendingRecipients.length > 0
          ? pendingRecipients.map(recipient => `
              <div class="recipient-card" id="recipient-${recipient.recipientId}">
                <p><strong>Name:</strong> ${recipient.user.name}</p>
                <p><strong>Organ Needed:</strong> ${recipient.organType}</p>
                <p><strong>Blood Type:</strong> ${recipient.bloodType}</p>
                <button onclick="verifyRecipient(${recipient.recipientId})">Verify</button>
                <button onclick="rejectRecipient(${recipient.recipientId})">Reject</button>
              </div>
            `).join("")
          : "<p>No pending recipient verifications.</p>";
      })
      .catch(error => console.error("Error fetching recipient requests:", error));
  }

  window.verifyDonor = function (donorId) {
    fetch(`http://localhost:8080/admin/verify/donor/${donorId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.text())
      .then(message => {
        alert(message);
        fetchDonorRequests();

        // Fetch verified donor info
        fetch("http://localhost:8080/donor/all")
          .then(response => response.json())
          .then(allDonors => {
            const verifiedDonor = allDonors.find(d => d.donorId === donorId);
            if (!verifiedDonor) {
              console.error("Verified donor not found.");
              return;
            }

            const dummyRecipient = {
              user: { name: "Neha Gupta" },
              location: { lat: 19.07, lon: 72.88 }
            };

            simulateMatch(verifiedDonor, dummyRecipient);
          });
      })
      .catch(error => console.error("Error verifying donor:", error));
  };

  window.rejectDonor = function (donorId) {
    fetch(`http://localhost:8080/admin/reject/donor/${donorId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.text())
      .then(message => {
        alert(message);
        fetchDonorRequests();
      })
      .catch(error => console.error("Error rejecting donor:", error));
  };

  window.verifyRecipient = function (recipientId) {
    fetch(`http://localhost:8080/admin/verify/recipient/${recipientId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.text())
      .then(message => {
        alert(message);
        fetchRecipientRequests();
      })
      .catch(error => console.error("Error verifying recipient:", error));
  };

  window.rejectRecipient = function (recipientId) {
    fetch(`http://localhost:8080/admin/reject/recipient/${recipientId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.text())
      .then(message => {
        alert(message);
        fetchRecipientRequests();
      })
      .catch(error => console.error("Error rejecting recipient:", error));
  };

  fetchDonorRequests();
  fetchRecipientRequests();
  fetchAllUsers();

  const hospitals = [
    { id: 1, name: "CityCare Hospital", city: "Mumbai", contact: "022-123456", location: { lat: 19.076, lon: 72.8777 } },
    { id: 2, name: "GreenLeaf Medical", city: "Delhi", contact: "011-654321", location: { lat: 28.6139, lon: 77.2090 } },
    { id: 3, name: "Healing Touch Hospital", city: "Bangalore", contact: "080-987654", location: { lat: 12.9716, lon: 77.5946 } }
  ];

  function assignNearestHospital(recipientLocation) {
    return hospitals[0]; // Simplified for now
  }

  function simulateMatch(donor, recipient) {
    const hospital = assignNearestHospital(recipient.location);
    const matchHtml = `
      <p><strong>Donor:</strong> ${donor.user.name}</p>
      <p><strong>Recipient:</strong> ${recipient.user.name}</p>
      <p><strong>Organ:</strong> ${donor.organType}</p>
      <p><strong>Assigned Hospital:</strong> ${hospital.name}, ${hospital.city}</p>
      <p><strong>Contact:</strong> ${hospital.contact}</p>
    `;
    document.getElementById("matchHospitalInfo").innerHTML = matchHtml;
  }

  document.getElementById("profileAvatar").addEventListener("click", function(e) {
    e.stopPropagation();
    var profileDropdown = document.getElementById("profileDropdown");
    profileDropdown.style.display = (profileDropdown.style.display === "block") ? "none" : "block";
  });

  document.addEventListener("click", function() {
    document.getElementById("profileDropdown").style.display = "none";
  });

  document.getElementById("logoutLink").addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
});
