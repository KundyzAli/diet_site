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
        modal = document.querySelector('.modal');


  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal)
  });

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
     // вариант с toggle
    // modal.classList.toggle('show');
    document.body.style.overflow = ''; // тут отменяем, чтобы скрол снова заработал 
  }

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    // вариант с toggle
    // modal.classList.toggle('show');
    document.body.style.overflow = 'hidden'; // чтобы при открытом модальном окне, скрол стр не работал
    clearInterval(modalTimerId);
  }   

  
  modal.addEventListener('click', (e) => { // закрытие модального окна если кликнули на подложку
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => { // закрытие модального окна при нажатии на ESC
    if (e.code === 'Escape' && modal.classList.contains('show')) { // проверяем если нажат ESC и модальное окно действительно открыто при помощи contains
      closeModal();
    }
   });

   const modalTimerId = setTimeout(openModal, 50000);// всплытие модального окна через определенный промежуток времени

   function showModalByScroll() { // всплытие модального окна тогда когда пользователь долистает до конца
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll); // мы прописываем чтобы модальное окно при скролле открывалось только 1 раз для пользователя
    }
   }

   window.addEventListener('scroll', showModalByScroll);


   //используем классы для карточек меню

   class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector); //здесь лежит дом-эл-т,(родитель куда помещается конструкция созданная в render)
      this.transfer = 27;
      this.changeToUAH(); // метод  changeToUAH можем вызывать в методе кот-й будет что-то помещать на страницу либо прямо в конструкторе
    }

    // в будущей базе данных если цена записывается в $ ее надо конвертировать в местную валюту 
    changeToUAH() { //метод конвертации валют
      this.price = this.price * this.transfer;
    }

    render() { // метод чтобы сформировать верстку
      // метод  changeToUAH можем вызывать в методе кот-й будет что-то помещать на страницу либо прямо в конструкторе
      //создаем эл-т поместим в нее верстку, эту верстку дополним теми данными кот-е приходят,как аргументы и поместить этот эл-т уже на страницу
      const element = document.createElement('div');
      
      if (this.classes.length === 0 ) {
        this.classes = 'menu__item';
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      
      // методом render() будем создавать структуру  кот-й помещается в определенный div
      element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
      `;
      this.parent.append(element); // мы добавляем нов.созд.эл-т родителю
    }
   }

  //  #1
  //  const div = new MenuCard();
  //  div.render();

  // #2
  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
  ).render(); 
  //здесь создаем нов. объект и сразу же вызываем на нем метод render(он что-то отработает, и исчезнет)
  // объект может сущ. и без переменной, можем ее никуда не ложить.
  // так делается только тогда когда объект используется только на месте

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню "Премиум"',
    'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21,
    '.menu .container',
  ).render(); 


  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
   'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    '.menu .container',
  ).render(); 


  // forms
  // реализация скрипта отправки данных на сервер  
  const forms = document.querySelectorAll('form');
  //получаем все формы со страницы
  const message = { // сообщения кот-е будет получать пользователь после отправки формы
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => { // под каждую форму подвязываем ф-ю postData
    postData(item);
  });

  function postData(form) { //ф-я кот-ая будет заниматьс постингом на сервер
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // отменяем стандартное поведение браузера - перезагрузку страницы

      //создание динамического блока кот-й будет транслировать сообщение для пользователя
      let statusMessage = document.createElement('img'); //создаем блок 
      statusMessage.src = message.loading; 
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      const request = new XMLHttpRequest(); // создаем request
      request.open('POST', 'server.php'); //request.open - вызываем метод open, в скобках передаем метод POST, и тот путь на кот-й мы будем ссылаться 
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // передаем информацию на сервер, о том что мы будем отправялять  
      const formData = new FormData(form);

      const object = {};
      formData.forEach(function(value, key) {
        object[key] = value;
      });
      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          showThanksModal(message.success); //передаем сообщение что данны отправлены если все ок     
          statusMessage.remove();
          form.reset(); // сбрасываем введенные данные после успешной отправки    
        } else {
          showThanksModal(message.failure); //если произошла ошибка оповещаем пользователя об этом
        }
      });
    });
  }

  
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    //чтобы после отправки формы, модальное окно появлялось вновь
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }
});
