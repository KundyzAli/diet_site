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

export default slider;