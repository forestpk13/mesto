import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor({data}, popupSelector) {
    super(popupSelector);
    this._image = data.link;
    this._description = data.name;
  }

  open () {
    super.open();
    const photoPopupImage = document.querySelector('.popup__image');
    const photoPopupCaption = document.querySelector('.popup__image-caption');
    photoPopupImage.src =  this._image;
    photoPopupImage.alt = this._description;
    photoPopupCaption.textContent = this._description;
  }

}