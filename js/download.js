'use strict';

(function () {
  window.downloadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var SUCCESS_CODE = 200;

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(JSON.parse(xhr.responseText));
      } else {
        onError('Go and fix this: ' + xhr.status + ' ' + xhr.responseText);
      }
    });
    xhr.open(window.method.get, window.server.download);
    xhr.send();
  };
})();
