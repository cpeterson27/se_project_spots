import { enableValidation, settings, resetValidation, toggleButtonState, disableButton, enableButton } from "../scripts/validation.js";
import "./index.css";
import {setButtonText} from "../utils/helpers.js"
import Api from "../utils/Api.js";

//Edit Profile elements
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const editProfileSubmitBtn = editProfileModal.querySelector(".edit-modal__submit-btn");

//New post elements
const profileAddBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarImg = document.querySelector(".profile__avatar");


//Profile elements
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

//Modal elements
const addCardFormElement = newPostModal.querySelector(".modal__form");
const cardSubmitBtn = newPostModal.querySelector(".modal__submit-btn");
const nameInput = addCardFormElement.querySelector("#card-caption-input");
const linkInput = addCardFormElement.querySelector("#card-image-input");

//Preview modal elements
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

//Delete form elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form-delete");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteSubmitBtn = deleteModal.querySelector(".modal__delete-btn");
const deleteCancelBtn = deleteModal.querySelector(".modal__cancel-btn");

//Avatar form element
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarSubmitBtn = avatarModal.querySelector(".avatar-modal__submit-btn");

let selectedCard, selectedCardId;

// Card related elements
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

//API set up
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5ede9bfe-962f-4ec5-91f2-d91f0ad8bf92",
    "Content-Type": "application/json",
  },
});

//Initialization
api
  .getAppInfo()
  .then(([user, cards]) => {
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.prepend(cardElement);
    });
    return user;
  })
  .then((user) => {
    avatarImg.src = user.avatar;
    profileNameEl.textContent = user.name;
    profileDescriptionEl.textContent = user.about;
  })
  .catch(console.error);


//Helper Functions
function handleLike(evt, id) {
  const likeButton = evt.target.closest(".card__like-btn");
  const isLiked = likeButton.classList.contains("card__like-btn_active");
  api.changeLikeStatus(id, !isLiked)
    .then(() => {
      likeButton.classList.toggle("card__like-btn_active");
    })
    .catch(console.error);
}

function handleImageClick(data) {
  previewImageEl.src = data.link;
  previewImageEl.alt = data.name;
  previewCaptionEl.textContent = data.name;
  openModal(previewModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const deleteButton = cardElement.querySelector(".card__delete-btn");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  if (data.isLiked) {
    likeButton.classList.add("card__like-btn_active");
  } else {
    likeButton.classList.remove("card__like-btn_active");
  }


likeButton.addEventListener("click", (evt) => handleLike(evt, data._id));
deleteButton.addEventListener("click", () =>
handleDeleteCard(cardElement, data._id)
);

cardImageEl.addEventListener("click", () => handleImageClick(data));

  return cardElement;
}

function openModal(modal) {
  if (modal) {
  modal.classList.add("modal__is-opened");
  document.addEventListener("keydown", handleEscapeKey);
  modal.addEventListener("mousedown", handleOverlayClick);
}
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove("modal__is-opened");
    document.removeEventListener("keydown", handleEscapeKey);
    modal.removeEventListener("mousedown", handleOverlayClick);
}
}
avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});
avatarForm.addEventListener("submit", handleAvatarSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal__is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
const avatarUrl = avatarInput.value;

  if (!avatarUrl) {
    console.log("Avatar URL cannot be empty.");
    return;
  }

  if (!avatarUrl.startsWith("https://")) {
    console.error("Avatar URL must start with https://");
    return;
  }

  disableButton(avatarSubmitBtn, settings);

  api
  .updateAvatar({ avatar: avatarUrl })
  .then ((data) => {
    avatarImg.src = data.avatar;
    closeModal(avatarModal);
    avatarForm.reset();
    console.log(data.avatar);
    enableButton(avatarSubmitBtn, settings);
  })
  .catch((err) => {
    console.log(err);
    enableButton(avatarSubmitBtn, settings);
});
}
function handleDeleteSubmit(evt) {
  evt.preventDefault();

  setButtonText(deleteSubmitBtn, true, "Delete", "Deleting...");

  if (!selectedCardId || !selectedCard) {
    return;
  }

  disableButton(deleteSubmitBtn, settings);

  api
  .deleteCard(selectedCardId)
  .then((res) => {
    console.log(res.message);


    selectedCard.remove();
    selectedCard = null;
    selectedCardId = null;

   closeModal(deleteModal);
   alert("This post has been deleted");
  })
  .catch((err) => {
    console.log(err);
  })
    .finally(() => {
      enableButton(deleteSubmitBtn, settings);
      setButtonText(deleteSubmitBtn, false, "Delete", "Deleting...");
});
}

function handleDeleteCard(cardElement, cardId) {
  console.log("Delete clicked", cardId);
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("modal__is-opened")) {
    closeModal(evt.currentTarget);
  }
}

editProfileBtn.addEventListener("click", function () {
  disableButton(editProfileSubmitBtn, settings);
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings
  );
  toggleButtonState(editProfileForm, settings);
  openModal(editProfileModal);
});

profileAddBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

editProfileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();


const editProfileSubmitBtn = evt.submitter;
setButtonText(editProfileSubmitBtn, true);

  api
    .editUserInfo({ name: editProfileNameInput.value, about: editProfileDescriptionInput.value })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
      console.log("submitting");
      enableButton(editProfileSubmitBtn, settings);
    })
    .catch((err) => {
      console.log(err);
      enableButton(editProfileSubmitBtn, settings);
  })
  .finally(() => {
    setButtonText(editProfileSubmitBtn, false);
  })
});

//implement loading text for all other form submissions

addCardFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  disableButton(cardSubmitBtn, settings);
  const inputValues = {
    name: nameInput.value,
    link: linkInput.value,
  };

  api
    .addNewCard(inputValues)
    .then((newCard) => {
      const cardElement = getCardElement(newCard);
      cardsList.prepend(cardElement);
      addCardFormElement.reset();
      resetValidation(addCardFormElement, [nameInput, linkInput], settings);
      closeModal(newPostModal);
      enableButton(cardSubmitBtn, settings);
    })
    .catch((err) => {
      console.log(err);
      enableButton(cardSubmitBtn, settings);
  });
});

if (previewModalCloseBtn) {
  previewModalCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
  });
}

if (deleteModalCloseBtn) {
  deleteModalCloseBtn.addEventListener("click", () => {
    closeModal(deleteModal);
  });
}

if (deleteCancelBtn) {
  deleteCancelBtn.addEventListener("click", () => {
    closeModal(deleteModal);
  })
}

if (avatarModalCloseBtn) {
  avatarModalCloseBtn.addEventListener("click", () => {
    closeModal(avatarModal);
  });
}

enableValidation(settings);

export default getCardElement;
