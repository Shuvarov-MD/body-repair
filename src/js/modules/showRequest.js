const heroButton = document.querySelector('.hero__button');

const showRequest = () => {
  const quickRequest = document.querySelector('.popup__content--quick-request');

  quickRequest.closest('.popup__wrapper').classList.add('popup__wrapper--active');
};

heroButton.addEventListener('click', showRequest);
