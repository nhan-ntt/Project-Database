var selectedSemester = null;
let qldtAPI="http://127.0.0.1:8000/qldt?";

function semester() {
    document.addEventListener("DOMContentLoaded", function () {
        var selectElement = document.getElementById("semester_id");
        selectElement.addEventListener("change", function () {
            qldtAPI = "http://127.0.0.1:8000/qldt?semester_id=" +selectElement.value;// Declare qldtAPI locally
            console.log(qldtAPI);
            getqldt(renderQldt, qldtAPI);
        });
    });
}

function start() {
    semester(); // Call the semester function

    var inputElements = {
        "student_id": document.getElementById("student_id"),
        "student_name": document.getElementById("student_name"),
        "date_of_birth": document.getElementById("date_of_birth"),
        "course_class_code": document.getElementById("course_class_code"),
        "subject_code": document.getElementById("subject_code"),
        "subject_name": document.getElementById("subject_name"),
        "credit": document.getElementById("credit"),
        "semester_id": document.getElementById("semester_id"), // Update to get the actual element
    };

    function handleEnterKeyPress(event) {
        if (event.key === "Enter") {
            var focusedInput = document.activeElement;
            var focusedInputName = Object.keys(inputElements).find(key => inputElements[key] === focusedInput);

            if (focusedInputName) {
                var criteria = { semester_id: selectedSemester };

                Object.keys(inputElements).forEach(key => {
                    criteria[key] = inputElements[key].value || null;
                });

                var validCriteria = Object.keys(criteria).reduce(function (acc, key) {
                    if (criteria[key] !== null && criteria[key] !== "") {
                        acc[key] = criteria[key];
                    }
                    return acc;
                }, {});

                criteria.semester_id = selectedSemester;

                var queryString = Object.keys(validCriteria)
                    .map(key => key + "=" + encodeURIComponent(validCriteria[key]))
                    .join("&");

                qldtAPI = "http://127.0.0.1:8000/qldt?" + queryString; // Declare qldtAPI locally
                console.log(qldtAPI);
                getqldt(renderQldt, qldtAPI);
            }
        }
    }

    Object.values(inputElements).forEach(inputElement => {
        inputElement.addEventListener("keydown", handleEnterKeyPress);
    });
}

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
