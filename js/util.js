'use strict';

(function () {
window.getRandomNumberInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
})();
