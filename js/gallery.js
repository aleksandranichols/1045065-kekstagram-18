'use strict';

// галерия сайта

(function () {
var picturesList = document.querySelector('.pictures');
var templateElement = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();
// var fullPicture = document.querySelector('.big-picture');
var fullPictureImg = document.querySelector('.big-picture__img img');
var commentsList = document.querySelector('.social__comments');
var socialCommentsElement = document.querySelector('.social__comment');
var commentsCount = document.querySelector('.comments-count');
var likesCount = document.querySelector('.likes-count');
var socialCaption = document.querySelector('.social__caption');
var socialCommentsCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
var OBJECTS_NUMBER = 25;
var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Артем', 'Саша', 'Дима', 'Марина', 'Даша'];

var generateSocialComments = function () {
  var commentsArray = [];
  var RANDOM_COMMENTS = [];
  for (var i = 0; i < window.getRandomNumberInRange(1, COMMENTS.length); i++) {
    RANDOM_COMMENTS.push(COMMENTS[i]);
  }
  for (var j = 0; j < RANDOM_COMMENTS.length; j++) {
    commentsArray.push({
      avatar: 'img/avatar-' + (window.getRandomNumberInRange(1, 6)) + '.svg',
      message: RANDOM_COMMENTS[j],
      name: NAMES[(window.getRandomNumberInRange(0, NAMES.length - 1))]
    });
  }
  return commentsArray;
};

var generatePictureDescriptions = function () {
  var picturesArray = [];
  for (var i = 0; i < OBJECTS_NUMBER; i++) {
    picturesArray.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Описание',
      likes: window.getRandomNumberInRange(15, 200),
      comments: generateSocialComments()
    });
  }
  return picturesArray;
};

var transferPictureDescriptions = function (picturesElement) {
  var pictureElement = templateElement.cloneNode(true);
  pictureElement.querySelector('.picture__img').setAttribute('src', picturesElement.url);
  pictureElement.querySelector('.picture__likes').textContent = picturesElement.likes;
  pictureElement.querySelector('.picture__comments').textContent = picturesElement.comments.length;
  return pictureElement;
};

var pushPictureDescriptions = function () {
  for (var i = 0; i < OBJECTS_NUMBER; i++) {
    fragment.appendChild(transferPictureDescriptions(generatePictureDescriptions()[i]));
  }
};

pushPictureDescriptions();
picturesList.appendChild(fragment);

var transferSocialComments = function (commentsElement) {
  var commentElement = socialCommentsElement.cloneNode(true);
  commentElement.querySelector('.social__picture').setAttribute('src', commentsElement.avatar);
  commentElement.querySelector('.social__picture').setAttribute('alt', commentsElement.name);
  commentElement.querySelector('.social__text').textContent = commentsElement.message;
  return commentElement;
};

var pushSocialComments = function () {
  var comments = generatePictureDescriptions()[0].comments;
  for (var i = 0; i < comments.length; i++) {
    commentsList.appendChild(transferSocialComments(comments[i]));
  }
};

pushSocialComments();

var fillFirstPictureElementWithDescription = function (firstElementArr) {
  likesCount.textContent = firstElementArr.likes;
  fullPictureImg.setAttribute('src', firstElementArr.url);
  commentsCount.textContent = 1;
  socialCaption.textContent = firstElementArr.description;
};

fillFirstPictureElementWithDescription(generatePictureDescriptions()[0]);
socialCommentsCount.classList.add('visually-hidden');
commentsLoader.classList.add('visually-hidden');
})();
