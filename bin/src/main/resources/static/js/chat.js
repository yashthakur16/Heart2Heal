document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData) {
        alert("Please log in to access the chat.");
        window.location.href = "index.html";
        return;
    }

    const chatWindow = document.getElementById("chatWindow");
    const messageInput = document.getElementById("messageInput");
    const sendMessageButton = document.getElementById("sendMessage");
    const userList = document.getElementById("userList");
    const chatHeader = document.getElementById("chatHeader");

    let selectedReceiverId = null;

    // Load available users
    function loadUsers() {
        fetch("https://organs-donation-website-production.up.railway.app/api/users/all")
            .then(response => response.json())
            .then(users => {
                console.log("Users fetched:", users);

                if (!Array.isArray(users)) {
                    throw new Error("Unexpected response format");
                }

                userList.innerHTML = "";

                users.forEach(user => {
                    if (user.id !== userData.id) {
                        const userElement = document.createElement("div");
                        userElement.classList.add("user");
                        userElement.textContent = user.name;
                        userElement.dataset.userId = user.id;
                        userElement.addEventListener("click", (event) => selectUser(user, event));
                        userList.appendChild(userElement);
                    }
                });
            })
            .catch(error => console.error("Error fetching users:", error));
    }

    function selectUser(user, event) {
        selectedReceiverId = user.id;
        chatHeader.textContent = `Chat with ${user.name}`;

        // Remove active class from all users and highlight the selected one
        document.querySelectorAll(".user").forEach(el => el.classList.remove("active"));
        event.target.classList.add("active");

        loadChat();
    }

    function loadChat() {
        if (!selectedReceiverId) return;

        fetch(`https://organs-donation-website-production.up.railway.app/api/chats/history?user1Id=${userData.id}&user2Id=${selectedReceiverId}`)
            .then(response => response.json())
            .then(messages => {
                console.log("Messages fetched:", messages);
                
                chatWindow.innerHTML = messages.map(msg => `
                    <div class="chat-message ${msg.sender.id === userData.id ? 'sent' : 'received'}">
                        ${msg.message}
                    </div>
                `).join("");
            })
            .catch(error => console.error("Error fetching chat messages:", error));
    }

    sendMessageButton.addEventListener("click", function () {
        if (!selectedReceiverId) {
            alert("Please select a user to chat with.");
            return;
        }
        
        const message = messageInput.value.trim();
        if (!message) {
            alert("Message cannot be empty.");
            return;
        }

        fetch("https://organs-donation-website-production.up.railway.app/api/chats/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                senderId: userData.id,
                receiverId: selectedReceiverId,
                message: message
            })
        })
        .then(response => response.text())
        .then(() => {
            console.log("Message sent successfully");
            messageInput.value = "";
            loadChat();
        })
        .catch(error => console.error("Error sending message:", error));
    });

    loadUsers();
});
