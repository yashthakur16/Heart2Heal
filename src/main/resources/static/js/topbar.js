// Toggle Notification Dropdown on icon click
document.getElementById("notificationIcon").addEventListener("click", function(e) {
    e.stopPropagation();
    var notifDropdown = document.getElementById("notificationDropdown");
    notifDropdown.style.display = (notifDropdown.style.display === "block") ? "none" : "block";
  });
  
  // Toggle Profile Dropdown on avatar click
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
    alert("Logging out...");
    window.location.href = "index.html";
  });
  