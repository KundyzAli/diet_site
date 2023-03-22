import { getResource } from "../services/services";

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

  getResource('http://localhost:3000/menu')
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

export default cards;