import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor({handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__submit-button');
    this._handleFormSubmit = handleFormSubmit;
  }

  setData(data) {
    this._data = data;
  }

  _submit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._data)
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._submit(evt);
    });
  }

}