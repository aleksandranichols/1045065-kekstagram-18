'use strict';

(function () {
  window.uploadData = function (onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    var SUCCESS_CODE = 200;

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess();
      } else {
        onError('Go and fix this: ' + xhr.status + ' ' + xhr.responseText);
      }
    });
    xhr.open(window.method.post, window.server.upload);
    xhr.send(data);
  };
})();
