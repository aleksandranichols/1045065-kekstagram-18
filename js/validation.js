'use strict';

(function () {
  var hashtags = document.querySelector('.text__hashtags');
  var comments = document.querySelector('.text__description');
  var pictureSubmitButton = document.querySelector('.img-upload__submit');
  var invalidities = [];
  var inputCustomValidation = [];
  var validator = {
    hashtagLength: 20,
    commentLength: 140,
    hashtagNumber: 5
  };

  var displayValidationMessages = function (input, container, listOfInvalidities) {
    var customValidityMessage = [];
    var joinInvalidities = function (list) {
      return list.join('</br>');
    };
    customValidityMessage.push(joinInvalidities(listOfInvalidities));
    input.setCustomValidity(customValidityMessage);
    input.insertAdjacentHTML('afterend', '<div class=text__' + input.name + '-error-container></div>');
    container = document.querySelector('.text__' + input.name + '-error-container');
    container.insertAdjacentHTML('beforeend', '<p class="text__' + input.name + '-error">' + customValidityMessage + '</p>');
    input.setAttribute('style', 'border: 2px solid #ff4e4e');
    pictureSubmitButton = true;
  };

  var removeValidationMessages = function (input) {
    input.setCustomValidity('');
    input.removeAttribute('style', 'border: 2px solid #ff4e4e');
    pictureSubmitButton = false;
  };

  var removeValidationContainer = function (container) {
    if (container) {
      container.remove();
    }
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

  var checkTextareaValidity = function (textarea) {
    var textareaInvalidities = [];
    var addInvalidity = function (message) {
      if (!textareaInvalidities.includes(message)) {
        textareaInvalidities.push(message);
      }
    };
    if (textarea.length > validator.commentLength) {
      addInvalidity('Comment must be less than ' + validator.commentLength + ' characters');
    }
    return textareaInvalidities;
  };

  var removeValiditiesDuplicates = function (input, checkInput) {
    var errorMessages = [];
    var inputElements = window.transformInputIntoArray(input.value.toLowerCase());
    for (var j = 0; j < inputElements.length; j++) {
      errorMessages[j] = checkInput(inputElements, inputElements[j].toString(), j);
      if (!inputCustomValidation.includes(errorMessages[j])) {
        inputCustomValidation.push(errorMessages[j]);
      }
    }
    return inputCustomValidation;
  };

  pictureSubmitButton.addEventListener('click', function (evt) {
    var hashtagsErrorContainer = document.querySelector('.text__hashtags-error-container');
    var commentsErrorContainer = document.querySelector('.text__description-error-container');
    var textareaCustomValidation = [];
    inputCustomValidation = [];

    removeValidationContainer(hashtagsErrorContainer);
    removeValidationContainer(commentsErrorContainer);

    inputCustomValidation = removeValiditiesDuplicates(hashtags, checkValidity);
    textareaCustomValidation.push(checkTextareaValidity(comments.value));


    if (inputCustomValidation[0].length !== 0) {
      displayValidationMessages(hashtags, hashtagsErrorContainer, inputCustomValidation);
    } else {
      removeValidationMessages(hashtags);
    }

    if (textareaCustomValidation[0].length !== 0) {
      displayValidationMessages(comments, commentsErrorContainer, textareaCustomValidation);
    } else {
      removeValidationMessages(comments);
    }

    if (pictureSubmitButton) {
      evt.preventDefault();
    }
  });
})();
