/**
 * @author guyeol, jeong
 * Copyright © 2018 guyeol_jeong. All rights reserved.
 */
var GoogleQuery = function (obj) {
	var gQuery;

	for (var ob in obj) {
		// 정의되었지만 비어있거나 정의되지 않았을 때,
		if (typeof ob === "undefined" || obj[ob].length === 0) {
			console.log("NO");
		}
		// 데이터 타입이 string일 때,
		else if (typeof obj[ob] === "string") {
			switch (ob) {
				case 'basic': gQuery += obj[ob] + ' '; break;
				case 'site': site(obj[ob]); break;
				case 'type': filetype(obj[ob]); break;
			}
		}
		// 데이터 타입이 array일 때
		else {
			switch (ob) {
				case 'exact': exact(obj[ob]); break;
				case 'or': break;
				case 'exclude': exclude(obj[ob]); break;
				case 'type': break;
			}
		}
	}

	function exact (o) {
		for (var a of o) {
			gQuery += '\"' + a + '\"';
			gQuery += ' ';
		}
	}

	function or (o) {

	}

	function exclude (o) {

	}

	function site (o) {

	}

	function type (o) {

	}

	return "test";
};

 export {GoogleQuery};