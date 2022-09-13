import '../pages/index.css';
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
  photoFormElementValidator,
  userInfo
} from '../utils/constants.js';



/*Ниже - все для профиля*/
profileFormElementValidator.enableValidation(); /*Включаем валидацию*/

const profileEditPopup = new PopupWithForm({ handleFormSubmit: (event, user)  => {
  event.preventDefault();
  userInfo.setUserInfo(user);
  profileEditPopup.close();
}
}, '.popup_content_edit-profile');

profileEditPopup.setEventListeners();

profileEditButton.addEventListener('click', () => { /*Открываем popup профиля и передаем данные об имени и роде деятельности в форму из профиля*/
  profileEditPopup.open();
  profileFormElementValidator.resetValidation();
  inputName.value = userInfo.getUserInfo().name;
  inputDescription.value = userInfo.getUserInfo().description;
});

/*Ниже - все для фотокарточек*/
photoFormElementValidator.enableValidation();/*Включаем валидацию*/

const createCard = ({data}) => {/*Функция cоздания фотокарточки*/
  return new Card({ data, handleCardCLick: () => {
    const photoPopup = new PopupWithImage('.popup_content_photo-big');
    photoPopup.open(data.link, data.name);
    photoPopup.setEventListeners();
  }
  }, '.photo-card-template').generateCard();
};

const photoCardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    photoCardsList.setItem(createCard({ data: item }));
  }
 }, '.elements__list') /*Загружаем фотокарточки из стартового массива в новый массив*/

 photoCardsList.renderItems();

 const addCard = card => { /*Функция добавления фотокарточки*/
   photoCardsList.setItem(createCard({data: card}));
};

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
  photoFormElementValidator.resetValidation();
});



