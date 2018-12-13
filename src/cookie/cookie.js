/*
 * @author guyeol, jeong
 * Copyright © 2018 guyeol_jeong. All rights reserved.
 */
var Cookie = (function () {
  const DEFAULT_EXPIRY_DATE = 365;

  return {
    /*
     * Set key-value pair into the Cookie as a JSON string.
     *
     * @public
     * @params {string, Objecet} key, value
     * @return {number} It returns negative number (-1) if the parameters isn't appropriate;
     *                  otherwise store data into the cookie and returns positive number (1)
     */
    set: function (key, value) {
      if (typeof key !== 'string' || typeof value === 'undefined') {
        console.error('Error in Cookie.set(), occured due to wrong parameters. '
                        + 'please check your parameters set right.');
        return -1;
      } else {
        var expires = new Date();
        expires.setDate(expires.getDate() + DEFAULT_EXPIRY_DATE);
        var cookies = key + '=' + JSON.stringify(value);
        cookies += ';expires=' + expires.toGMTString() + ';';
        document.cookie = cookies;
        return 1;
      }
    },
    /*
     * Get all the data stored in the cookie.
     *
     * @public
     * @return {Object|null} If the cookie isn't empty, returns the Object; otherwise returns null
     */
    get: function () {
      var cookies = document.cookie,
          value = cookies.match(new RegExp('(^| )' + 'history' + '=([^;]+)'));
      return (cookies !== '') ? JSON.parse(value[2]) : null;
    },

    /*
     * Delete cookie.
     * @public
     * @params {string} key
     */
    delete: function (key) {
      document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  };
})();

export {Cookie};