const daysEl = document.querySelector('[data-value="days"]');
const hoursEl = document.querySelector('[data-value="hours"]');
const minsEl = document.querySelector('[data-value="mins"]');
const secsEl = document.querySelector('[data-value="secs"]');

class CountdownTimer {
  constructor({ targetDate } = {}) {
    this.targetDate = targetDate;
    this.init();
    this.stop();
  }

  init() {
    this.getDeltaTime();
    this.intervalId = setInterval(() => {
      this.getDeltaTime();
    }, 1000);
  }

  getDeltaTime() {
    const deltaTime = this.targetDate - Date.now();
    this.getTimeComponents(deltaTime);
    if (deltaTime <= 0) {
      clearInterval(this.intervalId);
      getTimeComponents(0);
      return;
    }
  }

  getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    this.updateClockface(days, hours, mins, secs);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  updateClockface(days, hours, mins, secs) {
    daysEl.textContent = `${days}`;
    hoursEl.textContent = `${hours}`;
    minsEl.textContent = `${mins}`;
    secsEl.textContent = `${secs}`;
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date(2021, 11, 04, 0, 0, 0, 0),
});
