'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var pictureFilters = document.querySelector('.img-filters');
  var buttonPopular = document.querySelector('#filter-popular');
  var buttonRandom = document.querySelector('#filter-random');
  var buttonMostDiscussed = document.querySelector('#filter-discussed');

  var onPictureFiltersButton = function (evt) {
    var activeButton = evt.target;
    if (activeButton.classList.contains('img-filters__button')) {
      var lastClickedButton = document.querySelector('.img-filters__button--active');
      lastClickedButton.classList.remove('img-filters__button--active');
      activeButton.classList.add('img-filters__button--active');
    }
  };

  pictureFilters.addEventListener('click', onPictureFiltersButton, true);

  buttonPopular.addEventListener('click', function () {
    window.download.download(window.util.debounce(window.gallery.generatePicturesSuccess, DEBOUNCE_INTERVAL), window.gallery.generatePicturesError);
  });

  buttonMostDiscussed.addEventListener('click', function () {
    window.download.download(window.util.debounce(window.gallery.generateMostDiscussedPictures, DEBOUNCE_INTERVAL), window.gallery.generatePicturesError);
  });

  buttonRandom.addEventListener('click', function () {
    window.download.download(window.util.debounce(window.gallery.generateRandomPictures, DEBOUNCE_INTERVAL), window.gallery.generatePicturesError);
  });

  window.filters = {
    pictureFilters: pictureFilters
  };
})();
