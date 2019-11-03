'use strict';

// валидация

(function () {
  var hashtagInput = document.querySelector('.text__hashtags');
  var pictureSubmitButton = document.querySelector('.img-upload__submit');
  var HASHTAG_LENGTH = 20;

  pictureSubmitButton.addEventListener('click', function (evt) {

    var getInvalidities = function (invalidities) {
      return invalidities.join('</br>');
    };

    var checkValidity = function (input) {
      var invalidities = [];
      var addInvalidity = function (message) {
        invalidities.push(message);
      };
      var hashtagArr = [];
      var hashtagArrElements = [];
      hashtagArr.push(input.split('#'));
      hashtagArrElements = hashtagArr.slice();
      hashtagArrElements.forEach(function (element) {

        if (!element.match(/#[А-Яа-я0-9-_]+/)) {
          addInvalidity('Your hashtags suck');
        }

        if (!element.match(/#/)) {
          addInvalidity('Hashtags must start with #');
        }

        if (!element.length > HASHTAG_LENGTH) {
          addInvalidity('Hashtags must be less than 20 characters');
        }
      });

      return getInvalidities(invalidities);
    };

    var hashtagsArray = window.createArrayOutOfString(hashtagInput.value.toString());
    for (var i = 0; i < hashtagsArray.length; i++) {
      var inputCustomValidation = [];
      var customValidityMessage = [];
      inputCustomValidation.push(checkValidity(hashtagsArray[i]));
      customValidityMessage.push(inputCustomValidation);
      hashtagInput.setCustomValidity(customValidityMessage);
      hashtagInput.insertAdjacentHTML('afterend', '<p>' + customValidityMessage + '</p>');
      pictureSubmitButton = true;
    }

    if (pictureSubmitButton) {
      evt.preventDefault();
    }
  });
})();
