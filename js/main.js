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

// fetch("http://127.0.0.1:8000/qldt?student_id=2")
//   .then(response => response.json())
//   .then(data => {
//     // Handle the data here
//     console.log(data);
//   })
//   .catch(error => {
//     // Handle errors here
//     console.error('Error:', error);
//   })

const fetchData = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/qldt?student_id=2");
    const data = await response.json();

    // Return the data from the function
    return data;
  } catch (error) {
    // Throw the error so that it can be caught by the caller
    throw error;
  }
};

// Use async/await to handle the asynchronous operation
const loadData = async () => {
  try {
    const data = await fetchData();

    // Check if data is defined and has at least one element
    if (data && data.length > 0) {
      // Set the innerHTML using the first element
      document.getElementById("studentid").innerHTML = data[0].id;
      alert(JSON.stringify(data)); // Alert the entire data array as a string
    } else {
      console.error('Error: Data is undefined or empty.');
    }
  } catch (error) {
    // Handle errors here
    console.error('Error:', error);
  }
};

// Call the loadData function
loadData();
