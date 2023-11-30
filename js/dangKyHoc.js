let apiUrl = "http://127.0.0.1:8000/dangkyhoc";

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

    var htmls = subject.map(function (item, index) {
        return `
      <tr >
        <td>${index + 1}</td>
        <td>${item.subject_name}</td>
        <td>${item.subject_code}</td>
        <td>${item.credit}</td>
        <td>
        <div class="form-row align-items-sm-center">
          <div class="col">
            <div class="form-group form-control-sm">
              <input type="text" class="form-control" name="MSSV" placeholder="MSSV" required>
            </div>
          </div>
          <div class="col">
            <button type="button" class="btn btn-outline-success btn-sm">
              Đăng ký
            </button>
          </div>
        </div>
      </td>
      </tr>`;
    });

    var html = htmls.join('\n');
    listqldtBlock.innerHTML = html;
}

function start() {
    getInfor(apiUrl, renderInfor);
}

start();
