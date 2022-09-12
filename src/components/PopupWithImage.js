import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor({data}, popupSelector) {
    super(popupSelector);
    this._image = data.link;
    this._description = data.name;
  }

  open () {
    super.open();
    document.querySelector('.popup__image').src =  this._image;
    document.querySelector('.popup__image-caption').alt = this._description;
    document.querySelector('.popup__image-caption').textContent = this._description;
  }

}