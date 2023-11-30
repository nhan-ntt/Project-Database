(function ($) {
  "use strict";

  $("form").submit(function (event) {
    event.preventDefault();
    var studentId = $("#student-id").val();
    $.ajax({
      url: "https://example.com/api/students/" + studentId,
      success: function (data) {
        // Xử lý dữ liệu trả về từ API
      },
      error: function () {
        // Xử lý lỗi khi gửi yêu cầu đến API
      },
    });
  });

  // Dropdown on mouse hover
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Courses carousel
  $(".courses-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    loop: true,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
    },
  });

  // Team carousel
  $(".team-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 30,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
  });

  // Related carousel
  $(".related-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 30,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
    },
  });
})(jQuery);

function confirmDeleteStudent() {
  $('#confirmDeleteStudent').modal('show');
}

function deleteStudent() {
  // Thực hiện xoá sinh viên tại đây
  $('#confirmDeleteStudent').modal('hide');
}

function confirmDelete() {
  $('#confirmDeleteMonHoc').modal('show');
}

function deleteSubject() {
  // Thực hiện xoá môn học tại đây
  $('#confirmDeleteMonHoc').modal('hide');
}

function showInputField() {
  var inputField = document.getElementById("inputField");
  var saveButton = document.getElementById("saveButton");
  inputField.style.display = "inline-block";
  saveButton.style.display = "inline-block";
}

function saveGrade() {
  var inputField = document.getElementById("inputField");
  var grade = inputField.value;
  // Thực hiện các thao tác lưu điểm mới vào cơ sở dữ liệu hoặc xử lý theo yêu cầu của bạn
  // Ví dụ: gửi dữ liệu điểm mới qua Ajax để lưu
  console.log("Điểm mới: " + grade);
  // Sau khi lưu thành công, bạn có thể ẩn ô nhập liệu và nút "Lưu" nếu cần
  inputField.style.display = "none";
  saveButton.style.display = "none";
}