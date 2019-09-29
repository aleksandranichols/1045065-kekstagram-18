'use strict';

var picturesList = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
var templateElement = document.querySelector('#picture').content.querySelector('.picture');
// var fullPicture = document.querySelector('.big-picture');
var OBJECTS_NUMBER = 25;
var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

// fullPicture.classList.remove('hidden');

var generateComments = function () {
  var commentsObject = {};
  var commentsArray = [];
  for (var i = 0; i < comments.length; i++) {
    commentsObject[i] = {
      comment: comments[i]
    };
    commentsArray.push(commentsObject[i]);
  }
  return commentsArray;
};

var randomButUniqueNumbers = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var prepareDescriptions = function () {
  var picturesArray = [];
  var picturesObject = {};
  for (var i = 0; i < OBJECTS_NUMBER; i++) {
    picturesObject[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'Description',
      likes: randomButUniqueNumbers(15, 200),
      comments: generateComments()[Math.floor(Math.random() * comments.length)].comment
    };
    picturesArray.push(picturesObject[i]);
  }
  return picturesArray;
};

var transferDescriptions = function (picturesElement) {
  var pictureElement = templateElement.cloneNode(true);
  pictureElement.querySelector('.picture__img').setAttribute('src', picturesElement.url);
  pictureElement.querySelector('.picture__likes').textContent = picturesElement.likes;
  pictureElement.querySelector('.picture__comments').textContent = picturesElement.comments.length;
  return pictureElement;
};

var pushDescriptions = function () {
  for (var i = 0; i < OBJECTS_NUMBER; i++) {
    fragment.appendChild(transferDescriptions(prepareDescriptions()[i]));
  }
};

pushDescriptions();
picturesList.appendChild(fragment);
