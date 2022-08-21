class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this.inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
  };

  _toggleButtonState(inputList, formSubmitButton){
    if (this._hasInvalidInput(inputList)) {
      formSubmitButton.setAttribute('disabled', true);
  } else {
      formSubmitButton.removeAttribute('disabled');
  }
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(`${this._inputErrorClass}`);
    errorElement.classList.add(`${this._errorClass}`);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`${this._inputErrorClass}`);
    errorElement.classList.remove(`${this._errorClass}`);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(`${this._inputSelector}`));
    const formSubmitButton = this._formElement.querySelector(`${this._submitButtonSelector}`);
    this._toggleButtonState(inputList, formSubmitButton);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, formSubmitButton);
    });
    });
  }

  enableValidation(){
     this._setEventListeners();
  }

}

export {FormValidator};
