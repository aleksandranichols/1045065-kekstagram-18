'use strict';

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

// fullPicture.classList.remove('hidden');

var getRandomNumberInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var generateSocialComments = function () {
  var commentsArray = [];
  var RANDOM_COMMENTS = [];
  for (var i = 0; i < getRandomNumberInRange(1, COMMENTS.length); i++) {
    RANDOM_COMMENTS.push(COMMENTS[i]);
  }
  for (var j = 0; j < RANDOM_COMMENTS.length; j++) {
    commentsArray.push({
      avatar: 'img/avatar-' + (getRandomNumberInRange(1, 6)) + '.svg',
      message: RANDOM_COMMENTS[j],
      name: NAMES[(getRandomNumberInRange(0, NAMES.length - 1))]
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
      likes: getRandomNumberInRange(15, 200),
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

var fillFirstPictureElementWithDescription = function (firstElementArr) { // в задании пока просили первый элемент, поэтому и название такое. Я считаю, что функцию надо называть по тому, что она делает.
  likesCount.textContent = firstElementArr.likes;
  fullPictureImg.setAttribute('src', firstElementArr.url);
  commentsCount.textContent = 1;
  socialCaption.textContent = firstElementArr.description;
};

fillFirstPictureElementWithDescription(generatePictureDescriptions()[0]);
socialCommentsCount.classList.add('visually-hidden');
commentsLoader.classList.add('visually-hidden');

// module4-task2
// part1

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

//  part2

var effects = document.querySelector('.effects');
var effectSliderButton = document.querySelector('.effect-level__pin');
var effectLevel = document.querySelector('.effect-level');
var effectSliderButtonValue = document.querySelector('.effect-level__value');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var effectPictureUploadPreview = document.querySelector('.img-upload__preview');

// смена фильтров

var onEffectRadioButton = function () {
  var effectActiveRadioButton = document.querySelector('input[name=effect]:checked');
  effectPictureUploadPreview.setAttribute('style', 'filter: 0');
  effectSliderButton.style.left = '100%';
  effectLevelDepth.style.width = '100%';
  effectLevel.classList.remove('hidden');
  effectPictureUploadPreview.className = 'img-upload__preview';
  effectPictureUploadPreview.classList.add('effects__preview--' + effectActiveRadioButton.value);
  if (effectActiveRadioButton.value === 'none') {
    effectLevel.classList.add('hidden');
  }
};

effectLevel.classList.add('hidden');
effects.addEventListener('click', onEffectRadioButton, true);

// изменение насыщенности фильтров при перемещении пина

effectSliderButton.addEventListener('mousedown', function (evt) {
  var SLIDER_START = 0;
  var SLIDER_END = 453;
  var PERCENTAGE_MAX = 100;
  var BLUREFFECT_MAX = 3;
  var BRIGTNESSEFFECT_MAX = 3;

  evt.preventDefault();
  var startX = evt.clientX;
  var onMouseMove = function (evtMove) {
    evtMove.preventDefault();
    var shiftX = startX - evtMove.clientX;
    var clamp = function (num) {
      if (num <= SLIDER_START) {
        num = SLIDER_START;
      } else if (num >= SLIDER_END) {
        num = SLIDER_END;
      }
      return num;
    };

    startX = evtMove.clientX;
    effectSliderButtonValue.value = effectSliderButton.offsetLeft;
    effectLevelDepth.style.width = (clamp(parseInt(effectLevelDepth.offsetWidth, 10)) - shiftX) + 'px'; // хз как лучше ограничить
    effectSliderButton.style.left = (clamp(parseInt(effectSliderButton.offsetLeft, 10)) - shiftX) + 'px';

    var effectActiveRadioButton = document.querySelector('input[name=effect]:checked');
    var effectCurrent = document.querySelector('.img-upload__preview.effects__preview--' + effectActiveRadioButton.value);
    var filtersObject = {
      none: 'none',
      marvin: 'invert(' + effectSliderButton.offsetLeft * PERCENTAGE_MAX / SLIDER_END + '%' + ')',
      chrome: 'grayscale(' + effectSliderButton.offsetLeft / SLIDER_END + ')',
      sepia: 'sepia(' + effectSliderButton.offsetLeft / SLIDER_END + ')',
      phobos: 'blur(' + effectSliderButton.offsetLeft * BLUREFFECT_MAX / SLIDER_END + 'px' + ')',
      heat: 'brightness(' + effectSliderButton.offsetLeft * BRIGTNESSEFFECT_MAX / SLIDER_END + ')'
    };
    effectCurrent.style.filter = filtersObject[effectActiveRadioButton.value];
  };

  var onMouseUp = function (evtUp) {
    evtUp.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});

// валидация хэш-тегов

var hashtagInput = document.querySelector('.text__hashtags');
var pictureSubmitButton = document.querySelector('.img-upload__submit');
var HASHTAG_LENGTH = 20;

pictureSubmitButton.addEventListener('click', function () {
  var createArrayOutOfString = function (str) {
    var resArray = str.split(' ');
    return resArray;
  };

  var getInvalidities = function (invalidities) {
    return invalidities.join('\n');
  };

  var checkValidity = function (input) {
    var invalidities = [];
    var addInvalidity = function (message) {
      invalidities.push(message);
    };

    if (!input.match(/#[А-Яа-я0-9-_]+/)) {
      addInvalidity('Your hashtags suck');
    }

    if (!input[0].match(/#/)) {
      addInvalidity('Hashtags must start with #');
    }

    if (input.length > HASHTAG_LENGTH) {
      addInvalidity('Hashtags must be less than 20 characters');
    }

    return getInvalidities(invalidities);
  };

  var hashtagsArray = createArrayOutOfString(hashtagInput.value.toString());
  for (var i = 0; i < hashtagsArray.length; i++) {
    var inputCustomValidation = [];
    var customValidityMessage = [];
    inputCustomValidation.push(checkValidity(hashtagsArray[i]));
    customValidityMessage.push(inputCustomValidation);
    hashtagInput.setCustomValidity(customValidityMessage);
  }
});
