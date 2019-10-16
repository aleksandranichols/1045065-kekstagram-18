'use strict';

// валидация

(function () {
var hashtagInput = document.querySelector('.text__hashtags');
var pictureSubmitButton = document.querySelector('.img-upload__submit');
var HASHTAG_LENGTH = 20;

pictureSubmitButton.addEventListener('click', function () {
  var createArrayOutOfString = function (str) {
    var resArray = str.split(' ');
    return resArray;
  };

  var getInvalidities = function (invalidities) {
    return invalidities.join('\n');
  };

  var checkValidity = function (input) {
    var invalidities = [];
    var addInvalidity = function (message) {
      invalidities.push(message);
    };

    if (!input.match(/#[А-Яа-я0-9-_]+/)) {
      addInvalidity('Your hashtags suck');
    }

    if (!input[0].match(/#/)) {
      addInvalidity('Hashtags must start with #');
    }

    if (input.length > HASHTAG_LENGTH) {
      addInvalidity('Hashtags must be less than 20 characters');
    }

    return getInvalidities(invalidities);
  };

  var hashtagsArray = createArrayOutOfString(hashtagInput.value.toString());
  for (var i = 0; i < hashtagsArray.length; i++) {
    var inputCustomValidation = [];
    var customValidityMessage = [];
    inputCustomValidation.push(checkValidity(hashtagsArray[i]));
    customValidityMessage.push(inputCustomValidation);
    hashtagInput.setCustomValidity(customValidityMessage);
  }
});
})()
