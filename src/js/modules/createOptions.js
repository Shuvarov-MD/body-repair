const createOptions = () => {
  const modelOption = document.getElementById('model'),
    yearOption = document.getElementById('year');

  modelOption.disabled = true;
  yearOption.disabled = true;

  const createResponse = () => fetch('../db/cars.json', {
    method: 'GET',
    headers: {
      'Content-Type': "application/json"
    }
  });

  const createOptionBrand = data => {
    data.forEach(item => {
      const option = document.createElement('option');
      option.classList.add('option');
      option.textContent = item.brand;
      option.setAttribute('value', item.brand);
      document.getElementById('brand').appendChild(option);
    });
  };


  const createOptionModel = data => {
    data.forEach(item => {
      const option = document.createElement('option');
      option.classList.add('option');
      option.textContent = item;
      option.setAttribute('value', item);
      modelOption.appendChild(option);
    });
  };

  const createOptionYear = data => {
    data.forEach(item => {
      const option = document.createElement('option');
      option.classList.add('option');
      option.textContent = item;
      option.setAttribute('value', item);
      yearOption.appendChild(option);
    });
  };

  createResponse().then(response => {
    if (response.status !== 200) {
      throw new Error('status network not 200');
    }
    response.text().then(data => {
      data = JSON.parse(data);
      createOptionBrand(data);

      document.getElementById('brand').addEventListener('change', event => {
        modelOption.disabled = false;
        yearOption.disabled = false;

        modelOption.innerHTML = `
          <option value="" class="option" disabled selected>Выберите модель</option>`;
        yearOption.innerHTML = `
        <option value="" class="option" disabled selected>Выберите год</option>`;

        data.forEach(item => {
          if (event.target.value === item.brand) {
            createOptionModel(item.model);
            createOptionYear(item.year);
          }
        });
      });
    });
  }).catch(error => {
    console.error(error);
  });
};

createOptions();
