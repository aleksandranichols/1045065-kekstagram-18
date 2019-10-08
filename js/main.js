'use strict';

var picturesList = document.querySelector('.pictures');
var templateElement = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();
var fullPicture = document.querySelector('.big-picture');
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

fullPicture.classList.remove('hidden');

var generateSocialComments = function () {
  var commentsArray = [];
  for (var i = 0; i < COMMENTS.length; i++) {
    commentsArray.push({
      avatar: 'img/avatar-' + (getRandomNumberInRange(1, 6)) + '.svg',
      message: COMMENTS[i],
      name: NAMES[(getRandomNumberInRange(0, NAMES.length))]
    });
  }
  return commentsArray;
};

var getRandomNumberInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var generatePictureDescriptions = function () {
  var picturesArray = [];
  for (var i = 0; i < OBJECTS_NUMBER; i++) {
    picturesArray.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Описание',
      likes: getRandomNumberInRange(15, 200),
      comments: generateSocialComments()[Math.floor(Math.random() * COMMENTS.length)]
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

commentsList.appendChild(transferSocialComments(generateSocialComments()[0]));

var fillFirstPictureElementWithDescription = function (firstElementArr) {
  likesCount.textContent = firstElementArr.likes;
  fullPictureImg.setAttribute('src', firstElementArr.url);
  commentsCount.textContent = 1;
  socialCaption.textContent = firstElementArr.description;
};

fillFirstPictureElementWithDescription(generatePictureDescriptions()[0]);
socialCommentsCount.classList.add('visually-hidden');
commentsLoader.classList.add('visually-hidden');
