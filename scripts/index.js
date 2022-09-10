import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

import {
  initialCards,
  popups,
  profileEditButton,
  profileEditPopup,
  profileName,
  profileDescription,
  profileFormElement,
  profileFormElementValidator,
  inputName,
  inputDescription,
  photoAddPopup,
  photoAddButton,
  photoCardsList,
  photoCardsListSelector,
  photoFormElement,
  photoFormElementValidator,
  inputPhotoName,
  inputPhotoLink
} from '../utils/constants.js';




/*Все для popup*/
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




/*Ниже - все для профиля*/


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


(function validatePhotoFormElement() {photoFormElementValidator.enableValidation()})();

photoAddButton.addEventListener('click', () => { /*Открываем popup с формой добавления фотокарточки*/
  openPopup(photoAddPopup);
});

const createCard = ({ data }) => { /*Функция cоздания фотокарточки*/
  return new Card({ data, handleCardCLick: () => {
    new PopupWithImage({data}, '.popup_content_photo-big').open();
  }
  }, '.photo-card-template').generateCard();
};

const addCard = card => { /*Функция добавления фотокарточки*/
  photoCardsList.prepend(createCard(card));
}


const initialPhotoCardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    initialPhotoCardsList.setItem(createCard({ data: item }));
  }
 }, photoCardsListSelector) /*Загружаем фотокарточки из стартового массива в новый массив*/

 initialPhotoCardsList.renderItems();

const NewPhotoFormSubmit = evt => { /*В массив фотокарточек добавляем новую с данными из формы в массив карточек и закрываем popup*/
  evt.preventDefault();
  const card = {};
  card.name = inputPhotoName.value;
  card.link = inputPhotoLink.value;
  addCard({ data: card });
  closePopup(photoAddPopup);
  photoFormElement.reset();
  photoFormElementValidator.disableSubmitButton();
}

photoFormElement.addEventListener('submit', NewPhotoFormSubmit);

