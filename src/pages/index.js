import '../pages/index.css';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import {
  profileEditButton,
  profileFormElementValidator,
  inputName,
  inputDescription,
  photoAddButton,
  photoFormElementValidator,
  userInfo
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: 'ee805e78-1d4c-400f-965a-b6713248630c',
    'Content-Type': 'application/json'
  }
});






const photoCardsList = new Section({
  renderer: (item) => {
    photoCardsList.setItem(createCard({ data: item }));
  }}, '.elements__list')



Promise.all([api.getInitialCards(), api.getProfileData()])
  .then(([cards, user]) => {
    photoCardsList.renderItems(cards);
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user);
  })
  .catch(err => {
    console.log(`Ошибка обращения к серверу ${err}`);
  });




/*Ниже - все для профиля*/
profileFormElementValidator.enableValidation(); /*Включаем валидацию*/

const editProfile = (user) => {
  return api.setProfileData(user)
  .then(result => userInfo.setUserInfo(result))
  .catch(err => {
    console.log(err)
  });
}

const profileEditPopup = new PopupWithForm({ handleFormSubmit: (event, user)  => {
  event.preventDefault();
  editProfile(user);
  profileEditPopup.close();
}
}, '.popup_content_edit-profile');

profileEditPopup.setEventListeners();

profileEditButton.addEventListener('click', () => { /*Открываем popup профиля и передаем данные об имени и роде деятельности в форму из профиля*/
  profileEditPopup.open();
  profileFormElementValidator.resetValidation();
  inputName.value = userInfo.getUserInfo().name;
  inputDescription.value = userInfo.getUserInfo().about;
});

/*Ниже - все для фотокарточек*/
photoFormElementValidator.enableValidation();/*Включаем валидацию*/

const photoPopup = new PopupWithImage('.popup_content_photo-big');
photoPopup.setEventListeners();

const createCard = ({data}) => {/*Функция cоздания фотокарточки*/
  return new Card({ data, handleCardCLick: () => {
    photoPopup.open(data.link, data.name);
  }
  }, '.photo-card-template').generateCard();
};


 const renderCard = card => { /*Функция добавления фотокарточки*/
   photoCardsList.setItem(createCard({data: card}));
};

const addCard = (data) => {
  api.addCard(data)
    .then(data => {
      renderCard(data);
    })
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
  photoFormElementValidator.resetValidation();
});




