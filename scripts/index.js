import {Card} from './Card.js';

const popups = document.querySelectorAll('.popup');

/*Функция для закрытия popup по нажатию клавиши Esc*/
const closePopupWithEsc = evt => {
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



/*Функция для закрытия popup по клику на оверлей или кнопку "Закрыть"*/
const handleClickonPopup = evt => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.target.closest('.popup'));
  }
}

popups.forEach(popup => popup.addEventListener('click', handleClickonPopup));

/*Переменные для профиля и его формы заполнения*/
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_content_edit-profile');
const profileName = document.querySelector ('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileFormElement = document.forms.profile;
const inputName = profileFormElement.elements.profile__name;
const inputDescription = profileFormElement.elements.profile__description;

/*Получаем имя и род деятельности пользователя из профиля*/
const getProfileData = () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

/*Открываем popup профиля и передаем данные об имени и роде деятельности в форму из профиля*/
profileEditButton.addEventListener('click', () => {
  openPopup(profileEditPopup);
  getProfileData();
});

/*Сохраняем в профиль данные из формы и закрываем popup профиля*/
const handleProfileFormSubmit = evt => {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopup(profileEditPopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);


/*Переменные для фотокарточек и формы их добавления*/
const photoAddPopup = document.querySelector('.popup_content_new-photo');
const photoAddButton = document.querySelector('.profile__add-button');
const photoCardsList = document.querySelector('.elements__list');
const photoFormElement = document.forms.photo;
const inputPhotoName = photoFormElement.elements.photo__name;
const inputPhotoLink = photoFormElement.elements.photo__link;

/*Открываем popup с формой добавления фотокарточки*/
photoAddButton.addEventListener('click', () => {
  openPopup(photoAddPopup);
});



/*Функция добавления фотокарточки*/
const addCard = photoCardContent => {
  photoCardsList.prepend(new Card(photoCardContent, '.photo-card-template').generateCard());
};

/*Загружаем фотокарточки из стартового массива в новый массив*/
initialCards.reverse().forEach(item => addCard(item));




/*В массив фотокарточек добавляем новую с данными из формы в массив карточек и закрываем popup*/
const NewPhotoFormSubmit = evt => {
  evt.preventDefault();
  const card = {};
  card.name = inputPhotoName.value;
  card.link = inputPhotoLink.value;
  addCard(card);

  closePopup(photoAddPopup);
  photoFormElement.reset();
}

photoFormElement.addEventListener('submit', NewPhotoFormSubmit);

export {openPopup, closePopupWithEsc, photoPopup, photoPopupImage, photoPopupCaption};
