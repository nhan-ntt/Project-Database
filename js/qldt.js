
start();

// let qldtAPI="http://127.0.0.1:8000/qldt"; 
// let headString="?";
// function semester(){
//     document.addEventListener("DOMContentLoaded", function () {
//         // Chọn phần tử select
//         var selectElement = document.getElementById("SinhvienLmh_term_id");
    
//         // Bắt sự kiện khi giá trị được chọn thay đổi
//         selectElement.addEventListener("change", function () {
//           // Lấy giá trị đã chọn
//           var selectedTerm = selectElement.value;
    
//           // Hiển thị giá trị đã chọn trong console (bạn có thể thay đổi phần này theo nhu cầu)
//           console.log("Đã chọn học kỳ có giá trị: " + selectedTerm);
    
//           // Nếu bạn muốn thực hiện thêm xử lý với giá trị đã chọn, bạn có thể thêm mã vào đây
//         });
//       });
      
// }
// function get(str) {
//     if(str=="studentId") return student_id;
//     return "";
// }
// function Input(str){
//     var Input = document.getElementById(str);
//     if(Input="") Input=Input + "?"
//     else Input = Input + "&" ;
//     return Input + document.getElementById(str).value;
// }
// function FinalInput(){
//     Input("studentId"); 
// }
function start() {
   // semester();
   // FinalInput();
  var studentIdInput = document.getElementById("student_id");

    // Sự kiện lắng nghe khi người dùng bấm Enter
  studentIdInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        // Gọi hàm getqldt với studentId từ input
        qldtAPI = "http://127.0.0.1:8000/qldt?student_id=" + studentIdInput.value;
        console.log(qldtAPI);  // In giá trị của URL để kiểm tra
        getqldt(renderQldt);
      }
    });
}


function getqldt(callback) {
  fetch(qldtAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function renderQldt(qldt) {
  var listqldtBlock = document.querySelector(".list-qldt");
  listqldtBlock.innerHTML = "";
  
  var htmls = qldt.map(function (item, index) {
    return `
      <tr style="background-color: #E5F1F4;">
        <td>${index + 1}</td>
        <td><input name="id" type="text" class="form-control form-control-sm" value="${item.id}"></td>
        <td><input name="name" type="text" class="form-control form-control-sm" value="${item.name}"></td>
        <td><input name="dob" type="text" class="form-control form-control-sm" value="${item.date_of_birth}"></td>
        <td><input name="class" type="text" class="form-control form-control-sm" value="${item.course_class_name}"></td>
        <td><input name="code" type="text" class="form-control form-control-sm" value="${item.subject_code}"></td>
        <td><input name="subject" type="text" class="form-control form-control-sm" value="${item.subject_name}"></td>
        <td><input name="credit" maxlength="10" class="form-control form-control-sm" value="${item.credit}"></td>
      </tr>`;
  });
  qldtAPI="http://127.0.0.1:8000/qldt"; 

  var html = htmls.join('\n');
  listqldtBlock.innerHTML = html;
}


 