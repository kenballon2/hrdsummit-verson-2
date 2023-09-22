$(document).ready(function () {
  // announcement section slider
  $(".announcement-card-wrapper").slick({
    accessibility: true,
    draggable: true,
    autoplay: true,
    dots: true,
    arrows: false,
  });
  // testimonial section slider
  $(".testi-parent-slider").slick({
    accessibility: true,
    draggable: true,
    autoplay: true,
  });
});
