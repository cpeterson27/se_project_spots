const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");

const profileAddBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const nameInput = addCardFormElement.querySelector("#card-caption-input");
const linkInput = addCardFormElement.querySelector("#card-image-input");

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  openModal(editProfileModal);
  closeModal(editProfileModal);
});

profileAddBtn.addEventListener("click", function () {
  openModal(newPostModal);
  addCardFormElement.reset();
}
);
newPostCloseBtn.addEventListener("click", function () {
  openModal(newPostModal);
  closeModal(newPostModal);
}
);

function openModal(modal) {
  modal.classList.add("modal__is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal__is-opened");
}

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
    profileNameEl.textContent = editProfileNameInput.value;
    profileDescriptionEl.textContent = editProfileDescriptionInput.value;
    openModal(editProfileModal);
  closeModal(editProfileModal);
  editProfileForm.reset();
  console.log("submitting");
}

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);


function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: nameInput.value,
    link: linkInput.value
  };
  console.log("Card added:", card);
  openModal(newPostModal);
  closeModal(newPostModal);
  addCardFormElement.reset();
}

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
