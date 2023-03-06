'use strict';

window.addEventListener('DOMContentLoaded', () => {

// tabs 
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  
  function hideTabContent() {
    tabsContent.forEach(item => {
      // item.style.display = 'none';  // в реальных проектах инлайн стили редко применяются
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    }); // ф-я скрывает таб контент кот-й есть на сайте.   
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    }); // тут скрываем активный таб
  }    

  function showTabContent(i = 0) {
    // tabsContent[i].style.display = 'block'; // в реальных проектах инлайн стили редко применяются
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  } // данная ф-я делает активной тот таб, индекс кот-го  передали аргументов при вызовые ф-и

  hideTabContent();
  showTabContent(); //параметр по умолчанию

  tabsParent.addEventListener('click', (event) => {
    const target = event.target; //если нам часто придется использовать event.target - то лучше его объявить в определенную переменную
    
    if (target && target.classList.contains('tabheader__item')) {
      //когда мы кликаем на определенный таб мы должны определить его номер в списке из всех табов,
      // и по этому номеру вызвать ф-ю showTabContent() по определенному номеру
      tabs.forEach((item, i) => { // в callback ф-ю передаем 2 аргумента: item - это каждый эл-т, в синтаксисе forEach 2-й аргумент отвечает за номер по порядку, обычно пишется как i
        if (target == item) { // если таргет(тот эл-т кот-й мы только что кликнули) совпадает с эл-м кот-й мы перебираем в цикле forEach
          //  тот мы будем вызывать 2 ф-и 
          hideTabContent(); 
          showTabContent(i); // i - номер эл-та кот-й совпал
        }
      });
    }
  });


// timer

  const deadline = '2023-03-10'; // отправная точка


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
      'minutes':  minutes,
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

  setClock('.timer', deadline);


  // modal

  const modalTrigger = document.querySelectorAll('[data-modal]'),
        modalCloseBtn = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');


  function openModal() {
  // modal.classList.add('show');
  // modal.classList.remove('hide');
  // вариант с toggle
    modal.classList.toggle('show');
    document.body.style.overflow = 'hidden'; // чтобы при открытом модальном окне, скрол стр не работал
    clearInterval(modalTimerId);
  }   

  
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal)
  });


  function closeModal() {
    // modal.classList.add('hide');
  // modal.classList.remove('show');
  // вариант с toggle
    modal.classList.toggle('show');
    document.body.style.overflow = ''; // тут отменяем, чтобы скрол снова заработал 
  }
  
  modalCloseBtn.addEventListener('click', closeModal); 

  modal.addEventListener('click', (e) => { // закрытие модального окна если кликнули на подложку
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => { // закрытие модального окна при нажатии на ESC
    if (e.code === 'Escape' && modal.classList.contains('show')) { // проверяем если нажат ESC и модальное окно действительно открыто при помощи contains
      closeModal();
    }
   });

   const modalTimerId = setTimeout(openModal, 5000);// всплытие модального окна через определенный промежуток времени

   function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll); // мы прописываем чтобы модальное окно при скролле открывалось только 1 раз для пользователя
    }
   }

   window.addEventListener('scroll', showModalByScroll);
});