import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor ( { handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__submit-button');
    this._inputList = this._form.querySelectorAll('.form__item');
  }

  _getInputValues () {
    this._formValues = {};
    this._inputList.forEach (input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _submit(evt) {
    evt.preventDefault();
    this._submitButton.textContent = 'Сохранение...';
    this._submitButton.setAttribute('disabled', '');
    this._handleFormSubmit(this._getInputValues())
      .then(() =>{
        this._submitButton.textContent = 'Сохранено!';
        setTimeout(this.close.bind(this), 1000);
      })
      .catch((err) => {
        console.log(`Ошибка выполнения запроса к серверу - ${err}`)
        this._submitButton.textContent = 'Упс( Ошибка сервера';
      })
      .finally(() => {
        setTimeout(() => {
          this._submitButton.textContent = 'Сохранить';
          this._submitButton.removeAttribute('disabled');
        }, 1500);
    });
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