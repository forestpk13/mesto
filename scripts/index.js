import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';


/*Включаем валидацию*/
const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
};

(function validateForms() {
  const formList = Array.from(document.querySelectorAll(`${validationSettings.formSelector}`));
  formList.forEach(formElement => {
    new FormValidator(validationSettings, formElement).enableValidation();
  });
})();


/*Все для popup*/
const handleClickonPopup = evt => {/*Функция для закрытия popup по клику на оверлей или кнопку "Закрыть"*/
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.target.closest('.popup'));
  }
}

const popups = document.querySelectorAll('.popup');
popups.forEach(popup => popup.addEventListener('click', handleClickonPopup));

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


/*Ниже - все для профиля*/
/*Переменные для профиля и его формы заполнения*/
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_content_edit-profile');
const profileName = document.querySelector ('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileFormElement = document.forms.profile;
const inputName = profileFormElement.elements.profile__name;
const inputDescription = profileFormElement.elements.profile__description;

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
const photoFormElement = document.forms.photo;
const inputPhotoName = photoFormElement.elements.photo__name;
const inputPhotoLink = photoFormElement.elements.photo__link;

photoAddButton.addEventListener('click', () => { /*Открываем popup с формой добавления фотокарточки*/
  openPopup(photoAddPopup);
});

const addCard = photoCardContent => { /*Функция добавления фотокарточки*/
  photoCardsList.prepend(new Card(photoCardContent, '.photo-card-template').generateCard());
};


const initialCards = [ /*Массив исходных фотокарточек */
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

initialCards.reverse().forEach(item => addCard(item)); /*Загружаем фотокарточки из стартового массива в новый массив*/

const NewPhotoFormSubmit = evt => { /*В массив фотокарточек добавляем новую с данными из формы в массив карточек и закрываем popup*/
  evt.preventDefault();
  const card = {};
  card.name = inputPhotoName.value;
  card.link = inputPhotoLink.value;
  addCard(card);

  closePopup(photoAddPopup);
  photoFormElement.reset();
}

photoFormElement.addEventListener('submit', NewPhotoFormSubmit);

