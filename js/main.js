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

// fullPicture.classList.remove('hidden');

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

//module4-task2
//part1

var uploadPictureInput = document.querySelector('#upload-file');
var pictureEditor = document.querySelector('.img-upload__overlay');
var pictureEditorClose = document.querySelector('#upload-cancel');
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var openPopup = function () {
  pictureEditor.classList.remove('hidden');
  document.addEventListener('keydown', onOpenEditorEscPress);
  document.removeEventListener('keydown', onCloseEditorEnterPress);
};

var closePopup = function () {
  pictureEditor.classList.add('hidden');
  document.addEventListener('keydown', onCloseEditorEnterPress);
  document.removeEventListener('keydown', onOpenEditorEscPress);
};

var onOpenEditorEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
  closePopup();
  }
};

var onCloseEditorEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
  openPopup();
  }
};

uploadPictureInput.addEventListener('change', function () {
  openPopup();
});

pictureEditorClose.addEventListener('click', function () {
  closePopup();
});

pictureEditorClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
  closePopup();
  }
});

//part2

var effects = document.querySelector('.effects');
var effectSliderButton = document.querySelector('.effect-level__pin');
var effectSliderButtonValue = document.querySelector('.effect-level__value');
var effectPictureUploadPreview = document.querySelector('.img-upload__preview');
var effectActiveRadioButton = document.querySelector('input[name=effect]:checked');

var onEffectRadioButton = function () {
  var effectActiveRadioButton = document.querySelector('input[name=effect]:checked');
  effectPictureUploadPreview.className = 'img-upload__preview'; // не нашла варианта лучше обнулять классы
  effectPictureUploadPreview.classList.add('effects__preview--' + effectActiveRadioButton.value);
};

effects.addEventListener('click', onEffectRadioButton, true);

var effectLine = document.querySelector('.effect-level__line');

effectSliderButton.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startX = effectSliderButton.offsetLeft; // узнаю координату кнопки относительно effectLine

var onMouseMove = function (evtMove) {
  evtMove.preventDefault();
  var shiftX = startX - evtMove.offsetX; // узнаем на сколько сдвинулась кнопка
  effectSliderButton.style.left = (startX - shiftX) + 'px';
  console.log('move');
};

var onMouseUp = function (evtUp) {
  evtUp.preventDefault();
  effectLine.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
  console.log('up');
};

effectLine.addEventListener('mousemove', onMouseMove);

document.addEventListener('mouseup', onMouseUp);
});


//part 3

var validity = document.querySelector('.text__hashtags');
