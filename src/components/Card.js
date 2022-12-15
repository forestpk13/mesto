export class Card {
  constructor({ data, currentUserId, setLike, deleteLike, openCardDeletePopup, handleCardCLick }, templateSelector){
    this.cardData = data; /*Сделал публичным, чтобы обращаться из хэндлера для апдейта лайков*/
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._currentUserId = currentUserId;
    this._isOwnCard = data.owner._id === currentUserId ? true : false;
    this._openCardDeletePopup = openCardDeletePopup;
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

  getId() {
    return this.cardData._id;
  }

  deleteCard() {
    this._element.remove();
  }

  _checkLikeStatus() {
    return this.cardData.likes
      .map(user => user._id)
      .some(id => id === this._currentUserId)
  }

  updateLikes() { /*Сделал публичным, чтобы обращаться из хэндлера для апдейта лайков*/
    this._likesCounter.textContent = this.cardData.likes.length;
    if (this._checkLikeStatus()) {
      this._likeButton.classList.add('photo-card__like-button_active');
    } else {
      this._likeButton.classList.remove('photo-card__like-button_active');
    }
  }

  _likeCard () {
    const handleClick = this._checkLikeStatus() ? this._deleteLike : this._setLike;
    handleClick(this);
    }


  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCard();
    });

    this._deleteButton.addEventListener('click', () => {
      this._openCardDeletePopup(this);
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

    if (!this._isOwnCard) {
      this._deleteButton.remove();
    }

    this.updateLikes();
    this._setEventListeners();
    return this._element;
  }
}