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
  editProfileModal.classList.add("modal__is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal__is-opened");
});

profileAddBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal__is-opened");
}
);
newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal__is-opened");
}
);

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
    ProfileNameEl.textContent = editProfileNameInput.value;
    ProfileDescriptionEl.textContent = editProfileDescriptionInput.value;
    editProfileModal.classList.remove("modal__is-opened");
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
  newPostModal.classList.remove("modal__is-opened");
}

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
