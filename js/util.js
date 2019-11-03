'use strict';

(function () {
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

  window.createArrayOutOfString = function (str) {
    var resArray = str.split(' ');
    return resArray;
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

  window.keycode = {
    enter: 13,
    esc: 27
  };

  window.sliderPoint = {
    start: 0,
    end: 453
  };

  window.effectPoint = {
    blureffectmax: 3,
    brightnesseffectmax: 3
  };

  window.openPopup = function (openElement) {
    openElement.classList.remove('hidden');
    document.addEventListener('keydown', window.onOpenEditorEscPress);
    document.removeEventListener('keydown', window.onCloseEditorEnterPress);
  };

  window.closePopup = function (closeElement) {
    closeElement.classList.add('hidden');
    document.addEventListener('keydown', window.onCloseEditorEnterPress);
    document.removeEventListener('keydown', window.onOpenEditorEscPress);
  };
})();
