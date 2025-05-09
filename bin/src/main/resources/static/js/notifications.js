const user = JSON.parse(localStorage.getItem("user")); // Retrieve user object
const userId = user ? user.id : null;

if (!userId) {
    console.error("User ID is missing. Make sure the user is logged in.");
} else {
    // Function to fetch unread notifications
    function fetchNotifications() {
        fetch(`https://organs-donation-website-production.up.railway.app/api/notifications/unread/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data)) {
                    throw new Error("Invalid response format: Expected an array.");
                }
                displayNotifications(data);
            })
            .catch(error => console.error("Error fetching notifications:", error));
    }

    // Function to display notifications dynamically
    function displayNotifications(notifications) {
        const notificationList = document.getElementById("notification-list");
        notificationList.innerHTML = ""; // Clear previous notifications

        notifications.forEach(notification => {
            const li = document.createElement("li");
            li.textContent = notification.message;
            li.setAttribute("data-id", notification.notificationId);
            li.classList.add("notification-item");

            // Mark notification as read on click
            li.addEventListener("click", function () {
                markAsRead(notification.notificationId);
                li.remove(); // Remove after marking as read
            });

            notificationList.appendChild(li);
        });
    }

    // Function to mark a notification as read
    function markAsRead(notificationId) {
        fetch(`https://organs-donation-website-production.up.railway.app/api/notifications/read/${notificationId}`, {
            method: "PUT"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to mark as read. Status: ${response.status}`);
            }
            return response.text();
        })
        .then(() => {
            console.log(`Notification ${notificationId} marked as read.`);
        })
        .catch(error => console.error("Error marking as read:", error));
    }

    // Poll for new notifications every 5 seconds
    setInterval(fetchNotifications, 5000);

    // Fetch notifications immediately on page load
    fetchNotifications();
}
