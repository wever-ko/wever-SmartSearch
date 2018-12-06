/*
 * @author guyeol, jeong
 * Copyright © 2018 guyeol_jeong. All rights reserved.
 */
var weverCookie = (function () {
    return {
        /*
         * Set Function :
         * Store the parameters in the cookie. 'site' is the key and 'query' is the value.
         */
        set: function (site, query, day) {
            var expires = new Date();
            expires.setDate(expires.getDate() + day);
            var cookies = site + '=' + JSON.stringify(query) + ';path=/';

            if (day !== 0) {
                cookies += ';expires=' + expires.toGMTString() + ';';
            }
            document.cookie = cookies;
        },
        /*
         * Get Function :
         * Returns the value corresponding to the key value that was input in the parameter.
         * Returns null if there is no key or no value.
         */
        get: function (key) {
            var site = key + '=',
                cookies = document.cookie,
                s = cookies.indexOf(site),
                c = '';

            if (s !== -1) {
                s += site.length;
                var e = cookies.indexOf(';', s);
                if (e === -1) {
                    e = cookies.length;
                }
                else {
                    return null;
                }
                c = cookies.substring(s, e);
            }
            else {
                return null;
            }
            return unescape(c);
        },
        delete: function (key) {
            document.cookie = key + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    };
})();
