'use strict';

// галерия сайта

(function () {
  window.picturesList = document.querySelector('.pictures');
  window.body = document.querySelector('body');
  window.main = document.querySelector('main');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var commentsList = document.querySelector('.social__comments');
  var fullPicture = document.querySelector('.big-picture');
  var fullPictureSocial = document.querySelector('.big-picture__social');
  var fullPictureImg = document.querySelector('.big-picture__img img');
  var picturePreviewCancelButton = document.querySelector('.big-picture__cancel');
  var socialCommentsElement = document.querySelector('.social__comment');
  var commentsLoader = document.querySelector('.comments-loader');
  var NUMBER_OF_RANDOM_PICTURES = 10;

  var commentLoader = {
    start: 0,
    end: 5
  };

  var transferPictureDescriptions = function (picturesElement) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').setAttribute('src', picturesElement.url);
    pictureElement.querySelector('.picture__likes').textContent = picturesElement.likes;
    pictureElement.querySelector('.picture__comments').textContent = picturesElement.comments.length;
    return pictureElement;
  };

  var openFullPicture = function (evt) {
    if (evt.target.className === 'picture__img') {
      var smallPicture = evt.target;
    } else {
      smallPicture = evt.target.querySelector('.picture__img');
    }
    window.openPopup(fullPicture);
    window.currentCommentsLength = 5;
    commentsList.innerHTML = '';
    window.body.setAttribute('class', 'modal-open');
    fullPictureImg.setAttribute('src', smallPicture.src);
    fullPictureImg.setAttribute('alt', smallPicture.alt);
  };

  var closeFullPicture = function () {
    window.body.removeAttribute('class');
    fullPictureImg.removeAttribute('src');
    fullPictureImg.removeAttribute('alt');
    if (window.commentsCollection) {
      while (window.commentsCollection.length !== 0) {
        window.commentsCollection.length[0].parentNode.removeChild(window.commentsCollection.length[0]);
      }
    }
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
    for (var i = 0; i < comments.length; i++) {
      commentsFragment.appendChild(transferSocialComments(comments[i]));
    }
    return commentsFragment;
  };

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

  var displayCommentsAndDescriptionsOnPicture = function (element, picturesElement) {
    picturesElement.addEventListener('click', function (evt) {
      var comments = element.comments;
      var commentsLength = element.comments.length;
      var currentCommentsLength = commentLoader.end;
      var newCurrentCommentsLength = commentLoader.end;
      var likes = element.likes;
      var description = element.description;
      fullPictureSocial.querySelector('.likes-count').textContent = likes;
      fullPictureSocial.querySelector('.social__caption').textContent = description;
      fullPictureSocial.querySelector('.comments-count').textContent = commentsLength;
      if (evt.target.className === 'picture__img' || evt.target.className === 'picture') {
        openFullPicture(evt);
        var pictureComments = generateComments(comments);
        window.commentsCollection = pictureComments.children;
        if (pictureComments.childElementCount <= commentLoader.end) {
          currentCommentsLength = commentsLength;
          fullPictureSocial.querySelector('.social__comment-count').innerHTML = currentCommentsLength + ' из <span class="comments-count">' + commentsLength + '</span> комментариев';
          commentsList.appendChild(pictureComments);
          commentsLoader.classList.add('hidden');
        } else {
          commentsLoader.classList.remove('hidden');
          fullPictureSocial.querySelector('.social__comment-count').innerHTML = currentCommentsLength + ' из <span class="comments-count">' + commentsLength + '</span> комментариев';
          var onCommentsLoader = function () {
            if (window.commentsCollection.length !== 0 && window.commentsCollection.length > commentLoader.end) {

              fullPictureSocial.querySelector('.social__comment-count').innerHTML = newCurrentCommentsLength + ' из <span class="comments-count">' + commentsLength + '</span> комментариев';
              for (var i = commentLoader.start; i < commentLoader.end; i++) {
                commentsList.append(window.commentsCollection[0]);
              }
              currentCommentsLength = newCurrentCommentsLength;
              newCurrentCommentsLength = currentCommentsLength + commentLoader.end;
            } else {
              currentCommentsLength += window.commentsCollection.length;
              fullPictureSocial.querySelector('.social__comment-count').innerHTML = currentCommentsLength + ' из <span class="comments-count">' + commentsLength + '</span> комментариев';
              while (window.commentsCollection.length !== 0) {
                commentsList.append(window.commentsCollection[0]);
              }
              commentsLoader.classList.add('hidden');
            }
          };
          onCommentsLoader();
        }
        commentsLoader.addEventListener('click', onCommentsLoader);
      }
    }, true);
  };

  window.generatePicturesSuccess = function (pictures) {
    var picturesFragment = document.createDocumentFragment();

    window.picturesCopy = pictures.slice();
    window.resetListofElements(window.picturesList, 'picture');
    pictures.forEach(function (element) {
      var picturesElement = transferPictureDescriptions(element);
      picturesFragment.appendChild(picturesElement);
      displayCommentsAndDescriptionsOnPicture(element, picturesElement);
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
       displayCommentsAndDescriptionsOnPicture(element, picturesElement);
     });
    window.picturesList.appendChild(picturesFragment);
  };

  window.generateRandomPictures = function () {
    window.resetListofElements(window.picturesList, 'picture');
    var picturesFragment = document.createDocumentFragment();
    var randomPictures = window.getArrayOfRandomIntegers(NUMBER_OF_RANDOM_PICTURES, 0, window.picturesCopy.length - 1);
    for (var i = 0; i < NUMBER_OF_RANDOM_PICTURES; i++) {
      var randomNumber = randomPictures[i];
      var picturesElement = transferPictureDescriptions(window.picturesCopy[randomNumber]);
      picturesFragment.appendChild(picturesElement);
      displayCommentsAndDescriptionsOnPicture(window.picturesCopy[randomNumber], picturesElement);
    }
    window.picturesList.appendChild(picturesFragment);
  };

})();
