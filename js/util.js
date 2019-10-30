'use strict';

(function () {
  window.getRandomNumberInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  window.createArrayOutOfString = function (str) {
    var resArray = str.split(' ');
    return resArray;
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
