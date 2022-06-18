/*Функция для проверки наличия невалидного инпута в форме*/
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
});
};

/*Функция для переключения состояния кнопки сабмита формы в активное и неактивное состояния*/
const toggleButtonState = (inputList, formSubmitButton) => {
  if (hasInvalidInput(inputList)) {
    formSubmitButton.setAttribute('disabled', true);
} else {
    formSubmitButton.removeAttribute('disabled');
}
};

/*Функция для показа сообщения об ошибке*/
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(`${settings.inputErrorClass}`);
  errorElement.classList.add(`${settings.errorClass}`);
}

/*Функция для скрытия сообщения об ошибке*/
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${settings.inputErrorClass}`);
  errorElement.classList.remove(`${settings.errorClass}`);
  errorElement.textContent = '';
}

/*Функция для проверки валидности инпута и вызова функций показа/скрытия сообщения об ошибке*/
const isValid = (formElement, inputElement, settings) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

/*Функция для создания обработчиков события на каждый инпут формы*/
const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(`${settings.inputSelector}`));
  const formSubmitButton = formElement.querySelector(`${settings.submitButtonSelector}`);
  toggleButtonState(inputList, formSubmitButton);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, formSubmitButton);
  });
  });
}

/*Функция для включения валидации путем навешивания на каждую форму на странице обработчика события*/
const enableValidation = settings => {
  const formList = Array.from(document.querySelectorAll(`${settings.formSelector}`));
  formList.forEach(formElement => {
    setEventListeners(formElement, settings);
  });
}

/*Включаем валидацию и передаем объект с настройками*/
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
});
