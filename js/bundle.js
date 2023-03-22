/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc() {

  ////calculator////

  const result = document.querySelector('.calculating__result span');

  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) { //в запоминаем ранее введенные данные и помещаем в поле "пол"
    sex = localStorage.getItem('sex');
  } else { // если ранее не был выбран пол, но по дефолту значение будет 'female'
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) { //в запоминаем ранее введенные данные
    ratio = localStorage.getItem('ratio');
  } else { // если ранее не была выбрана активность, но по дефолту значение будет "невысокая"
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      //если хотя бы один из этих переменных не заполнено, т.е. вернет false
      result.textContent = '____'; //дефолтное значение где калории
      return;
    }

    if (sex === 'female') { // формулы вычислений каллоража
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  calcTotal(); //вызываем несколько раз ф-и чтобы при каждом вводе и изменений в инпутах происходил постоянный пересчет

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ration') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    // внутри переданного эл-та parentSelector получим все div

    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          // если пользователь кликнул на умеренную активность, мы возьмем активность кот-я стоит у него в data-атрибуте
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
          //записываем данные в localStorage и запоминаем
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
          //записываем данные в localStorage и запоминаем
        }

        elements.forEach(elem => { //убираем активный класс у всех эл-в
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass); //добавляем активный класс тому эл-ту по кот-му кликнули

        calcTotal(); //вызываем несколько раз ф-и чтобы при каждом вводе и изменений в инпутах происходил постоянный пересчет
      });
    });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInformation(selector) { //получаем данные с инпутов информация по росту, весам, возврасту
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) { //если пользователь ввел некорректное значение, что-то что не явл-ся числом
        input.style.border = '1px solid red'; // инпут окрасится в красный
      } else {
        input.style.border = 'none';
      }

      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }

      calcTotal(); //вызываем несколько раз ф-и чтобы при каждом вводе и изменений в инпутах происходил постоянный пересчет
    });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');

}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
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

      if (this.classes.length === 0) {
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

  Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])('http://localhost:3000/menu')
    //вызываем ф-ю и в url записываем тот адрес по кот-му сайтр открыт в хосте
    .then(data => { //обрабатываем данные
      data.forEach(({ img, altimg, title, descr, price }) => { //т.к.данные это массив, перебираем каждый методом forEach
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //вызываем конструктор MenuCard, 
        // он будет создаваться столько сколько объектов внутри массива, кот-й придет из сервера
      });
    });

  // axios.get('http://localhost:3000/menu')
  //   .then(data => {
  //     data.data.forEach(({ img, altimg, title, descr, price }) => { //т.к.данные это массив, перебираем каждый методом forEach
  //       new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //вызываем конструктор MenuCard, 
  //       // он будет создаваться столько сколько объектов внутри массива, кот-й придет из сервера
  //     });
  //   });

  // getResource('http://localhost:3000/menu')
  //   .then(data => createCard(data));

  // function createCard(data) {
  //   data.forEach(({img, altimg, title, descr, price}) => { // деструктуризация объекта на отдельные св-ва
  //     const element = document.createElement('div'); // cоздает новый div
  //     let priceUSd = price * 27
  //     element.classList.add('menu__item'); // помещает внутрь него новый класс

  //     // формирует верстку карточки, во внутрь помещает св-ва кот-е пришли сервера путем деструктуризации
  //     element.innerHTML = ` 
  //       <img src=${img} alt=${altimg}>
  //       <h3 class="menu__item-subtitle">${title}</h3>
  //       <div class="menu__item-descr">${descr}</div>
  //       <div class="menu__item-divider"></div>
  //       <div class="menu__item-price">
  //           <div class="menu__item-cost">Цена:</div>
  //           <div class="menu__item-total"><span>${priceUSd}</span> грн/день</div>
  //       </div>
  //     `;

  //     document.querySelector('.menu .container').append(element);
  //     // добавляет карточку в указанное место
  //   });
  // }    
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals */ "./js/modules/modals.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
  // forms
  // реализация скрипта отправки данных на сервер  
  const forms = document.querySelectorAll(formSelector);
  //получаем все формы со страницы
  const message = { // сообщения кот-е будет получать пользователь после отправки формы
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => { // под каждую форму подвязываем ф-ю postData
    bindPostData(item);
  });

  function bindPostData(form) { //ф-я кот-ая занимается привязкой постинга
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

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      // formData превратили в массив массивов при помощи entries, далее трансформировали его в обычный объект Object.fromEntries,
      // и при помощи JSON.stringify  классический объект превратили в json и положили в переменную json

      Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data); // data - это данные кот-е возвращаются из промиса, те кот-е нам вернул сервер
          showThanksModal(message.success); //передаем сообщение что данны отправлены если все ок     
          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failure); //если на этапе запроса fetch произойдет ошибка, то вызовется эта ф-я
        }).finally(() => {
          form.reset(); // сбрасываем введенные данные вне зависимости от успеха или провала запроса данных
        })
    });
  }


  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    Object(_modals__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal', modalTimerId);

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
      Object(_modals__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');
    }, 4000);
  }

  fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modals.js":
/*!******************************!*\
  !*** ./js/modules/modals.js ***!
  \******************************/
/*! exports provided: default, closeModal, openModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');
  // вариант с toggle
  // modal.classList.toggle('show');
  document.body.style.overflow = ''; // тут отменяем, чтобы скрол снова заработал 
}

function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
  // вариант с toggle
  // modal.classList.toggle('show');
  document.body.style.overflow = 'hidden'; // чтобы при открытом модальном окне, скрол стр не работал

  console.log(modalTimerId);
  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function modals(triggerSelector, modalSelector, modalTimerId) {
  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    //стрелочная ф-я оборачивает вызывающуюся ф-ю     
  });


  modal.addEventListener('click', (e) => { // закрытие модального окна если кликнули на подложку
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => { // закрытие модального окна при нажатии на ESC
    if (e.code === 'Escape' && modal.classList.contains('show')) { // проверяем если нажат ESC и модальное окно действительно открыто при помощи contains
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() { // всплытие модального окна тогда когда пользователь долистает до конца
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll); // мы прописываем чтобы модальное окно при скролле открывалось только 1 раз для пользователя
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modals);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {

  let slideIndex = 1;
  let offset = 0;

  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prevSlide = document.querySelector(prevArrow),
    nextSlide = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width; //т.к. слайдер будет занимать всю ширину экрана, мы должны получить размер глобально

  // простой вариант слайдера
  // showSlides(slideIndex); //инциализация ф-и

  // //чтобы текущий слайд состоял из 2-х цифр
  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`; 
  // } else {
  //   total.textContent = slides.length;
  // }


  // function showSlides(n) {
  //   if (n > slides.length) {
  //     // если мы долистали все слайды до конца
  //     slideIndex = 1; //то перелистываем на самый первый слайд
  //   }

  //   if (n < 1) {
  //     // если мы долистали все слайды до самого первого
  //     slideIndex = slides.length; // то перелистываем в самый конец
  //   }

  //   slides.forEach(item => item.style.display = 'none');
  //   // перебираем все слайды и при помощи инлайновых стилей скрываем все слайды

  //   slides[slideIndex - 1].style.display = 'block';
  //   // показываем нужный слайд по индексу

  //   //чтобы текущий слайд состоял из 2-х цифр
  //   if (slides.length < 10) {
  //     current.textContent = `0${slideIndex}`; 
  //   } else {
  //     current.textContent = slideIndex; 
  //   }
  // }     

  // function plusSlides(n) { // ф-я увеличивает индекс слайда 
  //   showSlides(slideIndex += n);
  // }

  // prevSlide.addEventListener('click', () => { // по клику слайд листается на индекс назад
  //   plusSlides(-1);
  // });

  // nextSlide.addEventListener('click', () => { // по клику слайд листается на индекс вперед
  //   plusSlides(1);
  // });

  // 2-й вариант слайдера

  //чтобы текущий слайд состоял из 2-х цифр
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + '%'; // '%' - потому что мы записываем css стили, и нам необходимы ед. измерения
  // чтобы поместить все слайды на странице во внутрь slidesField 
  slidesField.style.display = 'flex'; //чтобы все слайды выстроились в одну линию
  slidesField.style.transition = '0.5s all'; //для плавности передвижения

  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(slide => { //чтобы все слайды помещались полностью(т.к. картинки слайдов могут быть разной ширины)
    slide.style.width = width; //установим одинаковую ширину
  });

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'), //ordered-list
    dots = [];

  indicators.classList.add('carousel-dots');
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
  `;
    if (i == 0) { //подсвечиваем активный дот слайда
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  nextSlide.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    // число текущего слайда
    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    doubleCiphers();

    activeDots();
  });

  prevSlide.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    // число текущего слайда
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    doubleCiphers();

    activeDots();
  });



  // чтобы по клику на навигацию показывался нужный слайд
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      doubleCiphers();

      activeDots();
    });
  });

  function doubleCiphers() { //чтобы текущий слайд состоял из 2-х цифр
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function activeDots() { // чтобы у активного слайда внизу навигация подсвечивалась
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  // tabs 
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);


  function hideTabContent() {
    tabsContent.forEach(item => {
      // item.style.display = 'none';  // в реальных проектах инлайн стили редко применяются
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    }); // ф-я скрывает таб контент кот-й есть на сайте.   
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    }); // тут скрываем активный таб
  }

  function showTabContent(i = 0) {
    // tabsContent[i].style.display = 'block'; // в реальных проектах инлайн стили редко применяются
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
  } // данная ф-я делает активной тот таб, индекс кот-го  передали аргументов при вызовые ф-и

  hideTabContent();
  showTabContent(); //параметр по умолчанию

  tabsParent.addEventListener('click', (event) => {
    const target = event.target; //если нам часто придется использовать event.target - то лучше его объявить в определенную переменную

    if (target && target.classList.contains(tabsSelector.slice(1))) {
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
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modals */ "./js/modules/modals.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");











window.addEventListener('DOMContentLoaded', () => {

  const modalTimerId = setTimeout(() => Object(_modules_modals__WEBPACK_IMPORTED_MODULE_1__["openModal"])('.modal', modalTimerId), 5000);// всплытие модального окна через определенный промежуток времени

  Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  Object(_modules_calculator__WEBPACK_IMPORTED_MODULE_4__["default"])();
  Object(_modules_modals__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
  Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  Object(_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId);
  Object(_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
    slide: '.offer__slide'
  });
  Object(_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2023-4-10');

});


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData, getResource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });

const postData = async (url, data) => { //постинг данных на сервер, 
  // postData - занимается настройка запроса, фетчит, т.е.посылает на сервер, получает
  // ответ от сервера, и трансформирует этот ответ в json
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  return await res.json();
};

async function getResource(url) { //получаем данные с сервера 
  let res = await fetch(url);
  // fetch если сталкивается с ошибкой он не выдаст catch, не выдаст reject, в таком случае нам нужно вручную настроить
  if (!res.ok) {
    // если res не ok  
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);//создаем и выкидываем ошибку
    //получим url по кот-му не смогли обратится, и статус кот-й там был                
  }

  return await res.json();
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map