'use strict';

(function () {
  var hashtags = document.querySelector('.text__hashtags');
  var comments = document.querySelector('.text__description');
  var pictureSubmitButton = document.querySelector('.img-upload__submit');
  var invalidities = [];
  var inputCustomValidations = [];
  var Validator = {
    HASHTAG_LENGTH: 20,
    COMMENT_LENGTH: 140,
    HASHTAG_MAX_NUMBER: 5
  };

  var displayValidationMessages = function (input, container, listOfInvalidities) {
    var customValidityMessages = [];
    var joinInvalidities = function (list) {
      return list.join('</br>');
    };
    customValidityMessages.push(joinInvalidities(listOfInvalidities[0]));
    input.setCustomValidity(customValidityMessages);
    input.insertAdjacentHTML('afterend', '<div class=text__' + input.name + '-error-container></div>');
    container = document.querySelector('.text__' + input.name + '-error-container');
    container.insertAdjacentHTML('beforeend', '<p class="text__' + input.name + '-error">' + customValidityMessages + '</p>');
    input.setAttribute('style', 'border: 2px solid #ff4e4e');
    pictureSubmitButton = true;
    invalidities.splice(0, invalidities.length);
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
    checkValidityOnElement(inputArray, inputElement);
    checkValidityOnArray(inputArray, inputElement, j);
    return invalidities;
  };

  var addInvalidity = function (message) {
    if (!invalidities.includes(message)) {
      invalidities.push(message);
    }
  };

  var checkValidityOnElement = function (inputArray, inputElement) {
    if (inputElement.charAt(0) !== '#' && inputElement.charAt(0) !== '') {
      addInvalidity('Hashtags must start with #');
    }

    if (inputElement === '#') {
      addInvalidity('Hashtags must contain more than just a hashtag');
    }

    if (inputElement.length > Validator.HASHTAG_LENGTH) {
      addInvalidity('Hashtags must be less than 20 characters');
    }
  };

  var checkValidityOnArray = function (inputArray, inputElement, j) {
    var numOfHashtags = 0;
    for (var i = 0; i < inputElement.length; i++) {

      if (inputElement.charAt(i) === '#') {
        numOfHashtags += 1;
      }
    }
    if (numOfHashtags > 1) {
      addInvalidity('Hashtags must be separated with space');
    }

    var inputArrayCopy = inputArray.
    slice().
    filter(function (matchingElement) {
      return matchingElement === inputElement;
    });

    if (inputArrayCopy.length > 1) {
      addInvalidity('Hashtags can\'t repeat');
    }

    if (j + 1 > Validator.HASHTAG_MAX_NUMBER) {
      addInvalidity('Number of hashtags must be less than or equal to 5');
    }
  };

  var checkTextareaValidity = function (textarea) {
    var textareaInvalidities = [];
    if (textarea.length > Validator.COMMENT_LENGTH) {
      textareaInvalidities.push(('Comment must be less than ' + Validator.COMMENT_LENGTH + ' characters'));
    }
    return textareaInvalidities;
  };

  var removeValiditiesDuplicates = function (input, checkInput) {
    var errorMessages = [];
    var inputElements = window.util.transformInputIntoArray(input.value.toLowerCase());
    for (var j = 0; j < inputElements.length; j++) {
      errorMessages[j] = checkInput(inputElements, inputElements[j].toString(), j);
      if (!inputCustomValidations.includes(errorMessages[j])) {
        inputCustomValidations.push(errorMessages[j]);
      }
    }
    return inputCustomValidations;
  };

  pictureSubmitButton.addEventListener('click', function (evt) {
    var hashtagsErrorContainer = document.querySelector('.text__hashtags-error-container');
    var commentsErrorContainer = document.querySelector('.text__description-error-container');
    var textareaCustomValidations = [];

    removeValidationContainer(hashtagsErrorContainer);
    removeValidationContainer(commentsErrorContainer);

    inputCustomValidations = removeValiditiesDuplicates(hashtags, checkValidity);
    textareaCustomValidations.push(checkTextareaValidity(comments.value));

    if (inputCustomValidations[0].length !== 0) {
      displayValidationMessages(hashtags, hashtagsErrorContainer, inputCustomValidations);
    } else {
      removeValidationMessages(hashtags);
    }

    if (textareaCustomValidations[0].length !== 0) {
      displayValidationMessages(comments, commentsErrorContainer, textareaCustomValidations);
    } else {
      removeValidationMessages(comments);
    }

    if (pictureSubmitButton) {
      evt.preventDefault();
    }
  });

  window.validation = {
    hashtags: hashtags,
    comments: comments,
    removeValidationContainer: removeValidationContainer
  };
})();
