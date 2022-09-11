import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor ( { handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__item');
  }

  _getInputValues () {
    this._formValues = {};
    this._inputList.forEach (input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(event, this._getInputValues());
    })
    
  }

  close () {
    super.close();
    this._form.reset();
  }
}