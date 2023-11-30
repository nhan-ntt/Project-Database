function register() {
  var inputField = document.querySelector('input[name="MSSV"]');
  var messageElement = document.getElementById("message");
  var mssv = inputField.value;

  // Thực hiện kiểm tra và xử lý đăng kí tại đây
  if (true) {
    messageElement.textContent = ".....Đăng kí thành công";
    messageElement.style.color = "green";
  } else {
    messageElement.textContent = "..... Đăng kí thất bại";
    messageElement.style.color = "red";
  }
}