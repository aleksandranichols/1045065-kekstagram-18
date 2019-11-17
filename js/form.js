'use strict';

// редактор загруженной картинки

(function () {
  var PERCENTAGE_MAX = 100;
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var uploadPictureInput = document.querySelector('#upload-file');
  var pictureEditor = document.querySelector('.img-upload__overlay');
  var pictureEditorClose = document.querySelector('#upload-cancel');
  var effects = document.querySelector('.effects');
  var effectLevel = document.querySelector('.effect-level');
  var effectSliderButton = document.querySelector('.effect-level__pin');
  var effectSliderButtonValue = document.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectPictureUploadPreview = document.querySelector('.img-upload__preview');
  var effectPictureUploadPreviewImg = document.querySelector('.img-upload__preview img');
  var effectActiveRadioButton = document.querySelector('input[name=effect]:checked');
  var scaleControlSmallerButton = document.querySelector('.scale__control--smaller');
  var scaleControlBiggerButton = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var scaleValue = parseInt(scaleControlValue.value, 10);
  var pictureForm = document.querySelector('.img-upload__form');

  var SliderPoint = {
    START: 0,
    END: 453
  };

  var EffectPoint = {
    BLUREFFECTMAX: 3,
    BRIGHTNESSEFFECTMAX: 3
  };

  var Scale = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  var isSuccessOrErrorMessage = function () {
    var successMessageSection = document.querySelector('.success');
    var errorMessageSection = document.querySelector('.error');
    if (successMessageSection) {
      closeSuccessOrErrorMessage(successMessageSection);
    }
    if (errorMessageSection) {
      closeSuccessOrErrorMessage(errorMessageSection);
    }
  };

  var onOpenEditorEscPress = function () {
    window.util.close(pictureEditor);
    pictureForm.reset();
    resetPictureStyles();
    isSuccessOrErrorMessage();
  };

  uploadPictureInput.addEventListener('change', function (evt) {
    var file = uploadPictureInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        effectPictureUploadPreviewImg.src = reader.result;
      });

      reader.readAsDataURL(file);
      window.util.open(pictureEditor);
    } else {
      evt.preventDefault();
    }
  });

  var resetPictureStyles = function () {
    var hashtagsErrorContainer = document.querySelector('.text__hashtags-error-container');
    var commentsErrorContainer = document.querySelector('.text__description-error-container');
    effectPictureUploadPreview.setAttribute('style', 'filter: 0; transform:scale(1)');
    scaleControlValue.setAttribute('value', '100%');
    effectSliderButton.style.left = SliderPoint.END + 'px';
    effectLevelDepth.style.width = SliderPoint.END + 'px';
    scaleValue = parseInt(scaleControlValue.value, 10);
    effectPictureUploadPreview.setAttribute('class', 'img-upload__preview');
    window.validation.hashtags.removeAttribute('style', 'border: 2px solid #ff4e4e');
    window.validation.comments.removeAttribute('style', 'border: 2px solid #ff4e4e');
    window.validation.removeValidationContainer(hashtagsErrorContainer);
    window.validation.removeValidationContainer(commentsErrorContainer);
    effectLevel.classList.add('hidden');
  };

  pictureEditorClose.addEventListener('click', function () {
    window.util.close(pictureEditor);
    pictureForm.reset();
    resetPictureStyles();
  });

  effectPictureUploadPreview.setAttribute('style', '');

  var onEffectRadioButton = function () {
    effectActiveRadioButton = document.querySelector('input[name=effect]:checked');
    resetPictureStyles();
    effectPictureUploadPreview.classList.add('effects__preview--' + effectActiveRadioButton.value);
    if (effectActiveRadioButton.value !== 'none') {
      effectLevel.classList.remove('hidden');
    }
  };

  effectLevel.classList.add('hidden');
  effects.addEventListener('click', onEffectRadioButton, true);

  // изменение насыщенности фильтров при перемещении пина

  effectSliderButton.addEventListener('mousedown', function (evt) {

    evt.preventDefault();
    var startX = evt.clientX;

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();
      var shiftX = startX - evtMove.clientX;
      startX = evtMove.clientX;
      var newPositionLeft = effectSliderButton.offsetLeft - shiftX;
      var buttonPosition;
      var linePosition;

      if (newPositionLeft > SliderPoint.END) {
        buttonPosition = SliderPoint.END + 'px';
        linePosition = SliderPoint.END + 'px';

      } else if (newPositionLeft < SliderPoint.START) {
        buttonPosition = SliderPoint.START + 'px';
        linePosition = SliderPoint.START + 'px';

      } else {
        linePosition = newPositionLeft + 'px';
        buttonPosition = newPositionLeft + 'px';

        effectActiveRadioButton = document.querySelector('input[name=effect]:checked');
        var FilterOption = {
          NONE: 'none',
          MARVIN: 'invert(' + effectSliderButton.offsetLeft * PERCENTAGE_MAX / SliderPoint.END + '%' + ')',
          CHROME: 'grayscale(' + effectSliderButton.offsetLeft / SliderPoint.END + ')',
          SEPIA: 'sepia(' + effectSliderButton.offsetLeft / SliderPoint.END + ')',
          PHOBOS: 'blur(' + effectSliderButton.offsetLeft * EffectPoint.BLUREFFECTMAX / SliderPoint.END + 'px' + ')',
          HEAT: 'brightness(' + effectSliderButton.offsetLeft * EffectPoint.BRIGHTNESSEFFECTMAX / SliderPoint.END + ')'
        };
        effectPictureUploadPreview.style.filter = FilterOption[effectActiveRadioButton.value.toUpperCase()];
        effectSliderButtonValue.setAttribute('value', FilterOption[effectActiveRadioButton.value.toUpperCase()]);
      }
      effectSliderButton.style.left = buttonPosition;
      effectLevelDepth.style.width = linePosition;

    };
    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  // работа зума

  var changeZoom = function (step) {
    scaleControlValue.setAttribute('value', scaleValue + step + '%');
    effectPictureUploadPreview.style.transform = 'scale(' + (scaleValue + step) / PERCENTAGE_MAX + ')';
    scaleValue = parseInt(scaleControlValue.value, 10);
  };

  var doNotChangeZoom = function () {
    scaleControlValue.setAttribute('value', scaleValue + '%');
    effectPictureUploadPreview.style.transform = 'scale(' + (scaleValue) / PERCENTAGE_MAX + ')';
  };

  var onScaleSmallerButton = function () {
    if (scaleValue === Scale.MIN) {
      doNotChangeZoom();
    } else {
      changeZoom(-Scale.STEP);
    }
  };

  var onScaleBiggerButton = function () {
    if (scaleValue === Scale.MAX) {
      doNotChangeZoom();
    } else {
      changeZoom(Scale.STEP);
    }
  };

  scaleControlSmallerButton.addEventListener('click', onScaleSmallerButton);
  scaleControlBiggerButton.addEventListener('click', onScaleBiggerButton);

  // отправка картинки

  var closeSuccessOrErrorMessage = function (message) {
    window.gallery.main.removeChild(message);
    window.util.close(pictureEditor);
  };

  var uploadPicturesError = function (errorMessage) {
    window.util.displayErrorMessage(errorMessage);
    var errorInner = document.querySelector('.error__inner');

    window.util.errorButtonTryAgain.addEventListener('click', function () {
      window.gallery.main.removeChild(window.util.errorMessageSection);
    });

    window.util.errorButtonUpload.addEventListener('click', function () {
      pictureForm.reset();
      closeSuccessOrErrorMessage(window.util.errorMessageSection);
    });

    window.util.errorMessageSection.addEventListener('click', function () {
      pictureForm.reset();
      closeSuccessOrErrorMessage(window.util.errorMessageSection);
    });

    errorInner.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  };

  var uploadPictureSuccess = function () {
    pictureForm.reset();
    window.util.close(pictureEditor);
    window.util.displaySuccessMessage();
    var successInner = document.querySelector('.success__inner');

    window.util.successButtonUpload.addEventListener('click', function () {
      closeSuccessOrErrorMessage(window.util.successMessageSection);
    });

    window.util.successMessageSection.addEventListener('click', function () {
      closeSuccessOrErrorMessage(window.util.successMessageSection);
    });

    successInner.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  };
  pictureForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload.upload(window.form.uploadPictureSuccess, window.form.uploadPicturesError, new FormData(pictureForm));
  });

  window.form = {
    onOpenEditorEscPress: onOpenEditorEscPress,
    uploadPictureSuccess: uploadPictureSuccess,
    uploadPicturesError: uploadPicturesError
  };
})();
