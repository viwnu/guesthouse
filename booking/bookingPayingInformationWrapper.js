let bookingButton = document.querySelector(".submit_label input");
bookingButton.addEventListener('click', () => {
  document.querySelector(".booking_form").style.display = "none";
  document.querySelector(".paying_information").style.display = "block";
});
