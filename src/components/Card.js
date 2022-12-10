export class Card {
  constructor({ data, handleCardCLick }, templateSelector){
    this._name = data.name;
    this._description = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleCardCLick = handleCardCLick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photo-card')
      .cloneNode(true);
  }

  _likeCard () {
    this._likeButton.classList.toggle('photo-card__like-button_active');
  }

  _deleleteCard () {
    this._deleteButton.closest('.photo-card').remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleleteCard();
    });

    this._photoCardImage.addEventListener('click', () => {
      this._handleCardCLick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.photo-card__like-button');
    this._deleteButton = this._element.querySelector('.photo-card__delete-button');
    this._photoCardImage = this._element.querySelector('.photo-card__image');
    this._photoCardImage.src = this._link;
    this._photoCardImage.alt = this._name;
    this._element.querySelector('.photo-card__title').textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}