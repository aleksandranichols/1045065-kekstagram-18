'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var download = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onSuccess(JSON.parse(xhr.responseText));
      } else {
        onError('Go and fix this: ' + xhr.status + ' ' + xhr.responseText);
      }
    });
    xhr.open(window.util.method.GET, window.util.server.DOWNLOAD);
    xhr.send();
  };

  window.download = {
    download: download
  };
})();
