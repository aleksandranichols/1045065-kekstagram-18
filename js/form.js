'use strict';

// редактор загруженной картинки

(function () {
  var uploadPictureInput = document.querySelector('#upload-file');
  var pictureEditor = document.querySelector('.img-upload__overlay');
  var pictureEditorClose = document.querySelector('#upload-cancel');

    window.onOpenEditorEscPress = function (evt) {
      if (evt.keyCode === window.keycodes.esc) {
        window.closePopup(pictureEditor);
      }
    };

    window.onCloseEditorEnterPress = function (evt) {
      if (evt.keyCode === window.keycodes.enter) {
        window.openPopup(pictureEditor);
      }
    };

    uploadPictureInput.addEventListener('change', function () {
      window.openPopup(pictureEditor);
    });

    pictureEditorClose.addEventListener('click', function () {
      window.closePopup(pictureEditor);
    });

    pictureEditorClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.keycodes.esc) {
        window.closePopup(pictureEditor);
      }
    });
  var effects = document.querySelector('.effects');
  var effectLevel = document.querySelector('.effect-level');
  var effectSliderButton = document.querySelector('.effect-level__pin');
  var effectSliderButtonValue = document.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectPictureUploadPreview = document.querySelector('.img-upload__preview');

  var onEffectRadioButton = function () {
    var effectActiveRadioButton = document.querySelector('input[name=effect]:checked');
    effectPictureUploadPreview.setAttribute('style', 'filter: 0');
    effectSliderButton.style.left = 453 + 'px';
    effectLevelDepth.style.width = 453 + 'px';
    effectLevel.classList.remove('hidden');
    effectPictureUploadPreview.className = 'img-upload__preview';
    effectPictureUploadPreview.classList.add('effects__preview--' + effectActiveRadioButton.value);
    if (effectActiveRadioButton.value === 'none') {
      effectLevel.classList.add('hidden');
    }
  };

  effectLevel.classList.add('hidden');
  effects.addEventListener('click', onEffectRadioButton, true);

  // изменение насыщенности фильтров при перемещении пина

  effectSliderButton.addEventListener('mousedown', function (evt) {
    var SLIDER_START = 0;
    var SLIDER_END = 453;
    var PERCENTAGE_MAX = 100;
    var BLUREFFECT_MAX = 3;
    var BRIGTNESSEFFECT_MAX = 3;

    evt.preventDefault();
    var startX = evt.clientX;

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();
      var shiftX = startX - evtMove.clientX;
      startX = evtMove.clientX;
      var newPositionLeft = effectSliderButton.offsetLeft - shiftX;
      if (newPositionLeft > SLIDER_END) {
        effectSliderButton.style.left = SLIDER_END + 'px';
        effectLevelDepth.style.width = SLIDER_END + 'px';
      } else if (newPositionLeft < SLIDER_START) {
        effectSliderButton.style.left = SLIDER_START + 'px';
        effectLevelDepth.style.width = SLIDER_START + 'px';
      } else {

        effectLevelDepth.style.width = newPositionLeft + 'px';
        effectSliderButton.style.left = newPositionLeft + 'px';
        effectSliderButtonValue.setAttribute('value', effectSliderButton.offsetLeft);

        var effectActiveRadioButton = document.querySelector('input[name=effect]:checked');
        var effectCurrent = document.querySelector('.img-upload__preview.effects__preview--' + effectActiveRadioButton.value);
        var filtersObject = {
          none: 'none',
          marvin: 'invert(' + effectSliderButton.offsetLeft * PERCENTAGE_MAX / SLIDER_END + '%' + ')',
          chrome: 'grayscale(' + effectSliderButton.offsetLeft / SLIDER_END + ')',
          sepia: 'sepia(' + effectSliderButton.offsetLeft / SLIDER_END + ')',
          phobos: 'blur(' + effectSliderButton.offsetLeft * BLUREFFECT_MAX / SLIDER_END + 'px' + ')',
          heat: 'brightness(' + effectSliderButton.offsetLeft * BRIGTNESSEFFECT_MAX / SLIDER_END + ')'
        };
        effectCurrent.style.filter = filtersObject[effectActiveRadioButton.value];
      }
    };
    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
