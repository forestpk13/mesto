import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor ( { handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this.submitButton = this._form.querySelector('.form__submit-button');
    this._inputList = this._form.querySelectorAll('.form__item');
  }

  getInputValues () {
    this._formValues = {};
    this._inputList.forEach (input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _submit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._submit(evt);
    });
  }

  close () {
    super.close();
    this._form.reset();
  }
}