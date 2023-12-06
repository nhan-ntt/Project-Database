function confirmDeleteStudent() {
  $('#confirmDeleteStudent').modal('show');
}

function deleteStudent(callback) {

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
            reload(data.student_id)

        });

  $('#confirmDeleteMonHoc').modal('hide');
}


function showInputField(subject_class_id) {
  var inputField = document.getElementById(`inputField_${subject_class_id}`);
  var saveButton = document.getElementById(`saveButton_${subject_class_id}`);
  inputField.style.display = "inline-block";
  saveButton.style.display = "inline-block";
}

function saveGrade(subject_class_id,callback) {
  var inputField = document.getElementById(`inputField_${subject_class_id}`);
  var gpa = inputField.value;
  // Thực hiện các thao tác lưu điểm mới vào cơ sở dữ liệu hoặc xử lý theo yêu cầu của bạn
  // Ví dụ: gửi dữ liệu điểm mới qua Ajax để lưu
  console.log("Điểm mới: " + gpa);
  console.log(subject_class_id);
  const studentIdInput = document.getElementById("student_id");
  const data = {
    student_id: encodeURIComponent(studentIdInput.value),
  }
  const url = `http://127.0.0.1:8000/editScore?student_id=${data.student_id}&subject_class_id=${subject_class_id}&gpa=${gpa}`;

  console.log(url);

  
    var options = {
      method: "PUT",
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
            reload(data.student_id)


            // Reload trang sau khi xoá sinh viên
                  //getSubject(`http://127.0.0.1:8000/portalrieng/subject?student_id=${data.student_id}`, renderSubject);

        });
  // Sau khi lưu thành công, bạn có thể ẩn ô nhập liệu và nút "Lưu" nếu cần
  inputField="";
}
let apiUrl="http://127.0.0.1:8000/portalrieng";

function searchStudent() {
  var SearchBtn = document.getElementById('Search');
  SearchBtn.onclick = function () {
      const studentIdInput = document.getElementById('student_id');
      const studentId = studentIdInput.value;
      reload(studentId)
      // Search student
     
  };
}

function reload(studentId){
    getInfor(`http://127.0.0.1:8000/portalrieng?student_id=${studentId}`, function (student) {
      renderInfor(student);

      // Nếu có thông tin sinh viên, tiếp tục search subject
      if (student && student.id) {
          getSubject(`http://127.0.0.1:8000/portalrieng/subject?student_id=${student.id}`, renderSubject);
      }
  });
}


function getInfor(apiUrlParam, callback) {
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

function getSubject(apiUrlParam, callback) {
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
function renderInfor(subject) {
    var inforBlock = document.querySelector('.thongtin');
    if (subject.id == null || subject==null) {
      window.alert('Mã số sinh viên không tồn tại!');
      return;
  }

  inforBlock.innerHTML=
  `
   <div class="col-2 mb-2">
       <h6 class="mt-2">MSSV:  ${subject.id}</h6>
       <h6 class="mt-2">Họ tên:${subject.name}</h6>
       <h6 class="mt-2">Ngày sinh:${subject.date_of_birth}</h6>
       <h6 class="mt-2">Lớp:${subject.course_class_name}</h6>
       <h6 class="mt-2">Ngành:${subject.major}</h6>
       <h6 class="mt-2">GPA:${subject.gpa !== null ? subject.gpa : 'N/A'}</h6>
    </div>
   `;
    console.log(subject);
}
function renderSubject(listsubject) {
  var listsubjectBlock = document.querySelector('.list_subject');

  listsubjectBlock.innerHTML = "";

  // Group subjects by semester_year and term
  var groupedSubjects = {};
  listsubject.forEach(function (item) {
    var key = item.semester_yearstart + '-' + item.semester_term;
    if (!groupedSubjects[key]) {
      groupedSubjects[key] = [];
    }
    groupedSubjects[key].push(item);
  });

  // Generate HTML for each group
  var htmls = Object.keys(groupedSubjects).map(function (key, index) {
    var group = groupedSubjects[key];
    var groupHtml = group.map(function (subject, innerIndex) {
      return `
        <tr>
          <td>${innerIndex + 1}</td>
          <td>${subject.subject_code}</td>
          <td>${subject.subject_name}</td>
          <td>${subject.credit}</td>
          <td>${subject.gpa !== null ? subject.gpa : 'N/A'}</td>
          <td>${subject.status !== null ? subject.status : 'InProgress'}</td>
          <td>
            <button type="button" class="btn btn-outline-danger btn-sm" onclick="confirmDelete(${subject.subject_class_id})">
              Xoá môn học
            </button>
            <button type="button" class="btn btn-outline-info btn-sm" onclick="showInputField(${subject.subject_class_id})">
              Sửa điểm
            </button>
            <input class="align-items-sm-center" type="text" id="inputField_${subject.subject_class_id}" style="display: none; width: 100px;">
            <button class="btn btn-primary btn-sm" type="button" id="saveButton_${subject.subject_class_id}" style="display: none;" onclick="saveGrade(${subject.subject_class_id})">Lưu</button>
          </td>
        </tr>
      `;
    });

    return `
      <tr class="group-header">
        <th colspan="9"><strong>Học kỳ ${group[0].semester_term} - Năm học ${group[0].semester_yearstart}</strong></th>
      </tr>
      ${groupHtml.join('\n')}
    `;
  });


  var html = htmls.join('\n');
  listsubjectBlock.innerHTML = html;
}



function start() {
  searchStudent();
}
start();