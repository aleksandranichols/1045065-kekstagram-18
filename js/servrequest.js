'use strict';

(function () {
  window.downloadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/kekstagram/data';
    var SUCCESS_CODE = 200;
    var METHOD_GET = 'GET';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(JSON.parse(xhr.responseText));
      } else {
        onError('Go and fix this: ' + xhr.status + ' ' + xhr.responseText);
      }
    });
    xhr.open(METHOD_GET, URL);
    xhr.send();
  };
})();
