function timer(id, deadline) {

  //ф-я кот-я будет определять разницу между деадлайном и нашим текущим временем
  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;

    const t = Date.parse(endtime) - Date.parse(new Date()); // разницу между этими данными в кол-ве миллисекунд
    // определяет кол-во миллисекунд endtime, т.к. deadline принимает строку, от сроки отнять число не возможно, при помощи parse мы получим значение в миллисекундах 

    if (t <= 0) { // в это части мы проверяем не явл-ся ли дата прошедшей, если да то высвечиваются 0
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {  // если нет , то выполнятся расчеты ниже
      days = Math.floor(t / (1000 * 60 * 60 * 24)), // считаем сколько миллисекунд в 1 сутках
        hours = Math.floor((t / (1000 * 60 * 60) % 24)), // считаем остаток от часов от суток
        minutes = Math.floor((t / 1000 / 60) % 60), // получим остаток от часов в минутах
        seconds = Math.floor((t / 1000) % 60);      // получаем остаток от минуты в секундах
    }

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) { // данная ф-я добавляет 0 перед цифрой таймера если она меньше 10
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000); // запуск ф-и updateClock, т.е. обновления данных каждую секунду

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(id, deadline);

}

export default timer;