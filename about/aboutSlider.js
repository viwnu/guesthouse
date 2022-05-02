(function() {
  let aboutPhotoGalerySliders = [];
  document.querySelectorAll(".galery_slider").forEach((item, i) => {
    let aboutPhotoGaleryController = {
      sliderItem: item.querySelectorAll("li"),
      sliderContainer: item.querySelector("ul"),
      arrows: item.querySelectorAll('button'),
      buttonNames: {
        prev: item.querySelector(`button[name="prev-button"]`).name,
        next: item.querySelector(`button[name="next-button"]`).name
      }
    };

    aboutPhotoGalerySliders[i] = slider(aboutPhotoGaleryController);
    aboutPhotoGalerySliders[i]();
  });
})();
