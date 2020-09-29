const popupWrapper = document.querySelectorAll('.popup__wrapper');

popupWrapper.forEach(item => {
  item.addEventListener('click', event => {
    if (event.target.matches('.popup__close') || !event.target.closest('.popup__content')) {
      item.classList.remove('popup__wrapper--active');
    }
  });
});

document.addEventListener('keydown', event => {
  document.querySelectorAll('.popup__wrapper--active').forEach(item => {
    if (item.classList.contains('popup__wrapper--active') && event.key === 'Escape') {
      document.querySelector('.popup__wrapper--active').classList.remove('popup__wrapper--active');
    }
  });
});
