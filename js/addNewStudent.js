var selectedSemester = null;
let qldtAPI="http://127.0.0.1:8000/qldt?";


function getqldt(callback, qldtAPI) {
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

    var html = htmls.join('\n');
    listqldtBlock.innerHTML = html;
}

// Call the start function
start();
