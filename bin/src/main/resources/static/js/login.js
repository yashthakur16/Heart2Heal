document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const loginBtn = document.getElementById("loginBtn");
  
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
  
    loginBtn.innerHTML = "Logging in...";
    loginBtn.disabled = true;
  
    try {
      const response = await fetch("https://organs-donation-website-production.up.railway.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        throw new Error("Invalid email or password");
      }
  
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify({ id: data.id, name: data.name, role: data.role }));
  
      alert("Login successful!");
      window.location.href = data.role === "ADMIN" ? "admin_dashboard.html" : "dashboard.html";
    } catch (error) {
      alert(error.message);
    }
  
    loginBtn.innerHTML = "Sign In";
    loginBtn.disabled = false;
  });
  