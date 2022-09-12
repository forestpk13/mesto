import { FormValidator } from "../components/FormValidator.js";

export const initialCards = [ /*Массив исходных фотокарточек */
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/*Настройки для валидации*/
export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
};

/*Переменные для профиля и его формы заполнения*/
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileEditPopup = document.querySelector('.popup_content_edit-profile');
export const profileName = document.querySelector ('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const profileFormElement = document.querySelector('#profile');
export const profileFormElementValidator = new FormValidator(validationSettings, profileFormElement);
export const inputName = profileFormElement.querySelector ('#profile-name');
export const inputDescription = profileFormElement.querySelector ('#profile-description');

/*Переменные для фотокарточек и формы их добавления*/
/*export const photoAddPopup = document.querySelector('.popup_content_new-photo');*/
export const photoAddButton = document.querySelector('.profile__add-button');
export const photoCardsList = document.querySelector('.elements__list');
export const photoCardsListSelector = '.elements__list';
export const photoFormElement = document.querySelector('#photo');
export const photoFormElementValidator = new FormValidator(validationSettings, photoFormElement);