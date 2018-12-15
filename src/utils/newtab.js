/*
 * @Author Guyeol, Jeong
 * Copyright © 2018 guyeol_jeong. All rights reserved.
 */
var NewTab = (function() {
  let URL = {
    _protocol: 'http://',
    _prefix: '',
    _query: ''
  };

  function get() {
    return URL._protocol + URL._prefix + URL._query + '';
  }

  function setPrefix(site) {
    if (site === 'naver') {
      URL._prefix = 'search.naver.com/search.naver?query=';
    } else if (site === 'google') {
      URL._prefix = 'www.google.com/search?q=';
    } else if (site === 'youtube') {
      URL._prefix = 'www.youtube.com/results?search_query=';
    } else {
      console.error('error in url prefix');
    }
  }

  function setQuery(query) {
    URL._query = query;
  }

  /*
   * @private
   * @param {Object} args
   * @return {number} neg|pos
   */
  function create(args = {}) {
    if (typeof args !== undefined) {
      setPrefix(args.site);
      setQuery(args.query);
      return 1;
    } else {
      console.error('invalid parameters');
      return -1;
    }
  }

  return {
    /*
     * @public
     * @return {NewTab}
     */
    open: function(params) {
      if (create(params)) {
        window.open(get());
      } else {
        return this;
      }
    }
  };
})();

export {NewTab};