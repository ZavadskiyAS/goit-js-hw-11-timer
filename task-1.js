//? Создай плагин настраиваемого таймера, который ведет обратный отсчет до
//? предварительно определенной даты. Такой плагин может использоваться в
//? блогах и интернет-магазинах, страницах регистрации событий, во время
//? технического обслуживания и т. д.
'use strict';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.selector = document.querySelector(`${selector}`);
    this.days = this.selector.querySelector(`span[data-value="days"]`);
    this.hours = this.selector.querySelector(`span[data-value="hours"]`);
    this.mins = this.selector.querySelector(`span[data-value="mins"]`);
    this.secs = this.selector.querySelector(`span[data-value="secs"]`);
    this.firstTimer();
    this.timer();
  }

  firstTimer() {
    const difference = this.targetDate.getTime() - Date.now();
    if (Date.now() >= this.targetDate.getTime()) {
      this.calculation(0)
      return
    }
    this.calculation(difference);
  }

  timer() {
    this.timerId = setInterval(() => {
      if (Date.now() >= this.targetDate.getTime()) {
        clearInterval(this.timerId);
        return
      }
      this.firstTimer();
    }, 1000);
  }
  calculation(difference) {
    this.days.textContent = this.pad(
      Math.floor(difference / (1000 * 60 * 60 * 24)),
    );
    this.hours.textContent = this.pad(
      Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    this.mins.textContent = this.pad(
      Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    );
    this.secs.textContent = this.pad(
      Math.floor((difference % (1000 * 60)) / 1000),
    );
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2020'),
});