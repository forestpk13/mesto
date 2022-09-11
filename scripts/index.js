import {Card} from '../components/Card.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

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
  photoAddButton,
  photoCardsList,
  photoCardsListSelector,
  photoFormElement,
  photoFormElementValidator,
  inputPhotoName,
  inputPhotoLink
} from '../utils/constants.js';











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


/*Функция cоздания фотокарточки*/
const createCard = ({data}) => { 
  return new Card({ data, handleCardCLick: () => {
    const photoPopup = new PopupWithImage({data}, '.popup_content_photo-big');
    photoPopup.open();
    photoPopup.setEventListeners();
  }
  }, '.photo-card-template').generateCard();
};



const addCard = card => { /*Функция добавления фотокарточки*/
  photoCardsList.prepend(createCard({ data: card }));
}

const photoAddPopup = new PopupWithForm({ handleFormSubmit: (event, info)  => {
  event.preventDefault();
  const card = {};
  card.name = info.name;
  card.link = info.link;
  addCard(card);
  photoAddPopup.close();
  photoFormElement.reset();
  photoFormElementValidator.disableSubmitButton();
  
}
}, '.popup_content_new-photo');

photoAddPopup.setEventListeners();

photoAddButton.addEventListener('click', () => { /*Открываем popup с формой добавления фотокарточки*/
  photoAddPopup.open();
});

const initialPhotoCardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    initialPhotoCardsList.setItem(createCard({ data: item }));
  }
 }, photoCardsListSelector) /*Загружаем фотокарточки из стартового массива в новый массив*/

 initialPhotoCardsList.renderItems();

/*const NewPhotoFormSubmit = evt => {
  evt.preventDefault();
  const card = {};
  card.name = inputPhotoName.value;
  card.link = inputPhotoLink.value;
  addCard({ data: card });
  closePopup(photoAddPopup);
  photoFormElement.reset();
  photoFormElementValidator.disableSubmitButton();
}

photoFormElement.addEventListener('submit', NewPhotoFormSubmit);*/

