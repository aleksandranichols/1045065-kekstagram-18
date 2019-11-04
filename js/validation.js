'use strict';

(function () {
  var hashtagInput = document.querySelector('.text__hashtags');
  var pictureSubmitButton = document.querySelector('.img-upload__submit');
  var validator = {
    hashtagLength: 20,
    commentLength: 140,
    hashtagNumber: 5
  };

  pictureSubmitButton.addEventListener('click', function (evt) {
    var hashtagsErrorContainer = document.querySelector('.text__hashtags-error-container');
    var inputCustomValidation = [];
    var customValidityMessage = [];
    var invalidities = [];

    if (hashtagsErrorContainer) {
      hashtagsErrorContainer.remove();
    }

    var transformInputIntoArray = function (input) {
      var hashtagArrElements = [];
      hashtagArrElements = (input.split(' '));
      return hashtagArrElements;
    };

    var checkValidity = function (inputArray, inputElement, j) {
      var numOfHashtags = 0;

      var addInvalidity = function (message) {
        if (!invalidities.includes(message)) {
          invalidities.push(message);
        }
      };

      for (var i = 0; i < inputElement.length; i++) {

        if (inputElement.charAt(i) === '#') {
          numOfHashtags += 1;
        }
      }
      if (numOfHashtags > 1) {
        addInvalidity('Hashtags must be separated with space');
      }

      if (inputElement.charAt(0) !== '#' && inputElement.charAt(0) !== '') {
        addInvalidity('Hashtags must start with #');
      }

      if (inputElement === '#') {
        addInvalidity('Hashtags must contain more than just a hashtag');
      }

      if (i > validator.hashtagLength) {
        addInvalidity('Hashtags must be less than 20 characters');
      }

      var inputArrayCopy = inputArray.
      slice().
      filter(function (matchingElement) {
        return matchingElement === inputElement;
      });

      if (inputArrayCopy.length > 1) {
        addInvalidity('Hashtags can\'t repeat');
      }

      if (j + 1 > validator.hashtagNumber) {
        addInvalidity('Nsumber of hashtags must be less than or equal to 5');
      }

      return invalidities;
    };

    var hashtagArrElements = transformInputIntoArray(hashtagInput.value.toLowerCase());
    // var joinInvalidities = function (listOfInvalidities) {
    //   return listOfInvalidities.join('</br>');
    // };
    var hashtagErrorMessage = [];
    for (var j = 0; j < hashtagArrElements.length; j++) {
      hashtagErrorMessage[j] = checkValidity(hashtagArrElements, hashtagArrElements[j].toString(), j);
      if (!inputCustomValidation.includes(hashtagErrorMessage[j])) {
        inputCustomValidation.push(hashtagErrorMessage[j]);
      }
    }

    if (inputCustomValidation[0].length !== 0) {
      customValidityMessage.push(inputCustomValidation);
      hashtagInput.setCustomValidity(customValidityMessage);

      hashtagInput.insertAdjacentHTML('afterend', '<div class="text__hashtags-error-container"></div>');
      hashtagsErrorContainer = document.querySelector('.text__hashtags-error-container');
      hashtagsErrorContainer.insertAdjacentHTML('beforeend', '<p class="text__hashtags-error">' + customValidityMessage + '</p>');
      pictureSubmitButton = true;
    } else {
      hashtagInput.setCustomValidity('');
      pictureSubmitButton = false;
    }

    if (pictureSubmitButton) {
      evt.preventDefault();
    }
  });
})();
