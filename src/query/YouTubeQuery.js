/**
 * @author Yeon Ju An
 */
 /*| Keyword | Type  | Format            |
  *| ========|=======|===================|
  *| basic   | String| [words]           |
  *| exact   | Array | "[words]"         |
  *| include | Array | +[words]          |
  *| exclude | Array | -[words]          |
  *| or      | Array | [word] or [word]  |
  *| channel | Array | [words],channel   |
  *| movie   | Array | [words],movie     |
  *| intitle | Array | intitle:[words]   |
  *| time    | String| [words],$(t_key)  |
  *|=====================================|
  t_key : hour, day, week, month, year
 */
function sys1format (arr, front, end) {
    var ret = "";
    front = front || " ";
    end = end || " ";
    
    if (arr && arr.length) {
        for (var v of arr) {
            ret += (front + v + end);
        }
    }
    return ret;
}

var YouTubeQuery = function (params) {
    var ret = "";
    if (params.basic) ret += (params.basic + " ");  // basic
    ret += sys1format(params.exact, '"', '" ');    // exact
    ret += sys1format(params.include, "+"," ");         // include
    ret += sys1format(params.exclude, "-", " ");         // exclude
    ret += sys1format(params.channel, "", ",channel");   // channel
    ret += sys1format(params.movie, "", ",movie");       // movie
    ret += sys1format(params.title, "intitle:");         // intitle
    ret += sys1format(params.playlist, '', ',playlist');  //playlist
    if (params.time) ret += (", " + params.time);       // time 
    return ret;
}
export {YouTubeQuery};