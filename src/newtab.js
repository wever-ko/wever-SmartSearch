/*
 * @Author Guyeol, Jeong
 * Copyright © 2018 guyeol_jeong. All rights reserved.
 */

var newTab = (function(){
    /*
     * @Private
     * URL object that contains properties and getter, setter.
     */
    const URL = {
      protocol: 'http://',
      _prefix: '',
      _query: '',
      get toString () {
        return this.protocol + this._prefix + this._query + '';
      },
      set prefix(site) {
        if (site === 'naver') {
          this._prefix = 'www.naver.com/search.naver?query=';
        }
        else if (site === 'google') {
          this._prefix = 'www.google.com/search?q=';
        }
        else if (site === 'youtube') {
          this._prefix = 'www.youtube.com/results?search_query=';
        }
        else {
          console.log('error in url prefix');
        }
      },
      set query(query) {
        this._query = query;
      }
    };

    /*
     * @Public Functions which are revealing to USER.
     * method chaining rule is applied to all functions.
     */
    return ({
      create: create,
      open: open
    });

    /*
     * create() function creates object with specific informations.
     * It returns object itself.
     */
    function create(params) {
      if (typeof params !== undefined) {
        URL.prefix = params.site;
        URL.query = params.query;
        return this;
      }
      else {
        console.log('invalid parameters');
      }
    }
    /*
     * open() function opens a new window with query.
     */
    function open() {
      window.open(URL.toString);
      return this;
    }
})();