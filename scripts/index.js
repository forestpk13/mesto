let profileName = document.querySelector ('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupOpener = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupCloser = popup.querySelector('.popup__close-button');
let formElement = popup.querySelector('#profile');
let inputName = formElement.querySelector ('#profile__name');
let inputDescription = formElement.querySelector ('#profile__description');

/* Функция, открывающая popup и берущая значения для инпутов из профиля*/
function openPopup () {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

}

/* Функция, закрывающая popup*/
function closePopup () {
  popup.classList.remove('popup_opened');
}

/* Функция, закрывающая popup и подменяющая значения в профиле введенными в инпутах*/
function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopup();
}


formElement.addEventListener('submit', formSubmitHandler);
popupOpener.addEventListener('click', openPopup);
popupCloser.addEventListener('click', closePopup);
