'use strict';

(function () {

  window.previewPictures = function () {
    var fullPicture = document.querySelector('.big-picture');
    var body = document.querySelector('body');
    var fullPictureImg = document.querySelector('.big-picture__img img');
    var picturePreviewCancelButton = document.querySelector('.big-picture__cancel');

    var openFullPicture = function (evt) {
      var smallPicture = evt.target;
      if (smallPicture.className === 'picture__img') {
        window.openPopup(fullPicture);
        body.setAttribute('class', 'modal-open');
        smallPicture.classList.add('active');
        var activeSmallPicture = document.querySelector('.active');
        fullPictureImg.setAttribute('src', activeSmallPicture.src);
        fullPictureImg.setAttribute('alt', activeSmallPicture.alt);
        smallPicture.classList.remove('active');
      }
    };

    var closeFullPicture = function () {
      body.removeAttribute('class');
      fullPictureImg.removeAttribute('src');
      fullPictureImg.removeAttribute('alt');
    };
    window.picturesList.addEventListener('click', function (evt) {
      openFullPicture(evt);
    }, true);

    // с enter пока не работает
    window.picturesList.addEventListener('keydown', function (evtkey, evt) {
      if (evtkey.keyCode === window.keycode.enter) {
        openFullPicture(evt);
      }
    }, true);

    picturePreviewCancelButton.addEventListener('click', function () {
      window.closePopup(fullPicture);
      closeFullPicture();
    });

    document.addEventListener('keydown', function (evtkey) {
      if (evtkey.keyCode === window.keycode.esc) {
        window.closePopup(fullPicture);
        closeFullPicture();
      }
    });

    window.onCloseEditorEnterPress = function (evt) {
      if (evt.keyCode === window.keycode.enter) {
        openFullPicture(evt);
        window.openPopup(fullPicture);
      }
    };

    window.onOpenEditorEscPress = function (evtkey) {
      if (evtkey.keyCode === window.keycode.esc) {
        window.closePopup(fullPicture);
        closeFullPicture();
      }
    };
  };

})();
