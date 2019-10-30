'use strict';

(function () {
  window.downloadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(JSON.parse(xhr.responseText));
      } else {
        onError('Go and fix this: ' + xhr.status + ' ' + xhr.responseText);
      }
    });
    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
    xhr.send();
  };
})();
