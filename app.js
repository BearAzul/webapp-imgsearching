$(document).ready(function () {
  function fetchImages(query) {
    $.ajax({
      url: `https://api.unsplash.com/search/photos?query=${query}&client_id=iG9MgEYb24t-UPkbU7MIYNdJEcRJa-_oP-IuWaDRDDg`,
      method: "GET",
      success: function (res) {
        const images = res.results;
        const imageContainer = $("#image-container");

        imageContainer.empty();

        images.forEach(function (image) {
          imageContainer.append(
            `<div class="image-wrapper">
                <img src="${image.urls.regular}" alt="${image.alt_description}">
                <a href="${image.urls.regular}" target="_blank"><i class="fa-solid fa-download"></i></a>
            </div>`
          );
        });
      },
      error: function (xhr, status, error) {
        console.error(xhr, status, error);
      },
    });
  }

  $("#search-btn").click(function () {
    fetchImages($("#search-input").val());
  });

  $(".category-btn").click(function () {
    const category = $(this).data("category");

    $(".category-btn").removeClass("active");

    $(this).addClass("active");

    switch (category) {
      case "nature":
        fetchImages("nature");
        break;
      case "city":
        fetchImages("city");
        break;
      case "technology":
        fetchImages("technology");
        break;
      default:
        fetchImages("random");
    }
  });

  fetchImages("random");
});

AOS.init();

AOS.init({
  once: true,
  duration: 800,
});
