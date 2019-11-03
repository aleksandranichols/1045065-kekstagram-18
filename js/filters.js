'use strict';

(function () {
  window.pictureFilters = document.querySelector('.img-filters');
  var buttonPopular = document.querySelector('#filter-popular');
  var buttonRandom = document.querySelector('#filter-random');
  var buttonMostDiscussed = document.querySelector('#filter-discussed');
  var DEBOUNCE_INTERVAL = 500;

  var onPictureFiltersButton = function (evt) {
    var activeButton = evt.target;
    if (activeButton.classList.contains('img-filters__button')) {
      var lastClickedButton = document.querySelector('.img-filters__button--active');
      lastClickedButton.classList.remove('img-filters__button--active');
      activeButton.classList.add('img-filters__button--active');
    }
  };

  window.pictureFilters.addEventListener('click', onPictureFiltersButton, true);

  window.pictureFilters.addEventListener('keydown', function (evtkey, evt) {
    var activeButton = evt.target;
    if (evtkey.keyCode === window.keycode.enter && activeButton.classList.contains('img-filters__button')) {
      activeButton.classList.add('img-filters__button--active');
    }
  }, true);

  buttonPopular.addEventListener('click', function () {
    window.downloadData(window.debounce(window.generatePicturesSuccess, DEBOUNCE_INTERVAL), window.generatePicturesError);
  });

  buttonPopular.addEventListener('keydown', function (evtkey) {
    evtkey.preventDefault();
    if (evtkey.keyCode === window.keycode.enter) {
      window.downloadData(window.debounce(window.generatePicturesSuccess, DEBOUNCE_INTERVAL), window.generatePicturesError);
    }
  });

  buttonMostDiscussed.addEventListener('click', function () {
    window.downloadData(window.debounce(window.generateMostDiscussedPictures, DEBOUNCE_INTERVAL), window.generatePicturesError);
  });

  buttonMostDiscussed.addEventListener('keydown', function (evtkey) {
    evtkey.preventDefault();
    if (evtkey.keyCode === window.keycode.enter) {
      window.downloadData(window.debounce(window.generateMostDiscussedPictures, DEBOUNCE_INTERVAL), window.generatePicturesError);
    }
  });

  buttonRandom.addEventListener('click', function () {
    window.downloadData(window.debounce(window.generateRandomPictures, DEBOUNCE_INTERVAL), window.generatePicturesError);
  });

  buttonRandom.addEventListener('keydown', function (evtkey) {
    evtkey.preventDefault();
    if (evtkey.keyCode === window.keycode.enter) {
      window.downloadData(window.debounce(window.generateRandomPictures, DEBOUNCE_INTERVAL), window.generatePicturesError);
    }
  });

  window.resetGallery = function () {
    var lastElement = window.picturesList.lastElementChild;
    while (lastElement.className === 'picture') {
      lastElement.remove();
      lastElement = window.picturesList.lastElementChild;
    }
  };

})();
