document.getElementById('transportForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');

    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');

    nameError.textContent = '';
    phoneError.textContent = '';

    if (!nameInput.value.trim()) {
      nameError.textContent = 'Пожалуйста, введите имя.';
      isValid = false;
    }

    if (!phoneInput.value.trim() || !/^[0-9+\-()\s]+$/.test(phoneInput.value)) {
      phoneError.textContent = 'Пожалуйста, введите корректный номер телефона.';
      isValid = false;
    }

    if (isValid) {
      alert('Форма успешно отправлена!');
      this.reset();
    }
  });