// Handle form submission for donation
document.getElementById("donateForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || userData.role !== "DONOR") {
      alert("Only donors can submit this form.");
      return;
    }
  
    if (!userData.id) {
      alert("User ID is missing. Please log in again.");
      window.location.href = "index.html";
      return;
    }
  
    // Collect form data into a requestBody object
    const requestBody = {
      userId: userData.id,
      fullName: document.getElementById("fullName").value.trim(),
      dob: document.getElementById("dob").value,
      gender: document.getElementById("gender").value,
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      address: document.getElementById("address").value.trim(),
      organType: document.getElementById("organType").value,
      bloodType: document.getElementById("bloodType").value,
      medicalHistory: document.getElementById("medicalHistory").value.trim(),
      lifestyleHabits: document.getElementById("lifestyleHabits").value.trim(),
      emergencyContact: document.getElementById("emergencyContact").value.trim(),
      legalConsent: document.getElementById("legalConsent").checked
    };
  
    // Validate required fields
    for (const key in requestBody) {
      if (typeof requestBody[key] === "string" && requestBody[key] === "") {
        alert(`Please fill out the ${key.replace(/([A-Z])/g, " $1").toLowerCase()} field.`);
        return;
      }
    }
  
    // Call the donation API endpoint
    fetch("https://organs-donation-website-production.up.railway.app/donor/donate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to submit donation. Please try again.");
      }
      return response.text();
    })
    .then(data => {
      alert(data);
      window.location.href = "dashboard.html"; // Redirect after successful submission
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
  });
  
  // Stub function for Chat button
  function openChat() {
    alert("Chat with recipient feature coming soon!");
  }
  