'use strict';

(function () {

  window.keycode = {
    enter: 13,
    esc: 27
  };

  window.method = {
    get: 'get',
    post: 'post'
  };

  window.server = {
    upload: 'https://js.dump.academy/kekstagram',
    download: 'https://js.dump.academy/kekstagram/data'
  };

  window.getRandomIntegerInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  window.getArrayOfRandomIntegers = function (length, min, max) {
    var randomIntegerArr = [];
    while (randomIntegerArr.length < length) {
      var randomNumber = window.getRandomIntegerInRange(min, max);
      if (randomIntegerArr.includes(randomNumber) === false) {
        randomIntegerArr.push(randomNumber);
      }
    }
    return randomIntegerArr;
  };

  window.transformInputIntoArray = function (input) {
    var inputElements = [];
    inputElements = (input.split(' '));
    return inputElements;
  };

  window.resetListofElements = function (list, classname) {
    var lastElement = list.lastElementChild;
    while (lastElement.className === classname) {
      lastElement.remove();
      lastElement = list.lastElementChild;
    }
  };

  window.debounce = function (somefunction, interval) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        somefunction.apply(null, parameters);
      }, interval);
    };
  };

  window.openPopup = function (openElement) {
    openElement.classList.remove('hidden');
    document.addEventListener('keydown', window.onOpenEditorEscPress);
  };

  window.closePopup = function (closeElement) {
    closeElement.classList.add('hidden');
    document.removeEventListener('keydown', window.onOpenEditorEscPress);
  };

  window.displayErrorMessage = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    window.errorButtonTryAgain = errorElement.querySelector('.error__button:first-child');
    window.errorButtonUpload = errorElement.querySelector('.error__button:last-child');
    errorElement.querySelector('.error__title').textContent = errorMessage;
    window.main.appendChild(errorElement);
    window.errorMessageSection = document.querySelector('.error');
    window.errorMessageSection.style = 'z-index: 2';
  };

  window.displaySuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var sucessElement = successTemplate.cloneNode(true);
    window.successButtonUpload = sucessElement.querySelector('.success__button');
    window.main.appendChild(sucessElement);
    window.successMessageSection = document.querySelector('.success');
  };
})();
