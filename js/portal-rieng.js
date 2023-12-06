
function confirmDeleteStudent() { // Hàm này sẽ được gọi khi bạn click vào nút "Xoá sinh viên"
  $('#confirmDeleteStudent').modal('show');
}

function deleteStudent(callback) { // Hàm này sẽ được gọi khi bạn click vào nút "Xác nhận xoá sinh viên"

  const studentIdInput = document.getElementById("student_id");
  const subjectIdInput = document.getElementById("subject_id");
  const data = {
    student_id: encodeURIComponent(studentIdInput.value),
  
  };
  const url = `http://127.0.0.1:8000/portalrieng/student?student_id=${data.student_id}`;

  console.log(url);

  var options = {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
      // Có thể bạn cần bao gồm các tiêu đề bổ sung (ví dụ: xác thực)
      },
      body: JSON.stringify(data)
  }
  fetch(url, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            // Gọi lại hàm callback nếu cần thiết
            if (callback) {
                callback();
            }
            // Reload trang sau khi xoá sinh viên
            location.reload();
        });
      

  $('#confirmDeleteStudent').modal('hide');
}

function confirmDelete(subject_class_id) 
{
  $('#confirmDeleteMonHoc').modal('show');
    
  var DeleteBtn = document.getElementById('DeleteBtn');
  DeleteBtn.onclick = function () {
  deleteSubject(subject_class_id);
}
}

function deleteSubject(subject_class_id,callback) {
  console.log(subject_class_id);
  const studentIdInput = document.getElementById("student_id");
  const data = {
    student_id: encodeURIComponent(studentIdInput.value),
  }
  const url = `http://127.0.0.1:8000/portalrieng/subject?student_id=${data.student_id}&subject_class_id=${subject_class_id}`;

  console.log(url);

  
    var options = {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
      // Có thể bạn cần bao gồm các tiêu đề bổ sung (ví dụ: xác thực)
      },
      body: JSON.stringify(data)
  }
  fetch(url, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            // Gọi lại hàm callback nếu cần thiết
            if (callback) {
                callback();
            }
            // Reload trang sau khi xoá sinh viên
                  getSubject(`http://127.0.0.1:8000/portalrieng/subject?student_id=${data.student_id}`, renderSubject);

        });

  $('#confirmDeleteMonHoc').modal('hide');
}


function showInputField() { // Hàm này sẽ được gọi khi bạn click vào nút "Sửa điểm"
  var inputField = document.getElementById("inputField");
  var saveButton = document.getElementById("saveButton");
  inputField.style.display = "inline-block";
  saveButton.style.display = "inline-block";
}

function saveGrade() { // Hàm này sẽ được gọi khi bạn click vào nút "Lưu"
  var inputField = document.getElementById("inputField");
  var grade = inputField.value;
  // Thực hiện các thao tác lưu điểm mới vào cơ sở dữ liệu hoặc xử lý theo yêu cầu của bạn
  // Ví dụ: gửi dữ liệu điểm mới qua Ajax để lưu
  console.log("Điểm mới: " + grade);
  // Sau khi lưu thành công, bạn có thể ẩn ô nhập liệu và nút "Lưu" nếu cần
  inputField.style.display = "none";
  saveButton.style.display = "none";
}
let apiUrl="http://127.0.0.1:8000/portalrieng";

function searchStudent() { // Hàm này sẽ được gọi khi bạn click vào nút "Tìm kiếm"
  var SearchBtn = document.getElementById('Search');
  SearchBtn.onclick = function () {
      const studentIdInput = document.getElementById('student_id');
      const studentId = studentIdInput.value;

      // Search student
      getInfor(`http://127.0.0.1:8000/portalrieng?student_id=${studentId}`, function (student) {
          renderInfor(student);

          // Nếu có thông tin sinh viên, tiếp tục search subject
          if (student && student.id) {
              getSubject(`http://127.0.0.1:8000/portalrieng/subject?student_id=${student.id}`, renderSubject);
          }
      });
  };
}




function getInfor(apiUrlParam, callback) { // Hàm này sẽ được gọi khi bạn click vào nút "Tìm kiếm"
  fetch(apiUrlParam)
  .then(function (response) {
      return response.clone().json(); // Sao chép phản hồi và đọc nội dung
  })
  .then(callback)
  .catch(function (error) {
    console.error('Lỗi:', error);
    alert('Mã sinh viên không tồn tại!'); // Hiển thị thông báo mặc định
});
}

function getSubject(apiUrlParam, callback) { // Hàm này sẽ được gọi khi bạn click vào nút "Tìm kiếm"
  fetch(apiUrlParam)
  .then(function (response) {
      return response.clone().json(); // Sao chép phản hồi và đọc nội dung
  })
  .then(callback)
  .catch(function (error) {
    console.error('Lỗi:', error);
    alert('Sinh viên chưa đăng ký môn học nào!'); // Hiển thị thông báo mặc định
});
}
function renderInfor(subject) { // Hàm này sẽ được gọi khi bạn click vào nút "Tìm kiếm"
    var inforBlock = document.querySelector('.thongtin');
    if (subject.id == null || subject==null) {
      window.alert('Mã số sinh viên không tồn tại!');
      return;
  }

    inforBlock.innerHTML=
       `
        <div class="col-10 mb-2">
            <h6 class="mt-2">MSSV:  ${subject.id}</h6>
            <h6 class="mt-2">Họ tên:${subject.name}</h6>
            <h6 class="mt-2">Ngày sinh:${subject.date_of_birth}</h6>
            <h6 class="mt-2">Lớp:${subject.course_class_name}</h6>
            <h6 class="mt-2">Ngành:${subject.major}</h6>
            <h6 class="mt-2">GPA:${subject.weighted_gpa !== null ? subject.weighted_gpa : 'N/A'}</h6>
         </div>
        `;
    console.log(subject);
}
function renderSubject(listsubject) { // Hàm này sẽ được gọi khi bạn click vào nút "Tìm kiếm"
  var listsubjectBlock = document.querySelector('.list_subject');

  listsubjectBlock.innerHTML = "";

  var htmls = listsubject.map(function (item, index) {
    return `
      <tr>
        <td>${index + 1}</td>
        <th>${item.semester_yearstart}</th>
        <th>${item.semester_term}</th>
        <td>${item.subject_code}</td>
        <td>${item.subject_name}</td>
        <td>${item.credit}</td>
        <td>${item.gpa !== null ? item.gpa : 'N/A'}</td>
        <td>
          <button type="button" class="btn btn-outline-danger btn-sm" onclick="confirmDelete(${item.subject_class_id})">
            Xoá môn học
          </button>
          <button type="button" class="btn btn-outline-info btn-sm" onclick="showInputField()">
            Sửa điểm
          </button>
          <input class="align-items-sm-center" type="text" id="inputField" style="display: none; width: 100px;">
          <button class="btn btn-primary btn-sm" type="button" id="saveButton" style="display: none;" onclick="saveGrade()">Lưu</button>
        </td>
      </tr>
    `;
  });
  var html = htmls.join('\n');
  listsubjectBlock.innerHTML = html;
}


function start() { // Hàm này sẽ được gọi khi bạn click vào nút "Tìm kiếm"
  searchStudent();
}
start();