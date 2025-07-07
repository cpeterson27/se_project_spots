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
inputEl.classList.add("modal__input_type_error");
};

const hideInputError = (formEl, inputEl) => {
const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
errorMsgEl.textContent = "";
inputEl.classList.remove("modal__input_type_error");
};

const checkInputValidity = (formEl, inputEl, settings) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, settings);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const hasInvalidInput = (inputList) => {
return inputList.some((input) => {
  return !input.validity.valid;
});
}

const toggleButtonState = (inputList, buttonEl) => {
if (hasInvalidInput(inputList)) {
disableButton(buttonEl, settings);
} else {
  buttonEl.disabled = false;
  buttonEl.classList.remove(settings.inactiveButtonClass);
}
}

const disableButton = (buttonEl, settings) => {
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

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
     checkInputValidity(formEl, inputElement, settings);
     toggleButtonState(inputList, buttonElement, settings);
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
