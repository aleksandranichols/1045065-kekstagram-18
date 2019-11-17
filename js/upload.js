'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var upload = function (onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess();
      } else {
        onError('Go and fix this: ' + xhr.status + ' ' + xhr.responseText);
      }
    });
    xhr.open(window.util.method.POST, window.util.server.UPLOAD);
    xhr.send(data);
  };
  window.upload = {
    upload: upload
  };
})();
