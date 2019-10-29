'use strict';

(function() {
  var xhr = new XMLHttpRequest;
  xhr.addEventListener('load', function() {
    window.generatePictures(JSON.parse(xhr.responseText));
    window.previewPictures();
  });
  xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
  xhr.send();
})();
