let apiUrl="http://127.0.0.1:8000/portalrieng?";
function searchStudent() {
    const studentIdInput = document.getElementById('student_id');
    const studentId = studentIdInput.value;

    if (studentId) {
        apiUrl = `http://127.0.0.1:8000/portalrieng?student_id=${studentId}`;
        getInfor(apiUrl, renderInfor);
    } else {
        console.log('Please enter a student ID');
    }
}


function getInfor(apiUrlParam, callback) {
    fetch(apiUrlParam)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}


function renderInfor(portalrieng) {
    var inforBlock = document.querySelector('.thongtin');
    inforBlock.innerHTML=
       `
        <div class="col-2 mb-2">
            <h6 class="mt-2">MSSV:  ${portalrieng.id}</h6>
            <h6 class="mt-2">Họ tên:${portalrieng.name}</h6>
            <h6 class="mt-2">Ngày sinh:${portalrieng.date_of_birth}</h6>
            <h6 class="mt-2">Lớp:${portalrieng.course_class_name}</h6>
            <h6 class="mt-2">GPA:${portalrieng.weighted_gpa}</h6>
         </div>
        `;
    console.log(portalrieng);
}
function start() {
    searchStudent();
    getInfor(apiUrl,renderInfor );
}
start();