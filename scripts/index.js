import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

/*Настройки для валидации*/
const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
};

/*Все для popup*/
const popups = document.querySelectorAll('.popup');

popups.forEach(popup => popup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.target.closest('.popup'));
  }
}));

const closePopupWithEsc = evt => { /*Функция для закрытия popup по нажатию клавиши Esc*/
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc);
}
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);
}

/*Переменные для popup с фотографией*/
const photoPopup = document.querySelector('.popup_content_photo-big');
const photoPopupImage = photoPopup.querySelector('.popup__image');
const photoPopupCaption = photoPopup.querySelector('.popup__image-caption');


/*Ниже - все для профиля*/
/*Переменные для профиля и его формы заполнения*/
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_content_edit-profile');
const profileName = document.querySelector ('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileFormElement = document.querySelector('#profile');
const profileFormElementValidator = new FormValidator(validationSettings, profileFormElement);
const inputName = profileFormElement.querySelector ('#profile-name');
const inputDescription = profileFormElement.querySelector ('#profile-description');

(function validateProfileFormElement() {profileFormElementValidator.enableValidation()})();

const getProfileData = () => { /*Получаем имя и род деятельности пользователя из профиля*/
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

profileEditButton.addEventListener('click', () => { /*Открываем popup профиля и передаем данные об имени и роде деятельности в форму из профиля*/
  openPopup(profileEditPopup);
  getProfileData();
})

const handleProfileFormSubmit = evt => { /*Сохраняем в профиль данные из формы и закрываем popup профиля*/
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopup(profileEditPopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);


/*Ниже - все для фотокарточек*/
/*Переменные для фотокарточек и формы их добавления*/
const photoAddPopup = document.querySelector('.popup_content_new-photo');
const photoAddButton = document.querySelector('.profile__add-button');
const photoCardsList = document.querySelector('.elements__list');
const photoFormElement = document.querySelector('#photo');
const photoFormElementValidator = new FormValidator(validationSettings, photoFormElement);
const inputPhotoName = photoFormElement.querySelector ('#photo-name');
const inputPhotoLink = photoFormElement.querySelector ('#photo-link');

(function validatePhotoFormElement() {photoFormElementValidator.enableValidation()})();

photoAddButton.addEventListener('click', () => { /*Открываем popup с формой добавления фотокарточки*/
  openPopup(photoAddPopup);
});

const createCard = photoCardContent => { /*Функция cоздания фотокарточки*/
  return new Card(photoCardContent, '.photo-card-template').generateCard();
};

const addCard = card => { /*Функция добавления фотокарточки*/
  photoCardsList.prepend(createCard(card));
}

photoCardsList.append(...initialCards.map(item => createCard(item))); /*Загружаем фотокарточки из стартового массива в новый массив*/

const NewPhotoFormSubmit = evt => { /*В массив фотокарточек добавляем новую с данными из формы в массив карточек и закрываем popup*/
  evt.preventDefault();
  const card = {};
  card.name = inputPhotoName.value;
  card.link = inputPhotoLink.value;
  addCard(card);
  closePopup(photoAddPopup);
  photoFormElement.reset();
  photoFormElementValidator.disableSubmitButton();
}

photoFormElement.addEventListener('submit', NewPhotoFormSubmit);

export {openPopup, photoPopup, photoPopupImage, photoPopupCaption};