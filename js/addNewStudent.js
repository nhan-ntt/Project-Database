// Giả sử bạn đã có các phần tử input thực tế



// Giả sử URL được định dạng đúng

// Tạo đối tượng dữ liệu

function addNewStudent(callback){
    const studentIdInput = document.getElementById("student_id");
    const studentNameInput = document.getElementById("student_name");
    const dateOfBirthInput = document.getElementById("date_of_birth");
    const course_class_gen = document.getElementById("course_class_gen");
    const major_nameInput = document.getElementById("major_name");
    const major_codeInput = document.getElementById("major_code");
    const data = {
        student_id: encodeURIComponent(studentIdInput.value),
        student_name: encodeURIComponent(studentNameInput.value),
        date_of_birth: encodeURIComponent(dateOfBirthInput.value),
        course_class_gen: encodeURIComponent(course_class_gen.value),
        major_name: encodeURIComponent(major_nameInput.value),
        major_code: encodeURIComponent(major_codeInput.value),
    };
    const urlAPI = `http://127.0.0.1:8000/addNewStudent?student_id=${data.student_id}&student_name=${data.student_name}&date_of_birth=${data.date_of_birth}&course_class_gen=${data.course_class_gen}&major_name=${data.major_name}&major_code=${data.major_code}`;
    console.log(data);
    console.log(urlAPI);

    var options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        // Có thể bạn cần bao gồm các tiêu đề bổ sung (ví dụ: xác thực)
        },
        body: JSON.stringify(data)
    }
    fetch(urlAPI,options)
        .then(function(response) {
        return response.json();
        })
        .then(callback);
}
function start(){

var SaveBtn = document.getElementById('Save');
  SaveBtn.onclick = function () {
   addNewStudent();
  };
}