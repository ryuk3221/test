document.getElementById('form').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Очистка ошибок
  document.querySelectorAll('.error').forEach((errorElement) => errorElement.textContent = '');

  // Получение значений полей
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const industry = document.getElementById('industry').value;
  const turnover = document.getElementById('turnover').value.trim();
  const terms = document.getElementById('terms').checked;

  let hasError = false;

  // Валидация имени
  if (name === '') {
    document.getElementById('nameError').textContent = 'Пожалуйста, введите имя';
    hasError = true;
  }

  // Валидация email
  if (!email.includes('@')) {
    document.getElementById('emailError').textContent = 'Введите корректный email';
    hasError = true;
  }

  // Валидация телефона
  // Можно настроить любую маску, в данном случае я использовал +7 (___) ___-__-__
  if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone)) {
    document.getElementById('phoneError').textContent = 'Введите телефон в формате +7 (___) ___-__-__';
    hasError = true;
  }

  // Валидация индустрии
  if (industry === '') {
    document.getElementById('industryError').textContent = 'Выберите индустрию';
    hasError = true;
  }

  // Валидация оборота
  if (isNaN(turnover) || turnover <= 0) {
    document.getElementById('turnoverError').textContent = 'Введите корректный оборот (число, или число с плавающей точкой)';
    hasError = true;
  }

  // Проверка на согласие с правилами
  if (!terms) {
    document.getElementById('termsError').textContent = 'Вы должны принять правила';
    hasError = true;
  }

  // Если ошибок нет, показываем сообщение об успешной отправке
  if (!hasError) {
    // Создаю обьект данных для отправки
    const formData = {
      name,
      email,
      phone,
      industry,
      turnover,
      terms
    };


    try {
      // Отправка данных с использованием fetch
      const response = await fetch('example.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        //выполнение скриптов при успешной отправки даннных
        // document.querySelector('.success-message').style.display = 'block';
        // document.querySelector('.form').reset();
        // document.querySelector('.current-select-item').innerHTML = 'Выберите индустрию';
        // setTimeout(() => {
        //   document.querySelector('.success-message').style.display = 'none';
        // }, 3000);
      } else {
        // Обработка ошибки, если сервер вернул неудачный статус
        alert('Данное окно вылезло так как не определён путь для отправки данных. После закрытия все равно произойдет имитация успешнйо отправки формы');
      }
    } catch (error) {
      alert('Данное окно вылезло так как не определён путь для отправки данных. После закрытия все равно произойдет имитация успешнйо отправки формы');
    }



    document.querySelector('.success-message').style.display = 'block';
    document.querySelector('.form').reset();
    document.querySelector('.current-select-item').innerHTML = 'Выберите индустрию';
    setTimeout(() => {
      document.querySelector('.success-message').style.display = 'none';
    }, 3000);
  }
});

//получаю скрытый инпут в выпадающем списке
const selectInput = document.querySelector('.select-value');
//
const select = document.querySelector('.select');
//Получаю 
const currentSelectItem = document.querySelector('.current-select-item');

//если  дестктоп то отлеживать клик
if (window.innerWidth > 991) {
  window.addEventListener('click', (event) => {
    //Если кликнули по верхушке выпадаюзего списка
    if (event.target.closest('.select__head')) {
      //отображаю выпадающий список
      select.classList.toggle('select--open');
    } else if (event.target.classList.contains('select__item')) { //если кликнули по элементу списка
      //извлекаю текст элемента
      const selectItemText = event.target.innerHTML;
      //извлекаю ЗНАЧЕНИЕ элемента
      const selectValue = event.target.dataset.value;
      //вшиваю в значение скрытого инупута значение элемента
      selectInput.setAttribute('value', selectValue);
      //вшиваю текст выбранного элемента в верхушку списка
      currentSelectItem.innerHTML = selectItemText;
      //скрываю список
      select.classList.remove('select--open');
    } else if (!event.target.closest('.select')) {
      select.classList.remove('select--open');
    }
  });
} else {
  //если не десктоп отслеживтаь touchstart (особенность мобильных устройств)
  window.addEventListener('touchstart', (event) => {
    //Если кликнули по верхушке выпадаюзего списка
    if (event.target.closest('.select__head')) {
      //отображаю выпадающий список
      select.classList.toggle('select--open');
    } else if (event.target.classList.contains('select__item')) { //если кликнули по элементу списка
      //извлекаю текст элемента
      const selectItemText = event.target.innerHTML;
      //извлекаю ЗНАЧЕНИЕ элемента
      const selectValue = event.target.dataset.value;
      //вшиваю в значение скрытого инупута значение элемента
      selectInput.setAttribute('value', selectValue);
      //вшиваю текст выбранного элемента в верхушку списка
      currentSelectItem.innerHTML = selectItemText;
      //скрываю список
      select.classList.remove('select--open');
    } else if (!event.target.closest('.select')) {
      select.classList.remove('select--open');
    }
  });
}

document.getElementById('phone').onkeyup = event => {
  const { target } = event;
  if (event.target.value.split('').length == 1) {
    target.value = '+7 (';
  }
};