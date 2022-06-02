const profileName = document.querySelector ('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupOpener = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloser = popup.querySelector('.popup__close-button');
const formElement = popup.querySelector('#profile');
const inputName = formElement.querySelector ('#profile__name');
const inputDescription = formElement.querySelector ('#profile__description')

/*Переменные для автозаполнения фотокарточек */
const photoCardsList = document.querySelector('.elements__list');
const photoCardsTemplate = document.querySelector('.photo-card-template').content;

/*Массив исходных фотокарточек */
const initialCards = [
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

/*Формируем карточку из каждого элемента массива и добавляем в сетку для карточек*/
initialCards.forEach(function (element) {
  const photoCardElement = photoCardsTemplate.cloneNode(true);

  photoCardElement.querySelector('.photo-card__title').textContent = element.name;
  photoCardElement.querySelector('.photo-card__image').src = element.link;
  photoCardElement.querySelector('.photo-card__image').alt = element.name;

  photoCardsList.append(photoCardElement)
})

/* Функция, открывающая popup и берущая значения для инпутов из профиля*/
function openPopup () {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

}

/* Функция, закрывающая popup*/
function closePopup () {
  popup.classList.remove('popup_opened');
}

/* Функция, закрывающая popup и подменяющая значения в профиле введенными в инпутах*/
function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopup();
}


formElement.addEventListener('submit', formSubmitHandler);
popupOpener.addEventListener('click', openPopup);
popupCloser.addEventListener('click', closePopup);
