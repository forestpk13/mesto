class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this.inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
    this._inputList = this._formElement.querySelectorAll(`${this._inputSelector}`);
    console.log(this._inputList);
    this._formSubmitButton = this._formElement.querySelector(`${this._submitButtonSelector}`);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState(inputList){
    if (this._hasInvalidInput(inputList)) {
      this._formSubmitButton.setAttribute('disabled', true);
    } else {
      this._formSubmitButton.removeAttribute('disabled');
    }
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.form__error_field_${inputElement.id}`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(`${this._inputErrorClass}`);
    errorElement.classList.add(`${this._errorClass}`);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.form__error_field_${inputElement.id}`);
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
    this._toggleButtonState(inputList);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
    });
    });
  }

  enableValidation(){
     this._setEventListeners();
  }

}

export {FormValidator};
