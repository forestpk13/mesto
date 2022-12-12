export class Card {
  constructor({ data, currentUserId, setLike, deleteLike, handleCardCLick }, templateSelector){
    this._data = data;
    this._name = data.name;
    this._description = data.name;
    this._link = data.link;
    this._id = data._id;
    this._currentUserId = currentUserId;
    this._handleCardCLick = handleCardCLick;
    this._setLike = setLike;
    this._deleteLike = deleteLike;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photo-card')
      .cloneNode(true);
  }

  _checkLikeStatus() {
    return this._data.likes
      .map(user => user._id)
      .some(id => id === this._currentUserId)
  }

  _updateLikes() {
    this._likesCounter.textContent = this._data.likes.length;
    if (this._checkLikeStatus()) {
      this._likeButton.classList.add('photo-card__like-button_active');
    } else {
      this._likeButton.classList.remove('photo-card__like-button_active');
    }
  }

  _likeCard () {
    const handleClick = this._checkLikeStatus() ? this._deleteLike : this._setLike;
    handleClick(this._id)
      .then((res) => {
        this._data = res;
        this._updateLikes();
      })
      .catch((err) => console.log(`Ошибка при установке лайка: ${err}`))
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
    this._likesCounter = this._element.querySelector('.photo-card__likes');
    this._deleteButton = this._element.querySelector('.photo-card__delete-button');
    this._photoCardImage = this._element.querySelector('.photo-card__image');
    this._photoCardImage.src = this._link;
    this._photoCardImage.alt = this._name;
    this._element.querySelector('.photo-card__title').textContent = this._name;

    this._updateLikes();
    this._setEventListeners();
    return this._element;
  }
}