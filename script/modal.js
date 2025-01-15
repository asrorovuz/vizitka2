const modalForm = document.querySelector(".modal__form");
const modalFormFild = document.querySelector(".modal__form form");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");
const modalConsultant = document.querySelector(".consultation");
const modalCost = document.querySelector(".cost");
const modalTitle = document.querySelector(".modal__title");

// Updated form validation function to work with both forms
function validateForm(form) {
  const nameInput = form.querySelector(
    'input[id$="name-modal"], input[id="name-cost"]'
  );
  const phoneInput = form.querySelector(
    'input[id$="phone-modal"], input[id="phone-cost"]'
  );
  const nameError = form.querySelector("#nameError");
  const phoneError = form.querySelector("#phoneError");
  let isValid = true;

  // Reset previous error messages
  nameError.textContent = "";
  phoneError.textContent = "";

  // Name validation
  if (!nameInput.value.trim()) {
    nameError.textContent = "Пожалуйста, введите имя";
    isValid = false;
  }

  // Phone validation (basic check for non-empty and numeric)
  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (!phoneInput.value.trim()) {
    phoneError.textContent = "Пожалуйста, введите номер телефона";
    isValid = false;
  } else if (!phoneRegex.test(phoneInput.value)) {
    phoneError.textContent = "Пожалуйста, введите корректный номер телефона";
    isValid = false;
  }

  return isValid;
}

// Function to collect form data
function collectFormData(form) {
  const formData = {};
  const inputs = form.querySelectorAll("input, select, textarea");

  inputs.forEach((input) => {
    if (input.id) {
      formData[input.id] = input.value.trim();
    }
  });

  return formData;
}

modalConsultant.addEventListener("click", () => {
  modalTitle.textContent = "Получить консультацию";
  modalForm.innerHTML = `
        <form id="consultantForm">
            <div class="form">
              <div class="form__section">
                <div class="form__group">
                  <input type="text" id="name-modal" placeholder=" " required />
                  <label for="name-modal">Имя <span>*</span></label>
                  <div class="error" id="nameError"></div>
                </div>

                <div class="form__group">
                  <input type="tel" id="phone-modal" placeholder=" " required />
                  <label for="phone-modal">Телефон <span>*</span></label>
                  <div class="error" id="phoneError"></div>
                </div>
              </div>
            </div>
            <div class="form__btn">
              <button type="submit">Отправить</button>
            </div>
          </form>`;

  // Add form submission event listener for consultation form
  const consultantForm = modalForm.querySelector("#consultantForm");
  consultantForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm(this)) {
      const formData = collectFormData(this);

      // Display collected data in an alert
      let alertMessage =
        "Форма консультации отправлена!\n\nСобранные данные:\n";
      for (const [key, value] of Object.entries(formData)) {
        if (value) {
          alertMessage += `${key}: ${value}\n`;
        }
      }

      alert(alertMessage);

      // Reset form and close modal
      this.reset();
      modal.classList.remove("active");
    }
  });

  modal.classList.add("active");
});

modalCost.addEventListener("click", () => {
  modalTitle.textContent = "Получить расчет стоимости";
  modalForm.innerHTML = ` <form id="costForm">
                <div class="form">
                  <div class="form__section">
                    <div class="form__group">
                      <input type="text" id="name-cost" placeholder=" " required />
                      <label for="name-cost">Имя <span>*</span></label>
                      <div class="error" id="nameError"></div>
                    </div>

                    <div class="form__group">
                      <input type="tel" id="phone-cost" placeholder=" " required />
                      <label for="phone-cost">Телефон <span>*</span></label>
                      <div class="error" id="phoneError"></div>
                    </div>

                    <div class="form__group">
                      <input type="email" id="email-cost" placeholder=" " />
                      <label for="email-cost">E-mail</label>
                    </div>
                  </div>

                  <div class="form__section">
                    <div class="form__group">
                      <select id="transport-type-cost">
                        <option value="">Выберите тип перевозки</option>
                        <option value="cargo">Грузоперевозка</option>
                        <option value="passenger">Пассажироперевозка</option>
                      </select>
                      <label for="transport-type-cost">Выберите тип перевозки</label>
                    </div>

                    <div class="form__group">
                      <textarea id="comment-cost" placeholder=" "></textarea>
                      <label for="comment-cost">Комментарий</label>
                    </div>
                  </div>
                </div>

                <div class="form__btn">
                  <button type="submit">Рассчитать стоимость перевозки</button>
                </div>
              </form>`;

  // Add form submission event listener for cost calculation form
  const costForm = modalForm.querySelector("#costForm");
  costForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm(this)) {
      const formData = collectFormData(this);

      // Display collected data in an alert
      let alertMessage =
        "Форма расчета стоимости отправлена!\n\nСобранные данные:\n";
      for (const [key, value] of Object.entries(formData)) {
        if (value) {
          alertMessage += `${key}: ${value}\n`;
        }
      }

      alert(alertMessage);

      // Reset form and close modal
      this.reset();
      modal.classList.remove("active");
    }
  });

  modal.classList.add("active");
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("active");
});

window.addEventListener("resize", adjustModalFormScroll);
