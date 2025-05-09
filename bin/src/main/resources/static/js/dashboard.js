document.addEventListener("DOMContentLoaded", function() {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      alert("You must log in first.");
      window.location.href = "index.html";
      return;
    }
    const user = JSON.parse(userData);
    document.getElementById("username").innerText = user.name;
    document.getElementById("userRole").innerText = user.role;
    
    // Role-based display for dashboard cards and quick actions
    if (user.role === "DONOR") {
      document.querySelectorAll(".donor-card").forEach(card => card.style.display = "block");
      document.querySelectorAll(".recipient-card").forEach(card => card.style.display = "none");
      const donorAction = document.querySelector(".donor-action");
      if (donorAction) donorAction.style.display = "flex";
      const recipientAction = document.querySelector(".recipient-action");
      if (recipientAction) recipientAction.style.display = "none";
    } else if (user.role === "RECIPIENT") {
      document.querySelectorAll(".donor-card").forEach(card => card.style.display = "none");
      document.querySelectorAll(".recipient-card").forEach(card => card.style.display = "block");
      const donorAction = document.querySelector(".donor-action");
      if (donorAction) donorAction.style.display = "none";
      const recipientAction = document.querySelector(".recipient-action");
      if (recipientAction) recipientAction.style.display = "flex";
    } else if (user.role === "ADMIN") {
      // For admin, hide both donor and recipient sections or add admin-specific elements
      document.querySelectorAll(".donor-card").forEach(card => card.style.display = "none");
      document.querySelectorAll(".recipient-card").forEach(card => card.style.display = "none");
      const donorAction = document.querySelector(".donor-action");
      if (donorAction) donorAction.style.display = "none";
      const recipientAction = document.querySelector(".recipient-action");
      if (recipientAction) recipientAction.style.display = "none";
    }
    
    // Set dummy metrics for demonstration (replace with API data if available)
    document.getElementById("totalDonations").innerText = "1293";
    document.getElementById("pendingDonations").innerText = "289";
    document.getElementById("livesSaved").innerText = "880";
    document.getElementById("activeRequests").innerText = "600";
    document.getElementById("requestUpdates").innerText = "5";
    document.getElementById("waitTime").innerText = "2 Weeks";
    
    // Topbar: Notification and Profile dropdown handling
    
    // Attach event to the notification wrapper so clicking anywhere toggles the dropdown
    document.getElementById("notificationWrapper").addEventListener("click", function(e) {
      e.stopPropagation();
      var notifDropdown = document.getElementById("notificationDropdown");
      notifDropdown.style.display = (notifDropdown.style.display === "block") ? "none" : "block";
    });
    
    // Profile avatar dropdown toggle
    document.getElementById("profileAvatar").addEventListener("click", function(e) {
      e.stopPropagation();
      var profileDropdown = document.getElementById("profileDropdown");
      profileDropdown.style.display = (profileDropdown.style.display === "block") ? "none" : "block";
    });
    
    // Hide dropdowns when clicking outside
    document.addEventListener("click", function() {
      document.getElementById("notificationDropdown").style.display = "none";
      document.getElementById("profileDropdown").style.display = "none";
    });
    
    // Logout functionality
    document.getElementById("logoutLink").addEventListener("click", function(e) {
      e.preventDefault();
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.location.href = "index.html";
    });
    
    // Fetch notifications from API using the logged-in user's ID
    fetchNotifications(user.id);
    
    async function fetchNotifications(userId) {
      try {
        // Replace the URL with your actual API endpoint
        const response = await fetch(`https://organs-donation-website-production.up.railway.app/api/notifications/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const notifications = await response.json();
        const notificationList = document.getElementById("notificationList");
        notificationList.innerHTML = ""; // Clear existing notifications
        
        notifications.forEach(notification => {
          const li = document.createElement("li");
          li.innerText = notification.message; // Assuming each notification has a 'message' field
          // On click, mark the notification as read
          li.addEventListener("click", async function() {
            try {
              await fetch(`https://organs-donation-website-production.up.railway.app/api/notifications/read/${notification.id}`, {
                method: "PUT"
              });
              // Visual update to show it is read (optional)
              li.style.textDecoration = "line-through";
            } catch (error) {
              console.error("Error marking notification as read:", error);
            }
          });
          notificationList.appendChild(li);
        });
        
        // Update the notification count (for all notifications; consider using unread count if preferred)
        document.getElementById("notificationCount").innerText = notifications.length;
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
  });
  