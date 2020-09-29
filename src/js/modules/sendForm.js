const sendForm = () => {
  const form = document.querySelectorAll('form'),
    statusMessage = document.createElement('div'),
    modelOption = document.getElementById('model'),
    yearOption = document.getElementById('year');

  statusMessage.innerHTML = `
    <div class='sk-bounce-1 sk-child'></div>
    <div class='sk-bounce-2 sk-child'></div>
    <div class='sk-bounce-3 sk-child'></div>`;

  const postData = formData => fetch('../php/server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  form.forEach(item => {
    const button = item.querySelector('button[type="submit"]'),
      inputs = item.querySelectorAll('input');

    item.addEventListener('input', event => {
      if (event.target.matches('input[name$="--name"]')) {
        event.target.value = event.target.value.replace(/[^А-ЯЁа-яё\s]/, '');
      }
    });

    item.addEventListener('submit', event => {
      event.preventDefault();

      if (item.querySelector('input[type="tel"]').value.length === 18) {
        const buttonText = button.textContent;
        button.textContent = '';
        button.appendChild(statusMessage);
        statusMessage.classList.add('sk-three-bounce');

        item.querySelector('input[type="tel"]').style.borderColor = '';

        let formData = new FormData(item);
        formData = Object.fromEntries(formData);

        postData(formData).then(response => {
          if (response.status !== 200) {
            throw new Error('status network not 200');
          } else if (item.closest('.popup__wrapper--active')) {
            item.closest('.popup__wrapper--active').classList.remove('popup__wrapper--active');
          }

          showThanks();
          statusMessage.classList.remove('sk-three-bounce');
          button.textContent = buttonText;
        }).catch(error => {
          console.error(error);
          button.textContent = 'Ошибка...';

          setTimeout(() => {
            button.textContent = buttonText;
          }, 2000);
        });

        inputs.forEach(item => {
          item.value = '';
        });

        item.querySelector('input[type="tel"]').style.outline = '';

        if (item.classList.contains('request__form')) {
          item.querySelector('.textarea').value = '';
          item.querySelector('select#brand').value = '';

          modelOption.innerHTML = `
            <option value="" class="option" disabled selected>Выберите модель</option>`;
          yearOption.innerHTML = `
            <option value="" class="option" disabled selected>Выберите год</option>`;

          modelOption.disabled = true;
          yearOption.disabled = true;
        }
      } else {
        item.querySelector('input[type="tel"]').style.outline = '2px solid red';
      }
    });
  });
};

sendForm();
