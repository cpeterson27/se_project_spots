const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
  },

  {
  name: "Val Thorens",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
},
{
  name: "Restaurant terrace",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
,
}, {
  name: "An outdoor cafe",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
}, {
  name: "A very long bridge, over the forest and through the trees",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
}, {
  name: "Tunnel with morning light",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
}, {
  name: "Mountain house",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
}];

//Edit Profile elements
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");

//New post elements
const profileAddBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

//Profile elements
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

//Modal elements
const addCardFormElement = newPostModal.querySelector(".modal__form");
const cardSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const nameInput = addCardFormElement.querySelector("#card-caption-input");
const linkInput = addCardFormElement.querySelector("#card-image-input");

//Preview modal elements
const previewModal = document.querySelector('#preview-modal');
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector('.modal__image');
const previewCaptionEl = previewModal.querySelector('.modal__caption');

// Template and cards list elements
// Using querySelector to select the template and cards list
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  previewModalCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
  });


  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal__is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal__is-opened");
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(editProfileForm, [editProfileNameInput, editProfileDescriptionInput]);
  openModal(editProfileModal);
});

profileAddBtn.addEventListener("click", function () {
  openModal(newPostModal);
  addCardFormElement.reset();
}
);

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});


newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
}
);

editProfileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

    profileNameEl.textContent = editProfileNameInput.value;
    profileDescriptionEl.textContent = editProfileDescriptionInput.value;
    closeModal(editProfileModal);
  console.log("submitting");
});


addCardFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
disableButton(cardSubmitBtn, settings);
  const inputValues = {
    name: nameInput.value,
    link: linkInput.value
  };

const cardElement = getCardElement(inputValues);
cardsList.prepend(cardElement);
  closeModal(newPostModal);
  addCardFormElement.reset();
});


initialCards.forEach(function (item) {
 const cardElement = getCardElement(item);
 cardsList.prepend(cardElement);

}
);
