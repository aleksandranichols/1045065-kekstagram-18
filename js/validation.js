'use strict';

(function () {
  var hashtags = document.querySelector('.text__hashtags');
  var pictureSubmitButton = document.querySelector('.img-upload__submit');
  var validator = {
    hashtagLength: 20,
    commentLength: 140,
    hashtagNumber: 5
  };

  var displayValidationMessages = function (input, container, invalidities) {
    var customValidityMessage = [];
    var joinInvalidities = function (listOfInvalidities) {
      return listOfInvalidities.join('</br>');
    };
    customValidityMessage.push(joinInvalidities(invalidities));
    input.setCustomValidity(customValidityMessage);
    input.insertAdjacentHTML('afterend', '<div class=text__' + input.name + '-error-container></div>');
    container = document.querySelector('.text__' + input.name + '-error-container');
    container.insertAdjacentHTML('beforeend', '<p class="text__'+ input.name + '-error">' + customValidityMessage + '</p>');
    input.setAttribute('style', 'border: 2px solid #ff4e4e');
    pictureSubmitButton = true;
  }

  var removeValidationMessages = function (input) {
    input.setCustomValidity('');
    input.removeAttribute('style', 'border: 2px solid #ff4e4e');
    pictureSubmitButton = false;
  }

  pictureSubmitButton.addEventListener('click', function (evt) {
    var hashtagsErrorContainer = document.querySelector('.text__hashtags-error-container');
    var inputCustomValidation = [];
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

    var hashtagArrElements = transformInputIntoArray(hashtags.value.toLowerCase());

    var hashtagErrorMessage = [];
    for (var j = 0; j < hashtagArrElements.length; j++) {
      hashtagErrorMessage[j] = checkValidity(hashtagArrElements, hashtagArrElements[j].toString(), j);
      if (!inputCustomValidation.includes(hashtagErrorMessage[j])) {
        inputCustomValidation.push(hashtagErrorMessage[j]);
      }
    }

    if (inputCustomValidation[0].length !== 0) {
      displayValidationMessages(hashtags, hashtagsErrorContainer, inputCustomValidation[0]);
    } else {
      removeValidationMessages(hashtags);
    }

    if (pictureSubmitButton) {
      evt.preventDefault();
    }
  });
})();
