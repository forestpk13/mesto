import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";

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
export const profileFormElement = document.querySelector('#profile');
export const profileFormElementValidator = new FormValidator(validationSettings, profileFormElement);
export const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__description', avatar: '.profile__avatar' });
export const inputName = profileFormElement.querySelector ('#profile-name');
export const inputDescription = profileFormElement.querySelector ('#profile-description');

/*Переменные для фотокарточек и формы их добавления*/
export const photoAddButton = document.querySelector('.profile__add-button');
export const photoFormElement = document.querySelector('#photo');
export const photoFormElementValidator = new FormValidator(validationSettings, photoFormElement);