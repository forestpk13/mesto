export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      close();
    }
  }

  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', _handleEscClose);
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', _handleEscClose);
  }

  setEventListeners () {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        closePopup(evt.target.closest('.popup'));
      }
    });
  }
}


