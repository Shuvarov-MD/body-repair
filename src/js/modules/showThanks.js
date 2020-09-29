function showThanks() {
  const popupThanks = document.querySelector('.popup__content--thanks');

  popupThanks.closest('.popup__wrapper').classList.add('popup__wrapper--active');

  setTimeout(() => {
    popupThanks.closest('.popup__wrapper').classList.remove('popup__wrapper--active');
  }, 3000);
}
