/**
 * @author : heeveloper <zaqq1414@gmail.com>
 */

 import {cookie} from './cookie.js';
 import {DLinkedList} from './utils/DLinkedList.js';

 var cookieModule = (function (){
 	/**
 	 * @private
 	 * @variable
 	 */
 	 var NaverCookieList = new DLinkedList();
 	 var GoogleCookieList = new DLinkedList();
 	 var YoutubeCookieList = new DLinkedList();

 	 // 1. cookie.js 사용해서 전부 가져와서 list에 가져오기
 	 // 2. 새로운 쿠키 리스트에 넣기
 	 // 3. 리스트에서 쿠키 삭제
 	 // 4. 특정 사이트에서 리스트 전부 반환(String으로?)


 })();

 export {cookieModule};