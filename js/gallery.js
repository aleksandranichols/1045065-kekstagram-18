'use strict';

// галерия сайта

(function () {
  window.picturesList = document.querySelector('.pictures');
  window.body = document.querySelector('body');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var commentsList = document.querySelector('.social__comments');
  var fullPicture = document.querySelector('.big-picture');
  var fullPictureImg = document.querySelector('.big-picture__img img');
  var picturePreviewCancelButton = document.querySelector('.big-picture__cancel');
  var socialCommentsElement = document.querySelector('.social__comment');
  // var commentsCount = document.querySelector('.comments-count');
  // var likesCount = document.querySelector('.likes-count');
  // var socialCaption = document.querySelector('.social__caption');
  // var socialCommentsCount = document.querySelector('.social__comment-count');
  // var commentsLoader = document.querySelector('.comments-loader');
  // var pictureFilters = document.querySelector('.img-filters');
  // var COMMENTS_LOADER_START_NUMBER = 0;
  // var COMMENTS_LOADER_END_NUMBER = 5;
  var NUMBER_OF_RANDOM_PICTURES = 10;
  var ZERO = 0;

  var transferPictureDescriptions = function (picturesElement) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').setAttribute('src', picturesElement.url);
    pictureElement.querySelector('.picture__likes').textContent = picturesElement.likes;
    pictureElement.querySelector('.picture__comments').textContent = picturesElement.comments.length;
    return pictureElement;
  };

  var openFullPicture = function (evt) {
    var smallPicture = evt.target;
    window.openPopup(fullPicture);
    commentsList.innerText = '';
    window.body.setAttribute('class', 'modal-open');
    fullPictureImg.setAttribute('src', smallPicture.src);
    fullPictureImg.setAttribute('alt', smallPicture.alt);
  };

  var closeFullPicture = function () {
    window.body.removeAttribute('class');
    fullPictureImg.removeAttribute('src');
    fullPictureImg.removeAttribute('alt');
  };

  var transferSocialComments = function (commentsElement) {
    var commentElement = socialCommentsElement.cloneNode(true);
    commentElement.querySelector('.social__comment .social__picture').setAttribute('src', commentsElement.avatar);
    commentElement.querySelector('.social__comment .social__picture').setAttribute('alt', commentsElement.name);
    commentElement.querySelector('.social__comment .social__text').textContent = commentsElement.message;
    return commentElement;
  };

  var generateComments = function (comments) {
    var commentsFragment = document.createDocumentFragment();
    // commentsFragment.innerText = '';
    for (var i = 0; i < comments.length; i++) {
      commentsFragment.appendChild(transferSocialComments(comments[i]));
    }
    return commentsFragment;
    // COMMENTS_LOADER_END_NUMBER += COMMENTS_LOADER_END_NUMBER;
    // COMMENTS_LOADER_START_NUMBER += COMMENTS_LOADER_END_NUMBER;
  };

  // socialCommentsCount.classList.add('visually-hidden');
  // commentsLoader.classList.add('visually-hidden');

  picturePreviewCancelButton.addEventListener('click', function () {
    window.closePopup(fullPicture);
    closeFullPicture();
  });

  document.addEventListener('keydown', function (evtkey) {
    if (evtkey.keyCode === window.keycode.esc) {
      window.closePopup(fullPicture);
      closeFullPicture();
    }
  });

  window.onOpenEditorEscPress = function (evtkey) {
    if (evtkey.keyCode === window.keycode.esc) {
      window.closePopup(fullPicture);
      closeFullPicture();
    }
  };

  window.generatePicturesError = function (errorMessage) {
    window.displayErrorMessage(errorMessage);
    window.errorButtonUpload.remove();

    window.errorButtonTryAgain.addEventListener('click', function () {
      window.downloadData(window.generatePicturesSuccess, window.generatePicturesError);
    });
    window.errorButtonTryAgain.addEventListener('keydown', function (evtkey) {
      if (evtkey.keycode === window.keycode.enter) {
        window.downloadData(window.generatePicturesSuccess, window.generatePicturesError);
      }
    });
  };

  var displayCommentsOnPicture = function (element, picturesElement) {
    var comments = element.comments;
    picturesElement.addEventListener('click', function (evt) {
      openFullPicture(evt);
      commentsList.appendChild(generateComments(comments));
    }, true);
    // написать if на проверку target
    // с enter пока не работает
  };

  window.generatePicturesSuccess = function (pictures) {
    var picturesFragment = document.createDocumentFragment();
    window.picturesCopy = pictures.slice();
    window.resetListofElements(window.picturesList, 'picture');
    pictures.forEach(function (element) {
      var picturesElement = transferPictureDescriptions(element);
      picturesFragment.appendChild(picturesElement);
      displayCommentsOnPicture(element, picturesElement);
    });
    window.picturesList.appendChild(picturesFragment);
    window.pictureFilters.classList.remove('img-filters--inactive');
  };

  window.downloadData(window.generatePicturesSuccess, window.generatePicturesError);

  window.generateMostDiscussedPictures = function () {
    window.resetListofElements(window.picturesList, 'picture');
    var picturesFragment = document.createDocumentFragment();

    window.picturesCopy.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    }).
     forEach(function (element) {
       var picturesElement = transferPictureDescriptions(element);
       picturesFragment.appendChild(picturesElement);
       displayCommentsOnPicture(element, picturesElement);
     });
    window.picturesList.appendChild(picturesFragment);
  };

  window.generateRandomPictures = function () {
    window.resetListofElements(window.picturesList, 'picture');
    var picturesFragment = document.createDocumentFragment();
    var randomPictures = window.getArrayOfRandomIntegers(NUMBER_OF_RANDOM_PICTURES, ZERO, window.picturesCopy.length - 1);
    for (var i = 0; i < NUMBER_OF_RANDOM_PICTURES; i++) {
      var randomNumber = randomPictures[i];
      var picturesElement = transferPictureDescriptions(window.picturesCopy[randomNumber]);
      picturesFragment.appendChild(picturesElement);
      displayCommentsOnPicture(window.picturesCopy[randomNumber], picturesElement);
    }
    window.picturesList.appendChild(picturesFragment);
  };

})();
