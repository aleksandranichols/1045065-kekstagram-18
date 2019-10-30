'use strict';

// галерия сайта

(function () {
  window.picturesList = document.querySelector('.pictures');
  var body = document.querySelector('body');
  var templateElement = document.querySelector('#picture').content.querySelector('.picture');
  var commentsList = document.querySelector('.social__comments');
  var socialCommentsElement = document.querySelector('.social__comment');
  var commentsCount = document.querySelector('.comments-count');
  var likesCount = document.querySelector('.likes-count');
  var socialCaption = document.querySelector('.social__caption');
  var socialCommentsCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  var transferPictureDescriptions = function (picturesElement) {
    var pictureElement = templateElement.cloneNode(true);
    pictureElement.querySelector('.picture__img').setAttribute('src', picturesElement.url);
    pictureElement.querySelector('.picture__likes').textContent = picturesElement.likes;
    pictureElement.querySelector('.picture__comments').textContent = picturesElement.comments.length;
    return pictureElement;
  };

  var transferSocialComments = function (commentsElement) {
    var commentElement = socialCommentsElement.cloneNode(true);
    commentElement.querySelector('.social__comment .social__picture').setAttribute('src', commentsElement.avatar);
    commentElement.querySelector('.social__comment .social__picture').setAttribute('alt', commentsElement.name);
    commentElement.querySelector('.social__comment .social__text').textContent = commentsElement.message;
    return commentElement;
  };

  window.generatePictures = function(pictures) {
    var picturesFragment = document.createDocumentFragment();
    var commentsFragment = document.createDocumentFragment();
    var arr = [];
    var arr1 = [];
    for (var i = 0; i < pictures.length; i++) {

    arr.push(pictures[i].comments);
    arr1.push(pictures[i].url);
    console.log(arr1);

    picturesFragment.appendChild(transferPictureDescriptions(pictures[i]));

    picturesFragment.children[i].addEventListener('click', function(evt) {
      var x = evt.target.src.split('/');
      var y = x[x.length - 1].split('.')[0] - 1;
      console.log(y);

      commentsList.appendChild(generateComments(arr[y]));
      arr[y] = '';
    }, true);
  }
  console.log(arr);

    picturesList.appendChild(picturesFragment);
  }

  window.generateComments = function(comments) {
    var commentsFragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      commentsFragment.appendChild(transferSocialComments(comments[i]));
    }
    return commentsFragment;
  }

    socialCommentsCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');

})();
