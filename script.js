const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  username = document.getElementById("username").value;
  password = document.getElementById("password").value;

  if (username === "admin" && password === "admin") {
    window.location.href = "main.html";
  } else {
    alert("Tên đăng nhập hoặc mật khẩu không hợp lệ");
  }
});

