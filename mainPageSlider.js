let roomsSliderController = {
  sliderItem: document.querySelectorAll(".rooms-list__item"),
  sliderContainer: document.querySelector(".rooms-list"),
};

let fidbackSliderController =  {
  sliderItem: document.querySelectorAll(".fidback__text"),
  sliderContainer: document.querySelector(".fidback__slider"),
  arrows: document.querySelectorAll('.fidback__controller'),
  buttonNames: {
    next: document.querySelector('.fidback__controller > button:nth-child(1)').name,
    prev: document.querySelector('.fidback__controller > button:nth-child(2)').name
  }
};

let roomsSlider = slider(roomsSliderController);
let fidbackSlider = slider(fidbackSliderController);

roomsSlider();
fidbackSlider();
