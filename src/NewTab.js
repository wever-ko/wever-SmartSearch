var NewTab = (function(){
    var URL = {
      protocol: 'http://',
      prefix: '',
      query: ''
    };

    /*
     * Private Functions.
     */
    function getURL(){
      return URL.protocol + URL.prefix + URL.query;
    }

    function setPrefix(name) {
      if (name === 'naver') {
        URL.prefix = 'www.naver.com/search.naver?query=';
      }
      else if (name === 'google') {
        URL.prefix = 'www.google.com/search?q=';
      }
      else if (name === 'youtube') {
        URL.prefix = 'www.youtube.com/results?search_query=';
      }
    }

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
        setPrefix(params.site);
        URL.query = params.query;
      }
      return (this);
    }

    /*
     * open() function opens a new window with query.
     */
    function open() {
      window.open(getURL());
      return (this);
    }
})();