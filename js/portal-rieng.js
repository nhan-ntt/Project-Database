function confirmDeleteStudent() {
  $('#confirmDeleteStudent').modal('show');
}

function deleteStudent() {
  // Thực hiện xoá sinh viên tại đây
  $('#confirmDeleteStudent').modal('hide');
}

function confirmDelete() {
  $('#confirmDeleteMonHoc').modal('show');
}

function deleteSubject() {
  // Thực hiện xoá môn học tại đây
  $('#confirmDeleteMonHoc').modal('hide');
}

function showInputField() {
  var inputField = document.getElementById("inputField");
  var saveButton = document.getElementById("saveButton");
  inputField.style.display = "inline-block";
  saveButton.style.display = "inline-block";
}

function saveGrade() {
  var inputField = document.getElementById("inputField");
  var grade = inputField.value;
  // Thực hiện các thao tác lưu điểm mới vào cơ sở dữ liệu hoặc xử lý theo yêu cầu của bạn
  // Ví dụ: gửi dữ liệu điểm mới qua Ajax để lưu
  console.log("Điểm mới: " + grade);
  // Sau khi lưu thành công, bạn có thể ẩn ô nhập liệu và nút "Lưu" nếu cần
  inputField.style.display = "none";
  saveButton.style.display = "none";
}