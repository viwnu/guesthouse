(function() {
  let buttons = document.querySelectorAll(`button[name="more_button"]`);
  buttons.forEach((item, i) => {
    item.addEventListener('click', () => {
      let prices = item.parentElement.nextElementSibling;
      prices.style.display = "flex";
      item.style.display = "none";
      let lessButton = prices.querySelector(`button[name="less_button"]`);
      lessButton.addEventListener('click', () => {
        prices.style.display = "none";
        item.style.display = "block";
      });
    });
  });
})();
