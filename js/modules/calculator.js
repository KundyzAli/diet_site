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

export default calc;