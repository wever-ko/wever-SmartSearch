/**
 * @author guyeol, jeong
 * Copyright © 2018 guyeol_jeong. All rights reserved.
 */

var GoogleQuery = function (obj) {
	var gQuery = "";
	for (var ob in obj) {
		if (typeof ob === "undefined" || obj[ob].length === 0) {
			console.log("NO");
		}
		else if (typeof obj[ob] === "string") {
			switch (ob) {
				case 'basic': gQuery += obj[ob]; break;
				case 'site': gQuery += " site:" + obj[ob] + ' '; break;
				case 'file': gQuery += " filetype:" + obj[ob] + ' '; break;
			}
		}
		else {
			switch (ob) {
				case 'exact': for (var a of obj[ob]) { gQuery += " \"" + a + "\""; } break;
				case 'or': for (var a of obj[ob]) { gQuery += " | " + a; } break;
				case 'exclude': for (var a of obj[ob]) { gQuery += ' -' + a + ' '; } break;
				case 'include': for (var a of obj[ob]) { gQuery += ' +' + a + ' '; } break;
			}
		}
	}
	return gQuery;
};

 export {GoogleQuery};