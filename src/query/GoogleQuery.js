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
		else if (typeof ob === "string") {
			switch (ob) {
				case site: break;
				case type: break;
			}
		}
		// 데이터 타입이 array일 때
		else {
			console.log("keword: " + ob);
			switch (ob) {
				case 'exact': exact(); break;
				case 'or': break;
				case 'exclude': break;
				case 'type': break;
			}
			for (var a of obj[ob]) {
				console.log("values: " + a);
			}
		}
	}

	function exact (o) {

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