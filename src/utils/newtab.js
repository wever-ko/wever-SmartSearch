/*
 * @Author Guyeol, Jeong
 * Copyright © 2018 guyeol_jeong. All rights reserved.
 */
var newTab = (function() {
  /*
   * @private
   */
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
      console.log('error in url prefix');
    }
  }

  function setQuery(query) {
    URL._query = query;
  }

  return {
    /*
     * @public
     * @param {Object} args
     * @return {NewTab} this
     */
    create: function(args = {}) {
      if (typeof args !== undefined) {
        setPrefix(args.site);
        setQuery(args.query);
      } else {
        console.log('invalid parameters');
      }

      return this;
    },
    /*
     * @public
     * @return {NewTab}
     */
    open: function() {
      window.open(get());

      return this;
    }
  };
})();

export {NewTab};