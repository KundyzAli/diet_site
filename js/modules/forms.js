import { closeModal, openModal } from './modals';
import { postData } from '../services/services';

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

      postData('http://localhost:3000/requests', json)
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
    openModal('.modal', modalTimerId);

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
      closeModal('.modal');
    }, 4000);
  }

  fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));
}

export default forms;