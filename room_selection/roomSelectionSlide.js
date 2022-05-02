(function() {
  if(window.innerWidth <= 768) {
    let roomSelectionSlider = [];
    document.querySelectorAll(".room_card__right_side").forEach((item, i) => {
      let roomSelectionController = {
        sliderItem: item.querySelectorAll(".room_price_card"),
        sliderContainer: item.querySelector("ul"),
      };
      roomSelectionSlider[i] = slider(roomSelectionController);
      roomSelectionSlider[i]();
    });
  }
})();
