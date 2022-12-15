import '../pages/index.css';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from "../components/UserInfo.js";
import {
  loadingScreen,
  avatarEditButton,
  profileEditButton,
  profileFormElementValidator,
  inputName,
  inputDescription,
  photoAddButton,
  photoFormElementValidator,
  profileAvatarFormElementValidator,
} from '../utils/constants.js';


/*Создаем экземпляр класса Api*/
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


/*Ниже - все для профиля*/
profileFormElementValidator.enableValidation(); /*Включаем валидацию*/

const editProfile = (user) => {
  return api.setProfileData(user)
  .then(result => userInfo.setUserInfo(result))
  .catch(err => {
    console.log(err)
  });
}

const profileEditPopup = new PopupWithForm({ handleFormSubmit: editProfile }, '.popup_content_edit-profile');

profileEditPopup.setEventListeners();

profileEditButton.addEventListener('click', () => { /*Открываем popup профиля и передаем данные об имени и роде деятельности в форму из профиля*/
  profileFormElementValidator.disableSubmitButton();
  profileFormElementValidator.resetValidation();
  profileEditPopup.open();
  inputName.value = userInfo.getUserInfo().name;
  inputDescription.value = userInfo.getUserInfo().about;
});


/*Ниже - все для аватарки*/
profileAvatarFormElementValidator.enableValidation();

const changeAvatar = (avatar) => {
  return api.setProfileAvatar(avatar)
    .then(res => {
      userInfo.setUserAvatar(res);
    })
    .catch(err => {
      console.log(err)
    });
}

const avatarEditPopup = new PopupWithForm({ handleFormSubmit: changeAvatar }, '.popup_content_edit-avatar');
avatarEditPopup.setEventListeners();

avatarEditButton.addEventListener('click', () => {
  profileAvatarFormElementValidator.disableSubmitButton();
  profileAvatarFormElementValidator.resetValidation();
  avatarEditPopup.open();
})


/*Ниже - все для фотокарточек*/
photoFormElementValidator.enableValidation();/*Включаем валидацию*/

const setLike = (id) => {
  return api.setLike(id)
    .catch(err => {
      console.log(err)
    });
};
const deleteLike = (id) => {
  return api.deleteLike(id)
    .catch(err => {
      console.log(err)
    });
};

const photoPopup = new PopupWithImage('.popup_content_photo-big');
photoPopup.setEventListeners();

const openCardDeletePopup = (card) => {
  cardDeleteConfirmPopup.open();
  cardDeleteConfirmPopup.setData(card);
};

const deleteCard = (card) => {
  return api.deleteCard(card.getId())
    .then(() => {
      card.deleteCard();
    })
    .catch(err => {
      console.log(err)
    });
}

const createCard = ({data}) => {/*Функция cоздания фотокарточки*/
  return new Card({ data, currentUserId: userInfo.getUserId(), setLike, deleteLike, openCardDeletePopup, handleCardCLick: () => {
    photoPopup.open(data.link, data.name);
  }
  }, '.photo-card-template').generateCard();
};

 const renderCard = card => { /*Функция добавления фотокарточки*/
   photoCardsList.setItem(createCard({data: card}));
};

const addCard = (data) => {
  return api.addCard(data)
    .then(data => {
      renderCard(data);
    })
    .catch(err => {
      console.log(err)
    });
}

const cardDeleteConfirmPopup = new PopupWithConfirmation({ handleFormSubmit: deleteCard }, '.popup_content_confirmation');
cardDeleteConfirmPopup.setEventListeners();

const photoAddPopup = new PopupWithForm({ handleFormSubmit: addCard }, '.popup_content_new-photo');
photoAddPopup.setEventListeners();

photoAddButton.addEventListener('click', () => { /*Открываем popup с формой добавления фотокарточки*/
  photoFormElementValidator.disableSubmitButton();
  photoFormElementValidator.resetValidation();
  photoAddPopup.open();
});


/*Ниже - первичные запросы при загрузке страницы и заполнем экземпляр класса UserInfo данными для дальнейшего использования*/
let userInfo;

Promise.all([api.getInitialCards(), api.getProfileData()])
  .then(([cards, user]) => {
    userInfo = new UserInfo({ name: '.profile__name', about: '.profile__description', avatar: '.profile__avatar' }, user);
    photoCardsList.renderItems(cards);
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user);
    loadingScreen.classList.add('loading-screen_disabled')
  })
  .catch(err => {
    console.log(`Ошибка обращения к серверу ${err}`);
  });

