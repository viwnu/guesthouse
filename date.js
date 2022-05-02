let datePickerIcons = document.querySelectorAll(".date-picker-icon");

function createCalendar(currentDate, daysInMonth, minDate) {

  let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь',  'Ноябрь', 'Декабрь'];


  this.daysInMonth = daysInMonth;

  this.datePicker = document.createElement('div');
  this.datePicker.className =  "date-picker";
  this.datePicker.innerHTML =
  `<div class="month-picker">
    <button type="button" name="left-button">
      <img src="assets/logos/left-btn.svg" alt="prev">
    </button>
    <p></p>
    <button type="button" name="right-button">
      <img src="assets/logos/right-btn.svg" alt="prev">
    </button>
  </div>`;

  this.MonthDecreaseButton = this.datePicker.querySelector('button[name="left-button"]');
  this.monthIncreaseButton = this.datePicker.querySelector('button[name="right-button"]');
  this.showingMonth = this.datePicker.querySelector('p');

  this.renderMonth = () => {
    this.showingMonth.innerText = months[currentDate.getMonth()];
  };

  let appendDays = function(elem, currentDate, daysInMonth) {
    let days = document.createElement('ul');
    days.className = "day-picker";
    for (var i = 1; i < daysInMonth + 1; i++) {
      day = document.createElement('li');
      if(currentDate.getMonth() <= minDate.getMonth() &&  i < minDate.getDate()) {
        day.className = "day-disabled";
      } else {
          day.className = "day-enabled";
      };
      day.innerHTML = i;
      days.append(day);
    };
    elem.append(days);
    return days;
  };

  this.renderDays = (daysInMonth) => {
    if (this.days) {
      this.days.remove();
      this.days = appendDays(this.datePicker, currentDate, daysInMonth);
    } else {this.days = appendDays(this.datePicker, currentDate, daysInMonth);};
  };


  this.render = (target, daysInMonth) => {
    if (target === this.monthIncreaseButton || target === this.MonthDecreaseButton) {
      this.renderMonth();
      this.renderDays(daysInMonth);
    } else {

      if(target == this.datePicker && document.querySelector('.date-picker') != null) {
        document.querySelector('.date-picker').remove();
      } else {
        this.renderMonth();
        this.renderDays(daysInMonth);
        document.body.append(this.datePicker);
      }
    };
  };

this.render(this.datePicker, daysInMonth);


};


// ___________________________________________________________
function chosendDate(callPoint) {
  this.callPoint = callPoint;

  this.currentDate = new Date();
  this.minDate = new Date();


  let daysInMonth = function(currentDate) {
    return new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0).getDate();
  };


  this.calendar = new createCalendar(this.currentDate, daysInMonth(this.currentDate), this.minDate);

  this.monthIncrease = () => {
    this.currentDate.setDate(daysInMonth(this.currentDate)+1);
  };

  this.monthDecreace = () => {
    let month = this.currentDate.getMonth()-1;
    if(month >= this.minDate.getMonth()) {
      this.currentDate.setMonth(month);
    }
  };



  this.calendar.datePicker.addEventListener('click', event => {
    const target =  event.target;

    if(target === this.calendar.monthIncreaseButton) {
      this.monthIncrease();
      this.calendar.render(target, daysInMonth(this.currentDate));
    } else {
      if(target === this.calendar.MonthDecreaseButton) {
        this.monthDecreace();
        this.calendar.render(target, daysInMonth(this.currentDate));
      } else {
        if (target.closest('.day-picker') === this.calendar.datePicker.querySelector('.day-picker')) {
          if(target.tagName === 'LI'){
            this.currentDate.setDate(target.innerText);
            this.callPoint.previousElementSibling.value = this.currentDate.toISOString().substring(0, 10);
            this.calendar.render(this.calendar.datePicker);
          }
        }
      };
    };
  });

  // ___________________________________________________________
  document.addEventListener('click', e => { // - переписать условия
    e.stopPropagation();
    let target = e.target;
    let its_calendar = target == this.calendar.datePicker || this.calendar.datePicker.contains(target);
    // let itsCallPoint = target.closest('div').previousElementSibling.innerText == this.callPoint.closest('div').previousElementSibling.innerText;
    let itsCallPoint = target == this.callPoint;
    // if(itsCallPoint && document.querySelector('.date-picker') != null) {
    //   console.log('remove');
    //   document.querySelector('.date-picker').remove();
    // }


    if (!its_calendar && !itsCallPoint && document.querySelector('.date-picker') != null) {
      console.log(`called from`)
      console.log(target)
      this.calendar.render(this.calendar.datePicker);
      // document.querySelector('.date-picker').remove();
    }


  });

  document.addEventListener('keydown', e => {
    if(e.key = 'Escape' && document.querySelector('.date-picker') != null) {
      this.calendar.render(this.calendar.datePicker);
    };
  });


};


// ___________________________________________________________
// если календарь открыт сравнить с предыдущей нажатой - кнопкой надо хранить предыдущий index
// но это не сработает поскольку внутри объекта етоже есть свой листенер, который закроет все.
// надо еще поискать как сделать затемнение всего остального окна при открытии календаря (может туда же можно будет добавить pointer events: none)
datePickerIcons.forEach(function(item, index, array) {
  item.addEventListener("click", event => {
      event.stopPropagation();
      new chosendDate(event.target);

  });
});
