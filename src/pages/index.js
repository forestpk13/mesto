import '../pages/index.css';
import jordanImage from '../images/header-logo.svg';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import {
  initialCards,
  profileEditButton,
  profileFormElementValidator,
  inputName,
  inputDescription,
  photoAddButton,
  photoCardsList,
  photoCardsListSelector,
  photoFormElementValidator,
  userInfo
} from '../utils/constants.js';


/*Ниже - все для профиля*/
(function validateProfileFormElement() {profileFormElementValidator.enableValidation()})(); /*Включаем валидацию*/

const profileEditPopup = new PopupWithForm({ handleFormSubmit: (event, user)  => {
  event.preventDefault();
  userInfo.setUserInfo(user);
  profileEditPopup.close();
}
}, '.popup_content_edit-profile');

profileEditPopup.setEventListeners();

profileEditButton.addEventListener('click', () => { /*Открываем popup профиля и передаем данные об имени и роде деятельности в форму из профиля*/
  profileEditPopup.open();
  inputName.value = userInfo.getUserInfo().name;
  inputDescription.value = userInfo.getUserInfo().description;
});



/*Ниже - все для фотокарточек*/
(function validatePhotoFormElement() {photoFormElementValidator.enableValidation()})();/*Включаем валидацию*/

const createCard = ({data}) => {/*Функция cоздания фотокарточки*/
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

