/**
 * @author : heeveloper
 * @email  : zaqq1414@gmail.com
 * Copyright © 2018 heeveloper. All rights reserved.
 */

/*
 * @private
 * @function : Return keyword-added query from raw user query.
 * @param {Object} q : Raw user query.
 */
function NaverQuery(q){
        var ret = "";

        // Basic query
        if(typeof q.basic == "string" && q.basic.length){
            ret += q.basic;
        }

        // Include query
        if(typeof q.include == "object" && q.include.length){
            for(var n in q.include){
                ret += " +" + q.include[n];
            }
        }

        // Exclude query
        if(typeof q.exclude == "object" && q.exclude.length){
            for(var n in q.exclude){
                ret += " -" + q.exclude[n];
            }
        }

        // Exact query
        if(typeof q.exact == "object" && q.exact.length){
            for(var n in q.exact){
                ret += " \"" + q.exact[n] + "\"";
            }
        }

        // Or query
        if(typeof q.or == "object" && q.or.length){
            for(var n in q.or){
                ret += " | " + q.or[n];
            }
        }

        return ret;
 };

export {NaverQuery};
