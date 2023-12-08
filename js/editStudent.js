// Giả sử bạn đã có các phần tử input thực tế



// Giả sử URL được định dạng đúng

// Tạo đối tượng dữ liệu

function editStudent(callback){
    const studentIdInput = document.getElementById("student_id");
    const studentNameInput = document.getElementById("student_name");
    const dateOfBirthInput = document.getElementById("date_of_birth");
    const data = {
      student_id: encodeURIComponent(studentIdInput.value),
      student_name: encodeURIComponent(studentNameInput.value),
      date_of_birth: encodeURIComponent(dateOfBirthInput.value),
    };
    const urlAPI = `http://127.0.0.1:8000/editStudent?student_id=${data.student_id}&student_name=${data.student_name}&date_of_birth=${data.date_of_birth}`;

    console.log(urlAPI);

    var options = {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        // Có thể bạn cần bao gồm các tiêu đề bổ sung (ví dụ: xác thực)
        },
        body: JSON.stringify(data)
    }
    fetch(urlAPI, options)
    .then(function (response) {
        return response.json();
    })
    .then(function (result) {
        alert("Sửa thông tin sinh viên thành công!");
        // Handle success here
        if (callback) {
            callback("Sửa thông tin sinh viên thành công!");
        }
    })
    .catch(function (error) {
        console.error("Error:", error.message);
        alert("Sửa thông tin sinh viên thất bại!");
        // Handle errors here
        if (callback) {
            callback("Sửa thông tin sinh viên thất bại!");
        }
    });
}
function start(){

var SaveBtn = document.getElementById('Save');
  SaveBtn.onclick = function () {
    console.log("hello");
   editStudent();
  };
}