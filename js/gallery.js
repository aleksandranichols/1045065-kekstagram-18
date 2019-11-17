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
  var commentsLength;
  var currentCommentsLength;
  var newCurrentCommentsLength;
  var commentsCollection;
  var picturesCopy;
  var pictureComments;

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
    currentCommentsLength = CommentLoader.END;
    commentsList.innerHTML = '';
    body.setAttribute('class', 'modal-open');
    fullPictureImg.setAttribute('src', smallPicture.src);
    fullPictureImg.setAttribute('alt', smallPicture.alt);
  };

  var closeFullPicture = function () {
    body.removeAttribute('class');
    fullPictureImg.removeAttribute('src');
    fullPictureImg.removeAttribute('alt');
    if (commentsCollection) {
      while (commentsCollection.length !== 0) {
        commentsCollection[0].parentNode.removeChild(commentsCollection[0]);
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
    window.util.errorButtonUpload.remove();

    window.util.errorButtonTryAgain.addEventListener('click', function () {
      window.download.download(window.gallery.generatePicturesSuccess, window.gallery.generatePicturesError);
    });
    window.util.errorButtonTryAgain.addEventListener('keydown', function (evtkey) {
      if (evtkey.keycode === window.util.keycode.ENTER) {
        window.download.download(window.gallery.generatePicturesSuccess, window.gallery.generatePicturesError);
      }
    });
  };


  var onCommentsLoader = function () {
    if (commentsCollection.length !== 0 && commentsCollection.length > CommentLoader.END) {
      fullPictureSocial.querySelector('.social__comment-count').innerHTML = newCurrentCommentsLength + ' из <span class="comments-count">' + commentsLength + '</span> комментариев';
      for (var i = CommentLoader.START; i < CommentLoader.END; i++) {
        commentsList.append(commentsCollection[0]);
      }
      currentCommentsLength = newCurrentCommentsLength;
      newCurrentCommentsLength = currentCommentsLength + CommentLoader.END;
    } else {
      currentCommentsLength += commentsCollection.length;
      fullPictureSocial.querySelector('.social__comment-count').innerHTML = currentCommentsLength + ' из <span class="comments-count">' + commentsLength + '</span> комментариев';
      while (commentsCollection.length !== 0) {
        commentsList.append(commentsCollection[0]);
      }
      commentsLoader.classList.add('hidden');
    }
  };

  var fillFullPictureWithDescriptions = function (element) {
    currentCommentsLength = CommentLoader.END;
    newCurrentCommentsLength = CommentLoader.END;
    pictureComments = element.comments;
    commentsLength = element.comments.length;
    var likes = element.likes;
    var description = element.description;
    fullPictureSocial.querySelector('.likes-count').textContent = likes;
    fullPictureSocial.querySelector('.social__caption').textContent = description;
    fullPictureSocial.querySelector('.comments-count').textContent = commentsLength;
  };

  var displayCommentsAndDescriptionsOnPicture = function (element, picturesElement) {
    picturesElement.addEventListener('click', function (evt) {
      fillFullPictureWithDescriptions(element);
      if (evt.target.className === 'picture__img' || evt.target.className === 'picture') {
        openFullPicture(evt);
        var picturesComments = generateComments(pictureComments);
        commentsCollection = picturesComments.children;
        if (picturesComments.childElementCount <= CommentLoader.END) {
          currentCommentsLength = commentsLength;
          fullPictureSocial.querySelector('.social__comment-count').innerHTML = currentCommentsLength + ' из <span class="comments-count">' + commentsLength + '</span> комментариев';
          commentsList.appendChild(picturesComments);
          commentsLoader.classList.add('hidden');
        } else {
          commentsLoader.classList.remove('hidden');
          fullPictureSocial.querySelector('.social__comment-count').innerHTML = currentCommentsLength + ' из <span class="comments-count">' + commentsLength + '</span> комментариев';
          onCommentsLoader();
        }
        commentsLoader.addEventListener('click', onCommentsLoader);
      }
    }, true);
  };

  var generatePicturesSuccess = function (pictures) {
    var picturesFragment = document.createDocumentFragment();

    picturesCopy = pictures.slice();
    window.util.resetListofElements(picturesList, 'picture');
    pictures.forEach(function (element) {
      var picturesElement = transferPictureDescriptions(element);
      picturesFragment.appendChild(picturesElement);
      displayCommentsAndDescriptionsOnPicture(element, picturesElement);
    });
    window.gallery.picturesList.appendChild(picturesFragment);
    window.filters.pictureFilters.classList.remove('img-filters--inactive');
  };

  window.download.download(generatePicturesSuccess, generatePicturesError);

  var generateMostDiscussedPictures = function () {
    window.util.resetListofElements(picturesList, 'picture');
    var picturesFragment = document.createDocumentFragment();

    picturesCopy.sort(function (a, b) {
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
    var randomPictures = window.util.getArrayOfRandomIntegers(NUMBER_OF_RANDOM_PICTURES, 0, picturesCopy.length - 1);
    for (var i = 0; i < NUMBER_OF_RANDOM_PICTURES; i++) {
      var randomNumber = randomPictures[i];
      var picturesElement = transferPictureDescriptions(picturesCopy[randomNumber]);
      picturesFragment.appendChild(picturesElement);
      displayCommentsAndDescriptionsOnPicture(picturesCopy[randomNumber], picturesElement);
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
