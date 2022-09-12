import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import {
  initialCards,
  profileEditButton,
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
} from '../utils/constants.js';

const userInfo = new UserInfo({ name: '.profile__name', description: '.profile__description' });


const profileEditPopup = new PopupWithForm({ handleFormSubmit: (event, user)  => {
  event.preventDefault();
  userInfo.setUserInfo(user);
  profileEditPopup.close();
}
}, '.popup_content_edit-profile');

profileEditPopup.setEventListeners();




/*Ниже - все для профиля*/
(function validateProfileFormElement() {profileFormElementValidator.enableValidation()})();

profileEditButton.addEventListener('click', () => { /*Открываем popup профиля и передаем данные об имени и роде деятельности в форму из профиля*/
  profileEditPopup.open();
  inputName.value = userInfo.getUserInfo().name;
  inputDescription.value = userInfo.getUserInfo().description;

});



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
  addCard(info);
  photoAddPopup.close();
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

