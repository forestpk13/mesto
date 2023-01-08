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
  confirmFormElementValidator
} from '../utils/constants.js';
import { renderLoading } from '../utils/utils.js';


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


/*Тест */

/*Ниже - все для профиля*/
profileFormElementValidator.enableValidation(); /*Включаем валидацию*/

const editProfile = (form) => {
  renderLoading(form.submitButton, 'Сохранение...');
  profileFormElementValidator.disableSubmitButton();
  return api.setProfileData(form.getInputValues())
    .then(result => {
      userInfo.setUserInfo(result);
      renderLoading(form.submitButton, 'Сохранено!')
      form.close();
    })
    .catch((err) => {
      console.log(`Ошибка выполнения запроса к серверу - ${err}`);
      renderLoading(form.submitButton, 'Ошибка сервера');;
    })
    .finally(() => {
      setTimeout(() => {
        renderLoading(form.submitButton, 'Сохранить');
      }, 1500);
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

const changeAvatar = (form) => {
  renderLoading(form.submitButton, 'Сохранение...');
  profileAvatarFormElementValidator.disableSubmitButton();
  return api.setProfileAvatar(form.getInputValues())
    .then(res => {
      userInfo.setUserAvatar(res)
      renderLoading(form.submitButton, 'Сохранено!')
      form.close();
    })
    .catch(err => {
      console.log(`Ошибка выполнения запроса к серверу - ${err}`);
      renderLoading(form.submitButton, 'Ошибка сервера');
    })
    .finally(() => {
      setTimeout(() => {
        renderLoading(form.submitButton, 'Сохранить');
      }, 1500);
    });
}


const avatarEditPopup = new PopupWithForm({ handleFormSubmit: changeAvatar }, '.popup_content_edit-avatar');
avatarEditPopup.setEventListeners();

avatarEditButton.addEventListener('click', () => {
  profileAvatarFormElementValidator.disableSubmitButton();
  profileAvatarFormElementValidator.resetValidation();
  avatarEditPopup.open();
});


/*Ниже - все для фотокарточек*/
photoFormElementValidator.enableValidation();/*Включаем валидацию*/
confirmFormElementValidator.enableValidation();

const updateLikes = (card, data) => {
  card.cardData = data;
  card.updateLikes();
}

const setLike = (card) => {
  return api.setLike(card._id)
    .then(res => updateLikes(card, res))
    .catch(err => console.log(`Ошибка при установке лайка: ${err}`));
};
const deleteLike = (card) => {
  return api.deleteLike(card._id)
    .then(res => updateLikes(card, res))
    .catch(err => console.log(`Ошибка при снятии лайка: ${err}`));
};


const photoPopup = new PopupWithImage('.popup_content_photo-big');
photoPopup.setEventListeners();

const openCardDeletePopup = (card) => {
  confirmFormElementValidator.enableSubmitButton();
  cardDeleteConfirmPopup.open();
  cardDeleteConfirmPopup.setData(card);
};

const deleteCard = (form, card) => {
  renderLoading(form.submitButton, 'Сохранение...');
  confirmFormElementValidator.disableSubmitButton();
  return api.deleteCard(card.getId())
    .then(() => {
      card.deleteCard();
      renderLoading(form.submitButton, 'Сохранено!')
      form.close();
    })
    .catch(err => {
      console.log(`Ошибка выполнения запроса к серверу - ${err}`);
      renderLoading(form.submitButton, 'Ошибка сервера');
    })
    .finally(() => {
      setTimeout(() => {
        renderLoading(form.submitButton, 'Да');
      }, 1000);
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

const addCard = (form) => {
  renderLoading(form.submitButton, 'Сохранение...');
  photoFormElementValidator.disableSubmitButton();
  return api.addCard(form.getInputValues())
    .then(data => {
      renderCard(data);
      renderLoading(form.submitButton, 'Сохранено!')
      form.close();
    })
    .catch(err => {
      console.log(`Ошибка выполнения запроса к серверу - ${err}`);
      renderLoading(form.submitButton, 'Ошибка сервера');;
    })
    .finally(() => {
      setTimeout(() => {
        renderLoading(form.submitButton, 'Сохранить');
      }, 1500);
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

