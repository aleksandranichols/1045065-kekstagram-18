'use strict';

// галерия сайта

(function () {
  var NUMBER_OF_RANDOM_PICTURES = 10;
  var picturesList = document.querySelector('.pictures');
  var body = document.querySelector('body');
  var main = document.querySelector('main');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var commentsList = document.querySelector('.social__comments');
  var fullPicture = document.querySelector('.big-picture');
  var fullPictureSocial = document.querySelector('.big-picture__social');
  var fullPictureImg = document.querySelector('.big-picture__img img');
  var picturePreviewCancelButton = document.querySelector('.big-picture__cancel');
  var socialCommentsElement = document.querySelector('.social__comment');
  var commentsLoader = document.querySelector('.comments-loader');

  var CommentLoader = {
    START: 0,
    END: 5
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
    window.util.open(fullPicture);
    window.currentCommentsLength = CommentLoader.END;
    commentsList.innerHTML = '';
    body.setAttribute('class', 'modal-open');
    fullPictureImg.setAttribute('src', smallPicture.src);
    fullPictureImg.setAttribute('alt', smallPicture.alt);
  };

  var closeFullPicture = function () {
    body.removeAttribute('class');
    fullPictureImg.removeAttribute('src');
    fullPictureImg.removeAttribute('alt');
    if (window.commentsCollection) {
      while (window.commentsCollection.length !== 0) {
        window.commentsCollection[0].parentNode.removeChild(window.commentsCollection[0]);
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
    window.util.close(fullPicture);
    closeFullPicture();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.keycode.ESC) {
      window.util.close(fullPicture);
      closeFullPicture();
    }
  });

  var generatePicturesError = function (errorMessage) {
    window.util.displayErrorMessage(errorMessage);
    window.errorButtonUpload.remove();

    window.errorButtonTryAgain.addEventListener('click', function () {
      window.download(window.gallery.generatePicturesSuccess, window.gallery.generatePicturesError);
    });
    window.errorButtonTryAgain.addEventListener('keydown', function (evtkey) {
      if (evtkey.keycode === window.util.keycode.ENTER) {
        window.download(window.gallery.generatePicturesSuccess, window.gallery.generatePicturesError);
      }
    });
  };


  var onCommentsLoader = function () {
    if (window.commentsCollection.length !== 0 && window.commentsCollection.length > CommentLoader.END) {
      fullPictureSocial.querySelector('.social__comment-count').innerHTML = window.newCurrentCommentsLength + ' из <span class="comments-count">' + window.commentsLength + '</span> комментариев';
      for (var i = CommentLoader.START; i < CommentLoader.END; i++) {
        commentsList.append(window.commentsCollection[0]);
      }
      window.currentCommentsLength = window.newCurrentCommentsLength;
      window.newCurrentCommentsLength = window.currentCommentsLength + CommentLoader.END;
    } else {
      window.currentCommentsLength += window.commentsCollection.length;
      fullPictureSocial.querySelector('.social__comment-count').innerHTML = window.currentCommentsLength + ' из <span class="comments-count">' + window.commentsLength + '</span> комментариев';
      while (window.commentsCollection.length !== 0) {
        commentsList.append(window.commentsCollection[0]);
      }
      commentsLoader.classList.add('hidden');
    }
  };

  var fillFullPictureWithDescriptions = function (element) {
    window.currentCommentsLength = CommentLoader.END;
    window.newCurrentCommentsLength = CommentLoader.END;
    window.pictureComments = element.comments;
    window.commentsLength = element.comments.length;
    var likes = element.likes;
    var description = element.description;
    fullPictureSocial.querySelector('.likes-count').textContent = likes;
    fullPictureSocial.querySelector('.social__caption').textContent = description;
    fullPictureSocial.querySelector('.comments-count').textContent = window.commentsLength;
  };

  var displayCommentsAndDescriptionsOnPicture = function (element, picturesElement) {
    picturesElement.addEventListener('click', function (evt) {
      fillFullPictureWithDescriptions(element);
      if (evt.target.className === 'picture__img' || evt.target.className === 'picture') {
        openFullPicture(evt);
        var pictureComments = generateComments(window.pictureComments);
        window.commentsCollection = pictureComments.children;
        if (pictureComments.childElementCount <= CommentLoader.END) {
          window.currentCommentsLength = window.commentsLength;
          fullPictureSocial.querySelector('.social__comment-count').innerHTML = window.currentCommentsLength + ' из <span class="comments-count">' + window.commentsLength + '</span> комментариев';
          commentsList.appendChild(pictureComments);
          commentsLoader.classList.add('hidden');
        } else {
          commentsLoader.classList.remove('hidden');
          fullPictureSocial.querySelector('.social__comment-count').innerHTML = window.currentCommentsLength + ' из <span class="comments-count">' + window.commentsLength + '</span> комментариев';
          onCommentsLoader();
        }
        commentsLoader.addEventListener('click', onCommentsLoader);
      }
    }, true);
  };

  var generatePicturesSuccess = function (pictures) {
    var picturesFragment = document.createDocumentFragment();

    window.picturesCopy = pictures.slice();
    window.util.resetListofElements(picturesList, 'picture');
    pictures.forEach(function (element) {
      var picturesElement = transferPictureDescriptions(element);
      picturesFragment.appendChild(picturesElement);
      displayCommentsAndDescriptionsOnPicture(element, picturesElement);
    });
    window.gallery.picturesList.appendChild(picturesFragment);
    window.pictureFilters.classList.remove('img-filters--inactive');
  };

  window.download(generatePicturesSuccess, generatePicturesError);

  var generateMostDiscussedPictures = function () {
    window.util.resetListofElements(picturesList, 'picture');
    var picturesFragment = document.createDocumentFragment();

    window.picturesCopy.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    }).
     forEach(function (element) {
       var picturesElement = transferPictureDescriptions(element);
       picturesFragment.appendChild(picturesElement);
       displayCommentsAndDescriptionsOnPicture(element, picturesElement);
     });
    picturesList.appendChild(picturesFragment);
  };

  var generateRandomPictures = function () {
    window.util.resetListofElements(window.gallery.picturesList, 'picture');
    var picturesFragment = document.createDocumentFragment();
    var randomPictures = window.util.getArrayOfRandomIntegers(NUMBER_OF_RANDOM_PICTURES, 0, window.picturesCopy.length - 1);
    for (var i = 0; i < NUMBER_OF_RANDOM_PICTURES; i++) {
      var randomNumber = randomPictures[i];
      var picturesElement = transferPictureDescriptions(window.picturesCopy[randomNumber]);
      picturesFragment.appendChild(picturesElement);
      displayCommentsAndDescriptionsOnPicture(window.picturesCopy[randomNumber], picturesElement);
    }
    picturesList.appendChild(picturesFragment);
  };

  window.gallery = {
    picturesList: picturesList,
    body: body,
    main: main,
    generatePicturesError: generatePicturesError,
    generatePicturesSuccess: generatePicturesSuccess,
    generateMostDiscussedPictures: generateMostDiscussedPictures,
    generateRandomPictures: generateRandomPictures
  };

})();
