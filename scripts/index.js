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
const photoCardsTemplate = document.querySelector('.photo-card-template').content;

/*Включаем отображение поставленного лайка на фотокарточку*/
const likeCard = evt => evt.target.classList.toggle('photo-card__like-button_active');

/*Удаляем фотокарточку*/
const deleleteCard = evt => evt.target.closest('.photo-card').remove();

/*Открываем popup с формой добавления фотокарточки*/
photoAddButton.addEventListener('click', () => {
  openPopup(photoAddPopup);
});

/*Переменные для popup с фотографией*/
const photoPopup = document.querySelector('.popup_content_photo-big');
const photoPopupImage = photoPopup.querySelector('.popup__image');
const photoPopupCaption = photoPopup.querySelector('.popup__image-caption');

/*Открываем popup с фотографией и заполняем его*/
const handlePhotoCardCLick = (photoCardContent) => {
  openPopup(photoPopup);
  photoPopupImage.src = photoCardContent.link;
  photoPopupImage.alt = photoCardContent.name;
  photoPopupCaption.textContent = photoCardContent.name;

}

/*Формируем фотокарточку*/
const createPhotoCard = (photoCardContent) => {
  const photoCardElement = photoCardsTemplate.querySelector('.photo-card').cloneNode(true);
  const likeButton = photoCardElement.querySelector('.photo-card__like-button');
  const deleteButton = photoCardElement.querySelector('.photo-card__delete-button');
  const photoCardImage = photoCardElement.querySelector('.photo-card__image');
  photoCardElement.querySelector('.photo-card__title').textContent = photoCardContent.name;
  photoCardImage.alt = photoCardContent.name;
  photoCardImage.src = photoCardContent.link;

  likeButton.addEventListener('click', likeCard);
  deleteButton.addEventListener('click', deleleteCard);
  photoCardImage.addEventListener('click', () => handlePhotoCardCLick (photoCardContent));
  return photoCardElement;
};

/*Добавляем фотокарточку*/
const addCard = photoCardContent => {
  const newCard = createPhotoCard(photoCardContent);
  photoCardsList.prepend(newCard);
};

/*Загружаем фотокарточки из стартового массива в новый массив*/
photoCardsList.append(...initialCards.map(photoCardContent => createPhotoCard(photoCardContent)));

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