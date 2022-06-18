const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
});
};

const toggleButtonState = (inputList, formSubmitButton) => {
  if (hasInvalidInput(inputList)) {
    formSubmitButton.setAttribute('disabled', true);
} else {
    formSubmitButton.removeAttribute('disabled');
}
};


const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(`${settings.inputErrorClass}`);
  errorElement.classList.add(`${settings.errorClass}`);
}

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${settings.inputErrorClass}`);
  errorElement.classList.remove(`${settings.errorClass}`);
  errorElement.textContent = '';
}


const isValid = (formElement, inputElement, settings) => {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

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

const enableValidation = settings => {
  const formList = Array.from(document.querySelectorAll(`${settings.formSelector}`));
  formList.forEach(formElement => {
    setEventListeners(formElement, settings);
  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
});
