function register(event, subject_class_id, callback) {
  var inputField = event.target.parentElement.querySelector('input[name="MSSV"]');
  var messageElement = event.target.parentElement.querySelector(".message");
  var mssv = inputField.value;

  const API = `http://127.0.0.1:8000/dangkyhoc?student_id=${mssv}&subject_class_id=${subject_class_id}`;
  console.log(API);

  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Các tiêu đề bổ sung nếu cần (ví dụ: xác thực)
    },
  };

  fetch(API, options)
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
      }
      return response.text(); // Thay đổi từ json() sang text()
    })
    .then(function (data) {
      // Kiểm tra điều kiện để đăng ký thành công
      if (true) {
        // Kiểm tra xem chuỗi data có chứa thông báo "Bản ghi đã tồn tại trong CSDL" hay không
        if (data.includes("Bản ghi đã tồn tại trong CSDL")) {
          // Xử lý trường hợp bản ghi đã tồn tại
          alert("Bản ghi đã tồn tại trong CSDL. Đăng ký thất bại!");
        } else {
          // Đăng ký thành công
          alert("Bạn đã đăng ký thành công!");
          // Kiểm tra xem data có phải là mảng subject hay không
          try {
            const jsonData = JSON.parse(data);
            if (Array.isArray(jsonData.subject)) {
              // Gọi hàm callback chỉ khi đăng ký thành công
              callback(jsonData.subject);
            } else {
              console.error("Dữ liệu môn học không hợp lệ:", jsonData.subject);
            }
          } catch (error) {
            console.error("Lỗi trong quá trình xử lý dữ liệu JSON:", error);
          }
          // Đặt lại giá trị của ô input về rỗng
          inputField.value = "";
        }
      } else {
        messageElement.textContent = "Đăng ký thất bại";
        messageElement.style.color = "red";
      }
    })
    .catch(function (error) {
      console.error("Lỗi trong quá trình đăng ký:", error);
      // Xử lý lỗi ở đây nếu cần
      alert("Đăng ký thất bại!");
      // Đặt lại giá trị của ô input về rỗng trong trường hợp lỗi
    });      
    inputField.value = "";

}


function getInfor(apiUrlParam, callback) {
  fetch(apiUrlParam)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}
function renderInfor(subject) {
  var listqldtBlock = document.querySelector(".list-subject");
  listqldtBlock.innerHTML = "";

  if (Array.isArray(subject)) {
    var htmls = subject.map(function (item, index) {
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${item.subject_name}</td>
          <td>${item.subject_code}</td>
          <td>${item.credit}</td>
          <td>
            <input type="text" class="form-control-sm" name="MSSV" placeholder="MSSV" required>
            <button  type="button" class="btn btn-outline-success btn-sm" onclick="register(event,${item.subject_class_id}, renderInfor)">
              Đăng kí
            </button>
            <span class="message"></span>
          </td>
        </tr>`;
    });

    var html = htmls.join('\n');
    listqldtBlock.innerHTML = html;
  } else {
    console.error("Dữ liệu môn học không hợp lệ:", subject);
  }
}



function start() {
  let apiUrl = "http://127.0.0.1:8000/dangkyhoc";
  getInfor(apiUrl, renderInfor);
}

start();
