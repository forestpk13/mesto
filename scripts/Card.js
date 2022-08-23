import {openPopup, photoPopup, photoPopupImage, photoPopupCaption} from './index.js';

class Card {
  constructor(data, templateSelector){
    this._name = data.name;
    this._description = data.name;
    this._link = data.link;
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

  _handlePhotoCardCLick() {
    openPopup(photoPopup)
    photoPopupImage.src = this._link;
    photoPopupImage.alt = this._name;
    photoPopupCaption.textContent = this._name;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleleteCard();
    });

    this._photoCardImage.addEventListener('click', () => {
      this._handlePhotoCardCLick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.photo-card__like-button');
    this._deleteButton = this._element.querySelector('.photo-card__delete-button');
    this._photoCardImage = this._element.querySelector('.photo-card__image');
    this._element.querySelector('.photo-card__image').src = this._link;
    this._element.querySelector('.photo-card__image').alt = this._name;
    this._element.querySelector('.photo-card__title').textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}

export {Card};