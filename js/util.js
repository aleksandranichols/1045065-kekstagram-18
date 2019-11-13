'use strict';

(function () {

  var Keycode = {
    ENTER: 13,
    ESC: 27
  };

  var Method = {
    GET: 'get',
    POST: 'post'
  };

  var Server = {
    UPLOAD: 'https://js.dump.academy/kekstagram',
    DOWNLOAD: 'https://js.dump.academy/kekstagram/data'
  };

  var getRandomIntegerInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var getArrayOfRandomIntegers = function (length, min, max) {
    var randomIntegerArr = [];
    while (randomIntegerArr.length < length) {
      var randomNumber = window.util.getRandomIntegerInRange(min, max);
      if (randomIntegerArr.includes(randomNumber) === false) {
        randomIntegerArr.push(randomNumber);
      }
    }
    return randomIntegerArr;
  };

  var transformInputIntoArray = function (input) {
    var inputElements = [];
    inputElements = (input.split(' '));
    return inputElements;
  };

  var resetListofElements = function (list, classname) {
    var lastElement = list.lastElementChild;
    while (lastElement.className === classname) {
      lastElement.remove();
      lastElement = list.lastElementChild;
    }
  };

  var debounce = function (somefunction, interval) {
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

  var open = function (openElement) {
    openElement.classList.remove('hidden');
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.keycode.ESC && document.activeElement !== window.validation.hashtags && document.activeElement !== window.validation.comments) {
        window.form.onOpenEditorEscPress();
      }
    });
  };

  var close = function (closeElement) {
    closeElement.classList.add('hidden');
    document.removeEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.keycode.ESC && document.activeElement !== window.validation.hashtags && document.activeElement !== window.validation.comments) {
        window.form.onOpenEditorEscPress();
      }
    });
  };

  var displayErrorMessage = function (errorMessage) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    window.errorButtonTryAgain = errorElement.querySelector('.error__button:first-child');
    window.errorButtonUpload = errorElement.querySelector('.error__button:last-child');
    errorElement.querySelector('.error__title').textContent = errorMessage;
    window.gallery.main.appendChild(errorElement);
    window.errorMessageSection = document.querySelector('.error');
    window.errorMessageSection.style = 'z-index: 2';
  };

  var displaySuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var sucessElement = successTemplate.cloneNode(true);
    window.successButtonUpload = sucessElement.querySelector('.success__button');
    window.gallery.main.appendChild(sucessElement);
    window.successMessageSection = document.querySelector('.success');
  };

  window.util = {
    keycode: Keycode,
    method: Method,
    server: Server,
    getRandomIntegerInRange: getRandomIntegerInRange,
    getArrayOfRandomIntegers: getArrayOfRandomIntegers,
    transformInputIntoArray: transformInputIntoArray,
    resetListofElements: resetListofElements,
    debounce: debounce,
    open: open,
    close: close,
    displayErrorMessage: displayErrorMessage,
    displaySuccessMessage: displaySuccessMessage
  };
})();
