document.addEventListener("DOMContentLoaded", function () {
    // Check if user is logged in and is ADMIN
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
    // Set admin name in the overview section
    document.getElementById("adminName").innerText = user.name;
  
    // Fetch Donor Requests and update pending count
    function fetchDonorRequests() {
      fetch("https://organs-donation-website-production.up.railway.app/donor/all")
        .then(response => response.json())
        .then(data => {
          // Filter pending donor requests (assuming 'status' property exists)
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
  
    // Fetch Recipient Requests and update pending count
    function fetchRecipientRequests() {
      fetch("https://organs-donation-website-production.up.railway.app/recipient/all")
        .then(response => response.json())
        .then(data => {
          // Filter pending recipient requests (assuming 'status' property exists)
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
  
    // Function to Verify Donor using the provided API endpoint
    window.verifyDonor = function (donorId) {
      fetch(`https://organs-donation-website-production.up.railway.app/admin/verify/donor/${donorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.text())
        .then(message => {
          alert(message);
          // Re-fetch donor requests to update UI and pending count
          fetchDonorRequests();
        })
        .catch(error => console.error("Error verifying donor:", error));
    };
  
    // Function to Reject Donor using the provided API endpoint
    window.rejectDonor = function (donorId) {
      fetch(`https://organs-donation-website-production.up.railway.app/admin/reject/donor/${donorId}`, {
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
  
    // Function to Verify Recipient using the provided API endpoint
    window.verifyRecipient = function (recipientId) {
      fetch(`https://organs-donation-website-production.up.railway.app/admin/verify/recipient/${recipientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to verify recipient");
          }
          return response.text();
        })
        .then(message => {
          alert(message);
          fetchRecipientRequests();
        })
        .catch(error => console.error("Error verifying recipient:", error));
    };
  
    // Function to Reject Recipient using the provided API endpoint
    window.rejectRecipient = function (recipientId) {
      fetch(`https://organs-donation-website-production.up.railway.app/admin/reject/recipient/${recipientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to reject recipient");
          }
          return response.text();
        })
        .then(message => {
          alert(message);
          fetchRecipientRequests();
        })
        .catch(error => console.error("Error rejecting recipient:", error));
    };
  
    // Fetch initial data for pending requests
    fetchDonorRequests();
    fetchRecipientRequests();
  
    // Profile dropdown handling for admin topbar
    document.getElementById("profileAvatar").addEventListener("click", function(e) {
      e.stopPropagation();
      var profileDropdown = document.getElementById("profileDropdown");
      profileDropdown.style.display = (profileDropdown.style.display === "block") ? "none" : "block";
    });
    
    document.addEventListener("click", function() {
      document.getElementById("profileDropdown").style.display = "none";
    });
    
    // Logout functionality
    document.getElementById("logoutLink").addEventListener("click", function(e) {
      e.preventDefault();
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "index.html";
    });
  });
