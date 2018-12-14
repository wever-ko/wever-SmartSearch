/*
 * @author : heeveloper <zaqq1414@gmail.com>
 * Copyright © 2018 heeveloper. All rights reserved.
 */

 import {Cookie} from './cookie';

 var History = (function (cookie){
 	/*
 	 * @private
 	 * @variable
 	 */
 	 var cache = {
 	 	naver : [],
 	 	google : [],
 	 	youtube : []
 	 };

 	 /*
 	  * Initialize cookie and load on the cache.
 	  *
 	  * @private
 	  */
 	 function init(){
 	 	if (cookie.get() == null) {
 	 		cookie.set('history', cache);
 	 	}
 	 	else {
 	 		cache = cookie.get();
 	 	}
 	 }
 	 init();
 	 
 	 return {
 	 	/*
 	 	 * Add a searching data to the cache and update the cookie.
 	 	 *
 	 	 * @public
 	 	 * @params {Object} params
 	 	 * @params {String, Object} params.site, params.query
 	 	 *
 	 	 */
 	 	add : function(params) {
 	 		const site = params.site,
 	 		      query = params.query;
 	 		      //timestamp = params.timestamp;
 	 		if (cache[site].length == 30) {
 	 			cache[site].pop();
 	 		}
 	 		//query.timestamp = params.timestamp;
 	 		cache[site].unshift(JSON.stringify(query));
 	 		cookie.set('history', cache);
 	 		console.log(cookie.get());
 	 	},

 	 	/*
 	 	 * Delete the given value from the cache and update the cookie.
 	 	 * 
 	 	 * @public
 	 	 * @params {String, Numbers} site, idx
 	 	 */
 	 	delete : function(site, idx) {
 	 		delete cache[site][idx];
 	 		for (let i = idx; i < cache[site].length - 1; i ++) {
 	 			cache[site][i] = cache[site][i + 1];
 	 		}
 	 		cache[site].pop();
 	 		cookie.set('history', cache);

 	 	},

 	 	/*
 	 	 * Delete all history of the given website.
 	 	 * 
 	 	 * @public
 	 	 * @params {String} site
 	 	 */
 	 	deleteAll : function(site) {
 	 		cache[site] = [];
 	 		cookie.set('history', cache);
 	 	},

 	 	/*
 	 	 * Return history of the given site.
 	 	 *
 	 	 * @public
 	 	 * @return {Array | null} If the history is empty, return null.
 	 	 */
 	 	getAll : function(site) {
 	 		return (cache[site].length == 0) ? null : cache[site];
 	 	}
 	 };

 })(Cookie);

 export {History};