let profileName = document.querySelector ('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupOpener = document.querySelector('.button_type_edit');
let popup = document.querySelector('.popup');
let popupCloser = popup.querySelector('.button_type_close');
let formElement = popup.querySelector('#profile');
let inputName = formElement.querySelector ('#profile__name');
let inputDescription = formElement.querySelector ('#profile__description');

function openPopup () {
  popup.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

}

function closePopup () {
  popup.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopup();
}


formElement.addEventListener('submit', formSubmitHandler);
popupOpener.addEventListener('click', openPopup);
popupCloser.addEventListener('click', closePopup);
