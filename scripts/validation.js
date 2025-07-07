const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error"
}

const showInputError = (formEl, inputEl, errorMsg, settings) => {
const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
errorMsgEl.textContent = errorMsg;
inputEl.classList.add(settings.inputErrorClass);
errorMsgEl.classList.add(settings.errorClass);
};

const hideInputError = (formEl, inputEl, settings) => {
const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
errorMsgEl.textContent = "";
inputEl.classList.remove(settings.inputErrorClass);
errorMsgEl.classList.remove(settings.errorClass);
};

const checkInputValidity = (formEl, inputEl, settings) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, settings);
  } else {
    hideInputError(formEl, inputEl, settings);
  }
};

const hasInvalidInput = (inputList) => {
return inputList.some((input) => !input.validity.valid);
};


const toggleButtonState = (formEl, settings) => {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
const buttonEl = formEl.querySelector(settings.submitButtonSelector);
if (hasInvalidInput(inputList)) {
disableButton(buttonEl, settings);
} else {
  buttonEl.disabled = false;
  buttonEl.classList.remove(settings.inactiveButtonClass);
}
}

const disableButton = (buttonEl) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(settings.inactiveButtonClass);
};

//OPTIONAL: Reset validation state for all inputs in a form
// This can be useful when reusing forms or resetting them after submission.
const resetValidation = (formEl, inputList, settings) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, settings);
  });
};

const setEventListeners = (formEl, settings) => {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const buttonElement = formEl.querySelector(settings.submitButtonSelector);

  toggleButtonState(formEl, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
     checkInputValidity(formEl, inputElement, settings);
     toggleButtonState(formEl, settings);
    });
  });
};

const enableValidation = (settings) => {
 const formList = document.querySelectorAll(settings.formSelector);
 formList.forEach((formEl) => {
  setEventListeners(formEl, settings);
 });
};

enableValidation(settings);
