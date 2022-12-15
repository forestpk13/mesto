import { FormValidator } from "../components/FormValidator.js";

/*Настройки для валидации*/
export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
};

export const loadingScreen = document.querySelector('.loading-screen'); /*Экран загрузки*/
export const avatarEditButton = document.querySelector('.profile__avatar-wrapper'); /*Кнопка смены аватарки*/

/*Переменные для профиля и его формы заполнения*/
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileFormElement = document.querySelector('#profile');
export const profileAvatarFormElement = document.querySelector('#avatar');
export const profileAvatarFormElementValidator = new FormValidator(validationSettings, profileAvatarFormElement);
export const profileFormElementValidator = new FormValidator(validationSettings, profileFormElement);
export const inputName = profileFormElement.querySelector ('#profile-name');
export const inputDescription = profileFormElement.querySelector ('#profile-description');

/*Переменные для фотокарточек и формы их добавления*/
export const photoAddButton = document.querySelector('.profile__add-button');
export const photoFormElement = document.querySelector('#photo');
export const photoFormElementValidator = new FormValidator(validationSettings, photoFormElement);
export const photoDeleteFormElement = document.querySelector('#confirm');

/*Переменные для модалки с подверждение удаления фотокарточки*/
export const confirmFormelement = document.querySelector('#confirm');
export const confirmFormElementValidator = new FormValidator(validationSettings, confirmFormelement);
