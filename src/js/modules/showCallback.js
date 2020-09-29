const callback = document.querySelectorAll('.callback');

const showCallback = event => {
  event.preventDefault();
  const popupCallback = document.querySelector('.popup__content--callback');

  popupCallback.closest('.popup__wrapper').classList.add('popup__wrapper--active');
};

callback[0].addEventListener('click', showCallback);
callback[1].addEventListener('click', showCallback);